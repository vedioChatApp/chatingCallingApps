import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import strings from '../components/strings';
import Images from './assets';
import scale from '../components/Scale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGenderList } from '../api/auth';

// ✅ Safe import (default + named). If bundler ever strips named export,
// having default import ensures module loads.
import DateTimePicker, {
  DateTimePickerAndroid as RNDateTimePickerAndroid, // alias to avoid undefined name
} from '@react-native-community/datetimepicker';

/* ---------- Header ---------- */
const LoginHeader = () => (
  <View style={styles.tittleHeader}>
    <Text style={styles.tittle}>{strings.signup.title}</Text>
    <Text style={styles.subtitle}>{strings.signup.subtitle}</Text>
  </View>
);

/* ---------- Fields ---------- */
const SignupFields = ({
  name, setName,
  email, setEmail,
  phone, setPhone,
  gender, setGender,
  dob, setDob,
}: {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  gender: string; setGender: (v: string) => void;
  dob: string; setDob: (v: string) => void;
}) => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);
  const [isDobFocused, setIsDobFocused] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const res = await getGenderList();
        const options = res?.data?.map((item: { id: number; name: string }) => item.name);
        setGenderOptions(options || []);
      } catch (error) {
        console.error('Error fetching gender list:', error);
      }
    };
    fetchGenders();
  }, []);

  const validateEmail = (txt: string) => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txt);
    setEmailError(txt && !ok ? 'Please enter a valid email' : '');
  };
  const selectGender = (g: string) => {
    setGender(g);
    setShowGenderDropdown(false);
  };

  // ✅ Android ke liye native picker, warna modal – with guard (no crash)
  const openDobPicker = () => {
    if (
      Platform.OS === 'android' &&
      RNDateTimePickerAndroid &&
      typeof RNDateTimePickerAndroid.open === 'function'
    ) {
      const initial = dob ? moment(dob, 'DD/MM/YYYY').toDate() : new Date();
      RNDateTimePickerAndroid.open({
        value: initial,
        onChange: (_e, selectedDate) => {
          if (selectedDate) {
            setDob(moment(selectedDate).format('DD/MM/YYYY'));
          }
        },
        mode: 'date',
        is24Hour: true,
        maximumDate: new Date(),
      });
    } else {
      // Fallback (iOS or if module not available yet)
      setDatePickerVisibility(true);
    }
  };

  return (
    <View>
      {/* NAME */}
      <View style={styles.inputWrapper}>
        {(isNameFocused || name) && <Text style={styles.label}>Enter Your Name</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={isNameFocused || name ? '' : 'Full Name'}
            placeholderTextColor="#3F897B"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
          />
        </View>
      </View>

      {/* EMAIL */}
      <View style={styles.inputWrapper}>
        {(isEmailFocused || email) && <Text style={styles.label}>Enter Your Email*</Text>}
        <View style={[styles.inputContainer, emailError && styles.errorBorder]}>
          <TextInput
            style={styles.input}
            placeholder={isEmailFocused || email ? '' : 'Email*'}
            placeholderTextColor="#3F897B"
            value={email}
            onChangeText={(t) => { setEmail(t); validateEmail(t); }}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            keyboardType="email-address"
          />
        </View>
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>

      {/* PHONE (optional) */}
      <View style={styles.inputWrapper}>
        {(isPhoneFocused || phone) && <Text style={styles.label}>Enter Your Phone Number</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={isPhoneFocused || phone ? '' : 'Phone Number (Optional)'}
            placeholderTextColor="#3F897B"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => setIsPhoneFocused(true)}
            onBlur={() => setIsPhoneFocused(false)}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* GENDER */}
      <View style={styles.inputWrapper}>
        {(isGenderFocused || gender) && <Text style={styles.label}>Select Your Gender</Text>}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => { setShowGenderDropdown(!showGenderDropdown); setIsGenderFocused(true); }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={isGenderFocused || gender ? '' : 'Gender'}
              placeholderTextColor="#3F897B"
              value={gender}
              editable={false}
            />
            <Image source={Images.Polygon} style={styles.dropDownStyle} />
          </View>
        </TouchableOpacity>
        {showGenderDropdown && (
          <View style={[styles.dropdownContainer, { top: scale(65) }]}>
            <FlatList
              data={genderOptions}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectGender(item)}>
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* DOB */}
      <View style={styles.inputWrapper}>
        {(isDobFocused || dob) && <Text style={styles.label}>Enter Your Date of Birth</Text>}
        <TouchableOpacity activeOpacity={0.9} onPress={openDobPicker}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={isDobFocused || dob ? '' : 'Date of Birth (DD/MM/YYYY)'}
              placeholderTextColor="#3F897B"
              value={dob}
              editable={false}
              onFocus={() => setIsDobFocused(true)}
              onBlur={() => setIsDobFocused(false)}
            />
            <Image source={Images.calender} style={styles.dropDownStyle} />
          </View>
        </TouchableOpacity>
      </View>

      {/* iOS & Fallback modal */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(d) => { setDob(moment(d).format('DD/MM/YYYY')); setDatePickerVisibility(false); }}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />
    </View>
  );
};

