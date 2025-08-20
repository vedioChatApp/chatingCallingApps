import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, TextInput} from 'react-native';
import scale from '../components/Scale';
import React, { useState, useMemo } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import strings from '../components/strings';


type Language = {
  name: string;
  icon: any; // ImageSourcePropType
};

const UserAppLanguageScreenHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.personalDetailsHeader}>
            <View style={styles.backIconHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={styles.backButton} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const UserAppLanguageScreenMainContainer = () => {
    // ✅ States
    const [searchQuery, setSearchQuery] = useState('');
    // ⬇️ Initially empty: "jab tak user select na kare"
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    // ✅ allLanguages as objects (name + icon)
    const [allLanguages] = useState<Language[]>([
        { name: 'English',    icon: require('../assets/English.png') },
        { name: 'Hindi',      icon: require('../assets/English.png') },
        { name: 'Spanish',    icon: require('../assets/English.png') },
        { name: 'French',     icon: require('../assets/English.png') },
        { name: 'German',     icon: require('../assets/English.png') },
        { name: 'Arabic',     icon: require('../assets/English.png') },
        { name: 'Chinese',    icon: require('../assets/English.png') },
        { name: 'Japanese',   icon: require('../assets/English.png') },
        { name: 'Korean',     icon: require('../assets/English.png') },
        { name: 'Portuguese', icon: require('../assets/English.png') },
        { name: 'Italian',    icon: require('../assets/English.png') },
        { name: 'Russian',    icon: require('../assets/English.png') },
    ]);

    // ✅ Handlers
    const handleAdd = (lang: string) => {
        setSelectedLanguages(prev => (prev.includes(lang) ? prev : [...prev, lang]));
    };

    const handleRemove = (lang: string) => {
        setSelectedLanguages(prev => prev.filter(l => l !== lang));
    };

    // ✅ Filtered list (sirf unselected + search)
    const filteredLanguages = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const base = allLanguages.filter(l => !selectedLanguages.includes(l.name));
        if (!q) return base;
        return base.filter(l => l.name.toLowerCase().includes(q));
    }, [allLanguages, searchQuery, selectedLanguages]);

    return (
        <View style={styles.bottomContainer}>

            <View style={styles.inputBoxserch}>
                <TextInput
                    style={styles.serchText}
                    placeholder='Search'
                    placeholderTextColor={"#3F897B"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Image source={require('../assets/Search.png')} style={styles.backButton} />
            </View>

            <View style={styles.containTextHeader}>
                <Text style={styles.selectedLanguageText}>{strings.UserAppLanguageScreen.selectedLanguage}</Text>

                {/* ✅ Selected list (use icon from allLanguages by name) */}
                {selectedLanguages.map((lang) => {
                    const icon =
                      allLanguages.find(l => l.name === lang)?.icon ||
                      require('../assets/English.png');
                    return (
                      <View key={`sel-${lang}`} style={styles.boxSelectedlanguge} >
                          <View style={styles.lagIconHeader}>
                              <Image source={icon} style={styles.backButton} />
                              <Text style={styles.langText}>{lang}</Text>
                          </View>
                          <TouchableOpacity onPress={() => handleRemove(lang)}>
                              <Image source={require('../assets/x.png')} style={styles.crossIcon} />
                          </TouchableOpacity>
                      </View>
                    );
                })}

                <Text style={styles.selectedLanguageText}>{strings.UserAppLanguageScreen.allLanguages}</Text>

            <View style={{backgroundColor:"red",height:"78%",
                marginTop:scale(10)
            }}>
                <FlatList
                    data={filteredLanguages}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.boxSelectedlangugeOne} >
                            <View style={styles.lagIconHeader}>
                                <Image source={item.icon} style={styles.backButton} />
                                <Text style={styles.langText}>{item.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleAdd(item.name)}>
                                <Image source={require('../assets/plus.png')} style={styles.crossIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: scale(20) }}
                    showsVerticalScrollIndicator={false}
                />
                </View>
            </View>
        </View>
    )
}

const UserAppLanguageScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserAppLanguageScreenHeader />
            <UserAppLanguageScreenMainContainer />
        </SafeAreaView>
    )
}

export default UserAppLanguageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1AC8B9',
        //    backgroundColor: '#97E6D4',
    },
    centerDataHeade: {
        marginHorizontal: scale(25)
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
    backButton: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
    },
    bottomContainer: {
        flex: 1,
        marginTop: "10%",
        borderTopRightRadius: scale(40),
        borderTopLeftRadius: scale(40),
        backgroundColor: '#B2EEDF',
        paddingTop: scale(20),
        // alignItems: 'center',
        overflow: 'visible',
        borderColor: "#FFFFFF",
        borderWidth: scale(2)
    },
    containText: {
        fontSize: scale(10),
        fontWeight: '600',
        color: '#007F66',
        marginHorizontal: scale(25),
    },
    inputBoxserch: {
        width: "90%",
        height: scale(45),
        backgroundColor: '#CFF4EB',
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#FFFFFF",
        borderWidth: scale(2),
        borderRadius: scale(30),
        justifyContent: "space-between",
        paddingHorizontal: scale(15),
        position: "absolute",
        top: scale(-20),
        alignSelf: 'center',
    },
    serchText: {
        color: "#3F897B",
        fontSize: scale(16),
        fontWeight: "400",
        width: "90%"
    },
    selectedLanguageText: {
        fontSize: scale(14),
        fontWeight: '600',
        color: '#00604D',
        marginTop: scale(20)
    },
    containTextHeader: {
        marginHorizontal: scale(25)
    },
    boxSelectedlanguge: {
        width: "100%",
        height: scale(35),
        borderRadius: scale(30),
        backgroundColor: "#57E2C7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(15),
        marginTop: scale(10),
        borderColor: "#00604D",
        borderWidth: scale(1)
    },
    boxSelectedlangugeOne: {
        width: "100%",
        height: scale(35),
        borderRadius: scale(30),
        backgroundColor: "#AFF7E8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(15),
        marginTop: scale(10),
        borderColor: "#00604D",
        borderWidth: scale(1)
    },
    lagIconHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    langText: {
        fontSize: scale(14),
        fontWeight: '600',
        color: '#00604D',
        marginLeft: scale(10)
    },
    crossIcon: {
        width: scale(17),
        height: scale(17),
        resizeMode: "contain"
    }
})
