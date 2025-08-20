import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Images from './assets';
import strings from '../components/strings';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Scale from '../components/Scale';
import SocialLoginScreen from '../components/SocialLoginScreen';

const SplashHeader = () => {
  return (
    <View style={styles.logoHeader}>
      <Image
        source={Images.logo}
        style={styles.logoStyle}
      />
    </View>
  );
};

const SplasForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigateToEmailAccountLogin = () => {
    navigation.navigate('EmailAccountLogin');
  };

  const navigateToSignup = () => {
    navigation.navigate('EmailAccountSignup');
  };

  return (
    <View style={styles.formHeader}>
      <Text style={styles.headLineText}>{strings.splesh.subtitle}</Text>

      <TouchableOpacity style={styles.buttonHeader} onPress={navigateToEmailAccountLogin}>
        <Text style={styles.buttonText}>{strings.splesh.login}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonHeader} onPress={navigateToSignup}>
        <Text style={styles.buttonText}>{strings.splesh.signUp}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SocialLogin = () => {
  return (
    <View style={styles.dividerContainer}>
      <Image
        source={Images.RectangleFirst}
        style={styles.leftDivider}
      />
      <Text style={styles.dividerText}>{strings.login.signupHeadingText}</Text>
      <Image
        source={Images.RectangleSecond}
        style={styles.rightDivider}
      />
    </View>
  );
};

const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlayBackground}>
      <SplashHeader />
      <SplasForm />
      <SocialLogin />
      <SocialLoginScreen/>
      </View>
    </View>
  );
};

export default Splash;

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
  logoStyle: {
    width: '105%',
    height: undefined,
    aspectRatio: 1.2,
    resizeMode: 'cover',
  },

  logoHeader: {
    marginHorizontal: scale(20),
    // marginTop: "12%"
  },
  formHeader: {
    width: "85%",
    // height: "30%",
    backgroundColor: "#FFFFFF57",
    alignSelf: "center",
    borderRadius: scale(32),
    paddingHorizontal: scale(15),
    borderColor: "#FFFFFF",
    borderWidth: scale(2),
    paddingBottom:scale(40)
  },
  headLineText: {
    fontSize: scale(23),
    fontWeight: "700",
    textAlign: "center",
    color: "#00604D",
    marginTop: "15%",
    marginHorizontal: scale(20),
    marginBottom: scale(15)
  },
  buttonHeader: {
    width: "60%",
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
  dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: "10%",
      width:"90%",
      alignSelf:"center"
  },
  leftDivider: {
    width: Scale(132),
    height: Scale(3),
  },
  dividerText: {
    color: ' #00604D',
    fontFamily: 'Outfit',
    fontSize: Scale(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  rightDivider: {
    width: Scale(132),
    height: Scale(3),
  },
});
