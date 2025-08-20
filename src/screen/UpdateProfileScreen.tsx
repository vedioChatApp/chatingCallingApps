import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import strings from '../components/strings';
import Images from './assets';
import scale from '../components/Scale';
import { RootStackParamList } from '../navigation/StackNavigator';

const PROFILE_IMAGE_KEY = '@user_profile_image'; // ✅ custom key

/* -------------------------  HEADER ------------------------- */
const UpdateProfileHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <TouchableOpacity
        style={styles.skipContainer}
        onPress={() => navigation.navigate('LanguageScreen')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.tittleHeader}>
        <Text style={styles.tittle}>{strings.UpdateProfileHeader.title}</Text>
        <Text style={styles.subtitle}>
          {strings.UpdateProfileHeader.subtitle}
        </Text>
      </View>
    </View>
  );
};

/* ---------------------- PHOTO PICKER ---------------------- */
const ProfilePictureUpload: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // ✅ Load image from AsyncStorage
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
        if (savedImage) setProfileImage(savedImage);
      } catch (error) {
        console.error('Error loading saved image:', error);
      }
    };
    loadImage();
  }, []);

  // ✅ Save image to AsyncStorage
  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async res => {
      if (res.assets?.length) {
        const uri = res.assets[0].uri ?? null;
        setProfileImage(uri);
        try {
          await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri ?? '');
        } catch (error) {
          console.error('Failed to save image:', error);
        }
      }
    });
  };

  return (
    <View style={styles.containerUpload}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image
          source={profileImage ? { uri: profileImage } : Images.userLogo}
          style={styles.avatar}
        />
        <Image source={Images.Camera} style={styles.cameraIcon} />
      </TouchableOpacity>
    </View>
  );
};

/* ----------------------- FOOTER --------------------------- */
const FooterNav: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.buttonLeft} style={styles.logoStyle} />
      </TouchableOpacity>

      <View style={styles.dots}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View
            key={i}
            style={i === 2 ? styles.dotActive : styles.dotes}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.circleButtonActive}
        onPress={() => navigation.navigate('HobbiesScreen')}>
        <Image source={Images.buttonRight} style={styles.logoStyleOne} />
      </TouchableOpacity>
    </View>
  );
};

/* ------------------------- SCREEN ------------------------- */
const UpdateProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.overlayBackground}>
      <UpdateProfileHeader />
      <ProfilePictureUpload />
      <FooterNav />
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;

/* ------------------------- STYLES ------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    justifyContent: 'space-between',
  },

  /* header */
  skipContainer: { alignSelf: 'flex-end', marginRight: scale(20) },
  skipText: { fontSize: scale(14), fontWeight: '600', color: '#00604D' },

  tittleHeader: { marginTop: '15%' },
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
    marginBottom: '15%',
  },

  /* avatar */
  containerUpload: { alignItems: 'center', marginTop: scale(50) },
  imageWrapper: { position: 'relative' },
  avatar: {
    width: scale(220),
    height: scale(220),
    borderRadius: scale(110),
    borderWidth: scale(3),
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: scale(15),
    right: scale(15),
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },

  /* footer & dots */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginTop: '40%',
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
  dotes: {
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

  /* icons */
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
    overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
}
});
