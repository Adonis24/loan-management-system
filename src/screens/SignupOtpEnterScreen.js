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
    ImageBackground


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

import moment from 'moment'


const SignupOtpEnterScreen = (props) => {

    const dispatch = useDispatch()

    const { c1, c2, c3, c4, phoneVerified, proceedOTP, status } = useSelector(state => state.registrationReducer, shallowEqual)

    const verifyOTP = (value) => dispatch({ type: 'VERIFY_OTP', payload: { ...value } })
    const reset = () => dispatch({ type: 'RESET_OTP', })


    const [duration, setDuration] = useState(180)
    const [durationFormat, setDurationFormat] = useState(null)
    const [button, setButton] = useState(true)

    useEffect(() => {
        duration > 0 ? timeLapsed() : null;
    }, []);


    const verifyPhone = async () => {
        await dispatch(actionCreator.verifyPhone())
        await phoneVerified == true ? props.navigation.navigate('CompanyInfoIntro') : null
    }

    const verifyOTPSubmit = async (c) => {

        await verifyOTP(c)
        verifyPhone()

        console.log(c1, c2, c3, c4)

    }

    const timeLapsed = () => {
        interval = setInterval(() => {
            const durationFormat = moment().toObject()
            const durationFormatFormatted = durationFormat.format

            setDuration(duration - 1)
            setDurationFormat(durationFormat)
        }, 1000);
    }

    const reset = () => {
        reset()
    }

    const getBoxes = () => {
        //var d1Focus,d2Focus,d3Focus,d4Focus=false

        if (c1 && c2 && c3) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c3} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} onChange={() =>setButton(!button)} autoFocus={true} maxLength={1} value={c4} onChangeText={c4 => verifyOTPSubmit({ c4 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
            </View>)

        } else if (c1 && c2) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c3} onChangeText={c3 => verifyOTP({ c3 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
            </View>)

        } else if (c1) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c2} onChangeText={c2 => verifyOTP({ c2 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>

            </View>)

        } else

            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c1} onChangeText={c1 => verifyOTP({ c1 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ position: 'absolute' }}><Text></Text></View>
            </View>)

    }


    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <View>

                        </View>

                        <Text style={[styles.textDefault, { margin: 5, color: 'darkblue', fontWeight: 'bold' }]}>Enter OTP code</Text>
                        <Text style={[styles.textDefault, { margin: 5 }]}>We have sent an OTP code to your number</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5 }}>
                            {getBoxes()}
                        </View>
                        {c1 && <TouchableOpacity onPress={() => reset()} style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                            <Text style={[styles.caption, { margin: 5 }]}>Reset</Text>
                        </TouchableOpacity>}
                        <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                            <Text style={[styles.textDefault, { margin: 5 }]}>Resend OTP code : </Text>
                            {duration > 0 ?
                                <Text style={[styles.textDefault, { margin: 5, color: 'orange' }]}>{duration} s</Text> :
                                <TouchableOpacity onPress={() => dispatch(actionCreator.registerOTP())} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'orange', borderRadius: 5, padding: 5 }}><Text style={styles.caption}>Resend</Text></TouchableOpacity>}
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity disabled={button} onPress={() => verifyPhone()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={!button ? ['#4DCB3E', '#269B1D'] : ['rgba(77, 203, 62, 0.5)', 'rgba(38, 155, 29, 0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Verify</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SignupOtpEnterScreen