import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import scale from './Scale'; // 👈 tumhara scale util

type Props = {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  onGroupPress?: () => void;
};

const SocialLoginScreen: React.FC<Props> = ({
  onGooglePress,
  onFacebookPress,
  onGroupPress,
}) => {
  return (
    <View style={styles.googleHeader}>
      <TouchableOpacity onPress={onGooglePress}>
        <Image 
         source={require('../assets/Google.png')}
 style={styles.google} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onFacebookPress}>
        <Image 
         source={require('../assets/Facbook.png')}
        style={styles.google} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onGroupPress}>
        <Image 
        source={require('../assets/Group.png')}
         style={styles.google} />
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
    width: '45%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
});
