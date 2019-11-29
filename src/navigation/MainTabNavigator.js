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
import FinancingScreen from '../screens/FinancingScreen';
import GrantScreen from '../screens/GrantScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizAnswerScreen from '../screens/QuizAnswerScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import EcommerceScreen from '../screens/EcommerceScreen';
import BizAppScreen from '../screens/BizAppScreen';
import MyAccountEditScreen from '../screens/MyAccountEditScreen';
import BizDirectoryScreen from '../screens/BizDirectoryScreen';
import BizLicensingScreen from '../screens/BizLicensingScreen';
import CertificationScreen from '../screens/CertificationScreen';
import ElearningScreen from '../screens/ElearningScreen';
import ContactPersonSuccessScreen from '../screens/ContactPersonSuccessScreen';
import ScanQRScreen from '../screens/ScanQRScreen';
import CompanyContactInformationScreen from '../screens/CompanyContactInformationScreen';
import CompanyContactAddressInformationScreen from '../screens/CompanyContactAddressInformationScreen';
import CompanyInfoSuccessScreen from '../screens/CompanyInfoSuccessScreen';
import TrainingScreen from '../screens/TrainingScreen';
import CertificationViewScreen from '../screens/CertificationViewScreen';
import EdonationScreen from '../screens/EdonationScreen';
import LoanCalculatorScreen from '../screens/LoanCalculatorScreen';
import ElearningPlayScreen from '../screens/ElearningPlayScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import ContactPersonMainScreen from '../screens/ContactPersonMainScreen';
import EcommerceDetailScreen from '../screens/EcommerceDetailScreen';
import InfoEventEdtScreen from '../screens/InfoEventEdtScreen';
import PendingDirScreen from '../screens/PendingDirScreen';
import AssociateDirScreen from '../screens/AssociateDirScreen';
import BizAppDetailScreen from '../screens/BizAppDetailScreen';
import NoCompanyScreen from '../screens/NoCompanyScreen';
import CameraSelfieScreen from '../screens/CameraSelfieScreen';
import GrantApplicationScreen from '../screens/GrantApplicationScreen';
import QRScreen from '../screens/QRScreen';

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
    LoanApplication: { screen: LoanApplicationScreen, },
    Financing: { screen: FinancingScreen, },
    Grant: { screen: GrantScreen, },
    Quiz: { screen: QuizScreen, },
    QuizAnswer: { screen: QuizAnswerScreen, },
    MyAccount: { screen: MyAccountScreen, },
    BizApp: { screen: BizAppScreen, },
    BizAppDetail: { screen: BizAppDetailScreen, },
    MyAccountEdit: { screen: MyAccountEditScreen, },
    BizDirectory: { screen: BizDirectoryScreen, },
    BizLicensing: { screen: BizLicensingScreen, },
    Certification: { screen: CertificationScreen, },
    CertificationView: { screen: CertificationViewScreen, },
    Elearning: { screen: ElearningScreen, },
    EcommerceDetail: { screen: EcommerceDetailScreen, },
    Ecommerce: { screen: EcommerceScreen, },
    Edonation: { screen: EdonationScreen, },
    Loan: { screen: LoanCalculatorScreen, },
    ElearningPlay: { screen: ElearningPlayScreen, },

    AddCompany: { screen: CompanyInformationScreen, },
    CompanyContactInformation: CompanyContactInformationScreen,
    CompanyContactAddressInformation: CompanyContactAddressInformationScreen,
    CompanyInfoSuccess: CompanyInfoSuccessScreen,

    SignUpOtp: SignupOtpScreen,
    SignUpOtpEnter: SignupOtpEnterScreen,
    SignUpSuccess: SignupSuccessScreen,


    PendingDir: { screen: PendingDirScreen, },
    AssociateDir: { screen: AssociateDirScreen, },

    ContactPersonMain: { screen: ContactPersonMainScreen, },
    ContactPersonSuccess: { screen: ContactPersonSuccessScreen, },
    ScanQR: { screen: ScanQRScreen, },
    QR: { screen: QRScreen, },
    UserAccount: { screen: UserAccountScreen },

    Training: { screen: TrainingScreen, },

    InfoEventEdt: { screen: InfoEventEdtScreen, },

    NoCompany: { screen: NoCompanyScreen, },

    GrantApplication: { screen: GrantApplicationScreen, },


  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

DashboardStackWithModal.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName !== 'Main') {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: '#F52011',
      inactiveTintColor: 'rgba(255,0,0,0.4)',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      />
    ),
  };
}

const InsightStack = createStackNavigator({
  Insight: InsightScreen,
});

InsightStack.navigationOptions = {
  tabBarLabel: 'Contacts',

  tabBarOptions: {
    activeTintColor: '#F52011',
    inactiveTintColor: 'rgba(255,0,0,0.4)',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notifications',

  tabBarOptions: {
    activeTintColor: '#F52011',
    inactiveTintColor: 'rgba(255,0,0,0.4)',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const SettingStackWithModal = createStackNavigator(
  {
    Settings: { screen: SettingsStack, },
    CameraSelfie: { screen: CameraSelfieScreen, },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);




SettingStackWithModal.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName == 'CameraSelfie') {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Settings',
    tabBarOptions: {
      activeTintColor: '#F52011',
      inactiveTintColor: 'rgba(255,0,0,0.4)',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
    ),
  };
}

export default createBottomTabNavigator({
  DashboardStackWithModal,
  InsightStack,
  NotificationStack,
  SettingStackWithModal,
});
