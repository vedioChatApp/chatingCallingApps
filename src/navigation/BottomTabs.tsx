import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  Keyboard,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screen/HomeScreen';
import CallScreen from '../screen/CallScreen';
import VideoCallScreen from '../screen/VideoCallScreen';
import SettingsScreen from '../screen/SettingsScreen';
import ChatScreen from '../screen/ChatScreen';

import UserContactSupportScreen from '../screen/UserContactSupportScreen';
import UserFeedbackandSuggessions from '../screen/UserFeedbackandSuggessions';
import UserPrivacyPolicyScreen from '../screen/UserPrivacyPolicyScreen';
import UserTermsandConditionsScreen from '../screen/UserTermsandConditionsScreen';
import UserAppLanguageScreen from '../screen/UserAppLanguageScreen';
import UserHelpScreen from '../screen/UserHelpScreen';
import UserFAQScreen from '../screen/UserFAQScreen';
import UserReferandEarn from '../screen/UserReferandEarn'

// 👉 Home-like stack screens (shared in all stacks)
import UserFollowingScreen from '../screen/UserFollowingScreen';
import UserProfileScreen from '../screen/UserProfileScreen';
import UserPersonalDetails from '../screen/UserPersonalDetails';
import UserAboutMeScreen from '../screen/UserAboutMeScreen';
import UserTransactionHistory from '../screen/UserTransactionHistory';
import UserTopUpScreen from '../screen/UserTopUpScreen';
import UserMainChatScreen from '../screen/UserMainChatScreen';



import scale from '../components/Scale';
import { RootStackParamList } from './StackNavigator';

// -------------------- Types --------------------
export type BottomTabParamList = {
  Home: undefined;
  Call: undefined;
  VideoCall: undefined;
  Settings: undefined; // Settings tab will host SettingsStack
  Chat: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  UserContactSupportScreen: undefined;
  UserFeedbackandSuggessions: undefined;
  UserPrivacyPolicyScreen: undefined;
  UserTermsandConditionsScreen: undefined;
  UserAppLanguageScreen: undefined;
  UserHelpScreen: undefined;
  UserFAQScreen: undefined;
  UserReferandEarn: undefined;
};

// 👇 Home stack param list
export type HomeStackParamList = {
  HomeRoot: undefined; // maps to HomeScreen
  UserFollowingScreen: undefined;
  UserProfileScreen: undefined;
  UserPersonalDetails: undefined;
  UserAboutMeScreen: undefined;
  UserTopUpScreen: undefined;
  SettingsScreen: undefined;
  UserHelpScreen: undefined;
  UserFAQScreen: undefined;
  UserReferandEarn: undefined;
  UserContactSupportScreen: undefined;
  UserFeedbackandSuggessions: undefined;
  UserPrivacyPolicyScreen: undefined;
  UserTermsandConditionsScreen: undefined;
  UserAppLanguageScreen: undefined;
  UserTransactionHistory: undefined;
};

// 👇 Call stack param list
export type CallStackParamList = {
  CallRoot: undefined; // maps to CallScreen
  UserFollowingScreen: undefined;
  UserProfileScreen: undefined;
  UserPersonalDetails: undefined;
  UserAboutMeScreen: undefined;
  UserTopUpScreen: undefined;
  SettingsScreen: undefined;
  UserHelpScreen: undefined;
  UserFAQScreen: undefined;
  UserReferandEarn: undefined;
  UserContactSupportScreen: undefined;
  UserFeedbackandSuggessions: undefined;
  UserPrivacyPolicyScreen: undefined;
  UserTermsandConditionsScreen: undefined;
  UserAppLanguageScreen: undefined;
  UserTransactionHistory: undefined;
};

// 👇 VideoCall stack param list
export type VideoCallStackParamList = {
  VideoCallRoot: undefined; // maps to VideoCallScreen
  UserFollowingScreen: undefined;
  UserProfileScreen: undefined;
  UserPersonalDetails: undefined;
  UserAboutMeScreen: undefined;
  UserTopUpScreen: undefined;
  SettingsScreen: undefined;
  UserHelpScreen: undefined;
  UserFAQScreen: undefined;
  UserReferandEarn: undefined;
  UserContactSupportScreen: undefined;
  UserFeedbackandSuggessions: undefined;
  UserPrivacyPolicyScreen: undefined;
  UserTermsandConditionsScreen: undefined;
  UserAppLanguageScreen: undefined;
  UserTransactionHistory: undefined;
};

