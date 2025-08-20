import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scale from '../components/Scale';
import Images from './assets';
import strings from '../components/strings';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import axiosInstance from '../api/axiosInstance'; // ensure baseURL सेट है

type Hobby = { id: number; name: string };

const HobbiesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([]);
  const [hobbiesList, setHobbiesList] = useState<Hobby[]>([]);

  /* ──────────── Fetch hobbies once ──────────── */
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        console.log('📡  Fetching hobbies…');
        const res = await axiosInstance.get('/master/hobbies');
        console.log('📥  Raw API response:', res.data);

        if (Array.isArray(res?.data?.data)) {
          setHobbiesList(res.data.data);
          console.log('✅  hobbiesList set →', res.data.data.length, 'items');
        } else {
          console.warn('⚠️  res.data.data is not array:', res?.data?.data);
        }
      } catch (err) {
        console.error('❌  Error fetching hobbies:', err);
      }
    };
    fetchHobbies();
  }, []);

  /* ──────────── Handlers ──────────── */
  const handleSearchFocus = () => setIsSearchActive(true);

  const handleSearchBlur = () => {
    Keyboard.dismiss();
    setIsSearchActive(false);
    setSearchText('');
  };

const toggleHobby = async (item: Hobby) => {
  let updated: Hobby[];
  if (selectedHobbies.find(h => h.id === item.id)) {
    updated = selectedHobbies.filter(h => h.id !== item.id);
  } else if (selectedHobbies.length < 5) {
    updated = [...selectedHobbies, item];
  } else {
    updated = [...selectedHobbies];
  }

  setSelectedHobbies(updated);

  try {
    await AsyncStorage.setItem('hobbies', JSON.stringify(updated));
    console.log('✅ Saved to AsyncStorage:', updated);
  } catch (err) {
    console.error('❌ Error saving to AsyncStorage:', err);
  }
};


  /* ──────────── Filtering ──────────── */
  const filtered: Hobby[] =
    searchText.trim().length > 0
      ? hobbiesList.filter(h =>
          h.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      : hobbiesList;

  console.log('🔍  Filtered list size:', filtered.length);

  /* ──────────── Render hobby pill ──────────── */
  const renderItem = ({ item }: { item: Hobby }) => (
    <TouchableOpacity
      style={[
        styles.hobbyTag,
        selectedHobbies.find(h => h.id === item.id) && styles.hobbySelected,
      ]}
      onPress={() => toggleHobby(item)}
    >
      <Text
        style={[
          styles.hobbyText,
          selectedHobbies.find(h => h.id === item.id) && { color: '#00604D' },
        ]}
      >
        {item.name} {selectedHobbies.find(h => h.id === item.id) ? '✕' : '+'}
      </Text>
    </TouchableOpacity>
  );

  /* ──────────── UI ──────────── */
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* ── Header ── */}
        <View style={styles.topWrapper}>
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => navigation.navigate('InterestsScreen')}
          >
            <Text style={styles.skipText}>{strings.UpdateProfileHeader.skip}</Text>
          </TouchableOpacity>
          {!isSearchActive && (
            <Text style={styles.title}>{strings.UpdateProfileHeader.titleOne}</Text>
          )}
        </View>

        {/* ── Body ── */}
        <View style={styles.middleWrapper}>
          <TouchableOpacity>
            <Image source={Images.LeftArrow} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={[styles.contentBox, isSearchActive && styles.contentBoxFocused]}>
            <Text style={styles.sectionTitle}>Your Hobbies</Text>
            <Text style={styles.subText}>
              Pick your passions and connect with like-minded people.
            </Text>

            {/* Search */}
            <View style={styles.searchBox}>
              <TextInput
                ref={inputRef}
                placeholder="Select your hobbies"
                style={styles.searchInput}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                value={searchText}
                onChangeText={setSearchText}
              />
              <Image source={Images.Search} style={styles.searchIcon} />
            </View>

            {/* Counter */}
            <Text style={styles.countText}>{selectedHobbies.length}/5 Selected</Text>

            {/* Selected list */}
            {selectedHobbies.length > 0 && (
              <ScrollView
                style={{ maxHeight: scale(120), marginBottom: scale(8) }}
                contentContainerStyle={styles.selectedWrapper}
                nestedScrollEnabled
              >
                {selectedHobbies.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.hobbyTag, styles.hobbySelected]}
                    onPress={() => toggleHobby(item)}
                  >
                    <Text style={styles.hobbyText}>{item.name} ✕</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {!isSearchActive && <Text style={styles.suggestionText}>You might like...</Text>}

            {/* Full list */}
            <FlatList
              data={filtered.filter(h => !selectedHobbies.find(s => s.id === h.id))}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.hobbyList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />

            {/* Step bar */}
            <View style={styles.stepBarContainer}>
              <View style={styles.stepBarTrack}>
                <View style={styles.stepBarFillActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('InterestsScreen')}>
            <Image source={Images.RightArrow} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
       <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.buttonLeft} style={styles.logoStyleOne} />
                </TouchableOpacity>

                <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
                <TouchableOpacity style={styles.circleButtonActive} onPress={() => navigation.navigate('InterestsScreen')}>
                    <Image source={Images.buttonRight} style={styles.logoStyleOne} />
                </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

