import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
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
import reducer from './src/store/reducers/Reducer';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import minimal from './native-base-theme/variables/minimal';
// import DashboardAsset from './src/components/DashboardAsset';


// This refers to the function defined earlier in this guide
//import {registerForPushNotificationsAsync} from './src/registerForPushNotificationsAsync';

const store = createStore(reducer, applyMiddleware(thunk))


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    notification: {},
    tokenExists: false
  };

  registerForPushNotificationsAsync = async () => {
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
    store.dispatch({ type: 'SET_REGISTER', payload: { expo_token:token} })
    //setRegister: (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } }),
    console.log(JSON.stringify({
      token: {        value: token,      },      user: {        username: 'Brent',      },
    }))
  }


  async componentDidMount() {
    await this.checkUpdate()
    await this.checkLogin()
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log(`test test test ${JSON.stringify(notification)}`)
    this.setState({ notification: notification });
  };

  async checkUpdate() {
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

  checkLogin = async () => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      if (personalToken !== null && !personalToken.includes('error')) {
        console.log(`personal token ialah : ${personalToken}`)
        this.setState({ tokenExists: true })
      }
    } catch (error) {
      console.log(`personalToken error ${error}`)
      return 'takde'
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );                                                                          
    } else {
      return (
        <Provider store={store}>
          <StyleProvider style={getTheme(minimal)}>
            <View style={styles.container}>
              {/* <DashboardAsset /> */}
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {this.state.tokenExists ? <LoggedInContainer /> : <AuthenticationContainer />}
            </View>
          </StyleProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),

        require('./src/assets/images/logo.png'),

        require('./src/assets/images/topLeft.png'),
        require('./src/assets/images/bottomRight.png'),
        require('./src/assets/images/topRight.png'),
        require('./src/assets/images/bottomLeft.png'),

        require('./src/assets/images/girl.png'),

        require('./src/assets/images/cardborder.png'),

        require('./src/assets/icon/eda.png'),
        require('./src/assets/icon/bizDir.png'),
        require('./src/assets/icon/crm.png'),
        //require('./src/assets/icon/crm.png'),
        require('./src/assets/icon/rfq.png'),
        
        require('./src/assets/images/edt.png'),
        require('./src/assets/images/edt2.jpg'),

        require('./src/assets/images/mayamall.png'),

      ]),
      Font.loadAsync({
        'Montserrat_medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        'Montserrat_light': require('./src/assets/fonts/Montserrat/Montserrat-Light.ttf'),
        'Montserrat_bold': require('./src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        'Roboto-regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),

      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
