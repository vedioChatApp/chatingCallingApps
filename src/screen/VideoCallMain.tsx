import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {
  LiveKitRoom,
  useTracks,
  useLocalParticipant,
  VideoTrack,
  isTrackReference,
  AudioSession,
  useRoomContext,
} from '@livekit/react-native';
import { Track, LocalTrackPublication, LocalVideoTrack, RoomEvent } from 'livekit-client';
import { useNavigation } from '@react-navigation/native';

import scale, { verticalScale } from '../components/Scale';
import Images from './assets';

const SERVER_URL = 'wss://videochat-qsxbssxp.livekit.cloud';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIn0sImlzcyI6IkFQSUVRdWpUWko1eVlmbiIsImV4cCI6MTc1MjQ5Mjk0MCwibmJmIjowLCJzdWIiOiJhYmMifQ.3Zss5Yck4VfyWuonuLSHCFcGkToRzj7PDVn1GIqF99o';

async function requestPermissions() {
  if (Platform.OS === 'android') {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ] as any);
    return Object.values(res).every(v => v === PermissionsAndroid.RESULTS.GRANTED);
  }
  return true;
}

/** Wrapper: LiveKitRoom */
const VideoCallMain = () => {
  return (
    <LiveKitRoom
      serverUrl={SERVER_URL}
      token={TOKEN}
      connect={true}
      audio={true}
      video={true}
      options={{ adaptiveStream: { pixelDensity: 'screen' } }}
      onConnected={() => console.log('✅ Connected')}
      onDisconnected={() => console.log('❌ Disconnected')}
    >
      <InRoomUI />
    </LiveKitRoom>
  );
};

export default VideoCallMain;

