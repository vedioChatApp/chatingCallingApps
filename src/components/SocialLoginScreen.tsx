import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import scale from './Scale';

// ✅ Google Sign-In (minimal additions)
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
  // Configure once
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      forceCodeForRefreshToken: false,
    });
  }, []);

  // Default Google handler (used only if onGooglePress not provided)
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

  return (
    <View style={styles.googleHeader}>
      <TouchableOpacity onPress={onGooglePress ?? handleGooglePress}>
        <Image
          source={require('../assets/Google.png')}
          style={styles.google}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFacebookPress}>
        <Image
          source={require('../assets/Facbook.png')} // NOTE: if filename actually "Facebook.png", update path
          style={styles.google}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onGroupPress}>
        <Image
          source={require('../assets/Group.png')}
          style={styles.google}
        />
      </TouchableOpacity>
         <TouchableOpacity onPress={onGroupPress}>
        <Image
          source={require('../assets/instagram.png')}
          style={styles.google}
        />
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