// 👇 Chat stack param list (hidden tab opened via FAB)
export type ChatStackParamList = {
  ChatRoot: undefined; // maps to ChatScreen
  UserFollowingScreen: undefined;
  UserProfileScreen: undefined;
  UserPersonalDetails: undefined;
  UserAboutMeScreen: undefined;
  UserTopUpScreen: undefined;
  SettingsScreen: undefined;
  UserHelpScreen: undefined;
  UserFAQScreen: undefined;
  UserReferandEarn: undefined;
  UserContactSupportScreen: undefined;
  UserFeedbackandSuggessions: undefined;
  UserPrivacyPolicyScreen: undefined;
  UserTermsandConditionsScreen: undefined;
  UserAppLanguageScreen: undefined;
  UserTransactionHistory: undefined;
  UserMainChatScreen: undefined;
};

// -------------------- Navigators --------------------
const Tab = createBottomTabNavigator<BottomTabParamList>();
const SettingsStackNav = createNativeStackNavigator<SettingsStackParamList>();

const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const CallStackNav = createNativeStackNavigator<CallStackParamList>();
const VideoCallStackNav = createNativeStackNavigator<VideoCallStackParamList>();
const ChatStackNav = createNativeStackNavigator<ChatStackParamList>();

// Stack used inside Settings tab
const SettingsStack = () => {
  return (
    <SettingsStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStackNav.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <SettingsStackNav.Screen
        name="UserContactSupportScreen"
        component={UserContactSupportScreen}
      />
      <SettingsStackNav.Screen
        name="UserFeedbackandSuggessions"
        component={UserFeedbackandSuggessions}
      />
      <SettingsStackNav.Screen
        name="UserPrivacyPolicyScreen"
        component={UserPrivacyPolicyScreen}
      />
      <SettingsStackNav.Screen
        name="UserTermsandConditionsScreen"
        component={UserTermsandConditionsScreen}
      />
      <SettingsStackNav.Screen
        name="UserAppLanguageScreen"
        component={UserAppLanguageScreen}
      />
      <SettingsStackNav.Screen
        name="UserHelpScreen"
        component={UserHelpScreen}
      />
      <SettingsStackNav.Screen
        name="UserFAQScreen"
        component={UserFAQScreen}
      />
      <SettingsStackNav.Screen
        name="UserReferandEarn"
        component={UserReferandEarn}
      />
    </SettingsStackNav.Navigator>
  );
};

// 👇 Stack used inside Home tab
const HomeStack = () => {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeRoot" component={HomeScreen} />
      <HomeStackNav.Screen name="UserFollowingScreen" component={UserFollowingScreen} />
      <HomeStackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <HomeStackNav.Screen name="UserPersonalDetails" component={UserPersonalDetails} />
      <HomeStackNav.Screen name="UserAboutMeScreen" component={UserAboutMeScreen} />
      <HomeStackNav.Screen name="UserTopUpScreen" component={UserTopUpScreen} />
      <HomeStackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <HomeStackNav.Screen name="UserHelpScreen" component={UserHelpScreen} />
      <HomeStackNav.Screen name="UserFAQScreen" component={UserFAQScreen} />
      <HomeStackNav.Screen name="UserReferandEarn" component={UserReferandEarn} />

      <HomeStackNav.Screen name="UserContactSupportScreen" component={UserContactSupportScreen} />
      <HomeStackNav.Screen name="UserFeedbackandSuggessions" component={UserFeedbackandSuggessions} />
      <HomeStackNav.Screen name="UserPrivacyPolicyScreen" component={UserPrivacyPolicyScreen} />
      <HomeStackNav.Screen name="UserTermsandConditionsScreen" component={UserTermsandConditionsScreen} />
      <HomeStackNav.Screen name="UserAppLanguageScreen" component={UserAppLanguageScreen} />
      <HomeStackNav.Screen name="UserTransactionHistory" component={UserTransactionHistory} />
    </HomeStackNav.Navigator>
  );
};

