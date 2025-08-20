import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import scale from '../components/Scale';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';
import Images from './assets';
import { resetPassword } from '../api/auth'; // ✅ Importing API

const SetNewPasswordHeader = () => (
  <View style={styles.titleHeader}>
    <Text style={styles.title}>{strings.SetNewPasswordHeaderText.title}</Text>
    <Text style={styles.subtitle}>{strings.SetNewPasswordHeaderText.subtitle}</Text>
  </View>
);

const SetNewPasswordFields = () => {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  // ✅ Password validations
  const validateLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;

  const isPasswordValid =
    validateLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  const isConfirmPasswordValid = passwordsMatch;

const handleResetPassword = async () => {
  console.log('🔁 Reset password API called...');
  console.log('📨 Payload:', { email, newPassword: password });

  try {
    const response = await resetPassword({ email, newPassword: password });

    console.log('✅ API Raw Response:', response);
    console.log('📦 Response Data:', response?.data);
    console.log('📨 Response Status:', response?.status);

    // ✅ Success case
    if (response.status === 200 || response.status === 201) {
      console.log('🎉 Password reset successful, navigating to login');
      navigation.navigate('EmailAccountLogin');
    } else {
      console.warn('⚠️ API responded with unexpected status:', response.status);
    }
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Something went wrong';
    const url = error?.config?.url;

    console.log('❌ API Error:', {
      url,
      status,
      message,
      data: error?.response?.data,
    });
  }
};


  const renderRule = (condition: boolean, label: string) => (
    <View style={styles.ruleItem}>
      <Image
        source={Images.Checkyes}
        style={[styles.logoStyle, { tintColor: condition ? 'green' : '#ccc' }]}
      />
      <Text style={[styles.ruleText, { color: condition ? 'green' : '#444' }]}>{label}</Text>
    </View>
  );

  const showLabel = (isFocused: boolean, value: string) => isFocused || value !== '';

  return (
    <View style={styles.fieldsContainer}>
      <View style={styles.inputWrapper}>
        {showLabel(isPasswordFocused, password) && <Text style={styles.label}>Password</Text>}
        <TextInput
          style={styles.input}
          placeholder={!showLabel(isPasswordFocused, password) ? 'Password' : ''}
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
          placeholder={
            !showLabel(isConfirmPasswordFocused, confirmPassword) ? 'Confirm Password' : ''
          }
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#3F897B"
          secureTextEntry
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
        />
      </View>

      <TouchableOpacity
        onPress={handleResetPassword}
        style={[
          styles.buttonHeader,
          {
            backgroundColor: isPasswordValid && isConfirmPasswordValid ? '#00604D' : '#B0E1DA',
            borderWidth: isPasswordValid && isConfirmPasswordValid ? scale(3) : scale(1.5),
          },
        ]}
        disabled={!(isPasswordValid && isConfirmPasswordValid)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* ✅ Password Rules */}
      <View style={styles.rulesWrapper}>
        {renderRule(validateLength, 'Password must be at least 8 characters long.')}
        {renderRule(hasUppercase, 'Password must contain at least one upper case.')}
        {renderRule(hasLowercase, 'One lower case letter.')}
        {renderRule(hasNumber, 'Password must contain at least one number')}
        {renderRule(hasSpecialChar, 'Password must contain one special character')}
      </View>
    </View>
  );
};

const SetNewPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SetNewPasswordHeader />
      <SetNewPasswordFields />
    </SafeAreaView>
  );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    paddingHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    marginTop: scale(30),
    marginBottom: scale(15),
    alignItems: 'center',
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
    textAlign: 'center',
    fontWeight: '500',
  },
  fieldsContainer: {
    width: '100%',
    marginTop: scale(40),
  },
  inputWrapper: {
    marginBottom: scale(20),
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: scale(-18),
    left: scale(15),
    backgroundColor: '#1AC8B9',
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(19),
    fontWeight: '700',
  },
  rulesWrapper: {
    marginTop: scale(25),
    marginLeft: scale(10),
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(5),
    marginHorizontal: scale(50),
  },
  ruleText: {
    fontSize: scale(12),
    fontWeight: '500',
    marginLeft: scale(5),
  },
  logoStyle: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
  },
});
