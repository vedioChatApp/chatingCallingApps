import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import scale from '../components/Scale';
import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Voice from '@react-native-voice/voice';

const UserMainChatScreenHeader = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.bellIconBackHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.leftSection}>
          <Image source={require('../assets/DummyLogo.png')} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>User Name</Text>
            <View style={styles.walletContainer}>
              <View style={styles.dot} />
              <Text style={styles.walletText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.leftSection}>
        <Image source={require('../assets/callingIcon.png')} style={styles.icon} />
        <Image source={require('../assets/callingIcon.png')} style={styles.icon} />
      </View>
    </View>
  );
};

const UserMainChatScreenCurveScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = e => {
      console.log('Voice Error:', e);
      setIsRecording(false);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    if (e.value && e.value.length > 0) {
      setMessage(e.value[0]);
      setIsRecording(false);
    }
  };

  const handleMicPress = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
        return;
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('🎙️ Microphone permission denied');
          return;
        }
      }

      await Voice.start('en-US');
      setIsRecording(true);
    } catch (e) {
      console.log('Voice Start Error:', e);
      setIsRecording(false);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, message]);
      setMessage('');
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.messageText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.bottomContainer}>
      {/* 🔴 Mic Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>🎙️ Voice recording in progress...</Text>
        </View>
      )}

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
        contentContainerStyle={{ paddingBottom: scale(80), paddingTop: scale(10) }}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={scale(10)}
      >
        <View style={styles.chatInputContainer}>
          <TouchableOpacity
            style={styles.inputLeftButton}
            onPress={() => setShowAttachmentModal(true)}
          >
            <Image source={require('../assets/PlusCircle.png')} style={styles.inputIcon} />
          </TouchableOpacity>

          <TextInput
            placeholder="Type Message"
            placeholderTextColor="#0B5345"
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.inputRightButton}
            // onPress={message.trim() ? sendMessage : handleMicPress}
          >
            <Image
              source={
                message.trim()
                  ? require('../assets/back.png') // send icon
                  : require('../assets/mic.png') // mic icon
              }
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 📎 Attachment Modal */}
      <Modal
        visible={showAttachmentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Attach</Text>

            <View style={styles.attachmentGrid}>
              {[
                { label: '📷 Camera', onPress: () => {} },
                { label: '🖼️ Gallery', onPress: () => {} },
                { label: '📄 Document', onPress: () => {} },
                { label: '📍 Location', onPress: () => {} },
                { label: '👤 Contact', onPress: () => {} },
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.attachmentItem} onPress={item.onPress}>
                  <Text style={styles.modalButtonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setShowAttachmentModal(false)}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const UserMainChatScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.overlayBackground}>
    <UserMainChatScreenHeader />
    <UserMainChatScreenCurveScreen />
    </View>
    {/* <UserMainChatScreenHeader /> */}
    {/* <UserMainChatScreenCurveScreen /> */}
  </SafeAreaView>
);

export default UserMainChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  },
    overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
},
  headerContainer: {
    marginHorizontal: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bellIconBackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  avatar: {
    width: scale(39),
    height: scale(39),
    borderRadius: 22.5,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: scale(16),
    fontWeight: '800',
    color: '#0B5345',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    fontSize: scale(12),
    fontWeight: '500',
    color: '#27AE60',
    marginLeft: scale(5),
  },
  backIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  dot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(7 / 2),
    backgroundColor: '#00A323',
  },
  icon: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'stretch',
    marginLeft: scale(10),
  },
  bottomContainer: {
    flex: 1,
    marginTop: scale(20),
    borderTopRightRadius: scale(50),
    borderTopLeftRadius: scale(50),
    backgroundColor: '#B2F3ED',
    paddingTop: scale(10),
    paddingBottom: scale(5),
  },
  messageList: {
    paddingHorizontal: scale(20),
  },
  messageBubble: {
    backgroundColor: '#1AC8B9',
    alignSelf: 'flex-end',
    padding: scale(10),
    borderRadius: scale(20),
    marginBottom: scale(8),
    maxWidth: '75%',
  },
  messageText: {
    color: 'white',
    fontSize: scale(14),
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4FBF9',
    marginHorizontal: scale(20),
    borderRadius: scale(50),
    paddingHorizontal: scale(16),
    height: scale(58),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    position: 'absolute',
    bottom: scale(10),
    left: 0,
    right: 0,
  },
  inputLeftButton: {
    marginRight: scale(8),
  },
  inputRightButton: {
    marginLeft: scale(8),
  },
  inputIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: scale(14),
    color: '#0B5345',
    paddingHorizontal: scale(10),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: scale(20),
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  modalTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(15),
    color: '#0B5345',
  },
  attachmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  attachmentItem: {
    width: '47%',
    backgroundColor: '#E4FBF9',
    padding: scale(12),
    borderRadius: scale(12),
    marginBottom: scale(12),
  },
  modalButtonText: {
    fontSize: scale(14),
    color: '#1AC8B9',
    fontWeight: '600',
  },
  modalCancelButton: {
    marginTop: scale(10),
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: scale(14),
    color: '#FF4C4C',
    fontWeight: '600',
  },
  // 👇👇 Add this
  recordingIndicator: {
    backgroundColor: '#FF4C4C',
    paddingVertical: scale(6),
    paddingHorizontal: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
  },
  recordingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(13),
  },
});
