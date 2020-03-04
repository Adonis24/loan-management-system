import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
import DashboardScreen from '../screens/DashboardScreen'
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
import WalletScreen from '../screens/WalletScreen';
import BillScreen from '../screens/BillScreen';
import DeliveryScreen from '../screens/DeliveryScreen';



const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    )
}

const DashboardStackWithModal = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DashboardStack} />

            <Stack.Screen name="PopupScore" component={PopupScoreScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="InfoEvent" component={InfoEventScreen} />
            <Stack.Screen name="InfoEventList" component={InfoEventListScreen} />

        </Stack.Navigator>
    )
}

// const DashboardStackWithModal = createStackNavigator(
//   {
//     Main: { screen: DashboardStack, },
//     PopupScore: { screen: PopupScoreScreen, },
//     Profile: { screen: ProfileScreen, },
//     Info: { screen: InfoScreen, },
//     InfoEvent: { screen: InfoEventScreen, },
//     InfoEventList: { screen: InfoEventListScreen, },
//     InfoNews: { screen: InfoNewsScreen, },
//     InfoNewsList: { screen: InfoNewsListScreen, },
//     BizHub: { screen: BusinessHubScreen, },
//     PromotionList: { screen: PromotionListScreen, },
//     Promotion: { screen: PromotionScreen },
//     HandbookList: { screen: HandbookListScreen, },
//     Handbook: { screen: HandbookScreen, },
//     MyScore: { screen: MyScoreScreen, },
//     LoanApplication: { screen: LoanApplicationScreen, },
//     Financing: { screen: FinancingScreen, },
//     Grant: { screen: GrantScreen, },
//     Quiz: { screen: QuizScreen, },
//     QuizAnswer: { screen: QuizAnswerScreen, },
//     MyAccount: { screen: MyAccountScreen, },
//     BizApp: { screen: BizAppScreen, },
//     BizAppDetail: { screen: BizAppDetailScreen, },
//     MyAccountEdit: { screen: MyAccountEditScreen, },
//     BizDirectory: { screen: BizDirectoryScreen, },
//     BizLicensing: { screen: BizLicensingScreen, },
//     Certification: { screen: CertificationScreen, },
//     CertificationView: { screen: CertificationViewScreen, },
//     Elearning: { screen: ElearningScreen, },
//     EcommerceDetail: { screen: EcommerceDetailScreen, },
//     Ecommerce: { screen: EcommerceScreen, },
//     Edonation: { screen: EdonationScreen, },
//     Loan: { screen: LoanCalculatorScreen, },
//     ElearningPlay: { screen: ElearningPlayScreen, },

//     AddCompany: { screen: CompanyInformationScreen, },
//     CompanyContactInformation: CompanyContactInformationScreen,
//     CompanyContactAddressInformation: CompanyContactAddressInformationScreen,
//     CompanyInfoSuccess: CompanyInfoSuccessScreen,

//     SignUpOtp: SignupOtpScreen,
//     SignUpOtpEnter: SignupOtpEnterScreen,
//     SignUpSuccess: SignupSuccessScreen,


//     PendingDir: { screen: PendingDirScreen, },
//     AssociateDir: { screen: AssociateDirScreen, },

//     ContactPersonMain: { screen: ContactPersonMainScreen, },
//     ContactPersonSuccess: { screen: ContactPersonSuccessScreen, },
//     ScanQR: { screen: ScanQRScreen, },
//     QR: { screen: QRScreen, },
//     UserAccount: { screen: UserAccountScreen },

//     Training: { screen: TrainingScreen, },

//     InfoEventEdt: { screen: InfoEventEdtScreen, },

//     NoCompany: { screen: NoCompanyScreen, },

//     GrantApplication: { screen: GrantApplicationScreen, },
//     Wallet: { screen: WalletScreen, },
//     Bill: { screen: BillScreen, },
//     Delivery: { screen: DeliveryScreen, },

//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   },
// );


const InsightStack = () => {
    return (
        <Stack.Navigator initialRouteName="Insight" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Insight" component={InsightScreen} />
        </Stack.Navigator>
    )
}



const NotificationStack = () => {
    return (
        <Stack.Navigator initialRouteName="Notifications" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}




const SettingsStack = () => {
    return (
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

const SettingStackWithModal = () => {
    return (
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Settings" component={SettingsStack} />
            <Stack.Screen name="CameraSelfie" component={CameraSelfieScreen} />
        </Stack.Navigator>
    )
}


const MainTabNav = () => {
    return (
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
            <Tab.Screen name="DashboardStackWithModal" component={DashboardStackWithModal} options={{
                tabBarOptions: {
                    activeTintColor: '#4967AE',
                    inactiveTintColor: '#7896dc',
                },
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    />
                ),
            }}   />
            <Tab.Screen name="InsightStack" component={InsightStack} options={{
                tabBarOptions: {
                    activeTintColor: '#4967AE',
                    inactiveTintColor: '#7896dc',
                },
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
                    />
                ),
            }}  />
            <Tab.Screen name="NotificationStack" component={NotificationStack} options={{
                tabBarOptions: {
                    activeTintColor: '#4967AE',
                    inactiveTintColor: '#7896dc',
                },
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
                    />
                ),
            }} />
            <Tab.Screen name="SettingStackWithModal" component={SettingStackWithModal} options={{
                tabBarOptions: {
                    activeTintColor: '#4967AE',
                    inactiveTintColor: '#7896dc',
                },
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
                    />
                ),
            }} />


        </Tab.Navigator>
    );
}

export default MainTabNav