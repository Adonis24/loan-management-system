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

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const UnderConstructionScreen=(props)=>{

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
                            <Text style={[styles.textDefault, { margin: 20 }]}>The feature will be available soon. Stay tuned!</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#4A90E2' }}>
                                    <LinearGradient
                                        colors={['#4DCB3E', '#269B1D']}
                                        style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 15, width: Layout.window.width * 0.4, }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Dashboard</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </View >
        );
    }



export default UnderConstructionScreen