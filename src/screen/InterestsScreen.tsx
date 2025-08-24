import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scale from '../components/Scale';
import Images from './assets';
import strings from '../components/strings';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { getInterestList } from '../api/auth';

const InterestsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<{ id: number; name: string }[]>([]);
  const [interestList, setInterestList] = useState<{ id: number; name: string }[]>([]);

  // ✅ Fetch from API
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        console.log('📡 Fetching interest list...');
        const res = await getInterestList();
        console.log('📥 Full API Response:', res);

        if (Array.isArray(res?.data?.data)) {
          setInterestList(res.data.data);
          console.log('✅ Interests set:', res.data.data);
        } else {
          console.warn('⚠️ res.data.data is not an array:', res?.data?.data);
          setInterestList([]);
        }
      } catch (err) {
        console.error('❌ API Error:', err);
        setInterestList([]);
      }
    };
    fetchInterests();
  }, []);

  // ✅ Store selected interests in AsyncStorage
  useEffect(() => {
    const saveSelected = async () => {
      try {
        await AsyncStorage.setItem('interest', JSON.stringify(selected));
        console.log('💾 Saved to AsyncStorage:', selected);
      } catch (e) {
        console.error('❌ AsyncStorage save failed:', e);
      }
    };
    saveSelected();
  }, [selected]);

  const handleSearchFocus = () => setIsSearchActive(true);
  const handleSearchBlur = () => {
    Keyboard.dismiss();
    setIsSearchActive(false);
    setSearchText('');
  };

  // ✅ Toggle interests
  const toggleItem = (item: { id: number; name: string }) => {
    if (selected.find(i => i.id === item.id)) {
      setSelected(prev => prev.filter(i => i.id !== item.id));
    } else if (selected.length < 5) {
      setSelected(prev => [...prev, item]);
    }
  };

  // ✅ Search filter
  const filtered = searchText.length > 0
    ? interestList.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : interestList;

  console.log('🎯 Filtered data:', filtered);

  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      style={[styles.tag, selected.find(i => i.id === item.id) && styles.tagActive]}
      onPress={() => toggleItem(item)}
    >
      <Text style={[styles.tagText, selected.find(i => i.id === item.id) && styles.tagTextActive]}>
        {item.name} {selected.find(i => i.id === item.id) ? '✕' : '+'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.overlayBackground}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topWrapper}>
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => navigation.navigate('MusictasScreen')}
          >
            <Text style={styles.skipText}>{strings.UpdateProfileHeader.skip}</Text>
          </TouchableOpacity>
          {!isSearchActive && (
            <Text style={styles.title}>{strings.UpdateProfileHeader.titleOne}</Text>
          )}
        </View>

        <View style={styles.middleWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.LeftArrow} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={[styles.card, isSearchActive && styles.cardFocused]}>
            <Text style={styles.cardTitle}>Your Interests</Text>
            <Text style={styles.cardSub}>
              Share your interests to spark better conversations.
            </Text>

            <View style={styles.searchBox}>
              <TextInput
                placeholder="Select your interests"
                style={styles.searchInput}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                value={searchText}
                onChangeText={setSearchText}
              />
              <Image source={Images.Search} style={styles.searchIcon} />
            </View>

            <Text style={styles.countText}>{selected.length}/5 Selected</Text>

            {selected.length > 0 && (
              <View style={styles.selectedWrapper}>
                {selected.map((i, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.tag, styles.tagActive]}
                    onPress={() => toggleItem(i)}
                  >
                    <Text style={[styles.tagText, styles.tagTextActive]}>
                      {i.name} ✕
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!isSearchActive && (
              <Text style={styles.suggest}>You might like...</Text>
            )}

            <FlatList
              data={filtered.filter(i => !selected.find(s => s.id === i.id))}
              renderItem={renderItem}
              keyExtractor={(item, idx) => `${item.id}-${idx}`}
              numColumns={2}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.stepBarContainer}>
              <View style={styles.stepBarTrack}>
                <View style={styles.stepBarFillNotActive}></View>
                <View style={styles.stepBarFillActive}></View>
                <View style={styles.stepBarFillNotActive}></View>
                <View style={styles.stepBarFillNotActive}></View>
                <View style={styles.stepBarFillNotActive}></View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('MusictasScreen')}>
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
                    <View style={styles.dot} />
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
                <TouchableOpacity style={styles.circleButtonActive} onPress={() => navigation.navigate('MusictasScreen')}>
                    <Image source={Images.buttonRight} style={styles.logoStyleOne} />
                </TouchableOpacity>
            </View>
            </View>
    </SafeAreaView>
  );
};

export default InterestsScreen;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    justifyContent: 'space-between',
  },
  topWrapper: {
    paddingTop: scale(10),
    paddingHorizontal: scale(16),
  },
  skipContainer: {
    alignSelf: 'flex-end',
  },
  skipText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#00604D',
  },
  title: {
    fontSize: scale(24),
    fontWeight: '800',
    color: '#00604D',
    marginTop: '20%',
    textAlign: 'center',
    marginBottom: scale(25),
  },
  middleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
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
  cardTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#00604D',
    textAlign: 'center',
    marginBottom: scale(4),
  },
  cardSub: {
    fontSize: scale(14),
    color: '#444',
    textAlign: 'center',
    marginBottom: scale(12),
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF57',
    borderRadius: scale(25),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    height: scale(42),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(15),
    color: '#333',
  },
  searchIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: '#999',
  },
  countText: {
    textAlign: 'right',
    fontSize: scale(12),
    marginTop: scale(6),
    marginBottom: scale(6),
  },
  suggest: {
    fontSize: scale(13),
    color: '#00604D',
    marginVertical: scale(6),
  },
  selectedWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
  },
  list: {
    gap: scale(10),
    justifyContent: 'space-between',
    paddingBottom: scale(20),
  },
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
  arrowIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  stepBarContainer: {
    position: 'relative',
    bottom: -15,
  },
  stepBarTrack: {
    height: scale(3),
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: scale(4),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepBarFillActive: {
    height: '100%',
    width: '20%',
    backgroundColor: '#00604D',
    borderRadius: scale(4),
  },
  stepBarFillNotActive: {
    height: '100%',
    width: '20%',
    backgroundColor: '#fff',
    borderRadius: scale(4),
  },
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
        overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
  }
});
