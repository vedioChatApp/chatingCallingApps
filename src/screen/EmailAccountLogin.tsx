import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import strings from '../components/strings';
import Images from './assets';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/auth'; 

const LoginHeader = () => (
  <View style={styles.tittleHeader}>
    <Text style={styles.tittle}>{strings.login.loginButton}</Text>
    <Text style={styles.subtitle}>{strings.login.hadLineText}</Text>
  </View>
);

function LoginFields() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const showEmailLabel = isEmailFocused || email !== '';
  const showPasswordLabel = isPasswordFocused || password !== '';

const handleLogin = async () => {
  if (!email || !password) {
    setError('Email and password are required');
    return;
  }

  setLoading(true);
  setError('');
  try {
    const response = await loginUser({ email, password });
    await AsyncStorage.setItem('access_token', response.accessToken);
    navigation.navigate('Main', { screen: 'Home' });  
  } catch (err: any) {
    console.error('Login error:', err);
    setError(err?.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.containerField}>
      <View style={styles.floatingInputContainerEmail}>
        {showEmailLabel && <Text style={styles.floatingLabelEmail}>Enter your email*</Text>}
        <TextInput
          placeholder={!showEmailLabel ? 'Registered Email' : ''}
          placeholderTextColor="#3F897B"
          style={styles.input}
          value={email}
          autoCapitalize='none'
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
          onFocus={() => {
            setIsEmailFocused(true);
            if (error) setError('');
          }}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <View style={styles.floatingInputContainer}>
        {showPasswordLabel && <Text style={styles.floatingLabelEmail}>Password</Text>}
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder={!showPasswordLabel ? 'Password' : ''}
            placeholderTextColor="#3F897B"
            style={styles.inputsecond}
            secureTextEntry={secureText}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            onFocus={() => {
              setIsPasswordFocused(true);
              if (error) setError('');
            }}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              source={secureText ? Images.ClosedEyes : Images.OpenEyes}
              style={styles.eyesStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.forgotWrapper}
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
      >
        <Text style={styles.forgotText}>{strings.login.forgotPassword}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonHeader}
        // onPress={handleLogin}
        // disabled={loading}
        onPress={()=>navigation.navigate('Main', { screen: 'Home' })}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{strings.splesh.login}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.containerLoginScreen}>
      {/* Sign up Row */}
      <View style={styles.signUpWrapper}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('EmailAccountSignup')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <Image source={Images.RectangleFirst} style={styles.leftDivider} />
        <Text style={styles.dividerText}>{strings.login.loginwith}</Text>
        <Image source={Images.RectangleSecond} style={styles.rightDivider} />
      </View>
    </View>
  );
}

function SocialLogin() {
  return (
    <View style={styles.googleHeader}>
      <TouchableOpacity>
        <Image source={Images.Google} style={styles.google} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Images.Facbook} style={styles.google} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Images.Group} style={styles.google} />
      </TouchableOpacity>
    </View>
  );
}

const EmailAccountLogin = () => {
  return (
    <SafeAreaView style={styles.container}>
<View style={styles.overlayBackground}>
      <LoginHeader />
      <LoginFields />
      <LoginScreen />
      <SocialLogin />
      </View>
    </SafeAreaView>
    
  );
};

export default EmailAccountLogin;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    // backgroundColor: '#00BF9A',
  },
  tittleHeader: {
    marginTop: "35%"
  },
  tittle: {
    fontSize: scale(23),
    fontWeight: "800",
    color: '#00604D',
    textAlign: "center"
  },
  subtitle: {
    fontSize: scale(15),
    color: ' #373737',
    marginTop: scale(10),
    textAlign: "center",
    fontWeight: "500",
    marginBottom: "15%"
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 17,
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#00604D',
    fontSize: scale(12),
    fontWeight: "500",
    marginTop: scale(10)
  },
  containerLoginScreen: {
  
  },
  buttonHeader: {
    width: "57%",
    height: scale(50),
    backgroundColor: "#00604D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(24),
    alignSelf: "center",
    marginTop: scale(10),
    borderColor: "#FFFFFF",
    borderWidth: scale(3)
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scale(19),
    fontWeight: "700"
  },
  signUpText: {
    // marginTop: 15,
      color: ' #00604D',
      fontFamily: 'Outfit',
      fontSize: scale(12),
      fontWeight: '500',
  },
  link: {
   color: ' #00604D',
      fontFamily: 'Outfit',
      fontSize: scale(12),
      fontWeight: '600',
    textDecorationLine: 'underline',
  },
  orText: {
    color: '#fff',
  },
  ontainerSocialLogin: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: "red"
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  signUpWrapper: {
    marginTop:"8%",
    alignItems: 'center',
    flexDirection:"row",
width:"48%",
alignSelf:"center"
  },
  floatingInputContainer: {
//  marginHorizontal: scale(40),
    // marginTop: scale(10),
  },
  google: {
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
  },
  googleHeader: {
    flexDirection: "row",
    width: "45%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: "10%"
  },
   dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: "10%",
      width:"90%",
      alignSelf:"center"
    },
    leftDivider: {
      width: scale(132),
      height: scale(3),
    },
    dividerText: {
      color: ' #00604D',
      fontFamily: 'Outfit',
      fontSize: scale(12),
      fontWeight: '500',
      textAlign: 'center',
    },

     rightDivider: {
        width: scale(132),
        height: scale(3),
      },
      containerField: {
    marginHorizontal: scale(40),
  },
  input: {
    backgroundColor: "#FFFFFF57",
    borderRadius: scale(25),
    paddingHorizontal: scale(15),
    color: '#3F897B',
    fontSize: scale(16),
    fontWeight: "400",
    borderColor: '#FFFFFF',
    borderWidth: scale(1.5),
    width: "100%",
    height: scale(45),
    marginTop: scale(20)
  },
  inputsecond: {
    color: '#3F897B',
    fontSize: scale(16),
    fontWeight: "400",
    width: "80%",
  },
  passwordWrapper: {
    backgroundColor: "#FFFFFF57",
    borderRadius: scale(25),
    padding: scale(15),
    borderColor: '#FFFFFF',
    borderWidth: scale(1.5),
    width: "100%",
    height: scale(45),
    marginTop: scale(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  eyesStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain"
  },
  floatingInputContainerEmail: {
    marginTop: scale(15),
  },
  floatingLabelEmail: {
    position: 'absolute',
    left: scale(15),
    paddingHorizontal: scale(4),
    fontSize: scale(13),
    color: '#3F897B',
    zIndex: 2,
    fontWeight: '500',
  },
  error:{ 
    color: 'red', 
    marginTop: scale(5) ,
    marginLeft:scale(15),
  },
  rulesWrapper: {
  marginTop: scale(25),
  marginLeft: scale(10),
},
ruleItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: scale(5),
},
ruleText: {
  fontSize: scale(12),
  fontWeight: '500',
},
overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
}
})