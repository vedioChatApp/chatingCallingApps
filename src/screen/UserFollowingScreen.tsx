import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserFollowingScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.UserFollowingScreen.following}</Text>
      </View>
    </View>
  );
};

const UserFollowingScreenMainData = () => {
  const navigation = useNavigation();

  const [users] = useState([
    { id: '1',  name: 'Suraiya Parvin', followers: '32k' },
    { id: '2',  name: 'Aman Verma',     followers: '12.4k' },
    { id: '3',  name: 'Neha Singh',     followers: '8.1k' },
    { id: '4',  name: 'Rohit Sharma',   followers: '50k' },
    { id: '5',  name: 'Ayesha Khan',    followers: '5.7k' },
    { id: '6',  name: 'Karan Mehta',    followers: '22k' },
    { id: '7',  name: 'Priya Iyer',     followers: '14.6k' },
    { id: '8',  name: 'Arjun Das',      followers: '9.9k' },
    { id: '9',  name: 'Meera Joshi',    followers: '3.2k' },
    { id: '10', name: 'Vikram Patel',   followers: '18k' },
    { id: '11', name: 'Sana Sheikh',    followers: '27k' },
    { id: '12', name: 'Devansh Gupta',  followers: '6.5k' },
    { id: '5',  name: 'Ayesha Khan',    followers: '5.7k' },
    { id: '6',  name: 'Karan Mehta',    followers: '22k' },
    { id: '7',  name: 'Priya Iyer',     followers: '14.6k' },
    { id: '8',  name: 'Arjun Das',      followers: '9.9k' },
    { id: '9',  name: 'Meera Joshi',    followers: '3.2k' },
    { id: '10', name: 'Vikram Patel',   followers: '18k' },
    { id: '11', name: 'Sana Sheikh',    followers: '27k' },
    { id: '12', name: 'Devansh Gupta',  followers: '6.5k' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      String(u.followers).toLowerCase().includes(q)
    );
  }, [searchQuery, users]);

  const renderMenu = (onClose: () => void) => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuText}>View Profile</Text>
      </TouchableOpacity>
      <View style={styles.menuDivider} />
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuText}>Message</Text>
      </TouchableOpacity>
      <View style={styles.menuDivider} />
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuText}>Audio Call</Text>
      </TouchableOpacity>
      <View style={styles.menuDivider} />
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuText}>Video Call</Text>
      </TouchableOpacity>
      <View style={styles.menuDivider} />
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={[styles.menuText, { color: '#FF2600' }]}>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }: { item: { id: string; name: string; followers: string }, index: number }) => {
    const itemKey = `${item.id}-${index}`;
    const isOpen = openMenuKey === itemKey;

    return (
      <>
        <View style={styles.middledataStyle}>
          <View style={styles.middledataStylTwo}>
            <Image source={require('../assets/DisplayPhoto.png')} style={styles.displayPhoto} />
            <View style={styles.userheader}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.usercount}>{item.followers} Followers</Text>
            </View>
          </View>

          {/* Button + Menu wrapped so menu aligns to button's right */}
          <View style={styles.actionsWrap}>
            <TouchableOpacity
              style={styles.followingButton}
              onPress={() => setOpenMenuKey(isOpen ? null : itemKey)}
              activeOpacity={0.8}
            >
              <Text style={styles.followingText}>Following</Text>
            </TouchableOpacity>

            {isOpen && (
              <View style={styles.menuAnchorWrapper}>
                {renderMenu(() => setOpenMenuKey(null))}
              </View>
            )}
          </View>
        </View>

        {index !== filteredUsers.length - 1 && <View style={styles.line} />}
      </>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.inputBoxserch}>
        <TextInput
          style={styles.serchText}
          placeholder='Search'
          placeholderTextColor={'#3F897B'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={require('../assets/Search.png')} style={styles.serchButton} />
      </View>

      {openMenuKey && (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpenMenuKey(null)} />
      )}

      <View style={styles.middleData}>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, idx) => `${item.id}-${idx}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: scale(10), paddingBottom: scale(20) }}
          onScrollBeginDrag={() => openMenuKey && setOpenMenuKey(null)}
        />
      </View>
    </View>
  );
};

const UserFollowingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground}>
        <UserFollowingScreenHeader />
        <UserFollowingScreenMainData />
      </View>
    </SafeAreaView>
  );
};

export default UserFollowingScreen;

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
  personalDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(25),
    marginTop: scale(20),
  },
  backIconHeaders: {
    width: '100%',
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
  serchButton: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  inputBoxserch: {
    width: '100%',
    height: scale(45),
    backgroundColor: '#CFF4EB',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: scale(2),
    borderRadius: scale(30),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    alignSelf: 'center',
    marginTop: scale(15),
  },
  serchText: {
    color: '#3F897B',
    fontSize: scale(16),
    fontWeight: '400',
    width: '90%',
  },
  headerContainer: {
    marginHorizontal: scale(25),
  },
  middleData: {
    borderWidth: scale(2),
    borderColor: '#FFFFFF',
    // paddingHorizontal: scale(10),
    paddingVertical: scale(15),
    borderRadius: scale(16),
    backgroundColor: '#A2E8D8',
    marginTop: scale(10),
    height: '79.5%',
  },
  followingButton: {
    backgroundColor: '#00604DB2',
    borderColor: '#FFFFFF',
    borderWidth: scale(1),
    borderRadius: scale(24),
    paddingHorizontal: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(3),
    marginRight: scale(10),
  },
  followingText: {
    color: '#FFFFFF',
    fontSize: scale(12),
    fontWeight: '600',
  },
  displayPhoto: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    resizeMode: 'contain',
    marginLeft: scale(10),
  },
  middledataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middledataStylTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#0A1F44',
  },
  usercount: {
    fontSize: scale(12),
    fontWeight: '400',
    color: '#00604D',
  },
  userheader: {
    marginLeft: scale(10),
  },
  line: {
    width: '83%',
    borderColor: '#3F897B38',
    borderWidth: scale(0.2),
    alignSelf: 'flex-end',
    marginVertical: scale(8),
  },

  /* Button+Menu wrapper so menu aligns to button (no other UI changes) */
  actionsWrap: {
    position: 'relative',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  /* Anchored menu */
  menuAnchorWrapper: {
    position: 'absolute',
    right: 0,            // now flush to the button's right edge
    top: scale(25.1),      // just under the button
    zIndex: 50,
    elevation: 6,
  },
  menuContainer: {
  width: scale(121),
  backgroundColor: '#E8F5F2FF',   // fully opaque
  borderRadius: scale(17),
  paddingVertical: scale(8),
  borderWidth: scale(2),
  borderColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
},
  menuItem: {
    paddingVertical: scale(5.4),
    paddingHorizontal: scale(10),
  },
  menuText: {
    fontSize: scale(14),
    color: '#00604D',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EAEAEA',
    marginHorizontal: scale(10),
  },
});
