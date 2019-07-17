import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';



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

const Registration = createStackNavigator({
  // Intro: IntroScreen,
  // Agreement: AgreementScreen,
  // SignUpPersonal: SignupPersonalScreen,
  // SignUpPersonalSuccess: SignupPersonalSuccessScreen,
  // SignUpOtp: SignupOtpScreen,
  // SignUpOtpEnter: SignupOtpEnterScreen,
  // SignUpSuccess: SignupSuccessScreen,
  CompanyInfoIntro: CompanyInfoIntroScreen,
  CompanyInformation: CompanyInformationScreen,
  CompanyContactInformation: CompanyContactInformationScreen,
  CompanyContactAddressInformation: CompanyContactAddressInformationScreen,
  CompanyInfoSuccess: CompanyInfoSuccessScreen,
  ContactPerson: ContactPersonScreen,
  ContactPersonSuccess: ContactPersonSuccessScreen,
  DetailsConnectedParties: DetailsOfConnectedPartiesScreen,
  DeclarationDigitalSign: DeclarationDigitalSignScreen,
});

const RegistrationStack = createStackNavigator(
  {
    Main: { screen: Registration, },
    DocUpload: { screen: DocUploadScreen, },

  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);


export default RegistrationStack