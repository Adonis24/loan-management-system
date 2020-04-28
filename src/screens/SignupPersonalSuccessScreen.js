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

    ImageBackground,
    ActivityIndicator

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'
import LayoutRegister from '../Layout/LayoutRegister';

const SignupPersonalSuccessScreen = (props) => {

    const dispatch = useDispatch()
    const { token, error, message } = useSelector(state => state.apiReducer, shallowEqual)


    useEffect(() => {
        if (!error) {
            console.log(` LOGIN : error ialah :${JSON.stringify(error)}`)
            dispatch(actionCreator.getPersonalToken())
            dispatch(actionCreator.getPersonalTokenLMS())
        } else {
            console.log(`TAK LOGIN : error ialah :${JSON.stringify(error)}`)
        }

    }, []);

    const resetCode = () => {
        dispatch({ type: 'SET_API_AUTH', payload: { error: null, message: null } })
    }


    return (
        <LayoutRegister title={'Registration'}>
            {token ? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />

                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise', textAlign: 'center' }]}>Congratulations!</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, textAlign: 'center' }]}>An e-mail has been sent to your registered address for verification. </Text>
                        </View>

                        <TouchableOpacity onPress={() => props.navigation.reset({index: 0, routes: [{ name: 'MainTabNav' }],})} style={[styles.box, { width: Layout.window.width * 0.4, }]}>
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={[styles.box, { width: Layout.window.width * 0.4, borderColor: '#4A90E2', borderWidth: 1, borderRadius: 15 }]}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Dashboard</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> : error ? <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />

                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise', textAlign: 'center' }]}>Unfortunately!</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, textAlign: 'center' }]}>Please Check Your Information And Try Again</Text>
                            {/* check for possible value for error so that we know how to display the error message */}
                            {/* <Text>{JSON.stringify(error)}</Text> */}
                        </View>
                        <TouchableOpacity onPress={() => { resetCode(); props.navigation.goBack() }} >
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={[styles.box, { width: Layout.window.width * 0.4, borderColor: '#4A90E2', borderWidth: 1, borderRadius: 15 }]}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> : <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />

                       <ActivityIndicator />
                    </View>
                </View>
                    </View>}

        </LayoutRegister>
    );
}


export default SignupPersonalSuccessScreen