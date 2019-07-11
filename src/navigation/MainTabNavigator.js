import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignupPersonalScreen from '../screens/SignupPersonalScreen';
import SignupOtpScreen from '../screens/SignupOtpScreen';
import SignupOtpEnterScreen from '../screens/SignupOtpEnterScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import CompanyInformationScreen from '../screens/CompanyInformationScreen';
import ContactPersonScreen from '../screens/ContactPersonScreen';
import DetailsOfConnectedPartiesScreen from '../screens/DetailsOfConnectedPartiesScreen';
import DeclarationDigitalSignScreen from '../screens/DeclarationDigitalSignScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DasboardScreen from '../screens/DashboardScreen'
import InfoEventScreen from '../screens/InfoEventScreen';
import InfoNewsScreen from '../screens/InfoNewsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import InsightScreen from '../screens/InsightScreen';
import BusinessHubScreen from '../screens/BusinessHubScreen';
import InfoNewsListScreen from '../screens/InfoNewsListScreen';
import InfoEventListScreen from '../screens/InfoEventListScreen';
import PromotionListScreen from '../screens/PromotionListScreen';
import PopupScoreScreen from '../screens/PopupScoreScreen';
import InfoScreen from '../screens/InfoScreen';
import HandbookListScreen from '../screens/HandbookListScreen';
import HandbookScreen from '../screens/HandbookScreen';
import MyScoreScreen from '../screens/MyScoreScreen';
import PromotionScreen from '../screens/PromotionScreen';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';

const DashboardStack = createStackNavigator({
  Dashboard: DasboardScreen,

});

const DashboardStackWithModal = createStackNavigator(
  {
    Main: { screen: DashboardStack, },
    PopupScore: { screen: PopupScoreScreen, },
    Profile: { screen: ProfileScreen, },
    Info: { screen: InfoScreen, },
    InfoEvent: { screen: InfoEventScreen, },
    InfoEventList: { screen: InfoEventListScreen, },
    InfoNews: { screen: InfoNewsScreen, },
    InfoNewsList: { screen: InfoNewsListScreen, },
    BizHub: { screen: BusinessHubScreen, },
    PromotionList: { screen: PromotionListScreen, },
    Promotion: { screen: PromotionScreen },
    HandbookList: { screen: HandbookListScreen, },
    Handbook: { screen: HandbookScreen, },
    MyScore: { screen: MyScoreScreen, },
    LoanApplication: { screen: LoanApplicationScreen, }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

DashboardStackWithModal.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const InsightStack = createStackNavigator({
  Insight: InsightScreen,
});

InsightStack.navigationOptions = {
  tabBarLabel: 'Insight',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-alarm' : 'md-alarm'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  DashboardStackWithModal,
  InsightStack,
  NotificationStack,
  SettingsStack,
});
