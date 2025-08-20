import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
// import React, { useState } from 'react';
import scale from '../components/Scale';
import { verifyOtp, sendOtp } from '../api/auth'; // ✅ included sendOtp
import strings from '../components/strings';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

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

const UserchangePasswordTwoOTP = ({ setIsModalVisible }: { setIsModalVisible: (v: boolean) => void }) => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  //   const { email } = route.params as { email: string };

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [isInvalidOTP, setIsInvalidOTP] = useState(false);
  const [resending, setResending] = useState(false);
  const otpTextInput = useRef<Array<TextInput | null>>([]);

  const focusNext = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (isInvalidOTP) setIsInvalidOTP(false);
    if (value && index < 5) {
      otpTextInput.current[index + 1]?.focus();
    }
  };

  const focusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      otpTextInput.current[index - 1]?.focus();
    }
  };

  // ✅ Timer Format
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ✅ Timer Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.header}>
      <View style={{ width: '100%' }}>
        <Text style={styles.name}>Check your email</Text>
        <Text style={styles.changePasswordFullText}>We sent a reset link to suraiya@gmail.com</Text>
        <View style={styles.OTPVerificationcontainer}>
          <View style={styles.optContainer}>
            {otp.map((val, index) => (
              <View
                key={index}
                style={styles.firstContainer}
              >
                <TextInput
                  autoFocus={index === 0}
                  keyboardType="numeric"
                  onChangeText={(v) => focusNext(index, v)}
                  onKeyPress={(e) => focusPrevious(e.nativeEvent.key, index)}
                  ref={(ref) => (otpTextInput.current[index] = ref)}
                  value={otp[index]}
                  style={styles.placeholderText}
                  maxLength={1}
                />
              </View>
            ))}
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
        ) : (
          <View>
            <TouchableOpacity
              style={[
                styles.buttonHeader,
                {
                  backgroundColor: otp.every((d) => d !== '') ? '#00604D' : '#B0E1DA',
                  borderWidth: otp.every((d) => d !== '') ? scale(3) : scale(1.5),
                },
              ]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>

            <View style={styles.containerResend}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Haven’t got the email yet? </Text>
                <TouchableOpacity>
                  <Text style={[styles.resendText, { opacity: resending || timer > 0 ? 0.4 : 1 }]}>
                    Resend email
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const UserchangePasswordTwo = () => {
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
            <TouchableOpacity style={styles.doneButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeaderProfileScreen />
      {renderProfileUpdateModal()}
      <UserchangePasswordTwoOTP setIsModalVisible={setIsModalVisible} />
    </SafeAreaView>
  );
};

export default UserchangePasswordTwo;

// styles remain unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#8AE6CE' },
  backButton: { width: scale(24), height: scale(24), resizeMode: 'contain' },
  personText: { fontSize: scale(18), fontWeight: '600', color: '#00604D', marginLeft: scale(20) },
  personalDetailsHeader: { flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(25), marginTop: scale(20) },
  OTPVerificationcontainer: { marginHorizontal: scale(40), alignItems: 'center' },
  optContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  firstContainer: { width: scale(45), height: scale(50), borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginHorizontal: scale(5),
    borderColor:"#FFFFFF",   backgroundColor: '#FFFFFF57',borderWidth:scale(2)
   },
  placeholderText: { fontSize: 20, fontWeight: '600', color: '#000', textAlign: 'center', width: '100%' ,},
  errorText: { color: 'red', fontSize: scale(12), fontWeight: '600', marginTop: scale(8) },
  timerText: { color: 'red', fontSize: scale(12), fontWeight: '600', alignSelf: 'flex-end', marginTop: scale(6) },
  buttonHeader: { width: scale(185), height: scale(50), alignItems: 'center', justifyContent: 'center', borderRadius: scale(24), alignSelf: 'center', marginTop: '5%', borderColor: '#FFFFFF' },
  buttonText: { color: '#FFFFFF', fontSize: scale(19), fontWeight: '700' },
  containerResend: { alignItems: 'center', marginTop: '8%', alignSelf: 'center' },
  text: { fontSize: scale(11), color: '#014E3F', fontWeight: '500' },
  resendText: { fontSize: scale(11), fontWeight: '700', color: '#014E3F' },
  name: { fontSize: scale(24), fontWeight: '800', alignSelf: 'center', color: '#00604D', marginTop: scale(15) },
  changePasswordFullText: { fontSize: scale(15), fontWeight: '500', alignSelf: 'center', color: '#373737', marginTop: scale(15), marginBottom: '12%' },
  header: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: 'white', borderTopLeftRadius: scale(30), borderTopRightRadius: scale(30), paddingHorizontal: scale(24), paddingTop: scale(40), paddingBottom: scale(20), alignItems: 'center' },
  thumbCircle: { backgroundColor: '#08A48B', width: scale(100), height: scale(100), borderRadius: scale(50), justifyContent: 'center', alignItems: 'center', marginBottom: scale(20) },
  thumbImage: { width: scale(79), height: scale(79), resizeMode: 'contain' },
  wooHooText: { fontSize: scale(21), fontWeight: '700', color: '#00604D', marginBottom: scale(10) },
  successMessage: { fontSize: scale(14), color: '#00604D', textAlign: 'center', fontWeight: '500', marginBottom: scale(25), width: '60%' },
  doneButton: { backgroundColor: '#00604D', borderRadius: scale(24), width: scale(194), height: scale(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: scale(30) },
  doneButtonText: { color: 'white', fontSize: scale(16), fontWeight: '600' },
});