// 👇 Stack used inside Call tab
const CallStack = () => {
  return (
    <CallStackNav.Navigator screenOptions={{ headerShown: false }}>
      <CallStackNav.Screen name="CallRoot" component={CallScreen} />
      <CallStackNav.Screen name="UserFollowingScreen" component={UserFollowingScreen} />
      <CallStackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <CallStackNav.Screen name="UserPersonalDetails" component={UserPersonalDetails} />
      <CallStackNav.Screen name="UserAboutMeScreen" component={UserAboutMeScreen} />
      <CallStackNav.Screen name="UserTopUpScreen" component={UserTopUpScreen} />
      <CallStackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <CallStackNav.Screen name="UserHelpScreen" component={UserHelpScreen} />
      <CallStackNav.Screen name="UserFAQScreen" component={UserFAQScreen} />
      <CallStackNav.Screen name="UserReferandEarn" component={UserReferandEarn} />

      <CallStackNav.Screen name="UserContactSupportScreen" component={UserContactSupportScreen} />
      <CallStackNav.Screen name="UserFeedbackandSuggessions" component={UserFeedbackandSuggessions} />
      <CallStackNav.Screen name="UserPrivacyPolicyScreen" component={UserPrivacyPolicyScreen} />
      <CallStackNav.Screen name="UserTermsandConditionsScreen" component={UserTermsandConditionsScreen} />
      <CallStackNav.Screen name="UserAppLanguageScreen" component={UserAppLanguageScreen} />
      <CallStackNav.Screen name="UserTransactionHistory" component={UserTransactionHistory} />

    </CallStackNav.Navigator>
  );
};

// 👇 Stack used inside VideoCall tab
const VideoCallStack = () => {
  return (
    <VideoCallStackNav.Navigator screenOptions={{ headerShown: false }}>
      <VideoCallStackNav.Screen name="VideoCallRoot" component={VideoCallScreen} />
      <VideoCallStackNav.Screen name="UserFollowingScreen" component={UserFollowingScreen} />
      <VideoCallStackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <VideoCallStackNav.Screen name="UserPersonalDetails" component={UserPersonalDetails} />
      <VideoCallStackNav.Screen name="UserAboutMeScreen" component={UserAboutMeScreen} />
      <VideoCallStackNav.Screen name="UserTopUpScreen" component={UserTopUpScreen} />
      <VideoCallStackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <CallStackNav.Screen name="UserHelpScreen" component={UserHelpScreen} />
      <VideoCallStackNav.Screen name="UserFAQScreen" component={UserFAQScreen} />
      <CallStackNav.Screen name="UserReferandEarn" component={UserReferandEarn} />

      <CallStackNav.Screen name="UserContactSupportScreen" component={UserContactSupportScreen} />
      <CallStackNav.Screen name="UserFeedbackandSuggessions" component={UserFeedbackandSuggessions} />
      <CallStackNav.Screen name="UserPrivacyPolicyScreen" component={UserPrivacyPolicyScreen} />
      <CallStackNav.Screen name="UserTermsandConditionsScreen" component={UserTermsandConditionsScreen} />
      <CallStackNav.Screen name="UserAppLanguageScreen" component={UserAppLanguageScreen} />
      <CallStackNav.Screen name="UserTransactionHistory" component={UserTransactionHistory} />

    </VideoCallStackNav.Navigator>
  );
};

// 👇 Stack used inside Chat tab (hidden; opened via FAB)
const ChatStack = () => {
  return (
    <ChatStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ChatStackNav.Screen name="ChatRoot" component={ChatScreen} />
      <ChatStackNav.Screen name="UserMainChatScreen" component={UserMainChatScreen} />
      <ChatStackNav.Screen name="UserFollowingScreen" component={UserFollowingScreen} />
      <ChatStackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <ChatStackNav.Screen name="UserPersonalDetails" component={UserPersonalDetails} />
      <ChatStackNav.Screen name="UserAboutMeScreen" component={UserAboutMeScreen} />
      <ChatStackNav.Screen name="UserTopUpScreen" component={UserTopUpScreen} />
      <ChatStackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <CallStackNav.Screen name="UserHelpScreen" component={UserHelpScreen} />
      <CallStackNav.Screen name="UserContactSupportScreen" component={UserContactSupportScreen} />
      <CallStackNav.Screen name="UserFeedbackandSuggessions" component={UserFeedbackandSuggessions} />
      <CallStackNav.Screen name="UserPrivacyPolicyScreen" component={UserPrivacyPolicyScreen} />
      <CallStackNav.Screen name="UserTermsandConditionsScreen" component={UserTermsandConditionsScreen} />
      <CallStackNav.Screen name="UserAppLanguageScreen" component={UserAppLanguageScreen} />
      <ChatStackNav.Screen name="UserTransactionHistory" component={UserTransactionHistory} />

    </ChatStackNav.Navigator>
  );
};

