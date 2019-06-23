import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import IntroScreen from '../screens/IntroScreen';

const AuthenticationStack = createStackNavigator({

    Welcome: WelcomeScreen,
    //Intro: IntroScreen,
    Login: LoginScreen,

});


export default AuthenticationStack