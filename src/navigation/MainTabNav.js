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


import CompanyInformationScreen from '../screens/CompanyInformationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen'
import InfoNewsScreen from '../screens/InfoNewsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import InsightScreen from '../screens/InsightScreen';
import InfoNewsListScreen from '../screens/InfoNewsListScreen';
import FinancingScreen from '../screens/FinancingScreen';
import LoanCheckListScreen from '../screens/LoanCheckListScreen';
import AttachmentScreen from '../screens/AttachmentScreen';
import MapScreen from '../screens/MapScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import BizAppScreen from '../screens/BizAppScreen';
import MyAccountEditScreen from '../screens/MyAccountEditScreen';
import ElearningScreen from '../screens/ElearningScreen';
//import ScanQRScreen from '../screens/ScanQRScreen';
//import CompanyInfoSuccessScreen from '../screens/CompanyInfoSuccessScreen';
//import UserAccountScreen from '../screens/UserAccountScreen';
//import InfoEventEdtScreen from '../screens/InfoEventEdtScreen';
import BizAppDetailScreen from '../screens/BizAppDetailScreen';
import NoCompanyScreen from '../screens/NoCompanyScreen';
import CameraSelfieScreen from '../screens/CameraSelfieScreen';
//import QRScreen from '../screens/QRScreen';
import BillScreen from '../screens/BillScreen';
import UnderConstructionScreen from '../screens/UnderConstructionScreen';
import EAdvertisementScreen from '../screens/EAdvertisementScreen';
import FilterBarInfoNews from './FilterBarInfoNews';
import LoanMaklumatAsasScreen from '../screens/LoanMaklumatAsasScreen';
import LoanPerniagaanScreen from '../screens/LoanPerniagaanScreen'
import LoanMaklumatPeribadiScreen from '../screens/LoanMaklumatPeribadiScreen'
import LoanPersonalStatusScreen from '../screens/LoanPersonalStatusScreen'
import LoanContactAddressInfoScreen from '../screens/LoanContactAddressInfoScreen'
import LoanPendapatanScreen from '../screens/LoanPendapatanScreen'
import LoanConnectedPartiesScreen from '../screens/LoanConnectedPartiesScreen'
import LoanConnectedPartiesAddrScreeen from '../screens/LoanConnectedPartiesAddrScreeen'
import LoanBusinessInfoScreen from '../screens/LoanBusinessInfoScreen'
import LoanBusinessAddrInfoScreen from '../screens/LoanBusinessAddrInfoScreen'
import LoanBusinessInfoContScreen from '../screens/LoanBusinessInfoContScreen'
import LoanBusinessDetailScreen from '../screens/LoanBusinessDetailScreen'
import LoanBusinessDetail2Screen from '../screens/LoanBusinessDetail2Screen'
import LoanDetailScreen from '../screens/LoanDetailScreen'
import LoanReferrerScreen from '../screens/LoanReferrerScreen'
import LoanReferrer2Screen from '../screens/LoanReferrer2Screen'
import LoanValidationScreen from '../screens/LoanValidationScreen'
import CameraScreen from '../screens/CameraScreen'
import LoanCustomDrawer from './LoanCustomDrawer';
import BusinessPlanCustomDrawer from './BusinessPlanCustomDrawer';
import BusinessPlanBackgroudScreen from '../screens/BusinessPlanBackgroudScreen'
import BusinessPlanEstablishCompScreen from '../screens/BusinessPlanEstablishCompScreen'
import BusinessPlanBankScreen from '../screens/BusinessPlanBankScreen'
import BusinessPlanPartnerScreen from '../screens/BusinessPlanPartnerScreen'
import BusinessPlanBussInfoScreen from '../screens/BusinessPlanBussInfoScreen'
import BusinessPlanBussModalScreen from '../screens/BusinessPlanBussModalScreen'
import BusinessPlanBudgIncScreen from '../screens/BusinessPlanBudgIncScreen'
import BusinessPlanProposalScreen from '../screens/BusinessPlanProposalScreen'
import BusinessPlanGoalsScreen from '../screens/BusinessPlanGoalsScreen'
import BusinessPlanMarketingScreen from '../screens/BusinessPlanMarketingScreen'
import BusinessPlanAddDetailScreen from '../screens/BusinessPlanAddDetailScreen'
import LoanBankScreen from '../screens/LoanBankScreen';
import LoanReferrerListScreen from '../screens/LoanReferrerListScreen';
import LoanMaklumatPeribadiBScreen from '../screens/LoanMaklumatPeribadiBScreen';
import BusinessPlanEstablishCompBScreen from '../screens/BusinessPlanEstablishCompBScreen';
import BusinessPlanBussInfoBScreen from '../screens/BusinessPlanBussInfoBScreen';
import BusinessPlanBussModalBScreen from '../screens/BusinessPlanBussModalBScreen';
import CompanyContactInformationScreen from '../screens/CompanyContactInformationScreen';
import SignupOtpScreen from '../screens/SignupOtpScreen';
import SignupOtpEnterScreen from '../screens/SignupOtpEnterScreen';

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
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="InfoNews" component={InfoNewsScreen} />
            <Stack.Screen name="InfoNewsList" component={InfoNewsDrawer} />
            <Stack.Screen name="Financing" component={FinancingStack} />
            <Stack.Screen name="MyAccount" component={MyAccountStack} />
            <Stack.Screen name="BizApp" component={BizAppScreen} />
            <Stack.Screen name="BizAppDetail" component={BizAppDetailScreen} />
            <Stack.Screen name="MyAccountEdit" component={MyAccountEditScreen} />
            <Stack.Screen name="Elearning" component={ElearningScreen} />
            {/* <Stack.Screen name="EcommerceDetail" component={EcommerceDetailScreen} /> */}
            <Stack.Screen name="EAdvertisement" component={EAdvertisementScreen} />
            {/* <Stack.Screen name="ElearningPlay" component={ElearningPlayScreen} /> */}

