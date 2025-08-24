import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Swipeable } from 'react-native-gesture-handler';
import HeaderScreen from '../components/HeaderScreen';
import CustomDrawerModal from '../components/CustomDrawer';

const ChatScreenCurveScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const users = [
    { id: '1', name: 'User...', image: require('../assets/chatUserImage.png') },
    { id: '2', name: 'User...', image: require('../assets/chatUserImage.png') },
    { id: '3', name: 'User...', image: require('../assets/chatUserImage.png') },
    { id: '4', name: 'User...', image: require('../assets/chatUserImage.png') },
    { id: '5', name: 'User...', image: require('../assets/chatUserImage.png') },
  ];

  const [chatData, setChatData] = useState([
    { id: '1', name: 'User Name', message: 'Hi there!', time: '05:10 PM', read: 'double-green' },
    { id: '2', name: 'User Name', message: 'Hi there!', time: '05:10 PM', read: 'single' },
    { id: '3', name: 'User Name', message: 'Hi there!', time: '05:10 PM', read: 'double' },
    { id: '4', name: 'User Name', message: 'Hi there!', time: '05:10 PM', read: 'double' },
  ]);

  const handleDelete = () => {
    if (chatToDelete) {
      const updated = chatData.filter(item => item.id !== chatToDelete);
      setChatData(updated);
      setModalVisible(false);
      setChatToDelete(null);
    }
  };

  const renderRightActions = (item: any) => (
    <View style={styles.swipeActionContainer}>
      <Pressable
        onPress={() => {
          setChatToDelete(item.id);
          setModalVisible(true);
        }}
        style={styles.deleteActionButton}>
        <Image
          source={require('../assets/delete.png')}
          style={styles.deleteIcon}
        />
      </Pressable>
    </View>
  );

  const renderChatItem = ({ item }: any) => (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("UserMainChatScreen")}>
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <View style={styles.chatRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require('../assets/chatUserImage.png')} style={styles.chatAvatar} />
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.chatTime}>{item.time}</Text>
              <Image
                source={
                  item.read === 'double-green'
                    ? require('../assets/doublegreen.png')
                    : item.read === 'double'
                      ? require('../assets/doublegreen.png')
                      : require('../assets/singlegrey.png')
                }
                style={styles.tickIcon}
              />
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
      <View style={styles.secationLine} />
    </>
  );

  const renderDeleteModal = () => (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalBox}>
          <Image
            source={require('../assets/deleteMessage.png')}
            style={{ width: 60, height: 60, alignSelf: 'center' }}
          />
          <Text style={styles.modalTitle}>Delete message?</Text>
          <Text style={styles.modalSubtitle}>
            Do you really want to delete this conversation?
          </Text>
          <View style={styles.modalActions}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.deleteButtonModal}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );


  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.startChatLabel}>Start A New Chat</Text>
      <View style={styles.flatListHeader}>
        <FlatList
          horizontal
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: scale(10) }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.searchContainer}>
        <Image source={require('../assets/Search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#00604D"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={{ height: "68%" }}>
        <FlatList
          data={chatData}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {renderDeleteModal()}
    </View>
  );
};

const renderItem = ({ item }: any) => (
  <View style={styles.profileWrapper}>
    <View style={styles.imageBorder}>
      <Image source={item.image} style={styles.imageStyle} />
    </View>
    <Text style={styles.nameText}>{item.name}</Text>
  </View>
);

const ChatScreen = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.overlayBackground} >
          <HeaderScreen onMenuPress={() => setDrawerVisible(true)} />
          <CustomDrawerModal visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
          <ChatScreenCurveScreen />
        </View>
      </SafeAreaView>
    </>
  )
};

export default ChatScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bottomContainer: {
    flex: 1,
    // marginTop: scale(20),
    borderTopRightRadius: scale(50),
    borderTopLeftRadius: scale(50),
    backgroundColor: '#B2F3ED',
    paddingTop: scale(10),
    // alignItems: 'center',
    overflow: 'visible',
  },
  startChatLabel: {
    fontSize: scale(12),
    fontWeight: '500',
    color: '#00604D',
    marginLeft: scale(25),
    marginTop: scale(10)
  },
  chatUserImageStyle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    resizeMode: 'contain',
  },
  profileWrapper: {
    alignItems: 'center',
    marginRight: scale(14),
  },
  imageBorder: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFD966',
  },
  imageStyle: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(52 / 2),
    resizeMode: 'cover',
  },
  nameText: {
    marginTop: scale(6),
    color: '#333',
    fontSize: scale(11),
  },
  flatListHeader: {
    width: "97%",
    alignSelf: "center",
    marginTop: scale(10)
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C5F2EB',
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(20),
    marginTop: scale(14),
    height: scale(42),
    borderWidth: 1,
    borderColor: "#FFFF"
  },
  searchIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10),
    tintColor: '#00604D',
  },
  searchInput: {
    fontSize: scale(12),
    color: '#00604D',
    fontWeight: "600"
  },
  chatList: {
    paddingTop: scale(10),
    marginHorizontal: scale(25),

  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: scale(20),
  },
  chatAvatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    marginRight: scale(12),
    borderColor: "#FFF",
    borderWidth: 2
  },
  chatContent: {
    // flex: 1,
    // borderBottomWidth: 0.,
    // borderBottomColor: '#FFFF',
    // paddingBottom: scale(20),
  },
  chatName: {
    fontSize: scale(16),
    fontWeight: '800',
    color: '#00604D',
  },
  chatMessage: {
    fontSize: scale(12),
    color: '#636363',
    fontWeight: "600",
    marginTop: scale(5)

  },
  chatMeta: {
    alignItems: 'flex-end',
    marginRight: scale(6),
  },
  chatTime: {
    fontSize: scale(10),
    color: '#636363',
    fontWeight: "600"


  },
  tickIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginTop: scale(2),
  },

  secationLine: {
    width: "85%",
    height: scale(1),
    borderColor: "#FFF",
    borderWidth: scale(1),
    marginTop: scale(10),
    alignSelf: "center"
  },
  swipeActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(10),
    marginRight: scale(10),
  },

  deleteActionButton: {
    borderRadius: scale(24),
  },

  deleteIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: 'red',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // slightly more blur-like dark bg
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: scale(328),
    height: scale(272),
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    borderRadius: scale(40),
    padding: scale(20),
    borderWidth: scale(2.5),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    marginTop: scale(16),
    color: '#00604D',
  },

  modalSubtitle: {
    fontSize: scale(14),
    color: '#019175',
    textAlign: 'center',
    marginTop: scale(15),
    fontWeight: '600',
  },

  modalActions: {
    flexDirection: 'row',
    marginTop: scale(30),
    width: '100%',
    justifyContent: 'space-between',
  },

  cancelButton: {
    alignItems: 'center',
    width: "47%",
    height: scale(44),
    backgroundColor: "#FFFF",
    justifyContent: "center",
    borderRadius: scale(16)
  },

  deleteButtonModal: {
    backgroundColor: '#E52030',
    alignItems: 'center',
    width: "47%",
    height: scale(44),
    justifyContent: "center",
    borderRadius: scale(16)
  },

  cancelText: {
    color: '#010101',
    fontWeight: '700',
    fontSize: scale(16),
  },

  deleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scale(16),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // creates dark blur-like effect
    justifyContent: 'center',
    alignItems: 'center',
  },


})