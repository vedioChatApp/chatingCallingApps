import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import scale from '../components/Scale';
import { DrawerActions, useNavigation } from '@react-navigation/native';


const HeaderScreen =  ({ onMenuPress }: { onMenuPress: () => void })=> {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.overlayBackground} >
     <View style={styles.headerContainer}>
          <View style={styles.leftSection}>
         <TouchableOpacity onPress={onMenuPress}>
  <Image source={require('../assets/DummyLogo.png')} style={styles.avatar} />
</TouchableOpacity>
            <View>
              <Text style={styles.welcomeText}>Hi! Welcome Back</Text>
              <View style={styles.walletContainer}>
                <Image source={require('../assets/wallet.png')} style={styles.walletIcon} />
                <Text style={styles.walletText}>₹2000.00</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.bellWrapper}>
            <Image source={require('../assets/bell.png')} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>
        </View>
                </View>
  )
}

export default HeaderScreen

const styles = StyleSheet.create({
  container:{
flex: 0.15,
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
   headerContainer: {
      marginTop: "12%",
      marginHorizontal: scale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      marginRight: 10,
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0B5345',
    },
    walletContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletIcon: {
      width:scale(16),
      height:scale(16),
      marginRight:scale(5),
    },
    walletText: {
      fontSize:scale(14),
      color: '#27AE60',
    },
    bellWrapper: {
      position: 'relative',
    },
    bellIcon: {
      width: scale(24),
      height: scale(24),
      resizeMode: 'contain',
    },
})