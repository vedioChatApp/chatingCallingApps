import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity, Share, Platform } from 'react-native';
import scale from '../components/Scale';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';

const SettingsScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.SettingsScreen.settings}</Text>
      </View>
    </View>
  )
}

const SettingsScreenMainContainer = () => {
  const navigation = useNavigation();
  const [isNotifOn, setIsNotifOn] = useState(true);

  // ✅ Modal visibility (Update App)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  // ✅ Simple version check (toggle latestVersion to simulate server value)
  const currentVersion = 'v0.1';
  const latestVersion  = 'v0.2'; // equal -> Modal #1, different -> Modal #2
  const hasNewUpdate = latestVersion !== currentVersion;

  const checkForUpdate = () => {
    setIsUpdateVisible(true);
  };

  const handleUpdateNow = () => {
    setIsUpdateVisible(false);
  };

  const handleUpdateLater = () => {
    setIsUpdateVisible(false);
  };

  // ✅ SHARE: native share sheet
  const onShare = async () => {
    const appUrl =
      Platform.select({
        ios: 'https://apps.apple.com/app/idXXXXXXXX',       // <-- replace with your App Store URL
        android: 'https://play.google.com/store/apps/details?id=com.yourapp', // <-- replace with your Play Store URL
        default: 'https://example.com/app'
      }) as string;

    const message = `${strings?.SettingsScreen?.shareMessage ?? 'Check out this app!'}\n${appUrl}`;

    try {
      await Share.share({ message, url: appUrl });
    } catch (e) {
      // no-op
    }
  };

  return (
    <View style={styles.centerDataHeade}>
      <View style={styles.mainheaderContainer} >
        <View style={styles.menuItem}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/notificationIcon.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.notification}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsNotifOn(prev => !prev)}>
              <Image
                source={
                  isNotifOn
                    ? require('../assets/SwitchON.png')
                    : require('../assets/notificationIcon.png')
                }
                style={styles.switchONIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserPrivacyPolicyScreen")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/privacyLock.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.privacy}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserTermsandConditionsScreen")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/privacyLock.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.termsandConditions}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserPrivacyPolicyScreen")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/fluentfilled.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.storageandData}</Text>
            </View>
            <View>
              <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserAppLanguageScreen")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/language.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.appLanguage}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/star.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.rateApp}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserHelpScreen")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/helpIcon.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.help}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        {/* ✅ Share App -> native share */}
        <TouchableOpacity style={styles.menuItem} onPress={onShare}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/shareoutline.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.shareApp}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserReferandEarn")}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/gemreference.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.referandEarn}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        {/* ✅ Update App button -> opens modal (with conditional UI) */}
        <TouchableOpacity style={styles.menuItemlast} onPress={checkForUpdate}>
          <View style={styles.header}>
            <View style={styles.notificationHeader}>
              <Image source={require('../assets/updateIcon.png')} style={styles.profileIcon} />
              <Text style={styles.menuText}>{strings.SettingsScreen.updateApp}</Text>
            </View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcons} />
          </View>
        </TouchableOpacity>

        {/* ✅ Centered Modal (two UIs based on hasNewUpdate) */}
        <Modal
          visible={isUpdateVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsUpdateVisible(false)}
        >
          <View style={styles.modalRoot}>
            <Pressable style={styles.modalBackdrop} onPress={() => setIsUpdateVisible(false)} />
            <View style={styles.modalCard}>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setIsUpdateVisible(false)}>
                <Image source={require('../assets/x.png')} style={styles.modalCloseIcon} />
              </TouchableOpacity>

              {/* ---- Modal #1: Latest version ---- */}
              {!hasNewUpdate && (
                <>
                  <View style={styles.modalIconCircle}>
                    <Image source={require('../assets/updateIcon.png')} style={styles.modalIcon} />
                  </View>
                  <Text style={styles.modalTitle}>{strings.SettingsScreen.update}</Text>
                  <Text style={styles.modalVersion}>{currentVersion}</Text>
                  <Text style={styles.modalMessage}>{strings.SettingsScreen.yourcurrentappisthelatestversion}</Text>
                </>
              )}

              {/* ---- Modal #2: New update available ---- */}
              {hasNewUpdate && (
                <>
                  <View style={styles.modalIconCircle}>
                    <Text style={styles.modalTick}>✓</Text>
                  </View>

                  <Text style={styles.modalLineMuted}>{strings.SettingsScreen.currentversion}{currentVersion}</Text>
                  <Text style={styles.modalNewTitle}>{strings.SettingsScreen.newUpdateAvailable}</Text>
                  <Text style={styles.modalLineBold}>ios {latestVersion}</Text>

                  <TouchableOpacity style={styles.modalBtnPrimary} onPress={handleUpdateNow}>
                    <Text style={styles.modalBtnPrimaryText}>{strings.SettingsScreen.updateNow}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modalBtnSecondary} onPress={handleUpdateLater}>
                    <Text style={styles.modalBtnSecondaryText}>{strings.SettingsScreen.updateLater}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
        {/* ✅ /Modal */}
      </View>
    </View>
  )
}

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SettingsScreenHeader />
      <SettingsScreenMainContainer />
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  },
  centerDataHeade: {
    marginHorizontal: scale(25)
  },
  mainheaderContainer: {
    width: '100%',
    // padding: scale(20),
    borderColor: '#FFFF',
    borderWidth: scale(2),
    marginTop: '10%',
    borderRadius: scale(15),
    backgroundColor: '#C5F1E7',
  },
  headerContainer: {
    backgroundColor: "red"
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
  menuText: {
    fontSize: scale(18),
    color: '#00604D',
    fontWeight: '500',
  },
  menuItem: {
    paddingVertical: scale(15),
    borderBottomWidth: scale(0.5),
    borderBottomColor: '#7EABA2C4',
  },
  menuItemlast: {
    paddingVertical: scale(15),
  },
  profileIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    marginRight: '6%',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchONIcon: {
    width: scale(45),
    height: scale(24.33),
    resizeMode: 'contain',
  },
  switchONIcons: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  header: {
    marginHorizontal: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* ===== Modal Styles ===== */
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalCard: {
    width: '95%',
    borderRadius: scale(24),
    backgroundColor: '#EEF1F0',
    paddingVertical: scale(24),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: scale(2),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    padding: scale(6),
  },
  modalCloseIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  modalIconCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: '#1AC8B9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12),
    marginTop:"15%"
  },
  modalIcon: {
    width: scale(36),
    height: scale(36),
    resizeMode: 'contain',
  },
  modalTick: {
    fontSize: scale(40),
    color: '#FFFFFF',
    lineHeight: scale(48),
    textAlign: 'center',
    includeFontPadding: false,
  },
  modalTitle: {
    fontSize: scale(24),
    fontWeight: '700',
    color: '#00604D',
    marginTop: scale(4),
  },
  modalVersion: {
    fontSize: scale(18),
    fontWeight: '500',
    color: '#3F897B',
    marginTop: scale(2),
  },
  modalMessage: {
    fontSize: scale(18),
    fontWeight: '500',
    color: '#3F897B',
    textAlign: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(25),
    width:"80%",
    marginBottom:scale(25)
  },
  modalLineMuted: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#00886E',
    marginTop: scale(25),
  },
  modalNewTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#00604D',
    marginTop: scale(6),
  },
  modalLineBold: {
    fontSize: scale(18),
    fontWeight: '500',
    color: '#3F897B',
    marginTop: scale(4),
    marginBottom: "10%"
  },
  modalBtnPrimary: {
    width: '75%',
    height: scale(44),
    borderRadius: scale(16),
    backgroundColor: '#018C71',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(8),
  },
  modalBtnPrimaryText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalBtnSecondary: {
    width: '75%',
    height: scale(44),
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
    borderWidth:scale(1),
    borderColor:'#FFFFFF',
  },
  modalBtnSecondaryText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#006754',
  },
})
