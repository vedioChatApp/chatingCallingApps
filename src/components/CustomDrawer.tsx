import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Share,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import scale from '../components/Scale';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CustomDrawerModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: -width, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible]);

  // Logout
  const handleLogout = async () => {
    try { await AsyncStorage.removeItem('access_token'); } catch {}
    onClose();
    navigation.reset({ index: 0, routes: [{ name: 'EmailAccountLogin' as never }] });
  };

  // --- Invite/Code section helpers ---
  const REF_CODE = 'DFSD#$$%4';

  const handleCopy = () => {
    Clipboard.setString(REF_CODE);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my code ${REF_CODE} to join!`,
      });
    } catch {}
  };

  // Menu item
  const MenuItem = ({ icon, text, onPress }: { icon: any; text: string; onPress?: () => void }) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={({ hovered }: any) => [
          styles.menuItem,
          (hovered || pressed) && { backgroundColor: '#ACFFEF66' },
        ]}
      >
        <Image source={icon} style={styles.profileIcon} />
        <Text style={styles.menuText}>{text}</Text>
      </Pressable>
    );
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={{ flex: 1 }}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.closeWrapper}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={styles.header}>
            <Image source={require('../assets/DummyLogo.png')} style={styles.avatar} />
            <Text style={styles.name}>Suraiya Parvin</Text>
            <View style={{ marginLeft: '30%' }}>
              <View style={styles.editHeader}>
                <Text style={styles.email}>suraiya@gmail.com</Text>
                <TouchableOpacity>
                  <Image source={require('../assets/edit.png')} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.walletContainer}>
              <Image source={require('../assets/wallet.png')} style={styles.walletIcon} />
              <Text style={styles.walletText}>₹2000.00</Text>
            </View>
          </View>

          {/* Level Info */}
          <View style={styles.levelSection}>
            <View style={styles.walletContainers}>
              <Image source={require('../assets/dimand.png')} style={styles.walletIcon} />
              <Text style={styles.level}>Level 1</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.topUpText}>Top up 100 tokens to level up</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <MenuItem
              icon={require('../assets/ProfileIcon.png')}
              text="Profile"
              onPress={() => {
                onClose();
                navigation.navigate('UserProfileScreen' as never);
              }}
            />

            <MenuItem
              icon={require('../assets/Following.png')}
              text="Following"
              onPress={() => {
                onClose();
                navigation.navigate('UserFollowingScreen' as never);
              }}
            />
            <MenuItem
              icon={require('../assets/Topup.png')}
              text="Top up"
              onPress={() => {
                onClose();
                navigation.navigate('UserTopUpScreen' as never);
              }}
            />
            <MenuItem
              onPress={() => {
                onClose();
                navigation.navigate('UserTransactionHistory' as never);
              }}
            icon={require('../assets/Transaction.png')} text="Transaction history" />

            <MenuItem
              icon={require('../assets/Settingses.png')}
              text="Settings"
              onPress={() => {
                onClose();
                navigation.navigate('SettingsScreen' as never);
              }}
            />

            <MenuItem
              icon={require('../assets/Help.png')}
              text="Help"
              onPress={() => {
                onClose();
                navigation.navigate('UserHelpScreen' as never);
              }}
            />

            {/* ---------- Invite / Code + Share (matches your screenshot) ---------- */}
            <View style={styles.inviteRow}>
              <View style={styles.codeBox}>
                <Text style={styles.codeText} numberOfLines={1}>
                  {REF_CODE}
                </Text>
                <TouchableOpacity onPress={handleCopy} >
                  <Image source={require('../assets/proiconscopy.png')} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
                <Text style={styles.shareText}>SHARE</Text>
              </TouchableOpacity>
            </View>
            {/* -------------------------------------------------------------------- */}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Image source={require('../assets/logout.png')} style={styles.profileIcons} />
              <Text style={styles.logoutText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomDrawerModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '85%',
    backgroundColor: '#FFFFFF',
    // paddingTop: scale(40),
  },
  closeWrapper: {
    alignItems: 'flex-end',
    marginBottom: scale(10),
  },
  closeText: {
    fontSize: scale(18),
    fontWeight: '400',
    color: '#333',
    marginRight: scale(20),
    marginTop: scale(15),
  },
  header: {
    marginBottom: scale(10),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    marginBottom: scale(10),
    alignSelf: 'center',
        borderColor:"#00604D59",
    borderWidth: scale(1),
  },

  name: {
    fontWeight: '800',
    fontSize: scale(20),
    color: '#00604D',
    alignSelf: 'center',
  },
  email: {
    fontSize: scale(12),
    color: '#7EABA2C4',
    fontWeight: '500',
    marginBottom: scale(5),
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  walletContainers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginRight: scale(5),
  },
  editIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginLeft: '30%',
    position: 'relative',
    top: scale(-8),
  },
  walletText: {
    fontSize: scale(12),

    color: '#004739',
    fontWeight: '600',
  },
  levelSection: {
    backgroundColor: '#ACFFEF66',
    padding: scale(15),
  },
  level: {
    fontWeight: '600',
    fontSize: scale(14),
    color: '#076351',
    marginLeft: scale(10),
  },
  progressBar: {
    backgroundColor: '#FFFFFF',
    height: scale(6),
    borderRadius: scale(3),
    marginVertical: scale(6),
    width: '100%',
  },
  progressFill: {
    height: '100%',
    width: '30%',
    backgroundColor: '#D32F2F',
    borderRadius: scale(3),
  },
  topUpText: {
    fontSize: scale(12),
    color: '#00604D',
    fontWeight: '600',
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: scale(10),
  },
  menuItem: {
    paddingVertical: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
    marginLeft: scale(25),
  },

    profileIcons: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
   
  },

  menuText: {
    fontSize: scale(18),
    color: '#00604D',
    fontWeight: '500',
    marginLeft: scale(15),
  },

  // ===== Invite / Share section (new) =====
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: scale(6),
marginTop: "25%",
  },
  codeBox: {
    flex: 1,
    height: scale(48),
    backgroundColor: '#FFFFFF',     // solid (no transparency)
    borderRadius: scale(24),
    borderWidth: scale(1),
    borderColor: '#00604D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  codeText: {
    flex: 1,
    color: '#00604D',
    fontSize: scale(14),
    fontWeight: '600',
  },
  copyIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  shareBtn: {
    marginLeft: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(15),
    backgroundColor: '#00604D',
    borderRadius: scale(999),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: scale(14),
    letterSpacing: 1,
  },
  // ===== /Invite / Share section =====

  logoutBtn: {
    paddingVertical: scale(30),
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: '#00604D',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  logoutText: {
    color: '#FFFF',
    fontWeight: '600',
    fontSize: scale(14),
     marginLeft: scale(10),
  },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // // width: '50%',
    marginLeft: scale(20),
    
  },
});
