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

class SignupOtpEnterScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
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
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue', fontWeight: 'bold' }]}>Enter OTP code</Text>
                            <Text style={[styles.textDefault, { margin: 5 }]}>We have sent an OTP code to your number</Text>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5 }}>
                                <TextInput style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 10, margin: 5 }} />
                                <TextInput style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 10, margin: 5 }} />
                                <TextInput style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 10, margin: 5 }} />
                                <TextInput style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 10, margin: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                                <Text style={[styles.textDefault, { margin: 5 }]}>Resend OTP code : </Text>
                                <Text style={[styles.textDefault, { margin: 5, color: 'orange' }]}>2 : 15 </Text>
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpSuccess')} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Verify</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {



    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupOtpEnterScreen)