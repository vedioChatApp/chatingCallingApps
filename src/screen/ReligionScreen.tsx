import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Images from './assets';
import scale from '../components/Scale';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMasterData } from '../api/auth';

const ReligionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(null);
  const [religions, setReligions] = useState<{ id: number; name: string }[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const fetchReligion = async () => {
      try {
        const res = await getMasterData('/master/religion');
        if (Array.isArray(res?.data)) {
          setReligions(res.data);
        } else {
          console.warn('Invalid religion data:', res?.data);
        }
      } catch (err) {
        console.error('Error fetching religion list:', err);
      }
    };
    fetchReligion();
  }, []);

  const toggleItem = async (item: { id: number; name: string }) => {
    const newSelection = selected?.id === item.id ? null : item;
    setSelected(newSelection);
    await AsyncStorage.setItem('religions', JSON.stringify(newSelection));
  };

  const filtered = searchText
    ? religions.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase()))
    : religions;

  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      style={[styles.tag, selected?.id === item.id && styles.tagActive]}
      onPress={() => toggleItem(item)}
    >
      <Text style={[styles.tagText, selected?.id === item.id && styles.tagTextActive]}>
        {item.name} {selected?.id === item.id ? '✕' : '+'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.overlayBackground}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topWrapper}>
          <TouchableOpacity style={styles.skipContainer} onPress={() => navigation.navigate('LanguageScreen')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          {!isSearchActive && (
            <Text style={styles.title}>Update your profile</Text>
          )}
        </View>

        <View style={styles.middleWrapper}>
          <TouchableOpacity   onPress={() => navigation.goBack()}>
            <Image source={Images.LeftArrow} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={[styles.card, isSearchActive && styles.cardFocused]}>
            <Text style={styles.cardTitle}>Your Religion</Text>
            <Text style={styles.cardSub}>Please identify Your Religion</Text>

            <View style={styles.searchBox}>
              <TextInput
                placeholder="Select your religion"
                style={styles.searchInput}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => { Keyboard.dismiss(); setIsSearchActive(false); setSearchText(''); }}
                value={searchText}
                onChangeText={setSearchText}
              />
              <Image source={Images.Search} style={styles.searchIcon} />
            </View>

            <Text style={styles.countText}>{selected ? '1/1 Selected' : '0/1 Selected'}</Text>

            {selected && (
              <View style={styles.selectedWrapper}>
                <TouchableOpacity
                  style={[styles.tag, styles.tagActive]}
                  onPress={() => toggleItem(selected)}
                >
                  <Text style={[styles.tagText, styles.tagTextActive]}>{selected.name} ✕</Text>
                </TouchableOpacity>
              </View>
            )}

            {!isSearchActive && <Text style={styles.suggest}>You might like...</Text>}

            <FlatList
              data={filtered.filter(i => selected?.id !== i.id)}
              renderItem={renderItem}
              keyExtractor={(item, idx) => idx.toString()}
              numColumns={2}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.stepBarContainer}>
              <View style={styles.stepBarTrack}>
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillActive} />
                <View style={styles.stepBarFillNotActive} />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('LanguageScreen')}>
            <Image source={Images.RightArrow} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.buttonLeft} style={styles.logoStyleOne}/>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dotActive}/>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('LanguageScreen')}>
          <Image source={Images.buttonRight} style={styles.logoStyleOne}/>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default ReligionScreen;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1AC8B9', justifyContent: "space-between" },
  topWrapper: { paddingTop: scale(10), paddingHorizontal: scale(16) },
  skipContainer: { alignSelf: 'flex-end' },
  skipText: { fontSize: scale(14), fontWeight: '600', color: '#00604D' },
  title: { fontSize: scale(24), fontWeight: '800', color: '#00604D', marginTop: '25%', textAlign: 'center', marginBottom: scale(25) },
  middleWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: scale(5) },
  card: {
    backgroundColor: '#FFFFFF57',
    borderTopLeftRadius: scale(60),
    borderTopRightRadius: scale(60),
    padding: scale(16),
    width: '80%',
    height: height * 0.6,
    alignSelf: 'center',
  },
  cardFocused: {
    height: height * 0.70,
    marginTop: scale(25),
  },
  cardTitle: { fontSize: scale(20), fontWeight: '700', color: '#00604D', textAlign: 'center', marginBottom: scale(4) },
  cardSub: { fontSize: scale(14), color: '#444', textAlign: 'center', marginBottom: scale(12) },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF57',
    borderRadius: scale(25),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    height: scale(42)
  },
  searchInput: { flex: 1, fontSize: scale(15), color: '#333' },
  searchIcon: { width: scale(18), height: scale(18), tintColor: '#999' },
  countText: { textAlign: 'right', fontSize: scale(12), marginVertical: scale(6) },
  selectedWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(6) },
  list: { gap: scale(10), justifyContent: 'space-between', paddingBottom: scale(20) },
  tag: {
    backgroundColor: '#B2EFEA',
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
    borderRadius: scale(20),
    margin: scale(5),
  },
  tagText: {
    fontSize: scale(14),
    color: '#00473F',
    fontWeight: '600',
  },
  tagActive: {
    backgroundColor: '#9FFFEC',
  },
  tagTextActive: {
    color: '#00604D',
  },
  arrowIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  stepBarContainer: { position: 'relative', bottom: -15 },
  stepBarTrack: { height: scale(3), width: '100%', backgroundColor: '#fff', borderRadius: scale(4), flexDirection: 'row' },
  stepBarFillActive: { height: '100%', width: '20%', backgroundColor: '#00604D' },
  stepBarFillNotActive: { height: '100%', width: '20%', backgroundColor: '#fff' },
  suggest: { fontSize: scale(13), color: '#00604D', marginVertical: scale(6) },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', alignSelf: 'center', marginBottom: scale(25), marginRight: scale(10) },
  circleButtonActive: { width: scale(55), height: scale(55), borderRadius: scale(27.5), backgroundColor: '#1AC8B9', justifyContent: 'center', alignItems: 'center' },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#B0E1DA', marginHorizontal: scale(4) },
  dotActive: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#FFFFFF', marginHorizontal: scale(4) },
  logoStyleOne: { width: scale(80), height: scale(80), resizeMode: 'contain' },
    overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
  }
});
