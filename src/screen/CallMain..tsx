import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {
  LiveKitRoom,
  useLocalParticipant,
  useRoomContext,
  AudioSession,
} from '@livekit/react-native';
import { RoomEvent } from 'livekit-client';
import { useNavigation } from '@react-navigation/native';

import scale, { verticalScale } from '../components/Scale';
import Images from './assets'; // 🔔 इसमें Speaker / Unmute / SendGifts / End icons पहले जैसे ही माने गए हैं

// ---- LiveKit creds ----
const SERVER_URL = 'wss://videochat-qsxbssxp.livekit.cloud';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIn0sImlzcyI6IkFQSUVRdWpUWko1eVlmbiIsImV4cCI6MTc1MjQ5Mjk0MCwibmJmIjowLCJzdWIiOiJhYmMifQ.3Zss5Yck4VfyWuonuLSHCFcGkToRzj7PDVn1GIqF99o';

// --- Android mic/bluetooth permissions ---
async function requestAudioPerms() {
  if (Platform.OS !== 'android') return true;
  const res = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  ] as any);
  return Object.values(res).every(v => v === PermissionsAndroid.RESULTS.GRANTED);
}

/** Wrapper: LiveKitRoom (audio-only) */
const CallMain = () => {
  return (
    <LiveKitRoom
      serverUrl={SERVER_URL}
      token={TOKEN}
      connect
      audio
      video={false} // ✅ audio-only
      onConnected={() => console.log('✅ Connected (audio)')}
      onDisconnected={() => console.log('❌ Disconnected')}
    >
      <InRoomAudio />
    </LiveKitRoom>
  );
};

export default CallMain;

/** In-room audio UI + logic (Room context के अंदर) */
const InRoomAudio = () => {
  const navigation = useNavigation<any>();
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  const [muted, setMuted] = useState(false);        // false = mic ON
  const [speakerOn, setSpeakerOn] = useState(true); // true = loudspeaker
  const [elapsed, setElapsed] = useState('00:00');
  const [isConnected, setIsConnected] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // start audio session + perms
  useEffect(() => {
    const start = async () => {
      const ok = await requestAudioPerms();
      if (!ok) {
        Alert.alert('Permissions', 'Mic permission required for audio call.');
        return;
      }
      await AudioSession.startAudioSession();
      try { await (AudioSession as any).setSpeakerphoneOn?.(true); } catch {}
    };
    start();
    return () => { AudioSession.stopAudioSession(); };
  }, []);

  // room events
  useEffect(() => {
    const onConn = () => {
      setIsConnected(true);
      startTimer();
    };
    const onDisc = () => {
      setIsConnected(false);
      stopTimer();
      try { (AudioSession as any).setSpeakerphoneOn?.(false); } catch {}
      if (navigation?.canGoBack?.()) navigation.goBack();
    };

    room?.on(RoomEvent.Connected, onConn);
    room?.on(RoomEvent.Disconnected, onDisc);
    return () => {
      room?.off(RoomEvent.Connected, onConn);
      room?.off(RoomEvent.Disconnected, onDisc);
    };
  }, [room, navigation]);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        const [m, s] = prev.split(':').map(Number);
        const t = m * 60 + s + 1;
        const mm = String(Math.floor(t / 60)).padStart(2, '0');
        const ss = String(t % 60).padStart(2, '0');
        return `${mm}:${ss}`;
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current as any); timerRef.current = null; }
  };

  const toggleMute = async () => {
    try {
      await localParticipant.setMicrophoneEnabled(muted); // muted=false ⇒ enable=false
      setMuted(m => !m);
    } catch (e) {
      console.warn('toggleMute error', e);
    }
  };

  const toggleSpeaker = async () => {
    try {
      await (AudioSession as any).setSpeakerphoneOn?.(!speakerOn);
    } catch (e) {
      console.warn('toggleSpeaker error', e);
    } finally {
      setSpeakerOn(s => !s);
    }
  };

  const endCall = async () => {
    try {
      await room?.disconnect?.(true); // tracks भी बंद
    } catch (e) {
      console.warn('disconnect error', e);
    } finally {
      stopTimer();
      try { await AudioSession.stopAudioSession(); } catch {}
      if (navigation?.canGoBack?.()) navigation.goBack();
    }
  };

  // -------- UI --------
  return (
    <View style={s.root}>
      {/* BG: अगर आपके पास कोई फोटो है तो Images.CallBg लगा दें, वरना solid dark */}
      <ImageBackground
        source={/* Images.CallBg || */ undefined as any}
        style={s.bg}
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={s.overlay} />

        <SafeAreaView style={{ flex: 1 }}>
          {/* Top header (connected होने पर दिखे) */}
          {isConnected && (
            <View style={s.topBar}>
              <View style={s.topLeftCard}>
                <View style={s.topAvatar}>
                  {/* अगर आपके पास DP इमेज है तो यहाँ <Image source={...} style={s.topAvatarImg}/> */}
                  <Text style={s.avatarInitial}>S</Text>
                </View>
                <View>
                  <Text style={s.nameSmall}>Suraiya Parvin</Text>
                  <Text style={s.followers}>1263 Followers</Text>
                </View>
              </View>

              <View style={s.addBtn}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: scale(14) }}>＋</Text>
              </View>
            </View>
          )}

          {/* Center name/timer (connecting vs connected) */}
          <View style={s.centerArea}>
            {!isConnected ? (
              <>
                <View style={s.bigAvatarWrap}>
                  <View style={s.bigAvatarRing}>
                    <Text style={s.bigAvatarInitial}>S</Text>
                  </View>
                </View>
                <Text style={s.bigName}>Suraiya Parvin</Text>
                <Text style={s.connecting}>connecting...</Text>
              </>
            ) : (
              <>
                <Text style={s.bigName}>Suraiya Parvin</Text>
                <Text style={s.timer}>{elapsed}</Text>
              </>
            )}
          </View>

          {/* Bottom control tray */}
          <View style={s.bottomTray}>
            <View style={s.row}>
              {/* Speaker */}
              <TouchableOpacity onPress={toggleSpeaker} style={s.circleBtn}>
                <Image source={Images.Speaker} style={s.circleIcon} />
                <Text style={s.btnLabel}>Speaker</Text>
              </TouchableOpacity>

              {/* Mute */}
              <TouchableOpacity onPress={toggleMute} style={s.circleBtn}>
                <Image source={Images.Unmute} style={s.circleIcon} />
                <Text style={s.btnLabel}>{muted ? 'Unmute' : 'Mute'}</Text>
              </TouchableOpacity>

              {/* Gifts */}
              <TouchableOpacity onPress={() => {}} style={s.circleBtn}>
                <Image source={Images.SendGifts} style={s.circleIcon} />
                <Text style={s.btnLabel}>Send gifts</Text>
              </TouchableOpacity>

              {/* End */}
              <TouchableOpacity onPress={endCall} style={[s.circleBtn, s.endBtn]}>
                <Image source={Images.End} style={s.circleIcon} />
                <Text style={s.btnLabel}>End</Text>
              </TouchableOpacity>
            </View>

            {/* iOS home-indicator spacer जैसा */}
            <View style={s.homeIndicator} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

