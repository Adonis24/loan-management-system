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

const BusinessHubScreen = (props) => {



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                </View>
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                {/* HEADER */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                            <Ionicons name='ios-arrow-back' size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 7, justifyContent: 'flex-start' }}>
                    <Text style={[styles.textDefault, { fontWeight: 'bold', alignSelf: 'center', marginBottom: 20, fontSize: 20 }]}>Business Hub</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginLeft: Layout.window.width / 10, marginRight: Layout.window.width / 10 }}>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/EDA.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>EDA</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/directory.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>Biz Directory</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/CRM.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>CRM</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginLeft: Layout.window.width / 10, marginRight: Layout.window.width / 10 }}>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/mayamall.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>Marketplace</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/e-scoring.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>Financing</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/grant.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>Billing</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: Layout.window.width / 10, marginRight: Layout.window.width / 10 }}>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/ecommerce.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>Dev hub</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/RFQ.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>RFQ</Text>
                        </View>
                        <View style={[styles.shadow, { width: Layout.window.height / 10, height: Layout.window.height / 9.5, backgroundColor: '#fff', alignSelf: 'stretch', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' }]}>
                            <Image source={require('../assets/images/e-scoring.png')} style={{ width: undefined, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.caption]}>e-Scoring</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}





export default BusinessHubScreen