export default HobbiesScreen;

/* ──────────── Styles (unchanged) ──────────── */
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1AC8B9', justifyContent: 'space-between' },
  topWrapper: { paddingTop: scale(10), paddingHorizontal: scale(16) },
  skipContainer: { alignSelf: 'flex-end' },
  skipText: { fontSize: scale(14), fontWeight: '600', color: '#00604D' },
  title: {
    fontSize: scale(24),
    fontWeight: '800',
    color: '#00604D',
    marginTop: '25%',
    textAlign: 'center',
    marginBottom: scale(25),
  },
  middleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  contentBox: {
    backgroundColor: '#FFFFFF57',
    borderTopLeftRadius: scale(60),
    borderTopRightRadius: scale(60),
    padding: scale(16),
    width: '80%',
    height: height * 0.6,
    alignSelf: 'center',
  },
  contentBoxFocused: { height: height * 0.7, marginTop: scale(25) },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#00604D',
    textAlign: 'center',
    marginBottom: scale(4),
  },
  subText: { fontSize: scale(14), color: '#444', textAlign: 'center', marginBottom: scale(12) },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF57',
    borderRadius: scale(25),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    height: scale(42),
  },
  searchInput: { flex: 1, fontSize: scale(15), color: '#333' },
  searchIcon: { width: scale(18), height: scale(18), tintColor: '#999' },
  countText: { textAlign: 'right', fontSize: scale(12), marginTop: scale(6), marginBottom: scale(6) },
  suggestionText: { fontSize: scale(13), color: '#00604D', marginVertical: scale(6) },
  selectedWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(6) },
  hobbyList: { gap: scale(10), justifyContent: 'space-between', paddingBottom: scale(20) },
  hobbyTag: {
    backgroundColor: '#B2EFEA',
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    margin: scale(5),
  },
  hobbyText: { fontSize: scale(14), color: '#00473F', fontWeight: '600' },
  hobbySelected: { backgroundColor: '#9FFFEC', borderWidth: 1, borderColor: '#00473F' },
  arrowIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  stepBarContainer: { position: 'relative', bottom: -15 },
  stepBarTrack: {
    height: scale(3),
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  stepBarFillActive: { height: '100%', width: '20%', backgroundColor: '#00604D' },
  stepBarFillNotActive: { height: '100%', width: '20%', backgroundColor: '#fff' },
     footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "85%",
            alignSelf: 'center',
            marginRight: scale(10)
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
        dot: {
            width: scale(8),
            height: scale(8),
            borderRadius: scale(4),
            backgroundColor: '#B0E1DA',
            marginHorizontal: scale(4),
        },
        dotActive: {
            width: scale(8),
            height: scale(8),
            borderRadius: scale(4),
            backgroundColor: '#FFFFFF',
            marginHorizontal: scale(4),
        },
        logoStyleOne: {
            width: scale(80),
            height: scale(80),
            resizeMode: 'contain',
        },
});
