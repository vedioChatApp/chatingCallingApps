import { StyleSheet, View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import scale from '../components/Scale';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserHeaderProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.personalDetailsHeader} >
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <Image source={require('../assets/back.png')} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.personText}>{strings.UserProfileScreen.personalDetails}</Text>
        </View>
    );
};
const UserPersonalDetailsContain = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.containerHeader}>
            <Image
                source={require('../assets/GroupIcons.png')}
                style={styles.groupIcons}
            />
            <View style={styles.personalBox}>
                <View style={styles.menuItem}>
                    <View style={styles.vlineHeader}>
                        <Image source={require('../assets/ProfileIcon.png')} style={styles.profileIcon} />
                        <Text style={styles.menuText}>{strings.UserPersonalDetails.name}</Text>
                    </View>
                    <View style={styles.vlineHeaderSecond}>
                        <View style={styles.vline} />
                        <Text style={styles.menuTextUser}>Suraiya Parvin</Text>
                    </View>
                </View>
                   <View style={styles.menuItem}>
                    <View style={styles.vlineHeader}>
                        <Image source={require('../assets/email.png')} style={styles.profileIcon} />
                        <Text style={styles.menuText}>{strings.UserPersonalDetails.email}</Text>
                    </View>
                    <View style={styles.vlineHeaderSecond}>
                        <View style={styles.vline} />
                        <Text style={styles.menuTextUser}>suraiya@gmail.com</Text>
                    </View>
                </View>
                   <View style={styles.menuItem}>
                    <View style={styles.vlineHeader}>
                        <Image source={require('../assets/phone.png')} style={styles.profileIcon} />
                        <Text style={styles.menuText}>{strings.UserPersonalDetails.phone}</Text>
                    </View>
                    <View style={styles.vlineHeaderSecond}>
                        <View style={styles.vline} />
                        <Text style={styles.menuTextUser}>+91 9876543210</Text>
                    </View>
                </View>
                     <View style={styles.menuItem}>
                    <View style={styles.vlineHeader}>
                        <Image source={require('../assets/gender.png')} style={styles.profileIcon} />
                        <Text style={styles.menuText}>{strings.UserPersonalDetails.gender}</Text>
                    </View>
                    <View style={styles.vlineHeaderSecond}>
                        <View style={styles.vline} />
                        <Text style={styles.menuTextUser}>Female</Text>
                    </View>
                </View>
                     <View style={styles.menuItemLast}>
                    <View style={styles.vlineHeader}>
                        <Image source={require('../assets/cake.png')} style={styles.profileIcon} />
                        <Text style={styles.menuText}>{strings.UserPersonalDetails.dob}</Text>
                    </View>
                    <View style={styles.vlineHeaderSecond}>
                        <View style={styles.vline} />
                        <Text style={styles.menuTextUser}>02/05/2022</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const UserPersonalDetails = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserHeaderProfileScreen />
            <UserPersonalDetailsContain />
        </SafeAreaView>
    );
};

export default UserPersonalDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8AE6CE',
    },
    backButton: {
        width: scale(24),
        height: scale(24),
        resizeMode: "contain"
    },
    personText: {
        fontSize: scale(18),
        fontWeight: "600",
        color: "#00604D",
        marginLeft: scale(20)
    },
    personalDetailsHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: scale(25),
        marginTop: scale(20),
        marginBottom: scale(25)
    },
    groupIcons: {
        width: scale(165),
        height: scale(165),
        resizeMode: "cover",
        borderRadius: scale(165 / 2),
        alignSelf: "center",
        marginVertical: scale(25)
    },
    personalBox: {
        width: '100%',
        borderColor: '#FFFF',
        borderWidth: scale(2),
        marginTop: '10%',
        borderRadius: scale(15),
        backgroundColor: '#C5F1E7',
    },
    mainBodyHeader: {
        marginHorizontal: scale(25),
    },
    profileIcon: {
        width: scale(20),
        height: scale(20),
        resizeMode: 'contain',
        marginRight: '8%',
        marginLeft: '20%',
    },
    menuText: {
        fontSize: scale(18),
        color: '#00604D',
        fontWeight: '500',
        marginLeft: scale(10),
        marginRight: scale(-20)
    },
    menuTextUser: {
        fontSize: scale(18),
        color: '#60998E',
        fontWeight: '500',
        marginLeft: scale(20)
    },
    vline: {
        width: scale(1),
        height: scale(18),
        borderColor: "#60998E",
        borderWidth: scale(0.5)
    },
    vlineHeader: {
        flexDirection: "row",
        alignItems: "center",
            width:scale(150)
    },
     vlineHeaderSecond: {
        flexDirection: "row",
        alignItems: "center",

    },
    menuItem: {
        paddingVertical: scale(15),
        borderBottomWidth: scale(0.8),
        borderBottomColor: '#7EABA2C4',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemLast: {
        paddingVertical: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerHeader: {
        marginHorizontal: scale(25)
    }
});
