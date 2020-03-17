import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage,Text } from 'react-native';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store'
import { AppLoading } from 'expo';
import { LoggedInContainer, AuthenticationContainer } from './src/navigation/AppNavigator';
import { Notifications } from 'expo';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';
import NetInfo from '@react-native-community/netinfo';

import Nav from './src/navigation/Nav';
// import DashboardAsset from './src/components/DashboardAsset';

// This refers to the function defined earlier in this guide
//import {registerForPushNotificationsAsync} from './src/registerForPushNotificationsAsync';

const store = createStore(rootReducer, applyMiddleware(thunk))

const App = (props) => {

  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [notification, setNotification] = useState({})
  const [tokenExists, setTokenExists] = useState(false)
  const [isInternetReachable, setNetInfo] = useState(null)

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(`expo token ialah ${token}`)
    store.dispatch({ type: 'SET_REGISTER', payload: { expo_token: token } })
    //setRegister: (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } }),
    console.log(JSON.stringify({
      token: { value: token, }, user: { username: 'Brent', },
    }))
  }


  useEffect(() => {
    checkUpdate()

    registerForPushNotificationsAsync();
    const _notificationSubscription = Notifications.addListener(_handleNotification);
    const netInfoUnsubscribe = NetInfo.addEventListener(_handleNetInfo);
    //checkLogin()

  }, [])

  const _handleNotification = (notification) => {
    console.log(`notification ${JSON.stringify(notification)}`)
    const { data } = notification

    store.dispatch({ type: 'SET_NOTIFICATION', payload: { ...data } })
  };

  const checkUpdate = async () => {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        Expo.Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  const checkLogin = async () => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      if (personalToken !== null && !personalToken.includes('error')) {
        console.log(`personal token ialah : ${personalToken}`)
        //this.setState({ tokenExists: true })
        setTokenExists(true)
      }
    } catch (error) {
      console.log(`personalToken error ${error}`)
      return 'takde'
    }
  }

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    //this.setState({ isLoadingComplete: true });
    setIsLoadingComplete(true)
  };

  const _handleNetInfo = (netInfo) => {
    console.log(`netInfo received ${JSON.stringify(netInfo)}`)
    store.dispatch({ type: 'SET_NET_INFO_STATUS', payload: { ...netInfo } })
    setNetInfo(netInfo.isInternetReachable)
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <Provider store={store}>

        <View style={styles.container}>
          <Nav />
          {!isInternetReachable && <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: 'orange' }}>
          <Text style={styles.small}>No internet connection</Text>
        </View>
        }
        </View>
      </Provider>
    );
  }
}


const _loadResourcesAsync = async () => {
  return Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/robot-dev.png'),
      require('./src/assets/images/robot-prod.png'),

      require('./src/assets/images/logo.png'),

      require('./src/assets/images/topLeft.png'),
      require('./src/assets/images/bottomRight.png'),
      require('./src/assets/images/topRight.png'),
      require('./src/assets/images/bottomLeft.png'),
      require('./src/assets/images/tekunA.png'),
      require('./src/assets/images/tekunB.png'),
      require('./src/assets/images/tekunC.png'),

      require('./src/assets/images/girl.png'),
      require('./src/assets/images/intro2.png'),

      require('./src/assets/images/cardborder.png'),

      require('./src/assets/icon/eda.png'),
      require('./src/assets/icon/bizDir.png'),
      require('./src/assets/icon/crm.png'),
      //require('./src/assets/icon/crm.png'),
      require('./src/assets/icon/rfq.png'),

      require('./src/assets/images/edt.png'),
      require('./src/assets/images/edt2.jpg'),

      require('./src/assets/images/mayamall.png'),

      require('./src/assets/images/urusniaga.png'),

      require('./src/assets/images/faceborder.png'),

      require('./src/assets/icon/wallet.png'),
      require('./src/assets/icon/news.png'),
      require('./src/assets/icon/ecommerce.png'),
      require('./src/assets/icon/e-learning.png'),
      require('./src/assets/icon/delivery-truck.png'),
      require('./src/assets/icon/bill.png'),

      require('./src/assets/images/banner1.png'),
      require('./src/assets/images/banner2.png'),
      require('./src/assets/images/logo-white.png'),

    ]),
    Font.loadAsync({
      'Montserrat_medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      'Montserrat_light': require('./src/assets/fonts/Montserrat/Montserrat-Light.ttf'),
      'Montserrat_bold': require('./src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'Roboto-regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),

    }),
  ]);
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;