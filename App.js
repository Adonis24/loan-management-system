import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import { AppLoading } from 'expo';
import { Notifications } from 'expo';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/Reducer';

import NetInfo from '@react-native-community/netinfo';

///// All Below for Navigation
//import { enableScreens } from 'react-native-screens';
//enableScreens();

import Nav from './src/navigation/Nav';


const store = createStore(rootReducer, applyMiddleware(thunk))

const App = (props) => {

  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  const [isInternetReachable, setNetInfo] = useState(null)

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // console.log(`expo token ialah ${token}`)
    store.dispatch({ type: 'SET_REGISTER', payload: { expo_token: token } })
  
  }


  useEffect(() => {
    checkUpdate()

    registerForPushNotificationsAsync();
    const _notificationSubscription = Notifications.addListener(_handleNotification);
    const netInfoUnsubscribe = NetInfo.addEventListener(_handleNetInfo);
    //checkLogin()

  }, [])

  const _handleNotification = (notification) => {
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



  const _handleLoadingError = error => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setIsLoadingComplete(true)
  };

  const _handleNetInfo = (netInfo) => {
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
      require('./src/assets/images/tekunD.png'),
      require('./src/assets/images/tekunE.png'),

      require('./src/assets/images/girl.png'),
      require('./src/assets/images/intro2.png'),
      require('./src/assets/images/loan.png'),
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