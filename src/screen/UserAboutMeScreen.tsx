import { StyleSheet, View, SafeAreaView, Image, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React from 'react';
import scale from '../components/Scale';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserHeaderProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.personalDetailsHeader}>
            <View style={styles.backIconHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.personText}>{strings.UserAboutMeScreen.aboutMe}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.edit}>{strings.UserAboutMeScreen.edit}</Text>
            </TouchableOpacity>
        </View>
    );
};

const UserHeaderProfileScreenContainData = () => {
    // ✅ Dummy data for each section
    const hobbiesData = [
        { id: '1', title: 'Traveling', icon: require('../assets/Traveling.png') },
        { id: '2', title: 'Reading',   icon: require('../assets/ReadingIcon.png') },
    ];

    const interestsData = [
        { id: '1', title: 'Photography', icon: require('../assets/ReadingIcon.png') },
        { id: '2', title: 'Cooking',     icon: require('../assets/Traveling.png') },
    ];

    const musicData = [
        { id: '1', title: 'Pop',       icon: require('../assets/ReadingIcon.png') },
        { id: '2', title: 'Classical', icon: require('../assets/Traveling.png') },
    ];

    const religionData = [
        { id: '1', title: 'Hindu',  icon: require('../assets/ReadingIcon.png') },
        { id: '2', title: 'Muslim', icon: require('../assets/Traveling.png') },
    ];

    const languageData = [
        { id: '1', title: 'English', icon: require('../assets/ReadingIcon.png') },
        { id: '2', title: 'Hindi',   icon: require('../assets/Traveling.png') },
    ];

    const renderItem = ({ item }: { item: { id: string; title: string; icon: any } }) => (
        <View style={styles.travllingBox}>
            <Image source={item.icon} style={styles.logoIcon} />
            <Text style={styles.HobbiesTextWithlogo}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.backIconHeaders}>
            {/* Hobbies */}
            <View style={styles.mainContainerOne}>
                <Image source={require('../assets/interest.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Hobbies</Text>
            </View>
            <View style={styles.mainContainerHobbies}>
                <FlatList
                    data={hobbiesData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>

            {/* Interests */}
            <View style={styles.mainContainer}>
                <Image source={require('../assets/interests.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Interests</Text>
            </View>
            <View style={styles.mainContainerHobbies}>
                <FlatList
                    data={interestsData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>

            {/* Music Tastes */}
            <View style={styles.mainContainer}>
                <Image source={require('../assets/basilmusic.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Music Tastes</Text>
            </View>
            <View style={styles.mainContainerHobbies}>
                <FlatList
                    data={musicData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>

            {/* Religion */}
            <View style={styles.mainContainer}>
                <Image source={require('../assets/mdireligion.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Religion</Text>
            </View>
            <View style={styles.mainContainerHobbies}>
                <FlatList
                    data={religionData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>

            {/* Language */}
            <View style={styles.mainContainer}>
                <Image source={require('../assets/falanguage.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Language</Text>
            </View>
            <View style={styles.mainContainerHobbies}>
                <FlatList
                    data={languageData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>

            {/* Address (as-is, no list) */}
            <View style={styles.mainContainerLast}>
                <Image source={require('../assets/locationthin.png')} style={styles.backButton} />
                <Text style={styles.HobbiesText}>Address</Text>
            </View>
        </View>
    );
};

const UserAboutMeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlayBackground}>
            <UserHeaderProfileScreen />
            <View style={styles.containMainHeader}>
                <UserHeaderProfileScreenContainData />
            </View>
            </View>
        </SafeAreaView>
    );
};

export default UserAboutMeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#8AE6CE',
          backgroundColor: '#1AC8B9',
        // backgroundColor: '#1AC8B9',

    },
      overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
},
    backButton: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
    },
    personText: {
        fontSize: scale(18),
        fontWeight: '600',
        color: '#00604D',
        marginLeft: scale(20),
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
    edit: {
        fontSize: scale(15),
        fontWeight: '700',
        color: '#00604D',
    },
    mainContainer: {
        padding: scale(15),
        backgroundColor: '#B2ECDE',
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainContainerOne: {
        padding: scale(15),
        backgroundColor: '#B2ECDE',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: scale(15),
        borderTopEndRadius: scale(15)
    },
    mainContainerLast: {
        padding: scale(15),
        backgroundColor: '#B2ECDE',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: scale(15),
        borderBottomEndRadius: scale(15),
    },
    mainContainerHobbies: {
        padding: scale(15),
        backgroundColor: '#A3E9D8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    containMainHeader: {
        marginHorizontal: scale(25)
    },
    HobbiesText: {
        fontSize: scale(14),
        fontWeight: "500",
        color: "#00604D",
        paddingHorizontal: scale(20)
    },
    HobbiesTextWithlogo: {
        fontSize: scale(14),
        fontWeight: "600",
        color: "#00604D",
        padding: scale(5)
    },
    travllingBox: {
        borderColor: "#00604D",
        borderWidth: scale(0.5),
        backgroundColor: "#A3F0DF",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: scale(20),
        paddingHorizontal: scale(10),
        marginRight: scale(5)
    },
    logoIcon: {
        width: scale(20),
        height: scale(20),
        resizeMode: "contain"
    }
});
