import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import BottomTabs from './BottomTabs';
import HeaderScreen from '../components/HeaderScreen'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
<Drawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props} />}
  screenOptions={{
    header: () => <HeaderScreen />,
  }}
>
      
      <Drawer.Screen name="MainTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
