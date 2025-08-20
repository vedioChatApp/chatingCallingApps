import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import scale from '../components/Scale';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserHeaderProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.personText}>{strings.UserchangePassword.changePassword}</Text>
    </View>
  );
};

const UserchangePasswordContain = ({ onContinuePress }: { onContinuePress: () => void }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const showLabel = (isFocused: boolean, value: string) => isFocused || value !== '';
  const navigation = useNavigation();

  return (
    <View style={styles.contentCenter}>
      <View style={{ width: '100%' }}>
        <Text style={styles.name}>{strings.UserchangePassword.changePassword}</Text>
        <Text style={styles.changePasswordFullText}>
          {strings.UserchangePassword.changePasswordFullText}
        </Text>

        <View style={styles.inputWrapper}>
          {showLabel(isPasswordFocused, password) && <Text style={styles.label}>New Password</Text>}
          <TextInput
            style={styles.input}
            placeholder={!showLabel(isPasswordFocused, password) ? 'New Password' : ''}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#3F897B"
            secureTextEntry
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </View>

        <View style={styles.inputWrapper}>
          {showLabel(isConfirmPasswordFocused, confirmPassword) && (
            <Text style={styles.label}>Confirm Password</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder={!showLabel(isConfirmPasswordFocused, confirmPassword) ? 'Confirm Password' : ''}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#3F897B"
            secureTextEntry
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
          />
        </View>

        <TouchableOpacity style={styles.buttonHeader} 
        // onPress={onContinuePress}
          onPress={() => {
                        navigation.navigate('UserchangePasswordTwo' as never);
                    }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const UserchangePassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

  const renderProfileUpdateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.thumbCircle}>
              <Image source={require('../assets/thumbsUp.png')} style={styles.thumbImage} />
            </View>
            <Text style={styles.wooHooText}>{strings.UserProfileScreen.wooHoo}</Text>
            <Text style={styles.successMessage}>
              Your password has been changed successfully!
            </Text>
            <TouchableOpacity style={styles.doneButton} 
            onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground} >
      <UserHeaderProfileScreen />
      <UserchangePasswordContain onContinuePress={() => setIsModalVisible(true)} />
      {renderProfileUpdateModal()}
        </View>
    </SafeAreaView>
  );
};

export default UserchangePassword;

// Styles remain exactly as you had — unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#8AE6CE',
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
  backButton: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  personText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#00604D',
    marginLeft: scale(20),
  },
  personalDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(25),
    marginTop: scale(20),
  },
  name: {
    fontSize: scale(24),
    fontWeight: '800',
    alignSelf: 'center',
    color: '#00604D',
    marginTop: scale(15),
  },
  changePasswordFullText: {
    fontSize: scale(15),
    fontWeight: '500',
    alignSelf: 'center',
    color: '#00604D',
    marginTop: scale(15),
    marginBottom: '12%',
  },
  inputWrapper: {
    marginBottom: scale(20),
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: scale(-18),
    left: scale(15),
    paddingHorizontal: scale(4),
    fontSize: scale(13),
    color: '#3F897B',
    zIndex: 2,
    marginHorizontal: scale(40),
  },
  input: {
    backgroundColor: '#FFFFFF57',
    height: scale(50),
    borderRadius: scale(25),
    borderColor: '#FFFFFF',
    borderWidth: scale(1.5),
    paddingHorizontal: scale(15),
    fontSize: scale(16),
    color: '#3F897B',
    marginHorizontal: scale(40),
  },
  buttonHeader: {
    width: '50%',
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(24),
    alignSelf: 'center',
    marginTop: '5%',
    borderColor: '#FFFFFF',
    marginBottom: '10%',
    backgroundColor: '#00604D',
    borderWidth: scale(2),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(19),
    fontWeight: '700',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(24),
    paddingTop: scale(40),
    paddingBottom: scale(20),
    alignItems: 'center',
  },
  thumbCircle: {
    backgroundColor: '#08A48B',
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  thumbImage: {
    width: scale(79),
    height: scale(79),
    resizeMode: 'contain',
  },
  wooHooText: {
    fontSize: scale(21),
    fontWeight: '700',
    color: '#00604D',
    marginBottom: scale(10),
  },
  successMessage: {
    fontSize: scale(14),
    color: '#00604D',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: scale(25),
    width: '60%',
  },
  doneButton: {
    backgroundColor: '#00604D',
    borderRadius: scale(24),
    width: scale(194),
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(30),
  },
  doneButtonText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
  },
});