{/* 
            <Stack.Screen name="ScanQR" component={ScanQRScreen} />
            <Stack.Screen name="QR" component={QRScreen} />
            <Stack.Screen name="UserAccount" component={UserAccountScreen} />
            <Stack.Screen name="InfoEventEdt" component={InfoEventEdtScreen} /> */}
            <Stack.Screen name="NoCompany" component={NoCompanyScreen} />
            <Stack.Screen name="Bill" component={BillScreen} />
        </Stack.Navigator>
    )
}

const MyAccountStack = () => {
    return (
        <Stack.Navigator initialRouteName="MyAccount" mode={'modal'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
            <Stack.Screen name="CameraSelfie" component={CameraSelfieScreen} />
            <Stack.Screen name="AddCompany" component={CompanyInformationScreen} />
            <Stack.Screen name="AddCompanyContact" component={CompanyContactInformationScreen} />
            <Stack.Screen name="AddPhone" component={SignupOtpScreen} />
            <Stack.Screen name="VerifyPhone" component={SignupOtpEnterScreen} />
        </Stack.Navigator>
    )
}

const FinancingStack = () => {
    return (
        <Stack.Navigator initialRouteName="Financing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Financing" component={FinancingScreen} />
            <Stack.Screen name="LoanCheckList" component={LoanCheckListScreen} />
            <Stack.Screen name="LoanDrawer" component={LoanDrawer} />
            <Stack.Screen name="BusinessPlanDrawer" component={BusinessPlanDrawer} />
            <Stack.Screen name="Attachment" component={AttachmentScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
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
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }} mode={'modal'}>
            <Stack.Screen name="Settings" component={SettingsStack} />
            <Stack.Screen name="CameraSelfie" component={CameraSelfieScreen} />
        </Stack.Navigator>
    )
}

const LoanDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="LoanMaklumatAsas"
            drawerType={'slide'}
            drawerContent={props => {
                const close = () => { props.navigation.closeDrawer() }
                const nav = (screen) => { props.navigation.navigate(screen) }
                return (<LoanCustomDrawer {...props} nav={nav} close={close} />)
            }}
        >

            <Drawer.Screen name="LoanSectionA" component={LoanSectionAStack} />
            <Drawer.Screen name="LoanSectionB" component={LoanSectionBStack} />
            <Drawer.Screen name="LoanSectionC" component={LoanSectionCStack} />
            <Drawer.Screen name="LoanSectionD" component={LoanSectionDStack} />
            <Drawer.Screen name="LoanBusinessInfoCont" component={LoanBusinessInfoContScreen} />
            <Drawer.Screen name="LoanSectionF" component={LoanSectionFStack} />
            <Drawer.Screen name="LoanDetail" component={LoanDetailScreen} />
            <Drawer.Screen name="LoanSectionH" component={LoanSectionHReffererWithModal} />
            <Drawer.Screen name="LoanValidation" component={LoanValidationScreen} />
            {/* <Drawer.Screen name="LoanDeclaration" component={LoanDeclarationScreen} /> */}


        </Drawer.Navigator>
    )
}
const LoanSectionAStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanMaklumatAsas" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanMaklumatAsas" component={LoanMaklumatAsasScreen} />
            <Stack.Screen name="LoanSektorPerniagaan" component={LoanPerniagaanScreen} />
            <Stack.Screen name="LoanBank" component={LoanBankScreen} />
        </Stack.Navigator>)
}

const LoanSectionBStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanMaklumatPeribadi" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanMaklumatPeribadi" component={LoanMaklumatPeribadiScreen} />
            <Stack.Screen name="LoanMaklumatPeribadiB" component={LoanMaklumatPeribadiBScreen} />
            <Stack.Screen name="LoanPersonalStatus" component={LoanPersonalStatusScreen} />
            <Stack.Screen name="LoanContactAddressInfo" component={LoanContactAddressInfoScreen} />
            <Stack.Screen name="LoanPendapatan" component={LoanPendapatanScreen} />
        </Stack.Navigator>)
}

const LoanSectionCStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanConnectedParties" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanConnectedParties" component={LoanConnectedPartiesScreen} />
            <Stack.Screen name="LoanConnectedPartiesAddr" component={LoanConnectedPartiesAddrScreeen} />
        </Stack.Navigator>)
}

const LoanSectionDStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanBusinessInfo" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanBusinessInfo" component={LoanBusinessInfoScreen} />
            <Stack.Screen name="LoanBusinessAddrInfo" component={LoanBusinessAddrInfoScreen} />
        </Stack.Navigator>)
}

const LoanSectionFStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanBusinessDetail" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanBusinessDetail" component={LoanBusinessDetailScreen} />
            <Stack.Screen name="LoanBusinessDetail2" component={LoanBusinessDetail2Screen} />
        </Stack.Navigator>)
}

const LoanSectionHStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoanReferrer" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanReferrer" component={LoanReferrerListScreen} />

        </Stack.Navigator>)
}

const LoanSectionHReffererWithModal = () => {
    return (
        <Stack.Navigator initialRouteName="LoanReferrer" screenOptions={{ headerShown: false }} mode={'modal'}>
            <Stack.Screen name="LoanReferrer" component={LoanSectionHStack} />
            <Stack.Screen name="LoanReferrer1" component={LoanReferrerScreen} />
            <Stack.Screen name="LoanReferrer2" component={LoanReferrer2Screen} />
        </Stack.Navigator>)
}


const BusinessPlanDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="BusinessPlanBackgroud"
            drawerType={'slide'}
            drawerContent={props => {
                const close = () => { props.navigation.closeDrawer() }
                const nav = (screen) => { props.navigation.navigate(screen) }
                return (<BusinessPlanCustomDrawer {...props} nav={nav} close={close} />)
            }}
        >

            <Drawer.Screen name="BusinessPlanSectionA" component={BusinessPlanSectionAStack} />
            <Drawer.Screen name="BusinessPlanSectionB" component={BusinessPlanSectionBStack} />
            <Drawer.Screen name="BusinessPlanBudgInc" component={BusinessPlanBudgIncScreen} />
            <Drawer.Screen name="BusinessPlanProposal" component={BusinessPlanProposalScreen} />
            <Drawer.Screen name="BusinessPlanSectionE" component={BusinessPlanSectionEStack} />
            <Drawer.Screen name="BusinessPlanMarketing" component={BusinessPlanMarketingScreen} />
            <Drawer.Screen name="BusinessPlanAddDetail" component={BusinessPlanAddDetailScreen} />
            {/* <Drawer.Screen name="BusinessPlanCert" component={BusinessPlanCertScreen} /> */}
        </Drawer.Navigator>
    )
}

