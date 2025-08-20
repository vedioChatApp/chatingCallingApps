import { StyleSheet, Text, View, SafeAreaView, Image,TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import strings from '../components/strings';

const UserTermsandConditionsScreenHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.personalDetailsHeader}>
            <View style={styles.backIconHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/x.png')} style={styles.backButton} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.personText}>{strings.UserTermsandConditionsScreen.TermsandConditionsofUse}</Text>
                    <Text style={styles.personTextBottenText}>Effective Date: August 8, 2025</Text>
                </View>
            </View>
        </View>
    )
}

const UserTermsandConditionsScreenMainContainer = () => {
    return (
        <View style={styles.bottomContainer}>
            <Text style={styles.containText}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

                Where can I get some?
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

                5
                paragraphs
                words
                bytes
                lists
                Start with 'Lorem
                ipsum dolor sit amet...'
            </Text>
        </View>
    )
}

const UserTermsandConditionsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlayBackground} >
            <UserTermsandConditionsScreenHeader />
            <UserTermsandConditionsScreenMainContainer />
            </View>
        </SafeAreaView>
    )
}

export default UserTermsandConditionsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1AC8B9',
          backgroundColor: '#1AC8B9',
    },
      overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
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
    personText: {
        fontSize: scale(18),
        fontWeight: '600',
        color: '#00604D',
        marginLeft: scale(20),
    },
    personTextBottenText: {
        fontSize: scale(10),
        fontWeight: '600',
        color: '#007F66',
        marginLeft: scale(20),
    },
    backButton: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
    },
    bottomContainer: {
        flex: 1,
        marginTop: scale(20),
        borderTopRightRadius: scale(40),
        borderTopLeftRadius: scale(40),
        backgroundColor: '#B2F3ED',
        paddingTop: scale(20),
        alignItems: 'center',
        overflow: 'visible',
        borderColor: "#FFFFFF",
        borderWidth: scale(2)
    },
    containText: {
        fontSize: scale(10),
        fontWeight: '600',
        color: '#007F66',
        marginHorizontal: scale(25),
    }

})
