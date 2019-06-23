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
    ImageBackground


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

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

    login() {
        this.props.login()
        this.props.navigation.navigate('Dashboard')
    }


    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.email} onChangeText={(email) => this.props.setLogin({ email })} placeholder={'E-mail'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput secureTextEntry value={this.props.password} onChangeText={(password) => this.props.setLogin({ password })} placeholder={'Password'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                                <Text style={[styles.textDefault, { margin: 5, color: 'dodgerblue' }]}>Click here</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.login()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, backgroundColor: 'limegreen', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Log In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: 'grey' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}


function mapStateToProps(state) {
    return {
        email: state.loginScreenReducer.email,
        password: state.loginScreenReducer.password,
        proceed: state.loginScreenReducer.proceed
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setLogin: (value) => dispatch({ type: 'SET_LOGIN', payload: { ...value } }),
        login: () => dispatch(actionCreator.login())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)