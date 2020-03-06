import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

//import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen'

import AuthenticationStack from './AuthenticationNavigator'
import RegistrationStack from './RegistrationNavigator'
import MainTabNav from './MainTabNav';

const Stack = createStackNavigator();

const Nav = (props) => {
  const dispatch = useDispatch()
  //const { token } = useSelector(state => state.apiReducer, shallowEqual)
  const [tokenExists, setTokenExists] = useState(false)
  const { token } = useSelector(state => state.apiReducer, shallowEqual)
  const checkLogin = async () => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      if (personalToken !== null && !personalToken.includes('error')) {
        console.log(`personal token ialah : ${personalToken}`)
        //this.setState({ tokenExists: true })
        setTokenExists(true)
        const { token_type, access_token } = JSON.parse(personalToken)
        dispatch({ type: 'SET_API_AUTH', payload: { token_type, access_token, token: true } })
      }
    } catch (error) {
      console.log(`personalToken error ${error}`)
      return 'takde'
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {token ?
          <Stack.Screen name="MainTabNav" component={MainTabNav} options={{ headerShown: false }} /> :
          <Stack.Screen name="Authentication" component={AuthenticationStack} options={{ headerShown: false }} />} */}
        <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}




export default Nav;
