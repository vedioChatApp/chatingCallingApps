import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import scale from '../components/Scale';
import Swiper from 'react-native-deck-swiper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import HeaderScreen from '../components/HeaderScreen';
import CustomDrawerModal from '../components/CustomDrawer';

const { width } = Dimensions.get('window');

const profiles = [
  { name: 'User Name, 23', city: 'Kolkata', image: require('../assets/image1.jpg') },
  { name: 'User Name, 23', city: 'Mumbai',  image: require('../assets/image2.jpg') },
  { name: 'User Name, 23', city: 'Indore',  image: require('../assets/image3.jpg') },
];

const renderCard = (card: any) => (
  <View style={styles.card}>
    <ImageBackground
      source={card.image}
      style={styles.image}
      imageStyle={{ borderRadius: scale(20) }}
    >
      <View style={styles.cardFooter}>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.city}>{card.city}</Text>
      </View>
    </ImageBackground>
  </View>
);

const HomeScreenHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <Image source={require('../assets/DummyLogo.png')} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>Hi! Welcome Back</Text>
          <View style={styles.walletContainer}>
            <Image source={require('../assets/wallet.png')} style={styles.walletIcon} />
            <Text style={styles.walletText}>₹2000.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.bellWrapper}>
        <Image source={require('../assets/bell.png')} style={styles.bellIcon} />
      </View>
    </View>
  );
};

const HomeCurveScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isToggleOn, setIsToggleOn] = useState(false); // (kept, no UI change)

  // 👉 Swiper ref for looping
  const swiperRef = useRef<Swiper<any>>(null);

  return (
    <View style={styles.bottomContainer}>
      <View style={{ marginRight: '15%', marginTop: scale(10) }}>
        <View style={styles.swiperWrapper}>
          <View style={styles.swiperCardWrapper}>
            <Swiper
              ref={swiperRef}
              cards={profiles}
              renderCard={renderCard}
              cardIndex={0}
              backgroundColor="transparent"
              stackSize={3}
              stackScale={9}
              stackSeparation={-scale(30)}
              cardVerticalMargin={scale(20)}
              animateCardOpacity
              cardStyle={styles.card}
              containerStyle={styles.swiperInner}
              disableTopSwipe
              disableBottomSwipe
              swipeBackCard
              infinite        // if supported, keeps swiping forever
              onSwipedAll={() => {
                // fallback to ensure loop: jump back to first card
                swiperRef.current?.jumpToCardIndex(0);
              }}
            />
          </View>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.controlButtonsRow}>
        <TouchableOpacity style={styles.sideButton} onPress={() => navigation.navigate('Chat')}>
          <Image source={require('../assets/message.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.middleButton} onPress={() => navigation.navigate('CallMain')}>
          <Image source={require('../assets/Call.png')} style={styles.callIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideButton} onPress={() => navigation.navigate('VideoCallMain')}>
          <Image source={require('../assets/VideoCall.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
 const [isToggleOn, setIsToggleOn] = useState(false);
      const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* <HomeScreenHeader /> */}
      <HeaderScreen onMenuPress={() => setDrawerVisible(true)} />
        <CustomDrawerModal visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      <HomeCurveScreen />

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.fixedToggle}
        onPress={() => setIsToggleOn(prev => !prev)}
      >
        <Image
          source={
            isToggleOn
              ? require('../assets/ToggleIconON.png')
              : require('../assets/ToggleIcon.png')
          }
          style={{
            width: isToggleOn ? scale(120) : scale(60),
            height: isToggleOn ? scale(120) : scale(60),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const CARD_WIDTH = scale(270);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1AC8B9' },
  headerContainer: {
    marginTop: scale(20),
    marginHorizontal: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
  welcomeText: { fontSize: 18, fontWeight: 'bold', color: '#0B5345' },
  walletContainer: { flexDirection: 'row', alignItems: 'center' },
  walletIcon: { width: 16, height: 16, marginRight: 5 },
  walletText: { fontSize: 14, color: '#27AE60' },
  bellWrapper: { position: 'relative' },
  bellIcon: { width: scale(24), height: scale(24), resizeMode: 'contain' },

  bottomContainer: {
    flex: 1,
    marginTop: scale(20),
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    backgroundColor: '#B2F3ED',
    paddingTop: scale(20),
    alignItems: 'center',
    overflow: 'visible',
  },
  swiperWrapper: { height: scale(400), width: '90%', zIndex: 5 },
  swiperCardWrapper: {
    width: CARD_WIDTH,
    height: scale(380),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  swiperInner: { flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 0 },
  card: {
    width: CARD_WIDTH,
    height: scale(380),
    borderRadius: scale(20),
    alignSelf: 'center',
    marginHorizontal: scale(10),
  },
  image: { flex: 1, justifyContent: 'flex-end' },
  cardFooter: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  name: { color: 'white', fontSize: scale(18), fontWeight: 'bold' },
  city: { color: '#ccc', fontSize: scale(14) },

  fixedToggle: {
    position: 'absolute',
    top: '40%',
    transform: [{ translateY: -scale(30) }],
    left: CARD_WIDTH + scale(85),
    zIndex: 100,
    elevation: 10,
  },
  toggleImage: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
    marginLeft: scale(20),
  },
  controlButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(24),
    marginBottom: scale(20),
    gap: scale(30),
  },
  sideButton: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(27.5),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: { width: scale(24), height: scale(24), resizeMode: 'contain', tintColor: '#004D40' },
  callIcon: { width: scale(28), height: scale(28), resizeMode: 'contain', tintColor: '#00604D' },
});
