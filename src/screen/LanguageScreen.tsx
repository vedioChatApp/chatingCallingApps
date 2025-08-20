import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
  Image, TextInput, FlatList, Dimensions, Keyboard,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scale from '../components/Scale';
import Images from './assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import axiosInstance from '../api/axiosInstance';

const LanguageScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [languageList, setLanguageList] = useState<{ id: number, name: string }[]>([]);
  const [selected, setSelected] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axiosInstance.get('/master/languages');
        setLanguageList(res.data.data || []);
      } catch (error) {
        console.error('Language fetch error:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleSearchFocus = () => setIsSearchActive(true);
  const handleSearchBlur = () => {
    Keyboard.dismiss();
    setIsSearchActive(false);
    setSearchText('');
  };

  const toggleItem = (item: { id: number, name: string }) => {
    const alreadySelected = selected.find(lang => lang.id === item.id);
    if (alreadySelected) {
      setSelected(selected.filter(lang => lang.id !== item.id));
    } else if (selected.length < 5) {
      setSelected([...selected, item]);
    }
  };

  const filtered = searchText
    ? languageList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    : languageList;

  const handleNext = async () => {
    if (selected.length === 0) {
      Alert.alert('Please select at least one language');
      return;
    }
    await AsyncStorage.setItem('language', JSON.stringify(selected));
    navigation.navigate('UpdateAllDetailScreen');
  };

  const renderItem = ({ item }: { item: { id: number, name: string } }) => (
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topWrapper}>
          <TouchableOpacity style={styles.skipContainer} onPress={handleNext}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          {!isSearchActive && <Text style={styles.title}>Update your profile</Text>}
        </View>

        <View style={styles.middleWrapper}>
          <TouchableOpacity>
            <Image source={Images.LeftArrow} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={[styles.card, isSearchActive && styles.cardFocused]}>
            <Text style={styles.cardTitle}>Your Language</Text>
            <Text style={styles.cardSub}>Select the Languages You Speak</Text>

            <View style={styles.searchBox}>
              <TextInput
                placeholder="Select your language"
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

            {!isSearchActive && <Text style={styles.suggest}>You might like...</Text>}

            <FlatList
              data={filtered.filter(i => !selected.find(s => s.id === i.id))}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.stepBarContainer}>
              <View style={styles.stepBarTrack}>
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillNotActive} />
                <View style={styles.stepBarFillActive} />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={handleNext}>
            <Image source={Images.RightArrow} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.buttonLeft} style={styles.logoStyleOne} />
        </TouchableOpacity>
        <View style={styles.dots}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={i === 7 ? styles.dotActive : styles.dot} />
          ))}
        </View>
        <TouchableOpacity style={styles.circleButtonActive} onPress={handleNext}>
          <Image source={Images.buttonRight} style={styles.logoStyleOne} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;

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
    },
    stepBarFillNotActive: {
        height: '100%',
        width: '20%',
        backgroundColor: '#fff',
    },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', alignSelf: 'center', marginBottom: scale(25), marginRight: scale(10) },
    circleButtonActive: { width: scale(55), height: scale(55), borderRadius: scale(27.5), backgroundColor: '#1AC8B9', justifyContent: 'center', alignItems: 'center' },
    dots: { flexDirection: 'row', alignItems: 'center' },
    dot: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#B0E1DA', marginHorizontal: scale(4) },
    dotActive: { width: scale(8), height: scale(8), borderRadius: scale(4), backgroundColor: '#FFFFFF', marginHorizontal: scale(4) },
    logoStyleOne: { width: scale(80), height: scale(80), resizeMode: 'contain' }
});