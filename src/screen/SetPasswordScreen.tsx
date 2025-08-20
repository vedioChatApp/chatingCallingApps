import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Linking, Modal } from 'react-native';
import React, { useState } from 'react';
import strings from '../components/strings';
import Images from './assets';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => (
  <View style={styles.tittleHeader}>
    <Text style={styles.tittle}>{strings.SetPasswordScreen.title}</Text>
    <Text style={styles.subtitle}>{strings.SetPasswordScreen.subtitle}</Text>
  </View>
);


const SetPasswordFields = ({
   password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  checked,
  setChecked,
  onContinuePress,
}: {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  checked: boolean;
  setChecked: (val: boolean) => void;
  onContinuePress: () => void;
}) => {
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);


  const showPasswordLabel = isPasswordFocused || password !== '';
  const showConfirmLabel = isConfirmFocused || confirmPassword !== '';

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = confirmPassword === password && password !== '';
  const isContinueEnabled = allValid && passwordsMatch && checked;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openDialer = () => {
    if (isContinueEnabled) {
      navigation.navigate('UpdateProfileScreen');
    }
  };

  const renderCheckItem = (text, valid) => (
    <View style={styles.headerAll}>
      <Image
        source={valid ? Images.Checkyes : Images.materialError}
        style={{
          width: scale(14),
          height: scale(14),
          tintColor: password === '' ? '#B0B0B0' : valid ? '#00604D' : '#FF4D4F',
          marginRight: scale(6),
        }}
      />
      <Text style={{ fontSize: scale(10), color: password === '' ? '#B0B0B0' : valid ? '#00604D' : '#FF4D4F' }}>{text}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.floatingInputContainer}>
        {showPasswordLabel && <Text style={styles.floatingLabel}>Password</Text>}
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder={!showPasswordLabel ? 'Password' : ''}
            placeholderTextColor="#3F897B"
            style={styles.inputsecond}
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image source={secureText ? Images.ClosedEyes : Images.OpenEyes} style={styles.eyesStyle} />
          </TouchableOpacity>
        </View>
        {password !== '' && (
          <Image
            source={allValid ? Images.Checkyes : Images.materialError}
            style={{ ...styles.materialErrorStyle, tintColor: allValid ? '#00604D' : '#FF4D4F' }}
          />
        )}
      </View>

      <View style={styles.floatingInputContainer}>
        {showConfirmLabel && <Text style={styles.floatingLabel}>Confirm Password</Text>}
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder={!showConfirmLabel ? 'Confirm Password' : ''}
            placeholderTextColor="#3F897B"
            style={styles.inputsecond}
            secureTextEntry={secureTextConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setIsConfirmFocused(true)}
            onBlur={() => setIsConfirmFocused(false)}
          />
          <TouchableOpacity onPress={() => setSecureTextConfirm(!secureTextConfirm)}>
            <Image source={secureTextConfirm ? Images.ClosedEyes : Images.OpenEyes} style={styles.eyesStyle} />
          </TouchableOpacity>
        </View>
        {confirmPassword !== '' && (
          <Image
            source={passwordsMatch ? Images.Checkyes : Images.materialError}
            style={{ ...styles.materialErrorStyle, tintColor: passwordsMatch ? '#00604D' : '#FF4D4F' }}
          />
        )}
      </View>

      <View>
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <Image source={checked ? Images.Check : Images.Uncheck} style={styles.checkboxIcon} />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By signing up you agree to our{' '}
            <Text style={styles.link}>Terms & Conditions</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
          <TouchableOpacity
          style={[styles.buttonHeader, { opacity: isContinueEnabled ? 1 : 0.5 }]}
          // disabled={!isContinueEnabled}
          // onPress={openDialer}
              disabled={!isContinueEnabled}
        onPress={onContinuePress}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      <View style={styles.passwordHader}>
        {renderCheckItem('Password must be at least 8 characters long', passwordChecks.length)}
        {renderCheckItem('Password must contain at least one upper case', passwordChecks.upper)}
        {renderCheckItem('One lower case letter', passwordChecks.lower)}
        {renderCheckItem('Password must contain at least one number', passwordChecks.digit)}
        {renderCheckItem('Password must contain one special character', passwordChecks.special)}
      </View>
    </>
  );
};

