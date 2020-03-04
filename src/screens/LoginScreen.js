//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser';

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const LoginScreen = (props) => {

    const dispatch = useDispatch()

    const forgotPassword = async () => {
        let result = await WebBrowser.openBrowserAsync('https://staging.bxcess.my/password/reset');
        //this.setState({ result });
    };


    const login = async () => {
        await dispatch(actionCreator.login())
        await dispatch(actionCreator.loginLMS())

    }

    useEffect(() => {
        (proceed && token) && props.navigation.navigate('MainTabNav')
    }, [proceed, token]);

    const setLogin = (value) => dispatch({ type: 'SET_LOGIN', payload: { ...value } })

    const { email, password, error, errorColor, indicator, proceed } = useSelector(state => state.loginScreenReducer, shallowEqual)
    const token = useSelector(state => state.apiReducer.token, shallowEqual)

    var emailBorderColor = '#5a83c2'
    const emailError = errorColor && errorColor.find(test => test == "E-mail")
    if (emailError == "E-mail") {
        emailBorderColor = '#d94498'
    }

    var passwordBorderColor = '#5a83c2'
    const passwordError = error && errorColor.find(test => test == "Password")
    if (passwordError == "Password") {
        passwordBorderColor = '#d94498'
    }

    var emailErrorHint = ''
    var passwordErrorHint = ''

    error && error.map(err => {
        if (err.title == 'email') { emailErrorHint = err.desc }
        if (err.title == 'password') { passwordErrorHint = err.desc }

    })

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: emailBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput value={email} onChangeText={(email) => setLogin({ email })} placeholder={'E-mail'} style={{ marginLeft: 5, flex: 1 }} placeholder={(emailErrorHint.length > 0) ? emailErrorHint : 'email@address.com'} placeholderTextColor={(emailErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'email-address'} />
                        </View>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                            <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput secureTextEntry value={password} onChangeText={(password) => setLogin({ password })} style={{ marginLeft: 5, flex: 1 }} placeholder={(passwordErrorHint.length > 0) ? '******' : '******'} placeholderTextColor={(passwordErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                            <TouchableOpacity onPress={() => forgotPassword()}>
                                <Text style={[styles.textDefault, { margin: 5, color: 'dodgerblue' }]}>Click here</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity onPress={() => login()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Log In</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />}
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View >
    );
}




export default LoginScreen