const BusinessPlanSectionAStack = () => {
    return (
        <Stack.Navigator initialRouteName="BusinessPlanBackgroud" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusinessPlanBackgroud" component={BusinessPlanBackgroudScreen} />
            <Stack.Screen name="BusinessPlanEstablishComp" component={BusinessPlanEstablishCompScreen} />
            <Stack.Screen name="BusinessPlanEstablishCompB" component={BusinessPlanEstablishCompBScreen} />
            <Stack.Screen name="BusinessPlanBank" component={BusinessPlanBankScreen} />
            <Stack.Screen name="BusinessPlanPartner" component={BusinessPlanPartnerScreen} />
        </Stack.Navigator>)
}

const BusinessPlanSectionBStack = () => {
    return (
        <Stack.Navigator initialRouteName="BusinessPlanBussInfo" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusinessPlanBussInfo" component={BusinessPlanBussInfoScreen} />
            <Stack.Screen name="BusinessPlanBussInfoB" component={BusinessPlanBussInfoBScreen} />
            <Stack.Screen name="BusinessPlanBussModal" component={BusinessPlanBussModalScreen} />
            <Stack.Screen name="BusinessPlanBussModalB" component={BusinessPlanBussModalBScreen} />
        </Stack.Navigator>)
}

const BusinessPlanSectionEStack = () => {
    return (
        <Stack.Navigator initialRouteName="BusinessPlanGoals" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusinessPlanGoals" component={BusinessPlanGoalsScreen} />
            {/* <Stack.Screen name="BusinessPlanGoals2" component={BusinessPlanGoals2Screen} />
            <Stack.Screen name="BusinessPlanGoals3" component={BusinessPlanGoals3Screen} /> */}
        </Stack.Navigator>)
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

const InsightDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Withdraw" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarInfoNews nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="Insight" component={InsightStack} />
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
            <Tab.Screen name="DashboardStackWithModal" component={DashboardStackWithModal} options={({ route }) => {
                //console.log(`route ialah :${JSON.stringify(route)}`)
                let tabBarVisible = true

                if (route.state) {
                    if (route.state.routes) {
                        if (route.state.routes) {
                            const routeName = route.state.routes[route.state.index].name
                            //const history = route.state.routes[route.state.index].state.history[route.state.routes[route.state.index].state.history.length - 1]
                            console.log(`route ialah :${JSON.stringify(routeName)}`)
                            //console.log(`history ialah :${JSON.stringify(history)}`)
                            //if (routeName === 'LoanMaklumatAsas' || routeName === 'LoanSektorPerniagaan' || routeName === 'LoanMaklumatPeribadi' || routeName === 'LoanPersonalStatus' || routeName === 'LoanContactAddressInfo' || routeName === 'LoanPendapatan' || routeName === 'LoanConnectedParties' || routeName === 'LoanConnectedPartiesAddr' || routeName === 'LoanBusinessInfo' || routeName === 'LoanBusinessAddrInfo' || routeName === 'LoanBusinessInfoCont' || routeName === 'LoanBusinessDetail' || routeName === 'LoanDetail')
                            if (routeName === 'MyAccount' ||routeName === 'AddCompanyContact' || routeName === 'AddCompany' || routeName === 'Financing' || routeName === 'LoanDrawer' || routeName === 'Camera' || routeName === 'BusinessPlanDrawer' || routeName === 'Map') {
                                tabBarVisible = false
                            }

                        }
                    }

                }

                return {
                    tabBarOptions: {
                        activeTintColor: '#4967AE',
                        inactiveTintColor: '#7896dc',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                        />
                    ), tabBarVisible
                }
            }} />
            <Tab.Screen name="InsightStack" component={InsightDrawer} options={{
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