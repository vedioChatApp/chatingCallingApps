import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Images from './assets';
import strings from '../components/strings';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Scale from '../components/Scale';

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

const SocialLoginButtons = () => {
  return (
    <View style={styles.googleHeader}>
      <TouchableOpacity>
        <Image
          source={Images.Google}
          style={styles.google}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={Images.Facbook}
          style={styles.google}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={Images.Group}
          style={styles.google}
        />
      </TouchableOpacity>
    </View>
  );
};

const Splash = () => {
  return (
    <View style={styles.container}>
      <SplashHeader />
      <SplasForm />
      <SocialLogin />
      <SocialLoginButtons />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00BF9A',
     backgroundColor: '#1AC8B9',
    // opacity: 0.6,
  },
  logoStyle: {
    width: '105%',
    height: undefined,
    aspectRatio: 1.2,
    resizeMode: 'cover',
  },

  logoHeader: {
    marginHorizontal: scale(20),
    marginTop: "12%"
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
  }
});
