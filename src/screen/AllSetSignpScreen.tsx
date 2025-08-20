import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import scale from '../components/Scale';
import Images from './assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';

const AllSetcontainerScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.innerContainer}>
            <View style={styles.stackImagesWrapper}>
                <View style={styles.firstImageWrapper}>
          <Image source={Images.Union} style={styles.unionBg} />
          <Image source={Images.MaskGroup} style={styles.mainAvatar} />
        </View>

                <View style={styles.secondImageWrapper}>
                    <View style={styles.leftImageBox}>
                        <Image source={Images.Ellipse} style={styles.ellipseBg} />
                    </View>
                    <Image source={Images.Mask} style={styles.subAvatar} />
                </View>
            </View>
            <View style={styles.textButtonWrapper}>
        <View>
          <Text style={styles.title}>{strings.AllSetcontainerScreen.allset}</Text>
          <Text style={styles.subtitle}>{strings.AllSetcontainerScreen.getStarted}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>    navigation.navigate('Main', { screen: 'Home' })}>
          <Image source={Images.buttonRight} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
        </SafeAreaView>
    );
};

const AllSetSignpScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.overlayBackground}>
                <AllSetcontainerScreen />
            </View>
        </View>
    );
};

export default AllSetSignpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1AC8B9',
    },
    overlayBackground: {
        flex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
    },
    innerContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // paddingBottom: scale(40),
        // alignItems:"center",
        flex: 1,
        justifyContent: 'center',  // ✅ Center vertically
        //   alignItems: 'center',    
    },

    // ---------------- Image Stack ----------------
    stackImagesWrapper: {
        position: 'relative',
    },
    firstImageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    secondImageWrapper: {
        // position: 'absolute',
        // top: scale(110),
        // alignItems: 'center',
        // justifyContent: 'center',
        // zIndex: 1,
    },
    unionBg: {
        width: scale(279),
        height: scale(279),
        resizeMode: 'contain',
        position: 'absolute',
        top:scale(90),
        left:scale(20)
    },
    mainAvatar: {
        width: scale(196),
        height: scale(196),
        resizeMode: 'cover',
        top:scale(130),
        right:scale(40)
    },
    subAvatar: {
        width: scale(228),
        height: scale(228),
        resizeMode: "contain",
        position: 'absolute',
        top:scale(40),
        right: scale(-8)
    },
    textButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(25),
        alignItems: 'center',
        marginTop:"30%",
    },
    title: {
        fontSize: scale(56),
        fontWeight: '600',
        color: '#00604D',
        marginBottom: scale(5),
    },
    subtitle: {
        fontSize: scale(20),
        fontWeight: '500',
        color: '#00604D',
    },
    buttonImage: {
        width: scale(80),
        height: scale(80),
        resizeMode: 'contain',
        marginTop:scale(15),
        marginLeft:scale(90)
    },
    leftImageBox: {
        width: scale(280),
        height: scale(280),
        overflow: 'visible',
        alignItems: 'flex-end',  
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    ellipseBg: {
        width: scale(385),
        height: scale(385),
        resizeMode: 'contain',
        marginRight: "-22%",
    },
});
