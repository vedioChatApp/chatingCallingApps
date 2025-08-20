import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import scale from '../components/Scale';
import React, { useState, useMemo } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import strings from '../components/strings';

type Language = {
  name: string;
  icon: any; 
};

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const UserFAQScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.UserFAQScreen.fAQ}</Text>
      </View>
    </View>
  )
}

const UserFAQScreenMainContainer = () => {
  // ✅ States
  const [searchQuery, setSearchQuery] = useState('');
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [faqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'What is JOYNT?',
      answer:
        'JOYNT is a premium dating app that connects individuals through video calling, voice calls, and chat features. Our platform is designed for genuine connections and offers a secure environment to interact with others.',
    },
     {
      id: '2',
      question: 'What is JOYNT?',
      answer:
        'JOYNT is a premium dating app that connects individuals through video calling, voice calls, and chat features. Our platform is designed for genuine connections and offers a secure environment to interact with others.',
    },
     {
      id: '3',
      question: 'What is YourName',
      answer:
        'JOYNT is a premium dating app that connects individuals through video calling, voice calls, and chat features. Our platform is designed for genuine connections and offers a secure environment to interact with others.',
    },
  ]);
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(item =>
      item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const isOpen = !!openMap[item.id];
    return (
      <View style={styles.anwersBox}>
        <View style={styles.hederQuation}>
          <Text style={styles.langText}>{item.question}</Text>

          <TouchableOpacity
            style={styles.openButtonHeader}
            onPress={() => toggleItem(item.id)}
            activeOpacity={0.8}
          >
            <Image
              source={
                isOpen
                  ? require('../assets/lsiconUP.png')      // ↑ icon when open
                  : require('../assets/lsicondown.png')    // ↓ icon when closed
              }
              style={styles.openicon}
            />
          </TouchableOpacity>
        </View>

        {isOpen && (
          <Text style={styles.langTextanswes}>
            {item.answer}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.inputBoxserch}>
        <TextInput
          style={styles.serchText}
          placeholder='Search'
          placeholderTextColor={"#3F897B"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={require('../assets/Search.png')} style={styles.backButton} />
      </View>

 <View style={styles.flatListHeader}>
      <FlatList
        data={filteredFaqs}
        keyExtractor={(item) => item.id}
        renderItem={renderFAQItem}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  )
}

const UserFAQScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground} >
      <UserFAQScreenHeader />
      <UserFAQScreenMainContainer />
      </View>
    </SafeAreaView>
  )
}

export default UserFAQScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
    //    backgroundColor: '#97E6D4',
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
  backButton: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 1,
    marginTop: "10%",
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    backgroundColor: '#B2EEDF',
    paddingTop: scale(20),
    // alignItems: 'center',
    overflow: 'visible',
    borderColor: "#FFFFFF",
    borderWidth: scale(2)
  },
  containText: {
    fontSize: scale(10),
    fontWeight: '600',
    color: '#007F66',
    marginHorizontal: scale(25),
  },
  inputBoxserch: {
    width: "90%",
    height: scale(45),
    backgroundColor: '#CFF4EB',
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: scale(2),
    borderRadius: scale(30),
    justifyContent: "space_between",
    paddingHorizontal: scale(15),
    position: "absolute",
    top: scale(-20),
    alignSelf: 'center',
  },
  serchText: {
    color: "#3F897B",
    fontSize: scale(16),
    fontWeight: "400",
    width: "90%"
  },
  personText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#00604D',
    marginLeft: scale(20),
  },
  anwersBox:{
    width: "90%",
    borderRadius: scale(30),
    backgroundColor: '#CFF4EB',
    padding:scale(15),
    marginTop:scale(10),
    marginHorizontal:scale(25)
  },
  langText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#00604D',
    width:"90%"
  },
  langTextanswes: {
    fontSize: scale(13),
    fontWeight: '400',
    color: '#00604D',
    marginTop: scale(5),
    lineHeight:scale(22)
  },
  openButtonHeader:{
    width:scale(16),
    height:scale(16),
    borderRadius:scale(8),
    backgroundColor:"#00604D",
    justifyContent:"center",
    alignItems:"center"
  },
  openicon:{
    width:scale(16),
    height:scale(16),
    resizeMode:"contain"
  },
  hederQuation:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  flatListHeader:{
    paddingVertical:scale(15)
  }
});
