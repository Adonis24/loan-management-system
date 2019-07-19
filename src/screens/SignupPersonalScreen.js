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
    KeyboardAvoidingView,
    ActivityIndicator

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class SignupPersonalScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        await this.props.getToken()
    }


    async register() {

        await this.props.register();
        //await this.props.getPersonalToken();
        // await this.props.navigation.navigate('SignUpPersonalSuccess')
    }


    render() {
        this.props.proceed && this.props.navigation.navigate('SignUpPersonalSuccess')

        var emailBorderColor = '#5a83c2'
        const emailError = this.props.errorColor && this.props.errorColor.find(test => test == "E-mail")
        if (emailError == "E-mail") {
            emailBorderColor = '#d94498'
        }

        var nameBorderColor = '#5a83c2'
        const nameError = this.props.error && this.props.errorColor.find(test => test == "Name")
        if (nameError == "Name") {
            nameBorderColor = '#d94498'
        }

        var passwordBorderColor = '#5a83c2'
        const passwordError = this.props.error && this.props.errorColor.find(test => test == "Password")
        if (passwordError == "Password") {
            passwordBorderColor = '#d94498'
        }

        var passwordConfirmBorderColor = '#5a83c2'
        const passwordConfirmError = this.props.error && this.props.errorColor.find(test => test == "Confirm Password")
        if (passwordConfirmError == "Confirm Password") {
            passwordConfirmBorderColor = '#d94498'
        }

        var emailErrorHint = ''
        var nameErrorHint = ''
        var passwordErrorHint = ''
        var passwordConfirmErrorHint = ''

        this.props.error && this.props.error.map(err => {
            if (err.title == 'email') { emailErrorHint = err.desc }
            if (err.title == 'name') { nameErrorHint = err.desc }
            if (err.title == 'password') { passwordErrorHint = err.desc }
            if (err.title == 'confirm password') { passwordConfirmErrorHint = err.desc }
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
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                            <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Personal Info</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: nameBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.name} onChangeText={(name) => this.props.setRegister({ name })} style={{ marginLeft: 5, flex: 1 }} placeholder={(nameErrorHint.length > 0) ? nameErrorHint : 'Full name'} placeholderTextColor={(nameErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: emailBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.email} onChangeText={(email) => this.props.setRegister({ email })} style={{ marginLeft: 5, flex: 1 }} placeholder={(emailErrorHint.length > 0) ? emailErrorHint : 'email@address.com'} placeholderTextColor={(emailErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'email-address'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput secureTextEntry value={this.props.password} onChangeText={(password) => this.props.setRegister({ password })} style={{ marginLeft: 5 }} placeholder={(passwordErrorHint.length > 0) ? '******' : 'Password'} placeholderTextColor={(passwordErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: passwordConfirmBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput secureTextEntry value={this.props.password_confirmation} onChangeText={(password_confirmation) => this.props.setRegister({ password_confirmation })} style={{ marginLeft: 5 }} placeholder={(passwordConfirmErrorHint.length > 0) ? '******' : 'Confirm Password'} placeholderTextColor={(passwordConfirmErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.register()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
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
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.registrationReducer.name,
        email: state.registrationReducer.email,
        password: state.registrationReducer.password,
        password_confirmation: state.registrationReducer.password_confirmation,
        proceed: state.registrationReducer.proceed,
        error: state.registrationReducer.error,
        errorColor: state.registrationReducer.errorColor,
        indicator: state.registrationReducer.indicator,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getToken: () => dispatch(actionCreator.getToken()),
        setRegister: (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } }),
        register: () => dispatch(actionCreator.register()),
        getPersonalToken: () => dispatch(actionCreator.getPersonalToken()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupPersonalScreen)