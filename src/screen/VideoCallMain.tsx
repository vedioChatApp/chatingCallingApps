import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text,
  Alert,
} from 'react-native';
// import { RTCView } from 'react-native-webrtc';
// import {
//   startVideoCall,
//   toggleMute,
//   toggleSpeaker,
//   switchCamera,
//   endCall,
// } from '../webrtc/WebRTCService';
// import { requestPermissions } from '../utils/permissions'; // ✅ Correct import
import scale, { verticalScale } from '../components/Scale';
import Images from './assets';

const VideoCallMain = () => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [remoteUrl, setRemoteUrl] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState('00:00');

  // useEffect(() => {
  //   const initiateCall = async () => {
  //     const permissionGranted = await requestPermissions();
  //     if (!permissionGranted) {
  //       Alert.alert(
  //         'Permissions Required',
  //         'Camera and Microphone permissions are required to make a video call.'
  //       );
  //       return;
  //     }

  //     try {
  //       const streams = await startVideoCall();
  //       if (streams?.local) setLocalUrl(streams.local.toURL());
  //       if (streams?.remote) setRemoteUrl(streams.remote.toURL());
  //     } catch (error) {
  //       console.error('❌ Failed to start video call:', error);
  //       Alert.alert('Error', 'Could not start the video call.');
  //     }
  //   };

  //   initiateCall();

  //   const timer = setInterval(() => {
  //     setCallDuration((prev) => {
  //       const [min, sec] = prev.split(':').map(Number);
  //       const total = min * 60 + sec + 1;
  //       const newMin = String(Math.floor(total / 60)).padStart(2, '0');
  //       const newSec = String(total % 60).padStart(2, '0');
  //       return `${newMin}:${newSec}`;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //     endCall();
  //   };
  // }, []);

  return (
    // <View style={styles.fullScreen}>
    //   {remoteUrl && (
    //     <RTCView streamURL={remoteUrl} style={styles.remoteStream} objectFit="cover" />
    //   )}

    //   {localUrl && cameraOn && (
    //     <RTCView streamURL={localUrl} style={styles.localStream} objectFit="cover" />
    //   )}

    //   <SafeAreaView style={styles.topInfo}>
    //     <Text style={styles.userName}>Suraiya Parvin</Text>
    //     <Text style={styles.callTimer}>{callDuration}</Text>
    //   </SafeAreaView>

    //   <View style={styles.controls}>
    //     <View style={styles.controlsRow}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           toggleSpeaker();
    //           setSpeakerOn(!speakerOn);
    //         }}
    //         style={styles.controlIconWrapper}
    //       >
    //         <Image source={Images.Speaker} style={styles.iconImage} />
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         onPress={() => {
    //           toggleMute();
    //           setMuted(!muted);
    //         }}
    //         style={styles.controlIconWrapper}
    //       >
    //         <Image source={Images.Unmute} style={styles.iconImage} />
    //       </TouchableOpacity>

    //       <TouchableOpacity onPress={() => {}} style={styles.controlIconWrapper}>
    //         <Image source={Images.SendGifts} style={styles.iconImage} />
    //       </TouchableOpacity>

    //       <TouchableOpacity onPress={endCall} style={styles.controlIconWrapper}>
    //         <Image source={Images.End} style={styles.iconImage} />
    //       </TouchableOpacity>
    //     </View>

    //     <View style={styles.bottomRow}>
    //       <TouchableOpacity
    //         onPress={() => setCameraOn(!cameraOn)}
    //         style={styles.bottomButton}
    //       >
    //         <Image
    //           source={cameraOn ? Images.Cameraoff : Images.Cameraon}
    //           style={styles.bottomIcon}
    //         />
    //         <Text style={styles.bottomLabel}>Camera Off</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity onPress={switchCamera} style={styles.bottomButton}>
    //         <Image source={Images.FlipCamera} style={styles.bottomIcon} />
    //         <Text style={styles.bottomLabel}>Flip Camera</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
    <View>
      
    </View>
  );
};

export default VideoCallMain;



const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  remoteStream: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
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
  },
  topInfo: {
    position: 'absolute',
    top: verticalScale(30),
    alignSelf: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
  },
  callTimer: {
    color: '#fff',
    fontSize: scale(13),
    marginTop: verticalScale(4),
  },
  controls: {
    position: 'absolute',
    bottom: verticalScale(20),
    width: '100%',
    paddingHorizontal: scale(10),
    backgroundColor: 'rgba(30,30,30,0.6)',
    paddingVertical: verticalScale(10),
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  controlIconWrapper: {
    padding: scale(5),
  },
  iconImage: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: scale(20),
  },
  bottomButton: {
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
  },
  bottomIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(6),
    resizeMode: 'contain',
  },
  bottomLabel: {
    color: '#fff',
    fontSize: scale(12),
  },
});
