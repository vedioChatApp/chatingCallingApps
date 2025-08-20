import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity, Platform, ToastAndroid, Alert, Share, Linking } from 'react-native';
import scale from '../components/Scale';
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';
import Clipboard from '@react-native-clipboard/clipboard';
import Scale from '../components/Scale';

const UserReferandEarnHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const UserReferandEarnMainContainer = () => {
  const [isCopying, setIsCopying] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  // ✅ Referral code/link
  const referralCode = 'abc20220320';
  const referralLink = `https://joynt.example/ref?code=${referralCode}`;
  const shareMessage = `Use my JOYNT referral code ${referralCode} to join: ${referralLink}`;

  const onCopy = useCallback(() => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      Clipboard.setString(referralCode);
      if (Platform.OS === 'android') ToastAndroid.show('Copied', ToastAndroid.SHORT);
      else Alert.alert('Copied');
    } finally {
      setIsCopying(false);
    }
  }, [isCopying, referralCode]);

  const openSheet = () => setSheetVisible(true);
  const closeSheet = () => setSheetVisible(false);

  // --- share handlers ---
  const shareGeneric = async () => {
    try { await Share.share({ message: shareMessage }); } catch {}
    closeSheet();
  };
  const shareWhatsApp = async () => {
    try {
      const url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else await Share.share({ message: shareMessage });
    } catch {}
    closeSheet();
  };
  const shareMail = async () => {
    try {
      const url = `mailto:?subject=${encodeURIComponent('Join JOYNT with my code')}&body=${encodeURIComponent(shareMessage)}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else await Share.share({ message: shareMessage });
    } catch {}
    closeSheet();
  };
  const copyLink = () => {
    Clipboard.setString(referralLink);
    if (Platform.OS === 'android') ToastAndroid.show('Link copied', ToastAndroid.SHORT);
    else Alert.alert('Link copied');
    closeSheet();
  };

  return (
    <View style={styles.centerDataHeade}>
      <Image source={require('../assets/TopBanner.png')} style={styles.banner} />
      <View>
        <Image source={require('../assets/FrameIcon.png')} style={styles.FrameIcon} />
      </View>

      <View style={styles.reffHederMain}>
        <View style={styles.FrameIconHeader}>
          <Text style={styles.reffTextCode}>{referralCode}</Text>

          {/* Copy referral code */}
          <TouchableOpacity onPress={onCopy} activeOpacity={0.8} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image source={require('../assets/proiconscopy.png')} style={styles.proiconscopy} />
          </TouchableOpacity>
        </View>

        {/* REFER -> open bottom sheet */}
        <TouchableOpacity style={styles.reffHeder} onPress={openSheet} activeOpacity={0.9}>
          <Text style={styles.reffText}>{strings.UserReferandEarn.rEFER}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.description}>
        <View style={styles.hedaerFram}>
          <Image source={require('../assets/FrameOne.png')} style={styles.FrameOne} />
          <Text style={styles.frameText}>Invite your Friend to install the app with the{"\n"}link</Text>
        </View>
        <Image source={require('../assets/GroupFram.png')} style={styles.FrameOne} />

        <View style={styles.hedaerFram}>
          <Image source={require('../assets/FrameTwo.png')} style={styles.FrameOne} />
          <Text style={styles.frameText}>Your friend tops up or unlocks Premium</Text>
        </View>
        <Image source={require('../assets/FrameTwos.png')} style={styles.FrameOne} />

        <View style={styles.hedaerFram}>
          <Image source={require('../assets/FrameThree.png')} style={styles.FrameOne} />
          <Text style={styles.frameText}>You get ₹150 on every transaction over  ₹500</Text>
        </View>
      </View>

      {/* ----- Bottom Sheet (share) ----- */}
      <Modal transparent visible={sheetVisible} animationType="fade" onRequestClose={closeSheet}>
        <Pressable style={styles.sheetBackdrop} onPress={closeSheet} />
        <View style={styles.sheetWrap}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Refer and Earn</Text>

            <View style={styles.shareRow}>
              {/* Facebook -> generic share (fb sdk not required) */}
              <TouchableOpacity style={styles.shareItem} onPress={shareGeneric} activeOpacity={0.9}>
                <View style={styles.shareIconWrap}>
                  <Image source={require('../assets/FrameThree.png')} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareLabel}>Facebook</Text>
              </TouchableOpacity>

              {/* WhatsApp */}
              <TouchableOpacity style={styles.shareItem} onPress={shareWhatsApp} activeOpacity={0.9}>
                <View style={styles.shareIconWrap}>
                  <Image source={require('../assets/FrameThree.png')} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareLabel}>WhatsApp</Text>
              </TouchableOpacity>

              {/* Mail */}
              <TouchableOpacity style={styles.shareItem} onPress={shareMail} activeOpacity={0.9}>
                <View style={styles.shareIconWrap}>
                  <Image source={require('../assets/FrameThree.png')} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareLabel}>Mail</Text>
              </TouchableOpacity>

              {/* Link */}
              <TouchableOpacity style={styles.shareItem} onPress={copyLink} activeOpacity={0.9}>
                <View style={styles.shareIconWrap}>
                  <Image source={require('../assets/FrameThree.png')} style={styles.shareIcon} />
                </View>
                <Text style={styles.shareLabel}>Link</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={closeSheet} style={styles.sheetClose} activeOpacity={0.9}>
              <Text style={styles.sheetCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const UserReferandEarn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground} >
      <UserReferandEarnHeader />
      <UserReferandEarnMainContainer />
      </View> 
    </SafeAreaView>
  )
}

export default UserReferandEarn

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
  centerDataHeade: {
    marginHorizontal: scale(15)
  },
  personalDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginHorizontal: scale(25),
    marginTop: scale(20),
  },
  backIconHeaders: {
    width: "100%",
    marginTop: '5%',
    borderRadius: scale(15),
    borderColor: '#FFFF',
    borderWidth: scale(2),
  },
  backIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#00604D',
    marginLeft: scale(20),
  },
  backButton: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  banner: {
    width: "100%",
    height: scale(198),
    resizeMode: "stretch",
    marginVertical: scale(15)
  },
  FrameIcon: {
    width: "50%",
    height: scale(40),
    resizeMode: 'contain',
    position: "absolute",
    bottom: "0%",
    alignSelf: "center"
  },
  FrameIconHeader: {
    width: "66%",
    height: scale(53.76),
    borderRadius: scale(24),
    borderWidth: scale(1),
    borderColor: " rgba(255, 255, 255, 1)",
    backgroundColor: "#ADEBDC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(15)
  },
  proiconscopy: {
    width: scale(24),
    height: scale(24),
    resizeMode: "contain"
  },
  reffHeder: {
    width: "30%",
    height: scale(53.76),
    borderRadius: scale(24),
    borderWidth: scale(1),
    borderColor: " rgba(255, 255, 255, 1)",
    backgroundColor: "#00604DD9",
    alignItems: "center",
    justifyContent: "center"
  },
  reffHederMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: scale(10)
  },
  reffText: {
    fontSize: scale(14),
    fontWeight: "800",
    color: "#FFFFFF"
  },
  reffTextCode: {
    fontSize: scale(14),
    fontWeight: "800",
    color: "#00604DD9"
  },
  description: {
    width: "100%",
    backgroundColor: "#CDF1EB",
    padding: Scale(15),
    borderRadius: scale(10),
    marginTop: scale(10)
  },
  FrameOne: {
    width: scale(50),
    height: scale(50),
    resizeMode: "contain"
  },
  frameText: {
    width: "85%",
    marginLeft: Scale(10),
    fontSize: Scale(15),
    fontWeight: "500"
  },
  hedaerFram: {
    flexDirection: "row",
    alignItems: "center"
  },

  /* ===== Bottom sheet (new) ===== */
  sheetBackdrop: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  sheetWrap: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    paddingVertical: scale(16),
    paddingHorizontal: scale(20)
  },
  sheetHandle: {
    width: scale(40),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: '#D0D5DD',
    alignSelf: 'center',
    marginBottom: scale(12)
  },
  sheetTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#00604D',
    marginBottom: scale(12)
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(4)
  },
  shareItem: {
    alignItems: 'center',
    width: '23%'
  },
  shareIconWrap: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: '#E6F6F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(6)
  },
  shareIcon: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'contain'
  },
  shareLabel: {
    fontSize: scale(12),
    fontWeight: '600',
    color: '#00604D',
    textAlign: 'center'
  },
  sheetClose: {
    alignSelf: 'center',
    marginTop: scale(16),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16)
  },
  sheetCloseText: {
    color: '#00604D',
    fontWeight: '700',
    fontSize: scale(14)
  }
});
