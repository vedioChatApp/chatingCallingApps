import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import scale from '../components/Scale';
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

type HomeCurveScreenProps = {
  showChats: boolean; 
};
const HomeCurveScreen: React.FC<HomeCurveScreenProps> = ({ showChats }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const swiperRef = useRef<Swiper<any>>(null);

 const [chatData] = useState([
  { id: '1', name: 'User Name, 23', message: 'Kolkata', time: '09:41 AM', read: 'double-green' },
  { id: '2', name: 'User Name, 23', message: 'Kolkata', time: '09:45 AM', read: 'single' },
  { id: '3', name: 'User Name, 23', message: 'Kolkata', time: '09:48 AM', read: 'double' },
  { id: '4', name: 'User Name, 23', message: 'Kolkata', time: '10:02 AM', read: 'double-green' },
  { id: '5', name: 'User Name, 23', message: 'Kolkata', time: '10:15 AM', read: 'double' },
  { id: '6', name: 'User Name, 23', message: 'Kolkata', time: '10:27 AM', read: 'single' },
  { id: '7', name: 'User Name, 23', message: 'Kolkata', time: '10:39 AM', read: 'double-green' },
  { id: '8', name: 'User Name, 23', message: 'Kolkata', time: '10:52 AM', read: 'double' },
  { id: '9', name: 'User Name, 23', message: 'Kolkata', time: '11:05 AM', read: 'single' },
  { id: '10', name: 'User Name, 23', message: 'Kolkata', time: '11:18 AM', read: 'double-green' },
  { id: '11', name: 'User Name, 23', message: 'Kolkata', time: '11:21 AM', read: 'double' },
  { id: '12', name: 'User Name, 23', message: 'Kolkata', time: '11:34 AM', read: 'double-green' },
]);

  const renderChatItem = ({ item }: any) => {
    return (
      <>
        <View >
          <View style={styles.chatRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/chatUserImage.png')} style={styles.chatAvatar} />
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
            </View>
            <View style={styles.chatMeta}>
                <Image source={require('../assets/dislike.png')} style={styles.starVedIcon} />
                <Image source={require('../assets/homeCall.png')} style={styles.AudioCall} />
                <Image source={require('../assets/starVedi.png')} style={styles.starVedIcon} />
            </View>
          </View>
        </View>
        <View style={styles.secationLine} />
      </>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      {!showChats ? (
        <>
          <View style={{ marginRight: '15%', marginTop: scale(10), alignItems: 'center' }}>
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
                  infinite
                  onSwipedAll={() => swiperRef.current?.jumpToCardIndex(0)}
                />
              </View>
            </View>
          </View>

          {/* Bottom Action Buttons */}
          <View style={styles.controlButtonsRow}>
            <TouchableOpacity 
            // style={styles.sideButton}
             onPress={() => navigation.navigate('Chat')}>
              <Image source={require('../assets/dislike.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              // style={styles.middleButton}
              onPress={() => navigation.navigate('CallMain')}
            >
              <Image source={require('../assets/homeCall.png')} style={styles.callIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              // style={styles.sideButton}
              onPress={() => navigation.navigate('VideoCallMain')}
            >
              <Image source={require('../assets/starVedi.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{ height: '81%' }}>
            <FlatList
              data={chatData}
              renderItem={renderChatItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chatList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.overlayBackground}>
      <HeaderScreen onMenuPress={() => setDrawerVisible(true)} />
      <CustomDrawerModal visible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      {/* pass toggle state down */}
      <HomeCurveScreen showChats={isToggleOn} />

      <TouchableOpacity
     style={isToggleOn ? styles.fixedToggleClick : styles.fixedToggle}
        onPress={() => setIsToggleOn((prev) => !prev)}
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const CARD_WIDTH = scale(270);

const styles = StyleSheet.create({
  container: { flex: 1,
           backgroundColor: '#1AC8B9',
    // backgroundColor: '#1AC8B9'
   },
     overlayBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.44)',
},

  // back to original (no centering) so FlatList stays left-aligned
  bottomContainer: {
    flex: 1,
    marginTop: scale(20),
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    backgroundColor: '#B2F3ED',
    paddingTop: scale(20),
    overflow: 'visible',
       borderColor: "#FFFFFF",
        borderWidth: scale(2)
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

  // ✅ Pin to the screen's right edge so it never shifts
  fixedToggle: {
    position: 'absolute',
    top: '40%',
    right: scale(-5),         // <-- use right pin
    zIndex: 9999,
  },
    fixedToggleClick: {
    position: 'absolute',
    top: '36%',
    right: scale(-25),         // <-- use right pin
    zIndex: 9999,
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
  icon: { width: scale(63.09), height: scale(63.09), resizeMode: 'contain', },
  callIcon: { width: scale(80.08), height: scale(80.08), resizeMode: 'contain', },

  chatList: {
    paddingTop: scale(10),
    marginHorizontal: scale(25),
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(20),
  },
  chatAvatar: {
    width: scale(51.57),
    height: scale(56),
    borderRadius: scale(15),
    marginRight: scale(12),
  },
  starVedIcon:{
 width: scale(48.8),
    height:scale(48.8),
 resizeMode:"cover",
  },
    AudioCall: {
    width: scale(36.55),
    height: scale(36.55),
 resizeMode: 'contain',
  },
  chatContent: {},
  chatName: {
    fontSize: scale(16),
    fontWeight: '800',
    color: '#00604D',
  },
  chatMessage: {
    fontSize: scale(12),
    color: '#636363',
    fontWeight: '600',
    // marginTop: scale(5),
  },
  chatMeta: {
    alignItems: 'flex-end',
    // marginRight: scale(6),
    flexDirection:"row"
  },
  secationLine: {
    width: '85%',
    height: scale(1),
    borderColor: '#FFF',
    borderWidth: scale(1),
    marginTop: scale(10),
    alignSelf: 'center',
  },
});