/* ====== Styles (screenshot जैसे) ====== */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000', // darken BG
    opacity: 0.55,
  },
  

  /* top header */
  topBar: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.6)',
    borderRadius: scale(18),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
  },
  topAvatar: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#2f3e46',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  avatarInitial: { color: '#fff', fontWeight: '700', fontSize: scale(12) },
  nameSmall: { color: '#fff', fontWeight: '700', fontSize: scale(12) },
  followers: { color: '#c8d6e5', fontSize: scale(10), marginTop: 2 },
  addBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#1AC8B9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* center area */
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarWrap: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
    borderWidth: 2,
    borderColor: '#fff',
  },
  bigAvatarRing: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    backgroundColor: 'rgba(58,58,58,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarInitial: { color: '#fff', fontSize: scale(36), fontWeight: '800' },

  bigName: {
    color: '#fff',
    fontSize: scale(28),
    fontWeight: '800',
    textAlign: 'center',
  },
  connecting: {
    color: '#c8d6e5',
    fontSize: scale(14),
    marginTop: verticalScale(6),
  },
  timer: {
    color: '#c8d6e5',
    fontSize: scale(16),
    marginTop: verticalScale(8),
    fontWeight: '600',
  },

  /* bottom tray */
  bottomTray: {
    backgroundColor: 'rgba(20,20,20,0.85)',
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(18),
    paddingHorizontal: scale(16),
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  circleBtn: {
    alignItems: 'center',
    width: scale(70),
  },
  circleIcon: {
    width: scale(56),
    height: scale(56),
    resizeMode: 'contain',
    marginBottom: verticalScale(6),
  },
  endBtn: {},
  btnLabel: {
    color: '#cfd8dc',
    fontSize: scale(11),
    textAlign: 'center',
  },

  homeIndicator: {
    alignSelf: 'center',
    width: scale(120),
    height: verticalScale(4),
    borderRadius: 2,
    backgroundColor: '#666',
    marginTop: verticalScale(12),
  },
});
