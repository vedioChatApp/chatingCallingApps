import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import scale from '../components/Scale';
import { verifyOtp, sendOtp } from '../api/auth'; // ✅ included sendOtp
import strings from '../components/strings';

const OTPScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { email } = route.params as { email: string };

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [isInvalidOTP, setIsInvalidOTP] = useState(false);
  const [resending, setResending] = useState(false);
  const otpTextInput = useRef<Array<TextInput | null>>([]);

  // ✅ OTP input handling
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

  // ✅ OTP verify
  const handleVerify = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length < 6) return;

    setIsLoading(true);
    try {
      const res = await verifyOtp({ email, otp: finalOtp });
      if (res.status === 200) {
        navigation.navigate('SetNewpasswordScreen', { email });
      } else {
        setIsInvalidOTP(true);
      }
    } catch (error: any) {
      setIsInvalidOTP(true);
      console.log('❌ OTP VERIFY ERROR:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Timer Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Resend OTP
  const handleResend = async () => {
    if (resending) return;

    setResending(true);
    try {
      const res = await sendOtp(email);
      if (res.status === 200) {
        setOtp(['', '', '', '', '', '']); // Clear old input
        setTimer(300); // Reset timer to 5 min
        console.log('✅ OTP resent successfully');
      } else {
        console.log('⚠️ Resend OTP failed');
      }
    } catch (error: any) {
      console.log('❌ Resend OTP Error:', error.response?.data || error.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.email}>{strings.OTPScreen.title}</Text>
        <Text style={styles.subtitle}>We sent a reset link to {email}</Text>
      </View>

      <View style={styles.OTPVerificationcontainer}>
        <View style={styles.optContainer}>
          {otp.map((val, index) => (
            <View
              key={index}
              style={[
                styles.firstContainer,
                {
                  borderColor: otp[index] ? 'teal' : '#ccc',
                  borderWidth: otp[index] ? 1 : 1.5,
                },
              ]}
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

        {isInvalidOTP && (
          <Text style={styles.errorText}>Invalid OTP. Please try again.</Text>
        )}
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
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
            onPress={handleVerify}
            disabled={otp.some((d) => d === '')}
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>

          <View style={styles.containerResend}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Haven’t got the email yet? </Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={resending || timer > 0}
              >
                <Text style={[styles.resendText, { opacity: resending || timer > 0 ? 0.4 : 1 }]}>
                  Resend email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  email: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(13),
    color: '#004D40',
    marginTop: scale(10),
    textAlign: 'center',
    fontWeight: '500',
  },
  OTPVerificationcontainer: {
    marginHorizontal: scale(40),
    alignItems: 'center',
  },
  optContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstContainer: {
    width: scale(45),
    height: scale(50),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    fontWeight: '600',
    marginTop: scale(8),
  },
  timerText: {
    color: 'red',
    fontSize: scale(12),
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginTop: scale(6),
  },
  buttonHeader: {
    width: scale(185),
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(24),
    alignSelf: 'center',
    marginTop: '5%',
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(19),
    fontWeight: '700',
  },
  containerResend: {
    alignItems: 'center',
    marginTop: '8%',
    alignSelf: 'center',
  },
  text: {
    fontSize: scale(11),
    color: '#014E3F',
    fontWeight: '500',
  },
  resendText: {
    fontSize: scale(11),
    fontWeight: '700',
    color: '#014E3F',
  },
});
