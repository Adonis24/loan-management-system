import React from 'react';
import { AsyncStorage } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthenticationNavigator from './AuthenticationNavigator'
import RegistrationNavigator from './RegistrationNavigator'
import MainTabNavigator from './MainTabNavigator';
// import LoggedInTabNavigator from './LoggedInTabNavigator';
// import LoggedInTabNavigator1 from './LoggedInTabNavigator1';



const LoggedIn = createSwitchNavigator({

  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
  Main: MainTabNavigator,
  // LoggedIn:LoggedInTabNavigator1 ,
  //LoggedIn1:LoggedInTabNavigator1  
}, {
    initialRouteName: 'Main'
    //initialRouteName: checkLogin()=='ada'?'LoggedIn':'Authentication'    
  });

const Authentication = createSwitchNavigator({

  Authentication: AuthenticationNavigator,
  Registration: RegistrationNavigator,
  Main: MainTabNavigator,
  // LoggedIn:LoggedInTabNavigator1 ,
  //LoggedIn1:LoggedInTabNavigator1  
}, {
    initialRouteName: 'Authentication'
    //initialRouteName: checkLogin()=='ada'?'LoggedIn':'Authentication'    
  });

export const LoggedInContainer = createAppContainer(LoggedIn);
export const AuthenticationContainer = createAppContainer(Authentication);