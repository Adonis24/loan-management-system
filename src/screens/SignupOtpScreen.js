//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView


} from 'react-native';

import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class SignupOtpScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async registerOTP() {
        await this.props.registerOTP()
        await this.props.proceed && this.props.navigation.navigate('SignUpOtpEnter')
    }

    async componentDidMount() {


        const screen = this.props.navigation.getParam('screen', 'NA')
        

        if (screen != 'setting') { this.props.getPersonalToken() } else {
            const personalToken = await SecureStore.getItemAsync('personalToken')
            const { token_type, access_token } = JSON.parse(personalToken)
            this.props.setRegister({ token_type, access_token })
        }
    }

    render() {
        var phoneBorderColor = '#5a83c2'
        const phoneError = this.props.error && this.props.errorColor.find(test => test == "phone")
        if (phoneError == "phone") {
            phoneBorderColor = '#d94498'
        }

        var phoneErrorHint = ''
        this.props.error && this.props.error.map(err => {
            if (err.title == 'phone') { phoneErrorHint = err.desc }
        })

        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} />
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} />
                    </View>

                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PHONE VERIFICATION</Text>
                            <Image source={require('../assets/images/2.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>OTP Verification</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/cc.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput editable={false} value={this.props.countryCode} onChangeText={(countryCode) => this.props.setOTP({ countryCode })} placeholder={'+6'} style={{ marginLeft: 5 }} placeholderTextColor={'#000'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: phoneBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/mobile.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput keyboardType={'phone-pad'} value={this.props.phone} onChangeText={(phone) => this.props.setOTP({ phone })} placeholder={(phoneErrorHint.length > 0) ? phoneErrorHint : '012 345 6789'} style={{ marginLeft: 5, flex: 1 }} />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.registerOTP()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        countryCode: state.registrationReducer.countryCode,
        phone: state.registrationReducer.phone,

        proceed: state.registrationReducer.proceed,

        error: state.registrationReducer.error,
        errorColor: state.registrationReducer.errorColor,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setOTP: (value) => dispatch({ type: 'SET_OTP', payload: { ...value } }),
        registerOTP: () => dispatch(actionCreator.registerOTP()),
        getPersonalToken: () => dispatch(actionCreator.getPersonalToken()),
        setRegister: (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupOtpScreen)