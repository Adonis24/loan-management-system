import React from 'react';
import { Platform } from 'react-native';
import {createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';


import IntroScreen from '../screens/IntroScreen';
import SignupPersonalScreen from '../screens/SignupPersonalScreen';
import SignupOtpScreen from '../screens/SignupOtpScreen';
import SignupOtpEnterScreen from '../screens/SignupOtpEnterScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import CompanyInformationScreen from '../screens/CompanyInformationScreen';
import ContactPersonScreen from '../screens/ContactPersonScreen';
import DetailsOfConnectedPartiesScreen from '../screens/DetailsOfConnectedPartiesScreen';
import DeclarationDigitalSignScreen from '../screens/DeclarationDigitalSignScreen';
import CompanyInfoIntroScreen from '../screens/CompanyInfoIntroScreen';
import DocUploadScreen from '../screens/DocUploadScreen';
import CompanyContactInformationScreen from '../screens/CompanyContactInformationScreen';
import CompanyContactAddressInformationScreen from '../screens/CompanyContactAddressInformationScreen';
import AgreementScreen from '../screens/AgreementScreen';
import CompanyInfoSuccessScreen from '../screens/CompanyInfoSuccessScreen';
import SignupPersonalSuccessScreen from '../screens/SignupPersonalSuccessScreen';
import ContactPersonSuccessScreen from '../screens/ContactPersonSuccessScreen';


const Stack = createStackNavigator();

const Registration = () => {
  return (
    <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Agreement" component={AgreementScreen} /> */}
      <Stack.Screen name="SignUpPersonal" component={SignupPersonalScreen} />
      <Stack.Screen name="SignUpPersonalSuccess" component={SignupPersonalSuccessScreen} />
      <Stack.Screen name="SignUpOtp" component={SignupOtpScreen} />
      <Stack.Screen name="SignUpOtpEnter" component={SignupOtpEnterScreen} />
     {/* <Stack.Screen name="SignUpSuccess" component={SignupSuccessScreen} /> */} 
      <Stack.Screen name="CompanyInfoIntro" component={CompanyInfoIntroScreen} />
      <Stack.Screen name="CompanyInformation" component={CompanyInformationScreen} />
      <Stack.Screen name="CompanyContactInformation" component={CompanyContactInformationScreen} />
      <Stack.Screen name="CompanyContactAddressInformation" component={CompanyContactAddressInformationScreen} />
      <Stack.Screen name="ContactPerson" component={ContactPersonScreen} />
      <Stack.Screen name="CompanyInfoSuccess" component={CompanyInfoSuccessScreen} />
     {/* <Stack.Screen name="ContactPersonSuccess" component={ContactPersonSuccessScreen} /> */}
      <Stack.Screen name="DetailsConnectedParties" component={DetailsOfConnectedPartiesScreen} />
      <Stack.Screen name="DeclarationDigitalSign" component={DeclarationDigitalSignScreen} />
    </Stack.Navigator>
  )
}

const RegistrationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Registration" mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="DocUpload" component={DocUploadScreen} />
    </Stack.Navigator>
  )
}

export default RegistrationStack