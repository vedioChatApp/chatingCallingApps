import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
