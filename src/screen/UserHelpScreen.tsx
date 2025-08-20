import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import strings from '../components/strings';

const UserHelpScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.UserHelpScreen.help}</Text>
      </View>
    </View>
  )
}

const UserHelpScreenMainContainer = () => {
    const navigation = useNavigation();
  const [isNotifOn, setIsNotifOn] = useState(true);
  return (
    <View style={styles.centerDataHeade}>
      <View style={styles.mainheaderContainer} >
        <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("UserFAQScreen")}>
              <View style={styles.header}>
          <View style={styles.notificationHeader}>
            <Image source={require('../assets/privacyLock.png')} style={styles.profileIcon} />
            <Text style={styles.menuText}>{strings.UserHelpScreen.fAQ}</Text>
          </View>
          <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcon} />
       </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate("UserTermsandConditionsScreen")}>
              <View style={styles.header}>
          <View style={styles.notificationHeader}>
            <Image source={require('../assets/privacyLock.png')} style={styles.profileIcon} />
            <Text style={styles.menuText}>{strings.UserHelpScreen.userGuide}</Text>
          </View>
          <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}onPress={()=>navigation.navigate("UserContactSupportScreen")}>
            <View style={styles.header}>
          <View style={styles.notificationHeader}>
            <Image source={require('../assets/fluentfilled.png')} style={styles.profileIcon} />
            <Text style={styles.menuText}>{strings.UserHelpScreen.contactSupport}</Text>
          </View>
          <View>
            <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcon} />
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemLast}onPress={()=>navigation.navigate("UserFeedbackandSuggessions")}>
            <View style={styles.header}>
          <View style={styles.notificationHeader}>
            <Image source={require('../assets/language.png')} style={styles.profileIcon} />
            <Text style={styles.menuText}>{strings.UserHelpScreen.feedbackandSuggessions}</Text>
          </View>
          <Image source={require('../assets/weuibackoutlined.png')} style={styles.switchONIcon} />
          </View>
        </TouchableOpacity>
     </View>
    </View>
  )
}

const UserHelpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserHelpScreenHeader />
      <UserHelpScreenMainContainer />
    </SafeAreaView>
  )
}

export default UserHelpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  },
  centerDataHeade: {
    marginHorizontal: scale(25)
  },
  mainheaderContainer: {
    width: '100%',
    // padding: scale(20),
    borderColor: '#FFFF',
    borderWidth: scale(2),
    marginTop: '10%',
    borderRadius: scale(15),
    backgroundColor: '#C5F1E7',
  },
  headerContainer: {
    backgroundColor: "red"
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
  backButton: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: scale(18),
    color: '#00604D',
    fontWeight: '500',
  },
  menuItem: {
    paddingVertical: scale(15),
       borderBottomWidth: scale(0.5),
            borderBottomColor: '#7EABA2C4',
            
  },
    menuItemLast: {
    paddingVertical: scale(15),
  },
  profileIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    marginRight: '6%',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchONIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  header:{marginHorizontal: scale(15),
    flexDirection:"row",alignItems:"center",justifyContent:"space-between",}

})
