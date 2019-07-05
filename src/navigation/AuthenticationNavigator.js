import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IntroScreen from '../screens/IntroScreen';
import UnderConstructionScreen from '../screens/UnderConstructionScreen';

const AuthenticationStack = createStackNavigator({
    Welcome: WelcomeScreen,
    UnderConstruction:UnderConstructionScreen,
    //Intro: IntroScreen,
    Login: LoginScreen,
});

export default AuthenticationStack 