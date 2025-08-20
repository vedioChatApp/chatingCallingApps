import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import scale from '../components/Scale';
import Images from './assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

const PermissionScreenHeader = () => {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Permission Required</Text>
    </SafeAreaView>
  );
};

const PermissionScreenContain = () => {
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.detailHeader}>
      <View style={styles.itemContainer}>
        <Image source={Images.location} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.desc}>Allow maps to access your location while you use the app?</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image source={Images.notifictionball} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Notifications</Text>
          <Text style={styles.desc}>Please enable notifications to receive updates and reminders</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image source={Images.cemraLogo} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Camera</Text>
          <Text style={styles.desc}>Use your camera for video calls and photo features.</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image source={Images.Microphone} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Microphone</Text>
          <Text style={styles.desc}>Allow microphone for voice and video call functionality.</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image source={Images.PhotoGallery} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Photo Gallery</Text>
          <Text style={styles.desc}>Allow access to upload or share photos within the app.</Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image source={Images.Contact} style={styles.icon} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Contact <Text style={{ fontWeight: '400' }}>(Optional)</Text></Text>
          <Text style={styles.desc}>Helps connect with friends and personalize your experience.</Text>
        </View>
      </View>

       <TouchableOpacity style={styles.buttonHeader} 
       onPress={()=>navigation.navigate('AllSetSignpScreen')}
       >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};
// const navigateToEmailAccountSignUP=()=>{
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   navigation.navigate('AllSetSignpScreen');
// }

const PermissionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlayBackground}>
        <PermissionScreenHeader />
        <PermissionScreenContain />

        {/* <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  },
  overlayBackground: {
        flex:2,
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
  },
  title: {
    fontSize: scale(24),
    fontWeight: '800',
    color: '#00604D',
    textAlign: 'center',
    marginTop: "25%",
    marginBottom: scale(25),
  },
  contentContainer: {
    // flex: 1,
    // gap: scale(12),
  },
  itemContainer: {
    flexDirection: 'row',
    // alignItems:"center"
    // alignItems: 'flex-start',
    // gap: scale(10),
    // alignSelf:"center",
    marginTop:scale(25)
  },
  icon: {
    width: scale(66),
    height: scale(52),
    resizeMode: 'contain',
    // marginTop: scale(5),
  },
  textBox: {
    marginLeft:scale(10)
  },
  label: {
    fontSize: scale(16),
    fontWeight: '800',
    color: '#00604D',
    // marginBottom: scale(4),
  },
  desc: {
    fontSize: scale(12),
    fontWeight: '500',
    color: '#373737',
    marginTop:scale(5),
    width:"84%",
  },
  doneButton: {
    backgroundColor: '#005F4D',
    paddingVertical: scale(12),
    alignItems: 'center',
    borderRadius: scale(25),
    marginBottom: scale(10),
  },
  doneText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '700',
  },
  detailHeader:{
    marginHorizontal:scale(25)
  },
    buttonHeader: {
      width: "60%",
      height: scale(50),
        backgroundColor: "#00604D",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: scale(24),
      alignSelf: "center",
      marginTop:"20%",
      borderColor: "#FFFFFF",
      borderWidth: scale(3)
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: scale(19),
      fontWeight: "700"
    },
});
