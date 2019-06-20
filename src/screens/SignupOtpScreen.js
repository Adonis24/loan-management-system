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

class SignupOtpScreen extends React.PureComponent {
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
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault,{margin:5}]}>Registration</Text>
                            <Text style={[styles.textDefault,{margin:5}]}>1 2 3</Text>
                            {/* <TextInput style={{ borderBottomWidth }} /> */}
                            <View style={{ alignSelf: 'stretch', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row',margin:5 }}>
                                <Ionicons name={'ios-person'} size={32} color='#4A90E2' />
                                <TextInput placeholder={'Ccountry Code'} style={{marginLeft:5}} />
                            </View>
                            <View style={{ alignSelf: 'stretch', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row',margin:5 }}>
                                <Ionicons name={'ios-person'} size={32} color='#4A90E2' />
                                <TextInput placeholder={'Phone'} style={{marginLeft:5}} />
                            </View>   
                            <View style={{ alignSelf: 'stretch',flexDirection:'row',justifyContent:'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpOtpEnter')} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15,justifyContent:'center',alignItems:'center',margin:10 }}>
                                <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Next</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15,justifyContent:'center',alignItems:'center',margin:10 }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupOtpScreen)