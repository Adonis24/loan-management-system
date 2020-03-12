//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
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
    CheckBox

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'


const SignupPersonalSuccessScreen = (props) => {

    const dispatch = useDispatch()
    const { listWorkers } = useSelector(state => state.listWorkersReducer, shallowEqual)



    const done = async () => {
        //await this.props.companyInfo()
        //this.props.contactPerson()


        dispatch(actionCreator.doneForNow())
        props.navigation.navigate('Agreement')
    }


    useEffect(() => {
        dispatch(actionCreator.getPersonalToken())
        dispatch(actionCreator.getPersonalTokenLMS())
    }, []);



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>USER REGISTRATION</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 20 }]}>Please proceed to phone verification or skip to dashboard</Text>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignUpOtp')} >
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={[styles.box,{width: Layout.window.width * 0.4,borderColor:'#4A90E2',borderWidth:1,borderRadius:15 }]}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Verify Phone</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')} style={[styles.box,{ width: Layout.window.width * 0.4,borderWidth: 1, borderColor: '#4A90E2' }]}>
                            <Text style={[styles.textDefault,]}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


export default SignupPersonalSuccessScreen