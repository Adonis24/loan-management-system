//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
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

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser';

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class LoginScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async forgotPassword() {
        let result = await WebBrowser.openBrowserAsync('https://staging.bxcess.my/password/reset');
        //this.setState({ result });
    };


    async login() {
        await this.props.login()
        await this.props.loginLMS()

    }

    componentDidMount() {

    }


    render() {
        this.props.proceed && this.props.navigation.navigate('Dashboard')
        var emailBorderColor = '#5a83c2'
        const emailError = this.props.errorColor && this.props.errorColor.find(test => test == "E-mail")
        if (emailError == "E-mail") {
            emailBorderColor = '#d94498'
        }

        var passwordBorderColor = '#5a83c2'
        const passwordError = this.props.error && this.props.errorColor.find(test => test == "Password")
        if (passwordError == "Password") {
            passwordBorderColor = '#d94498'
        }

        var emailErrorHint = ''
        var passwordErrorHint = ''

        this.props.error && this.props.error.map(err => {
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
                                <TextInput value={this.props.email} onChangeText={(email) => this.props.setLogin({ email })} placeholder={'E-mail'} style={{ marginLeft: 5, flex: 1 }} placeholder={(emailErrorHint.length > 0) ? emailErrorHint : 'email@address.com'} placeholderTextColor={(emailErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'email-address'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput secureTextEntry value={this.props.password} onChangeText={(password) => this.props.setLogin({ password })} style={{ marginLeft: 5, flex: 1 }} placeholder={(passwordErrorHint.length > 0) ? '******' : '******'} placeholderTextColor={(passwordErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                                <TouchableOpacity onPress={() => this.forgotPassword()}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'dodgerblue' }]}>Click here</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.login()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Log In</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                            {this.props.indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />}
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View >
        );
    }
}


function mapStateToProps(state) {
    return {
        email: state.loginScreenReducer.email,
        password: state.loginScreenReducer.password,
        error: state.loginScreenReducer.error,
        errorColor: state.loginScreenReducer.errorColor,
        indicator: state.loginScreenReducer.indicator,

        proceed: state.loginScreenReducer.proceed
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setLogin: (value) => dispatch({ type: 'SET_LOGIN', payload: { ...value } }),
        login: () => dispatch(actionCreator.login()),
        loginLMS: () => dispatch(actionCreator.loginLMS())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)