/* ---------- Secret Code & Footer ---------- */
const SecretCodeSection = ({
  allValid, payload
}: {
  allValid: boolean;
  payload: { name: string; email: string; phone: string; gender: string; dob: string; };
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [secretCode, setSecretCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const secretOk = !!secretCode.trim();
  const allowNext = allValid && secretOk;

  const saveAndNext = async () => {
    if (!allowNext) return;
    try {
      await AsyncStorage.multiSet([
        ['signup_name', payload.name],
        ['signup_email', payload.email],
        ['signup_phone', payload.phone],
        ['signup_gender', payload.gender],
        ['signup_dob', payload.dob],
        ['signup_secret', secretCode],
      ]);
      navigation.navigate('SetPasswordScreen');
    } catch (e) {
      console.error('❌ Error saving signup data:', e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrappers}>
        {(isFocused || secretCode) && <Text style={styles.labels}>Input Secret Code</Text>}
        <View style={styles.inputContainers}>
          <TextInput
            style={styles.inputs}
            placeholder={isFocused || secretCode ? '' : 'Input Secret Code'}
            placeholderTextColor="#3F897B"
            value={secretCode}
            onChangeText={setSecretCode}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.buttonLeft} style={styles.logoStyle} />
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={[styles.circleButtonActive, { opacity: allowNext ? 1 : 0.5 }]}
          disabled={!allowNext}
          onPress={saveAndNext}>
          <Image source={Images.buttonRight} style={styles.logoStyleOne} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ---------- Main Screen ---------- */
const EmailAccountSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const allRequiredFilled = !!name && emailValid && !!gender && !!dob;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <LoginHeader />

          <SignupFields
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            phone={phone} setPhone={setPhone}
            gender={gender} setGender={setGender}
            dob={dob} setDob={setDob}
          />

          <SecretCodeSection
            allValid={allRequiredFilled}
            payload={{ name, email, phone, gender, dob }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmailAccountSignup;

/* ---------- Styles (unchanged) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1AC8B9', justifyContent: 'space-between' },
  tittleHeader: { marginTop: '20%' },
  overlayBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
  },
  tittle: { fontSize: scale(23), fontWeight: '800', color: '#00604D', textAlign: 'center' },
  subtitle: {
    fontSize: scale(15), color: '#373737', marginTop: scale(10),
    textAlign: 'center', fontWeight: '500', marginBottom: '10%'
  },

  inputWrapper: { marginHorizontal: scale(40), marginTop: scale(10) },
  label: { fontSize: scale(13), color: '#3F897B', fontWeight: '500', marginLeft: scale(15) },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF57',
    borderRadius: scale(25), borderColor: '#FFFFFF', borderWidth: scale(1.5),
    paddingHorizontal: scale(15), height: scale(45), justifyContent: 'space-between'
  },
  input: { fontSize: scale(16), color: '#3F897B', fontWeight: '400' },

  dropDownStyle: { width: scale(15), height: scale(15), resizeMode: 'contain' },
  dropdownContainer: {
    position: 'absolute', backgroundColor: '#1AC8B9', borderWidth: 1, borderColor: '#ddd',
    borderRadius: scale(10), top: scale(-120), left: scale(40), right: scale(40),
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, shadowRadius: 1.41, zIndex: 999
  },
  dropdownItem: { paddingVertical: scale(10), paddingHorizontal: scale(15), borderBottomColor: '#eee', borderBottomWidth: 1 },
  dropdownItemText: { fontSize: scale(15), color: '#3F897B' },

  wrapper: { alignItems: 'center', justifyContent: 'center', marginHorizontal: scale(40) },
  inputWrappers: { marginBottom: scale(40), width: '100%', marginTop: '25%' },
  labels: { fontSize: scale(13), color: '#3F897B', fontWeight: '500', marginLeft: scale(15) },
  inputContainers: {
    backgroundColor: '#FFFFFF57', borderRadius: scale(25), borderColor: '#FFFFFF',
    borderWidth: scale(1.5), paddingHorizontal: scale(15), height: scale(45), justifyContent: 'center'
  },
  inputs: { fontSize: scale(16), color: '#3F897B', fontWeight: '400' },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '20%' },
  circleButtonActive: {
    width: scale(55), height: scale(55), borderRadius: scale(27.5),
    backgroundColor: '#1AC8B9', justifyContent: 'center', alignItems: 'center'
  },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#B0E1DA', marginHorizontal: scale(5) },
  dotActive: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#FFFFFF', marginHorizontal: scale(5) },

  logoStyle: { width: scale(80), height: scale(80), resizeMode: 'contain' },
  logoStyleOne: { width: scale(80), height: scale(80), resizeMode: 'contain' },

  errorBorder: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: scale(11), marginLeft: scale(15), marginTop: scale(4) },
});
