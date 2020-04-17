import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IntroScreen from '../screens/IntroScreen';
import SignupPersonalScreen from '../screens/SignupPersonalScreen';
import DocUploadScreen from '../screens/DocUploadScreen';
import AgreementScreen from '../screens/AgreementScreen';
import SignupPersonalSuccessScreen from '../screens/SignupPersonalSuccessScreen';



const Stack = createStackNavigator();

const Registration = () => {
  return (
    <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Agreement" component={AgreementScreen} />
      <Stack.Screen name="SignUpPersonal" component={SignupPersonalScreen} />
      <Stack.Screen name="SignUpPersonalSuccess" component={SignupPersonalSuccessScreen} />
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