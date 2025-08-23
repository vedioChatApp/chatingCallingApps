import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import scale from './Scale';

// ✅ Google Sign-In
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// ✅ Facebook Login
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type Props = {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  onGroupPress?: () => void;
};

// 👇 WEB CLIENT ID from your google-services.json (client_type: 3)
const WEB_CLIENT_ID =
  '216488461888-8e1p5bjvtl2ptjv74bans6d3a3a4khk9.apps.googleusercontent.com';

const SocialLoginScreen: React.FC<Props> = ({
  onGooglePress,
  onFacebookPress,
  onGroupPress,
}) => {
  // Configure once (Google)
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      forceCodeForRefreshToken: false,
    });
  }, []);

  // Default Google handler
  const handleGooglePress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const result = await GoogleSignin.signIn();

      if (isSuccessResponse(result)) {
        const { idToken, accessToken, user } = result.data;
        console.log('Google OK:', { idToken, accessToken, user });
        Alert.alert('Google Sign-In', `Welcome ${user?.name || 'User'}!`);
      } else {
        console.log('Google sign-in cancelled or not successful');
      }
    } catch (e: any) {
      if (e?.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Update required', 'Please update Google Play services.');
        return;
      }
      console.warn('Google sign-in error:', e);
      Alert.alert('Error', e?.message || 'Google sign-in failed');
    }
  }, []);

  // ✅ Default Facebook handler
  const handleFacebookPress = useCallback(async () => {
    try {
      // open native FB login
      const res = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (res.isCancelled) {
        console.log('Facebook login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw new Error('No access token from Facebook');

      // OPTIONAL: basic profile fetch (name/email/photo)
      const url = `https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.type(large)&access_token=${data.accessToken.toString()}`;
      const r = await fetch(url);
      const fbUser = await r.json();

      console.log('Facebook OK:', { accessToken: data.accessToken.toString(), user: fbUser });
      Alert.alert('Facebook Login', `Welcome ${fbUser?.name || 'User'}!`);
    } catch (e: any) {
      console.warn('Facebook login error:', e);
      Alert.alert('Error', e?.message || 'Facebook login failed');
    }
  }, []);

  return (
    <View style={styles.googleHeader}>
      <TouchableOpacity onPress={onGooglePress ?? handleGooglePress}>
        <Image source={require('../assets/Google.png')} style={styles.google} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFacebookPress ?? handleFacebookPress}>
        <Image
          source={require('../assets/Facbook.png')} // NOTE: agar file "Facebook.png" ho to yahan path update karein
          style={styles.google}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onGroupPress}>
        <Image source={require('../assets/Group.png')} style={styles.google} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onGroupPress}>
        <Image source={require('../assets/instagram.png')} style={styles.google} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginScreen;

const styles = StyleSheet.create({
  google: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
  },
  googleHeader: {
    flexDirection: 'row',
    width: '55%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
});
