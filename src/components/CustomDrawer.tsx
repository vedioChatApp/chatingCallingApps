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
} from 'react-native';
import scale from '../components/Scale';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ added

const { width } = Dimensions.get('window');

const CustomDrawerModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // ✅ Logout handler (token remove + drawer close + reset to EmailAccountLogin)
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
    } catch (e) {
      // optional: console.log('logout error', e);
    }
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: 'EmailAccountLogin' as never }],
    });
  };

  // ✅ Updated MenuItem to accept onPress
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
            <View style={{ marginLeft: '28%' }}>
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
          <ScrollView style={styles.menuContainer}>
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
            <MenuItem icon={require('../assets/Transaction.png')} text="Transaction history" />

            {/* ✅ Settings Navigation */}
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
          </ScrollView>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Image source={require('../assets/logout.png')} style={styles.profileIcon} />
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
    backgroundColor: '#E7FFFB',
    paddingTop: scale(40),
  },
  closeWrapper: {
    alignItems: 'flex-end',
    marginBottom: scale(10),
  },
  closeText: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#333',
    marginRight: scale(25),
  },
  header: {
    marginBottom: scale(20),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    marginBottom: scale(10),
    alignSelf: 'center',
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
    marginVertical: scale(5),
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
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    marginLeft: '25%',
  },
  walletText: {
    fontSize: scale(14),
    color: '#27AE60',
  },
  levelSection: {
    backgroundColor: '#ACFFEF66',
    padding: scale(15),
    marginVertical: scale(10),
  },
  level: {
    fontWeight: '600',
    fontSize: scale(14),
    color: '#076351',
    marginLeft: scale(10),
  },
  progressBar: {
    backgroundColor: '#EEE',
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
    paddingVertical: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginRight: scale(10),
    marginLeft: scale(20),
  },
  menuText: {
    fontSize: scale(18),
    color: '#00604D',
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: scale(20),
    paddingVertical: scale(30),
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: '#00604D',
  },
  logoutText: {
    color: '#FFFF',
    fontWeight: '600',
    fontSize: scale(14),
  },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginLeft: scale(20),
  },
});
