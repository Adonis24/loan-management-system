import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import TabBarIcon from '../components/TabBarIcon';

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
import ContactPersonMainScreen from '../screens/ContactPersonMainScreen160320';
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
import UnderConstructionScreen from '../screens/UnderConstructionScreen';
import EAdvertisementScreen from '../screens/EAdvertisementScreen';
import FilterBarInfoNews from './FilterBarInfoNews';



const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    )
}

const DashboardStackWithModal = () => {
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DashboardStack} />
            <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
            <Stack.Screen name="PopupScore" component={PopupScoreScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="InfoEvent" component={InfoEventScreen} />
            <Stack.Screen name="InfoEventList" component={InfoEventListScreen} />
            <Stack.Screen name="InfoNews" component={InfoNewsScreen} />
            <Stack.Screen name="InfoNewsList" component={InfoNewsDrawer} />
            <Stack.Screen name="BizHub" component={BusinessHubScreen} />
            <Stack.Screen name="PromotionList" component={PromotionListScreen} />
            <Stack.Screen name="Promotion" component={PromotionScreen} />
            <Stack.Screen name="HandbookList" component={HandbookListScreen} />
            <Stack.Screen name="Handbook" component={HandbookScreen} />
            <Stack.Screen name="MyScore" component={MyScoreScreen} />
            <Stack.Screen name="LoanApplication" component={LoanApplicationScreen} />
            <Stack.Screen name="Financing" component={FinancingScreen} />
            <Stack.Screen name="Grant" component={GrantScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="QuizAnswer" component={QuizAnswerScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
            <Stack.Screen name="BizApp" component={BizAppScreen} />
            <Stack.Screen name="BizAppDetail" component={BizAppDetailScreen} />
            <Stack.Screen name="MyAccountEdit" component={MyAccountEditScreen} />
            <Stack.Screen name="BizDirectory" component={BizDirectoryScreen} />
            <Stack.Screen name="BizLicensing" component={BizLicensingScreen} />
            <Stack.Screen name="Certification" component={CertificationScreen} />
            <Stack.Screen name="CertificationView" component={CertificationViewScreen} />
            <Stack.Screen name="Elearning" component={ElearningScreen} />
            <Stack.Screen name="EcommerceDetail" component={EcommerceDetailScreen} />
            <Stack.Screen name="EAdvertisement" component={EAdvertisementScreen} />

            <Stack.Screen name="Ecommerce" component={EcommerceScreen} />
            <Stack.Screen name="Edonation" component={EdonationScreen} />
            <Stack.Screen name="Loan" component={LoanCalculatorScreen} />
            <Stack.Screen name="ElearningPlay" component={ElearningPlayScreen} />
            <Stack.Screen name="AddCompany" component={CompanyInformationScreen} />
            <Stack.Screen name="CompanyContactInformation" component={CompanyContactInformationScreen} />
            <Stack.Screen name="CompanyContactAddressInformation" component={CompanyContactAddressInformationScreen} />
            <Stack.Screen name="CompanyInfoSuccess" component={CompanyInfoSuccessScreen} />
            <Stack.Screen name="SignUpOtp" component={SignupOtpScreen} />
            <Stack.Screen name="SignUpOtpEnter" component={SignupOtpEnterScreen} />
            <Stack.Screen name="SignUpSuccess" component={SignupSuccessScreen} />
            <Stack.Screen name="PendingDir" component={PendingDirScreen} />
            <Stack.Screen name="AssociateDir" component={AssociateDirScreen} />
            <Stack.Screen name="ContactPersonMain" component={ContactPersonMainScreen} />
            <Stack.Screen name="ContactPersonSuccess" component={ContactPersonSuccessScreen} />
            <Stack.Screen name="ScanQR" component={ScanQRScreen} />
            <Stack.Screen name="QR" component={QRScreen} />
            <Stack.Screen name="UserAccount" component={UserAccountScreen} />
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="InfoEventEdt" component={InfoEventEdtScreen} />
            <Stack.Screen name="NoCompany" component={NoCompanyScreen} />
            <Stack.Screen name="GrantApplication" component={GrantApplicationScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Bill" component={BillScreen} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} />
        </Stack.Navigator>
    )
}

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


const InfoNewsDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Withdraw" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarInfoNews nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="InfoNewsList" component={InfoNewsStack} />
        </Drawer.Navigator>
    )
}


const InfoNewsStack = () => {
    return (
        <Stack.Navigator initialRouteName="InfoNewsList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InfoNewsList" component={InfoNewsListScreen} />
            <Stack.Screen name="InfoNews" component={InfoNewsScreen} />

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
            }} />
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
            }} />
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