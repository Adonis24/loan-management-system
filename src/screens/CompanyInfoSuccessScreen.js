//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'


const CompanyInfoSuccessScreen = (props) => {

    const dispatch = useDispatch()
    const { listWorkers } = useSelector(state => state.listWorkersReducer, shallowEqual)
    const { companyRegistrationStatus } = useSelector(state => state.companyInformationReducer, shallowEqual)



    const done = async () => {
        //await this.props.companyInfo()
        //this.props.contactPerson()
        dispatch(actionCreator.doneForNow())
        props.navigation.navigate('Dashboard')
    }

    const skip = () => {
        dispatch(actionCreator.initiateCompanyInfo())
        props.navigation.navigate('Dashboard')
    }

    useEffect(() => {
        dispatch(actionCreator.initiateListWorkers())
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {companyRegistrationStatus ? companyRegistrationStatus.status ? <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFO</Text>
                        <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise' }]}>Congratulation!</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 20 }]}>You have entered your company information</Text>
                        </View>
                        <TouchableOpacity onPress={() => done()} style={{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#4A90E2' }}>
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 15, width: Layout.window.width * 0.4, }}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => skip()} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={[styles.textDefault,]}>Skip</Text>
                        </TouchableOpacity>
                    </View> :

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFO</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'column', margin: 5 }}>
                                <Text style={[styles.textDefault, { margin: 5, color: 'darkturquoise' }]}>Problems Detected!</Text>
                                <Text style={[styles.textDefault, { margin: 5, marginBottom: 20 }]}>Please return to previous screen to try again</Text>
                            </View>


                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <Text style={[styles.textDefault,]}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <ActivityIndicator />}

                </View>
            </View>
        </View>
    );
}

export default CompanyInfoSuccessScreen