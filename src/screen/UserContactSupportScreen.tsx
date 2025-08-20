import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';

const UserContactSupportScreenHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.personalDetailsHeader}>
            <View style={styles.backIconHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.personText}>{strings.UserContactSupportScreen.contactSuppor}</Text>
            </View>
        </View>
    )
}

const UserContactSupportScreenBodyContainer = () => {
    const navigation = useNavigation();
    return (
        <View >
            <Image source={require('../assets/helpLogo.png')} style={styles.helpLogo} />
            <Text style={styles.helpLogoText}>{strings.UserContactSupportScreen.helpLogoText}</Text>
            <Text style={styles.subTittle}>{strings.UserContactSupportScreen.subTittle}</Text>
            <View style={styles.inputBox}>
                <TextInput
                    placeholder='Registered Email'
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    placeholder='Subject'
                />
            </View>
            <View style={styles.inputBoxTwo}>
                <TextInput
                    placeholder='Message'
                  multiline={true}
                />
            </View>
               <TouchableOpacity
        style={styles.buttonHeader}
      >
          <Text style={styles.buttonText}>{strings.UserContactSupportScreen.submit}</Text>
      </TouchableOpacity>
        </View>
    )
}
const UserContactSupportScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserContactSupportScreenHeader />
            <UserContactSupportScreenBodyContainer />
        </SafeAreaView>
    )
}

export default UserContactSupportScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1AC8B9',
    },
    personalDetailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: scale(25),
        marginTop: scale(20),
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
    helpLogo: {
        width: scale(185),
        height: scale(185),
        resizeMode: 'contain',
        alignSelf: "center",
        marginVertical: scale(22)
    },
    helpLogoText: {
        fontSize: scale(24),
        fontWeight: '700',
        color: '#00604D',
        textAlign: "center",
    },
    subTittle: {
        fontSize: scale(15),
        fontWeight: '400',
        color: '#00604D',
        textAlign: "center",
        width: "80%",
        alignSelf: "center",
        marginTop: scale(5),
        marginBottom:scale(10)
    },
    inputBox: {
        width: "80%",
        height: scale(45),
        backgroundColor: "rgb(185,238,226)",
        alignSelf: "center",
        borderWidth: scale(1),
        borderColor: "#FFFFFF",
        paddingHorizontal: scale(10),
        borderRadius: scale(8),
        marginTop: scale(10)

    },
     inputBoxTwo: {
        width: "80%",
        height: scale(95),
        backgroundColor: "rgb(185,238,226)",
        alignSelf: "center",
        borderWidth: scale(1),
        borderColor: "#FFFFFF",
        paddingHorizontal: scale(10),
        borderRadius: scale(8),
        marginTop: scale(10)

    },
      buttonHeader: {
        width: "50%",
        height: scale(50),
        backgroundColor: "#00604D",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: scale(24),
        alignSelf: "center",
        marginTop: scale(15),
        borderColor: "#FFFFFF",
        borderWidth: scale(3)
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: scale(19),
        fontWeight: "700"
      },
})
