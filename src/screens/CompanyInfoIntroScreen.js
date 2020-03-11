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
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const CompanyInfoIntroScreen=(props)=> {
 
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 20 }]}>Phone Verified.Proceed to company registration or skip to dashboard for now</Text>
                            
                           
                            <TouchableOpacity onPress={() => props.navigation.navigate('CompanyInformation')} >
                                <LinearGradient
                                    colors={['#4c669f', '#3b5998', '#192f6a']}
                                    style={[styles.box,{width: Layout.window.width * 0.4,borderColor:'#4A90E2',borderWidth:1,borderRadius:15 }]}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Company Info</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={[styles.box,{ width: Layout.window.width * 0.4,borderWidth: 1, borderColor: '#4A90E2'}]}>
                                <Text style={[styles.textDefault,]}>Skip</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </View >
        );
    }




export default CompanyInfoIntroScreen