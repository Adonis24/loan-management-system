import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IntroScreen from '../screens/IntroScreen';
import UnderConstructionScreen from '../screens/UnderConstructionScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
    return (
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />        
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    )
  }

export default AuthenticationStack 