const SecretCodeSection = ({
  password,
  isValid
}: {
  password: string;
  isValid: boolean;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleContinue = async () => {
    if (!isValid) return;
    try {
      await AsyncStorage.setItem('USER_PASSWORD', password);
      navigation.navigate('UpdateProfileScreen');
    } catch (error) {
      console.error('Error saving password:', error);
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.buttonLeft} style={styles.logoStyle} />
      </TouchableOpacity>
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <TouchableOpacity
        style={styles.circleButtonActive}
        onPress={handleContinue}
        disabled={!isValid}
      >
        <Image source={Images.buttonRight} style={styles.logoStyleOne} />
      </TouchableOpacity>
    </View>
  );
};

const SetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = confirmPassword === password && password !== '';
  const isContinueEnabled = allValid && passwordsMatch && checked;


  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('USER_PASSWORD', password);
      setModalVisible(true);
    } catch (error) {
      console.error('Error saving password:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground}>
      <View>
        <Header />
        <SetPasswordFields
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          checked={checked}
          setChecked={setChecked}
          onContinuePress={handleContinue}
        />
      </View>
      <View>
        <SecretCodeSection password={password} isValid={isContinueEnabled} />
      </View>
          {/* Success Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: scale(50) }}>👍</Text>
            <Text style={styles.successTitle}>Woo Hoo!</Text>
            <Text style={styles.successMessage}>
              Your password has been updated successfully!
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    justifyContent: "space-between"
  },
  tittleHeader: {
    marginTop: '30%',
  },
  tittle: {
    fontSize: scale(23),
    fontWeight: '800',
    color: '#00604D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(15),
    color: '#373737',
    marginTop: scale(10),
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '5%',
  },
  floatingInputContainer: {
    position: 'relative',
    marginHorizontal: scale(40),
    marginTop: scale(20),  // Adding space between fields
    flexDirection: "row",
    alignItems: "center"
  },
  floatingLabel: {
    position: 'absolute',
    top: scale(-8),
    left: scale(15),
    // backgroundColor: '#1AC8B9',
    paddingHorizontal: scale(4),
    fontSize: scale(13),
    color: '#3F897B',
    fontWeight: '500',
  },
  passwordWrapper: {
    backgroundColor: '#FFFFFF57',
    borderRadius: scale(25),
    padding: scale(15),
    borderColor: '#FFFFFF',
    borderWidth: scale(1.5),
    width: '100%',
    height: scale(45),
    marginTop: scale(10),  // Adjusted margin between inputs
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  inputsecond: {
    color: '#3F897B',
    fontSize: scale(16),
    fontWeight: '400',
    width: '80%',

  },
  eyesStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  materialErrorStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginTop: scale(10),
    marginLeft: scale(3),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: scale(40),
    marginTop: scale(20),
  },
  checkboxIcon: {
    width: scale(24),
    height: scale(24),
    marginTop: scale(3),
    marginRight: scale(8),
    resizeMode: 'contain',
  },
  termsText: {
    color: '#004C3F',
    fontSize: scale(11),
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  link: {
    color: '#007A3E',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    // marginTop: '20%',
    marginBottom: "5%"
  },
  circleButtonActive: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(27.5),
    backgroundColor: '#1AC8B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#B0E1DA',
    marginHorizontal: scale(5),
  },
  dotActive: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#FFFFFF',
    marginHorizontal: scale(5),
  },
  logoStyle: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'contain',
  },
  logoStyleOne: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'contain',
  },
  buttonHeader: {
    width: "60%",
    height: scale(50),
    backgroundColor: "#00604D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(24),
    alignSelf: "center",
    marginTop: "10%",
    borderColor: "#FFFFFF",
    borderWidth: scale(3)
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(19),
    fontWeight: "700"
  },
  passwordHader: {
    marginTop: "10%",
    width: "70%",
    alignSelf: "center",
    marginLeft: "11%",
  },
  headerAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(4)
  },
   modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    height:"45%",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    alignItems: 'center',
    padding: scale(20),
    paddingBottom: scale(40),
  },
  successTitle: {
    fontSize: scale(22),
    fontWeight: '700',
    color: '#004C3F',
    marginTop: scale(10),
  },
  successMessage: {
    fontSize: scale(14),
    color: '#3F897B',
    marginTop: scale(10),
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#00604D',
    marginTop: scale(20),
    paddingVertical: scale(12),
    paddingHorizontal: scale(60),
    borderRadius: scale(30),
  },
  doneButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
  },
  overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
}
});