import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import scale from '../components/Scale';
import Images from './assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import {
  getCountryList,
  getStatesByCountry,
  getCitiesByState,
} from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAllHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.topWrapper}>
      <TouchableOpacity
        style={styles.skipContainer}
        onPress={() => navigation.navigate('PermissionScreen')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Update your profile</Text>
    </SafeAreaView>
  );
};

const UpdateAllField = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [country, setCountry] = useState('');

  const [isCityFocused, setIsCityFocused] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [isStateFocused, setIsStateFocused] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [countryOptions, setCountryOptions] = useState<{ id: number; name: string }[]>([]);
  const [stateOptions, setStateOptions] = useState<{ id: number; name: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [isPinFocused, setIsPinFocused] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountryList();
        setCountryOptions(res?.data || []);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  const handleCountrySelect = async (item: { id: number; name: string }) => {
    setCountry(item.name);
    setShowCountryDropdown(false);
    setState('');
    setCity('');
    setStateOptions([]);
    setCityOptions([]);
    await AsyncStorage.setItem('country', item.name);
    console.log('City stored:', item);
    try {
      const res = await getStatesByCountry(item.id);
      setStateOptions(res?.data || []);
    } catch (e) {
      console.error('Error fetching states:', e);
    }
  };

  const handleStateSelect = async (item: { id: number; name: string }) => {
    setState(item.name);
    setShowStateDropdown(false);
    setCity('');
    await AsyncStorage.setItem('state', item.name);
    try {
      const res = await getCitiesByState(item.id);
      setCityOptions(res?.data?.map((ct: { id: number; name: string }) => ct.name) || []);
    } catch (e) {
      console.error('Error fetching cities:', e);
    }
  };

  return (
    <View>
      <Text style={styles.address}>Your Address</Text>

        <View style={styles.inputWrapperOne}>
        {(isCountryFocused || country) && <Text style={styles.label}>Country</Text>}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setShowCountryDropdown(!showCountryDropdown);
            setIsCountryFocused(true);
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor="#3F897B"
              value={country}
              editable={false}
            />
            <Image source={Images.Polygon} style={styles.dropDownStyle} />
          </View>
        </TouchableOpacity>
        {showCountryDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={countryOptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCountrySelect(item)}>
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={styles.inputWrapperOne}>
        {(isStateFocused || state) && <Text style={styles.label}>State</Text>}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setShowStateDropdown(!showStateDropdown);
            setIsStateFocused(true);
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="State"
              placeholderTextColor="#3F897B"
              value={state}
              editable={false}
            />
            <Image source={Images.Polygon} style={styles.dropDownStyle} />
          </View>
        </TouchableOpacity>
        {showStateDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={stateOptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleStateSelect(item)}>
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <View style={styles.inputWrapper}>
        {(isCityFocused || city) && <Text style={styles.label}>City</Text>}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setShowCityDropdown(!showCityDropdown);
            setIsCityFocused(true);
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="#3F897B"
              value={city}
              editable={false}
            />
            <Image source={Images.Polygon} style={styles.dropDownStyle} />
          </View>
        </TouchableOpacity>
        {showCityDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={cityOptions}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={async () => {
                    setCity(item);
                    setShowCityDropdown(false);
                    await AsyncStorage.setItem('city', item);
                  }}>
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <View style={styles.inputWrapper}>
  {(isPinFocused || pin) && <Text style={styles.label}>Pin</Text>}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Pin"
      placeholderTextColor="#3F897B"
      value={pin}
      keyboardType="numeric"
      onFocus={() => setIsPinFocused(true)}
      onBlur={() => setIsPinFocused(false)}
      onChangeText={async (value) => {
        setPin(value);
        await AsyncStorage.setItem('pin', value);
        console.log('Pin stored:', value);
      }}
    />
  </View>
</View>

    </View>
  );
};

const UpdateAllDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.overlayBackground}>
        <View>
          <UpdateAllHeader />
          <UpdateAllField />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.buttonLeft} style={styles.logoStyleOne} />
          </TouchableOpacity>
          <View style={styles.dots}>
            {[...Array(8)].map((_, i) => (
              <View key={i} style={styles.dot} />
            ))}
            <View style={styles.dotActive} />
          </View>
          <TouchableOpacity
            style={styles.circleButtonActive}
            onPress={() => navigation.navigate('PermissionScreen')}>
            <Image source={Images.buttonRight} style={styles.logoStyleOne} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateAllDetailScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1AC8B9',
    },
    overlayBackground: {
              justifyContent: 'space-between',
        flex:2,
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
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
            marginHorizontal:scale(15)
        },
           title: {
                fontSize: scale(24),
                fontWeight: '800',
                color: '#00604D',
                marginTop: '25%',
                textAlign: 'center',
                marginBottom: scale(25),
            },
            address:{
                fontSize: scale(20),
                fontWeight: '600',
                color: '#00604D',
                marginTop: '12%',
                textAlign: 'center',
                marginBottom: scale(25),
            },
              inputWrapper: {
                marginHorizontal: scale(40),
                marginTop: scale(15),
              },
              inputWrapperOne: {
                marginHorizontal: scale(40),
                marginTop: scale(10),
              },
               label: {
                  fontSize: scale(13),
                  color: '#3F897B',
                  fontWeight: '500',
                  marginBottom: scale(4),
                  marginLeft: scale(15),
                },
                inputContainer: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF57',
                  borderRadius: scale(25),
                  borderColor: '#FFFFFF',
                  borderWidth: scale(1.5),
                  paddingHorizontal: scale(15),
                  height: scale(45),
                  justifyContent: 'space-between',
                },
         dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#1AC8B9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(12),
    marginTop: scale(4),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    zIndex: 9999,
    overflow: 'hidden',
    height:scale(150),
    width:"100%"
  },
                 dropdownItem: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
                   dropDownStyle: {
                      width: scale(15),
                      height: scale(15),
                      resizeMode: 'contain',
                    },
                      dropdownItemText: {
                        fontSize: scale(15),
                        color: '#3F897B',
                      },
                        input: {
                          fontSize: scale(16),
                          color: '#3F897B',
                          fontWeight: '400',
                        },
                          footer: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // width: '100%',
                            marginHorizontal:scale(20),
                            marginBottom:"10%",
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
                            marginHorizontal: scale(5),
                          },
                          dotActive: {
                            width: scale(8),
                            height: scale(8),
                            borderRadius: scale(4),
                            backgroundColor: '#FFFFFF',
                            marginHorizontal: scale(5),
                          },
                           logoStyleOne: {
                              width: scale(80),
                              height: scale(80),
                              resizeMode: 'contain',
                            },
})
