import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendOtp } from '../api/auth';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false); // 🔄 loader state

  const handleEmailChange = (input: string) => {
    setEmail(input);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(input));
  };

  const showLabel = isFocused || email !== '';

  const handleSendOtp = async () => {
    setLoading(true); // 🟢 Start loader
    try {
      const data = await sendOtp(email);
      await AsyncStorage.setItem('user_email', email);
      navigation.navigate('OTPScreen', { email });
    } catch (error: any) {
      if (error.response) {
        console.log('❌ API Error:', error.response.status, error.response.data);
      } else {
        console.log('❌ Network Error:', error.message);
      }
    } finally {
      setLoading(false); // 🔴 Stop loader
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>Enter your email to reset the password</Text>
      </View>

      <View style={styles.inputWrapper}>
        {showLabel && <Text style={styles.label}>Enter your email*</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={!showLabel ? 'Enter your email*' : ''}
            value={email}
            autoCapitalize='none'
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            placeholderTextColor="#3F897B"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.buttonHeader,
          {
            backgroundColor: isEmailValid ? '#00604D' : '#B0E1DA',
            borderWidth: isEmailValid ? scale(3) : scale(1.5),
            opacity: loading ? 0.6 : 1,
          },
        ]}
        onPress={handleSendOtp}
        disabled={!isEmailValid || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            {strings.ForgotPasswordScreen.resetPassword}
          </Text>
        )}
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  
    paddingHorizontal: scale(30),
  },
   overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
    justifyContent: 'center',
    alignItems: 'center',
},
  header: {
    marginBottom: scale(30),
  },
  title: {
    fontSize: scale(23),
    fontWeight: '800',
    color: '#00604D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(15),
    color: '#373737',
    marginTop: scale(10),
    fontWeight: '500',
    textAlign: 'center',
  },
  inputWrapper: {
    width: '87%',
    position: 'relative',
  },
  label: {
    fontSize: scale(13),
    color: '#3F897B',
    fontWeight: '500',
    marginBottom: scale(4),
    marginHorizontal: scale(40),
    position: 'absolute',
    top: scale(-18),
    left: scale(15),
    // backgroundColor: '#1AC8B9',
    paddingHorizontal: scale(4),
    zIndex: 2,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF57',
    borderRadius: scale(25),
    borderColor: '#FFFFFF',
    borderWidth: scale(1.5),
    paddingHorizontal: scale(15),
    height: scale(45),
    justifyContent: 'center',
    marginHorizontal: scale(40),
  },
  input: {
    fontSize: scale(16),
    color: '#3F897B',
    fontWeight: '400',
    height: scale(45),
  },
  buttonHeader: {
    width: '45%',
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(24),
    alignSelf: 'center',
    marginTop: '12%',
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(19),
    fontWeight: '700',
  },
});
