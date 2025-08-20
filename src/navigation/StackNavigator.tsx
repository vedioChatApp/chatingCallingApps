import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBordScreen from '../screen/OnBordScreen';
import EmailAccountLogin from '../screen/EmailAccountLogin';
import EmailAccountSignup from '../screen/EmailAccountSignup';
import SetPasswordScreen from '../screen/SetPasswordScreen';
import UpdateProfileScreen from '../screen/UpdateProfileScreen';
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen';
import SetNewpasswordScreen from '../screen/SetNewpasswordScreen';
import OTPScreen from '../screen/OTPScreen';
import BottomTabs from './BottomTabs';
import VideoCallMain from '../screen/VideoCallMain';
import HobbiesScreen from '../screen/HobbiesScreen';
import CallMain from '../screen/CallMain.';
import InterestsScreen from '../screen/InterestsScreen';
import MusictasScreen from '../screen/MusictasScreen';
import ReligionScreen from '../screen/ReligionScreen';
import LanguageScreen from '../screen/LanguageScreen';
import UpdateAllDetailScreen from '../screen/UpdateAllDetailScreen';
import PermissionScreen from '../screen/PermissionScreen';
import AllSetSignpScreen from '../screen/AllSetSignpScreen';
import UserMainChatScreen from '../screen/UserMainChatScreen';
// import UserProfileScreen from '../screen/UserProfileScreen';
// import UserPersonalDetails from '../screen/UserPersonalDetails'
import UserchangePassword from "../screen/UserchangePassword"
// import UserAboutMeScreen from "../screen/UserAboutMeScreen";
import UserchangePasswordTwo from "../screen/UserchangePasswordTwo";
import UserPrivacyPolicyScreen from "../screen/UserPrivacyPolicyScreen";
import UserTermsandConditionsScreen from "../screen/UserTermsandConditionsScreen"
import UserAppLanguageScreen from "../screen/UserAppLanguageScreen"
import UserHelpScreen from "../screen/UserHelpScreen";
import UserFAQScreen from "../screen/UserFAQScreen";
// import SettingsScreen from "../screen/SettingsScreen"


// import HeaderScreen from '../components/HeaderScreen';
import DrawerNavigator from './DrawerNavigator';


// import CallMain from '../screen/CallMain';
// import Chat from '../screen/Chat'; // Uncomment if Chat screen exists

export type RootStackParamList = {
  OnBordScreen: undefined;
  EmailAccountLogin: undefined;
  EmailAccountSignup: undefined;
  SetPasswordScreen: undefined;
  UpdateProfileScreen: undefined;
  ForgotPasswordScreen: undefined;
  SetNewpasswordScreen: undefined;
  OTPScreen: undefined;
  Main: undefined;
  CallMain: undefined;
  VideoCallMain: undefined;
  Chat?: undefined;
  HobbiesScreen?:undefined;
  InterestsScreen?:undefined;
  MusictasScreen?:undefined;
  ReligionScreen?:undefined;
  LanguageScreen?:undefined;
  UpdateAllDetailScreen?:undefined;
  PermissionScreen?:undefined;
  AllSetSignpScreen?:undefined;
  UserMainChatScreen?:undefined;
  // UserProfileScreen?:undefined;
  // HeaderScreen?:undefined;
  DrawerNavigator?:undefined;
  // UserPersonalDetails?:undefined;
  UserchangePassword?:undefined;
  // UserAboutMeScreen?:undefined;
  UserchangePasswordTwo?:undefined;
  UserPrivacyPolicyScreen?:undefined;
  UserTermsandConditionsScreen?:undefined;
  UserAppLanguageScreen?:undefined;
  UserHelpScreen?:undefined;
  UserFAQScreen?:undefined;
  // SettingsScreen?:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnBordScreen">
      <Stack.Screen name="OnBordScreen" component={OnBordScreen} />
      <Stack.Screen name="EmailAccountLogin" component={EmailAccountLogin} />
    <Stack.Screen name="EmailAccountSignup" component={EmailAccountSignup} />
      <Stack.Screen name="SetPasswordScreen" component={SetPasswordScreen} />
      <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="SetNewpasswordScreen" component={SetNewpasswordScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="CallMain" component={CallMain} />
      <Stack.Screen name="VideoCallMain" component={VideoCallMain} />
      <Stack.Screen name="HobbiesScreen" component={HobbiesScreen} />
        <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
        <Stack.Screen name="MusictasScreen" component={MusictasScreen} />
         <Stack.Screen name="ReligionScreen" component={ReligionScreen} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
              <Stack.Screen name="UpdateAllDetailScreen" component={UpdateAllDetailScreen} />
                <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
                <Stack.Screen name="AllSetSignpScreen" component={AllSetSignpScreen} />
                <Stack.Screen name="UserMainChatScreen" component={UserMainChatScreen} />
               {/* <Stack.Screen name="HeaderScreen" component={HeaderScreen} /> */}
               <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                  {/* <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} /> */}
                  {/* <Stack.Screen name="UserPersonalDetails" component={UserPersonalDetails} /> */}
               <Stack.Screen name="UserchangePassword" component={UserchangePassword} />
                         {/* <Stack.Screen name="UserAboutMeScreen" component={UserAboutMeScreen} /> */}
                        <Stack.Screen name="UserchangePasswordTwo" component={UserchangePasswordTwo} />
                         {/* <Stack.Screen name="UserPrivacyPolicyScreen" component={UserPrivacyPolicyScreen} />
                           <Stack.Screen name="UserTermsandConditionsScreen" component={UserTermsandConditionsScreen} />
                         <Stack.Screen name="UserAppLanguageScreen" component={UserAppLanguageScreen} /> */}
                         {/* <Stack.Screen name="UserHelpScreen" component={UserHelpScreen} /> */}
                           {/* <Stack.Screen name="UserFAQScreen" component={UserFAQScreen} /> */}
                           {/* <Stack.Screen name="SettingsScreen" component={SettingsScreen} /> */}
                           
                         
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