// -------------------- Custom Tab Bar --------------------
const CustomTabBar = ({ state, descriptors }: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const chatTabIndex = state.routes.findIndex((r: any) => r.name === 'Chat');
  const isChatActive = state.index === chatTabIndex;

  // Hide tab bar when keyboard is visible
  const [kbVisible, setKbVisible] = useState(false);
  useEffect(() => {
    const showEvt = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvt = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const s1 = Keyboard.addListener(showEvt, () => setKbVisible(true));
    const s2 = Keyboard.addListener(hideEvt, () => setKbVisible(false));
    return () => {
      s1.remove();
      s2.remove();
      setKbVisible(false);
    };
  }, []);

  if (kbVisible) return null;

  return (
    <View style={styles.tabBarContainer}>
      <Image
        source={require('../assets/BG.png')}
        style={styles.tabBarBackground}
        resizeMode="stretch"
      />

      <View style={styles.tabBarContent}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          if (route.name === 'Chat') return null;

          const isFocused = state.index === index;

          const onPress = () => {
            // NOTE: Keep your parent Stack route name 'Main' as-is
            navigation.navigate('Main', { screen: route.name as any });
          };

          let icon;
          if (route.name === 'Home') icon = require('../assets/Home.png');
          else if (route.name === 'Call') icon = require('../assets/PhoneCall.png');
          else if (route.name === 'VideoCall') icon = require('../assets/Mdivideo.png');
          else if (route.name === 'Settings') icon = require('../assets/Settings.png');

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabButton,
                route.name === 'VideoCall' && { marginLeft: '25%' },
              ]}
              activeOpacity={0.8}
            >
              <Image
                source={icon}
                style={{
                  width: scale(24),
                  height: scale(24),
                  tintColor: isFocused ? '#a4d4d4' : '#ffffff',
                }}
              />
              <Text
                style={{
                  color: isFocused ? '#a4d4d4' : '#ffffff',
                  fontSize: scale(11),
                  marginTop: scale(4),
                }}
              >
                {route.name}
              </Text>
              {isFocused && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Floating Chat Button - Only icon color changes */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('Main', { screen: 'Chat' })}
        activeOpacity={0.8}
      >
        <View style={styles.fabOuterCircle}>
          <Image
            source={require('../assets/Phchat.png')}
            style={[
              styles.messageIcon,
              isChatActive && { tintColor: '#a4d4d4' },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// -------------------- Bottom Tabs --------------------
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* Home tab renders HomeStack */}
      <Tab.Screen name="Home" component={HomeStack} />

      {/* Call tab renders CallStack */}
      <Tab.Screen name="Call" component={CallStack} />

      {/* VideoCall tab renders VideoCallStack */}
      <Tab.Screen name="VideoCall" component={VideoCallStack} />

      {/* Settings tab renders SettingsStack */}
      <Tab.Screen name="Settings" component={SettingsStack} />

      {/* Hidden tab for Chat (opened via FAB) */}
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: scale(0),
    width: '100%',
    height: Platform.OS === 'ios' ? scale(100) : scale(90),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  tabBarBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scale(18),
    paddingBottom: Platform.OS === 'ios' ? scale(8) : 0,
    paddingHorizontal: scale(20),
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#a4d4d4',
    marginTop: scale(4),
    alignSelf: 'flex-start',
  },
  fabButton: {
    position: 'absolute',
    top: -scale(25),
    alignSelf: 'center',
    zIndex: 10,
  },
  fabOuterCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: '#00604D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  messageIcon: {
    width: scale(26),
    height: scale(26),
    tintColor: '#fff',
  },
});