/** In-room UI (hooks यहाँ हैं, Room context के अंदर) */
const InRoomUI = () => {
  const [muted, setMuted] = useState(false);          // false = mic ON
  const [speakerOn, setSpeakerOn] = useState(true);   // true = loudspeaker
  const [cameraOn, setCameraOn] = useState(true);     // true = camera ON
  const [callDuration, setCallDuration] = useState('00:00');
  const durationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();
  const navigation = useNavigation<any>();

  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: false });
  const remoteTracks = tracks.filter(t => isTrackReference(t) && !t.participant.isLocal);
  const localTrack = tracks.find(t => isTrackReference(t) && t.participant.isLocal);

  useEffect(() => {
    const start = async () => {
      const ok = await requestPermissions();
      if (!ok) {
        Alert.alert('Permissions Required', 'Camera & Microphone permissions are needed to join the call.');
        return;
      }
      await AudioSession.startAudioSession();
      try {
        await (AudioSession as any).setSpeakerphoneOn?.(true);
      } catch {}
      startTimer();
    };

    start();

    return () => {
      stopTimer();
      AudioSession.stopAudioSession();
    };
  }, []);

  // 🔔 डिस्कनेक्ट इवेंट पर भी स्क्रीन से निकल जाए
  useEffect(() => {
    const onDisc = () => {
      stopTimer();
      try { (AudioSession as any).setSpeakerphoneOn?.(false); } catch {}
      if (navigation.canGoBack()) navigation.goBack();
    };
    room?.on(RoomEvent.Disconnected, onDisc);
    return () => {
      room?.off(RoomEvent.Disconnected, onDisc);
    };
  }, [room, navigation]);

  const startTimer = () => {
    if (durationTimerRef.current) return;
    durationTimerRef.current = setInterval(() => {
      setCallDuration(prev => {
        const [min, sec] = prev.split(':').map(Number);
        const total = min * 60 + sec + 1;
        const newMin = String(Math.floor(total / 60)).padStart(2, '0');
        const newSec = String(total % 60).padStart(2, '0');
        return `${newMin}:${newSec}`;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current as any);
      durationTimerRef.current = null;
    }
  };

  /** 🎙️ Mic toggle */
  const toggleMute = async () => {
    try {
      await localParticipant.setMicrophoneEnabled(muted);
      setMuted(m => !m);
    } catch (e) {
      console.warn('toggleMute error', e);
    }
  };

  /** 🔊 Speaker toggle */
  const toggleSpeaker = async () => {
    try {
      await (AudioSession as any).setSpeakerphoneOn?.(!speakerOn);
    } catch (e) {
      console.warn('toggleSpeaker error', e);
    } finally {
      setSpeakerOn(s => !s);
    }
  };

  /** 📷 Flip camera */
  const flipCamera = async () => {
    try {
      const pub = localParticipant.getTrackPublication(
        Track.Source.Camera
      ) as LocalTrackPublication | undefined;

      const lv = pub?.track as LocalVideoTrack | undefined;
      // @ts-ignore
      await lv?.switchCamera?.();
      // @ts-ignore
      await (pub as any)?.videoTrack?.switchCamera?.();
    } catch (e) {
      console.warn('flipCamera error', e);
    }
  };

  /** ⛔ End call — पूरी तरह से बंद + back */
  const endCall = async () => {
    try {
      // stop local tracks too
      await room?.disconnect?.(true);
    } catch (e) {
      console.warn('disconnect error', e);
    } finally {
      stopTimer();
      try { await AudioSession.stopAudioSession(); } catch {}
      if (navigation.canGoBack()) navigation.goBack();
    }
  };

  return (
    <View style={styles.fullScreen}>
      {/* Remote full screen video */}
      {remoteTracks.length > 0 ? (
        <VideoTrack trackRef={remoteTracks[0]} style={styles.remoteStream} objectFit="cover" />
      ) : (
        <View style={[styles.remoteStream, { backgroundColor: '#000', justifyContent: 'center' }]}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Waiting for remote user...</Text>
        </View>
      )}

      {/* Local video in PiP */}
      {localTrack && cameraOn && (
        <View style={styles.localStream}>
          <VideoTrack trackRef={localTrack} style={{ width: '100%', height: '100%' }} objectFit="cover" />
        </View>
      )}

      {/* Top info */}
      <SafeAreaView style={styles.topInfo}>
        <Text style={styles.userName}>Suraiya Parvin</Text>
        <Text style={styles.callTimer}>{callDuration}</Text>
      </SafeAreaView>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={toggleSpeaker} style={styles.controlIconWrapper}>
            <Image source={Images.Speaker} style={styles.iconImage} />
            <Text style={{color:'#fff', fontSize:scale(10), textAlign:'center', marginTop:4}}>Speaker</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMute} style={styles.controlIconWrapper}>
            <Image source={Images.Unmute} style={styles.iconImage} />
            <Text style={{color:'#fff', fontSize:scale(10), textAlign:'center', marginTop:4}}>
              {muted ? 'Mute off' : 'Unmute'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.controlIconWrapper}>
            <Image source={Images.SendGifts} style={styles.iconImage} />
            <Text style={{color:'#fff', fontSize:scale(10), textAlign:'center', marginTop:4}}>Send g!fts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={endCall} style={styles.controlIconWrapper}>
            <Image source={Images.End} style={styles.iconImage} />
            <Text style={{color:'#fff', fontSize:scale(10), textAlign:'center', marginTop:4}}>End</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity
            onPress={async () => {
              try {
                await localParticipant.setCameraEnabled(!cameraOn);
                setCameraOn(v => !v);
              } catch (e) {
                console.warn('setCameraEnabled error', e);
              }
            }}
            style={styles.bottomButton}
          >
            <Image source={cameraOn ? Images.Cameraoff : Images.Cameraon} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Camera Off</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={flipCamera} style={styles.bottomButton}>
            <Image source={Images.FlipCamera} style={styles.bottomIcon} />
            <Text style={styles.bottomLabel}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* ——— Styles (जैसे के तैसे) ——— */
const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: '#000' },
  remoteStream: { flex: 1, width: '100%', height: '100%' },
  localStream: {
    position: 'absolute',
    bottom: verticalScale(140),
    right: scale(10),
    width: scale(100),
    height: verticalScale(130),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  topInfo: { position: 'absolute', top: verticalScale(30), alignSelf: 'center', alignItems: 'center' },
  userName: { color: '#fff', fontSize: scale(16), fontWeight: '600' },
  callTimer: { color: '#fff', fontSize: scale(13), marginTop: verticalScale(4) },
  controls: {
    position: 'absolute',
    bottom: verticalScale(20),
    width: '100%',
    paddingHorizontal: scale(10),
    backgroundColor: 'rgba(30,30,30,0.6)',
    paddingVertical: verticalScale(10),
  },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: verticalScale(10) },
  controlIconWrapper: { padding: scale(5), alignItems:'center' },
  iconImage: { width: scale(50), height: scale(50), resizeMode: 'contain' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: scale(20) },
  bottomButton: { alignItems: 'center', backgroundColor: '#1f1f1f', borderRadius: scale(20), paddingVertical: verticalScale(8), paddingHorizontal: scale(12), flexDirection: 'row' },
  bottomIcon: { width: scale(20), height: scale(20), marginRight: scale(6), resizeMode: 'contain' },
  bottomLabel: { color: '#fff', fontSize: scale(12) },
});
