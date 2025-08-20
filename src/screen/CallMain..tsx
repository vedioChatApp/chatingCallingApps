import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, RTCView } from 'react-native-webrtc';
// import socket from '../socket/socket';

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

const CallMain = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(null);

  // useEffect(() => {
  //   startCall();

  //   socket.on('offer', async (offer) => {
  //     if (!pc.current) createPeerConnection();
  //     await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
  //     const answer = await pc.current.createAnswer();
  //     await pc.current.setLocalDescription(answer);
  //     socket.emit('answer', answer);
  //   });

  //   socket.on('answer', async (answer) => {
  //     await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
  //   });

  //   socket.on('candidate', async (candidate) => {
  //     try {
  //       await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  //     } catch (e) {
  //       console.error('Error adding received ICE candidate', e);
  //     }
  //   });

  //   return () => {
  //     pc.current?.close();
  //     socket.off('offer');
  //     socket.off('answer');
  //     socket.off('candidate');
  //   };
  // }, []);

  // const createPeerConnection = () => {
  //   pc.current = new RTCPeerConnection(configuration);

  //   pc.current.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       socket.emit('candidate', event.candidate);
  //     }
  //   };

  //   pc.current.onaddstream = (event) => {
  //     setRemoteStream(event.stream);
  //   };

  //   pc.current.addStream(localStream);
  // };

  // const startCall = async () => {
  //   const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
  //   setLocalStream(stream);

  //   createPeerConnection();

  //   const offer = await pc.current.createOffer();
  //   await pc.current.setLocalDescription(offer);
  //   socket.emit('offer', offer);
  // };

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Audio Call Screen</Text>
  //     {localStream && (
  //       <RTCView
  //         streamURL={localStream.toURL()}
  //         style={styles.rtcView}
  //       />
  //     )}
  //     {remoteStream && (
  //       <RTCView
  //         streamURL={remoteStream.toURL()}
  //         style={styles.rtcViewRemote}
  //       />
  //     )}
  //     <TouchableOpacity style={styles.endButton} onPress={() => pc.current?.close()}>
  //       <Text style={styles.endText}>End Call</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default CallMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rtcView: {
    width: 200,
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  rtcViewRemote: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 20,
  },
  endButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#F44336',
    borderRadius: 8,
  },
  endText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
