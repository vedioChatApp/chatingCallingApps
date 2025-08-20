/* -------------- MusictasScreen.tsx -------------- */
import React, { useEffect, useRef, useState } from 'react';
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
import axiosInstance from '../api/axiosInstance';   // 👉 वही instance जो बाकी screens में use हो रहा है

type Genre = { id: number; name: string };

const MusictasScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  /* ───────── STATE ───────── */
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText]   = useState('');
  const [selected, setSelected]       = useState<Genre[]>([]);
  const [genreList, setGenreList]     = useState<Genre[]>([]);

  /* ───────── FETCH MUSIC TASTES ───────── */
  useEffect(() => {
    const fetchMusicTaste = async () => {
      try {
        console.log('🎵 Fetching music-taste list…');
        const res = await axiosInstance.get('/master/music-taste');
        console.log('📥 API response:', res?.data);

        if (Array.isArray(res?.data?.data)) {
          setGenreList(res.data.data);
        } else {
          console.warn('⚠️ res.data.data is not array:', res?.data?.data);
          setGenreList([]);
        }
      } catch (err) {
        console.error('❌ Error fetching music-taste:', err);
        setGenreList([]);
      }
    };

    fetchMusicTaste();
  }, []);

  /* ───────── HANDLERS ───────── */
  const handleSearchFocus = () => setIsSearchActive(true);
  const handleSearchBlur  = () => { Keyboard.dismiss(); setIsSearchActive(false); setSearchText(''); };

  const toggleItem = async (item: Genre) => {
    let updated: Genre[];

    if (selected.find(g => g.id === item.id)) {
      updated = selected.filter(g => g.id !== item.id);
    } else if (selected.length < 5) {
      updated = [...selected, item];
    } else {
      updated = [...selected];   // limit reached
    }

    setSelected(updated);

    /* 👉 AsyncStorage में save करें */
    try {
      await AsyncStorage.setItem('musicTaste', JSON.stringify(updated));
      console.log('✅ Saved to AsyncStorage (musicTaste):', updated);
    } catch (e) {
      console.error('❌ Saving to AsyncStorage failed:', e);
    }
  };

  /* ───────── FILTER SEARCH ───────── */
  const filtered =
    searchText.length > 0
      ? genreList.filter(g => g.name.toLowerCase().includes(searchText.toLowerCase()))
      : genreList;

  /* ───────── RENDER ITEM ───────── */
  const renderItem = ({ item }: { item: Genre }) => (
    <TouchableOpacity
      style={[styles.tag, selected.find(g => g.id === item.id) && styles.tagActive]}
      onPress={() => toggleItem(item)}
    >
      <Text style={[styles.tagText, selected.find(g => g.id === item.id) && styles.tagTextActive]}>
        {item.name} {selected.find(g => g.id === item.id) ? '✕' : '+'}
      </Text>
    </TouchableOpacity>
  );

  /* ───────── UI ───────── */
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* ---------- Header ---------- */}
        <View style={styles.topWrapper}>
          <TouchableOpacity style={styles.skipContainer} onPress={() => navigation.navigate('ReligionScreen')}>
            <Text style={styles.skipText}>{strings.UpdateProfileHeader.skip}</Text>
          </TouchableOpacity>
          {!isSearchActive && <Text style={styles.title}>{strings.UpdateProfileHeader.titleOne}</Text>}
        </View>

        {/* ---------- Middle ---------- */}
        <View style={styles.middleWrapper}>
          <TouchableOpacity>
            <Image source={Images.LeftArrow} style={styles.arrowIcon}/>
          </TouchableOpacity>

          <View style={[styles.card, isSearchActive && styles.cardFocused]}>
            <Text style={styles.cardTitle}>Your music tastes</Text>
            <Text style={styles.cardSub}>
              Find your music vibe and match with those who groove like you.
            </Text>

            {/* search box */}
            <View style={styles.searchBox}>
              <TextInput
                ref={inputRef}
                placeholder="Select your music tastes"
                style={styles.searchInput}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                value={searchText}
                onChangeText={setSearchText}
              />
              <Image source={Images.Search} style={styles.searchIcon}/>
            </View>

            <Text style={styles.countText}>{selected.length}/5 Selected</Text>

            {/* selected pills */}
            {selected.length > 0 && (
              <View style={styles.selectedWrapper}>
                {selected.map((g, idx) => (
                  <TouchableOpacity key={idx} style={[styles.tag, styles.tagActive]} onPress={() => toggleItem(g)}>
                    <Text style={[styles.tagText, styles.tagTextActive]}>{g.name} ✕</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!isSearchActive && <Text style={styles.suggest}>You might like...</Text>}

            {/* list */}
            <FlatList
              data={filtered.filter(g => !selected.find(s => s.id === g.id))}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />

            {/* step bar */}
            <View style={styles.stepBarContainer}>
              <View style={styles.stepBarTrack}>
                <View style={styles.stepBarFillNotActive}/>
                <View style={styles.stepBarFillNotActive}/>
                <View style={styles.stepBarFillActive}/>
                <View style={styles.stepBarFillNotActive}/>
                <View style={styles.stepBarFillNotActive}/>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ReligionScreen')}>
            <Image source={Images.RightArrow} style={styles.arrowIcon}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* ---------- Footer (unchanged) ---------- */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.buttonLeft} style={styles.logoStyleOne}/>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dotActive}/>
          <View style={styles.dot}/><View style={styles.dot}/><View style={styles.dot}/>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ReligionScreen')}>
          <Image source={Images.buttonRight} style={styles.logoStyleOne}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MusictasScreen;

/* ---------- Styles (unchanged) ---------- */
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  /* ... वही styles जो आपने भेजे थे ... */
  container:{flex:1,backgroundColor:'#1AC8B9',justifyContent:'space-between'},
  topWrapper:{paddingTop:scale(10),paddingHorizontal:scale(16)},
  skipContainer:{alignSelf:'flex-end'},skipText:{fontSize:scale(14),fontWeight:'600',color:'#00604D'},
  title:{fontSize:scale(24),fontWeight:'800',color:'#00604D',marginTop:'25%',textAlign:'center',marginBottom:scale(25)},
  middleWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:scale(5)
  },
  card:{
     backgroundColor: '#FFFFFF57',
       borderTopLeftRadius: scale(60),
       borderTopRightRadius: scale(60),
       padding: scale(16),
       width: '80%',
       height: height * 0.6,
       alignSelf: 'center',
  },
  cardFocused:{height: height * 0.70,marginTop:scale(25)},
  cardTitle:{fontSize:scale(20),fontWeight:'700',color:'#00604D',textAlign:'center',marginBottom:scale(4)},
  cardSub:{fontSize:scale(14),color:'#444',textAlign:'center',marginBottom:scale(12)},
  searchBox:{flexDirection:'row',backgroundColor:'#FFFFFF57',borderRadius:scale(25),paddingHorizontal:scale(12),alignItems:'center',height:scale(42)},
  searchInput:{flex:1,fontSize:scale(15),color:'#333'},searchIcon:{width:scale(18),height:scale(18),tintColor:'#999'},
  countText:{textAlign:'right',fontSize:scale(12),marginTop:scale(6),marginBottom:scale(6)},
  suggest:{fontSize:scale(13),color:'#00604D',marginVertical:scale(6)},
  selectedWrapper:{flexDirection:'row',flexWrap:'wrap',gap:scale(6)},
  list:{gap:scale(10),justifyContent:'space-between',paddingBottom:scale(20)},
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
  arrowIcon:{width:scale(30),height:scale(30),resizeMode:'contain'},
  stepBarContainer:{position:'relative',bottom:-15},
  stepBarTrack:{height:scale(3),width:'100%',backgroundColor:'#fff',borderRadius:scale(4),overflow:'hidden',flexDirection:'row',alignItems:'center'},
  stepBarFillActive:{height:'100%',width:'20%',backgroundColor:'#00604D',borderRadius:scale(4)},
  stepBarFillNotActive:{height:'100%',width:'20%',backgroundColor:'#fff',borderRadius:scale(4)},
  footer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'85%',alignSelf:'center',marginBottom:scale(25),marginRight:scale(10)},
  circleButtonActive:{width:scale(55),height:scale(55),borderRadius:scale(27.5),backgroundColor:'#1AC8B9',justifyContent:'center',alignItems:'center'},
  dots:{flexDirection:'row',alignItems:'center'},
  dot:{width:scale(8),height:scale(8),borderRadius:scale(4),backgroundColor:'#B0E1DA',marginHorizontal:scale(4)},
  dotActive:{width:scale(8),height:scale(8),borderRadius:scale(4),backgroundColor:'#FFFFFF',marginHorizontal:scale(4)},
  logoStyleOne:{width:scale(80),height:scale(80),resizeMode:'contain'},
});
