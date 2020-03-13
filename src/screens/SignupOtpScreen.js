//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({

    phone: Yup
        .string('Please enter')
        .required()
        .min(3)
        .label('Phone'),



});


const SignupOtpScreen = (props) => {

    const dispatch = useDispatch()

    const { countryCode, phone, proceed, error, errorColor } = useSelector(state => state.registrationReducer, shallowEqual)

    const setOTP = (value) => dispatch({ type: 'SET_OTP', payload: { ...value } })
    const setRegister = (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } })

    const registerOTP = async () => {
        await dispatch(actionCreator.registerOTP())
        await proceed && props.navigation.navigate('SignUpOtpEnter')
    }



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} />
                </View>

            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Formik
                        validateOnMount
                        initialValues={{}} onSubmit={(values, actions) => {
                            console.log(`values formik ialah ${JSON.stringify(values)}`)
                            setOTP(values)
                            registerOTP(values)
                            actions.setSubmitting(false)
                        }
                        }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {

                            const { phone, countryCode } = FormikProps.values

                            const phoneError = FormikProps.errors.phone
                            const phoneTouched = FormikProps.touched.phone

                            const countryCodeError = FormikProps.errors.countryCode
                            const countryCodeTouched = FormikProps.touched.countryCode


                            return (


                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />


                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PHONE VERIFICATION</Text>
                                    <Image source={require('../assets/images/2.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>OTP Verification</Text>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: countryCodeTouched && countryCodeError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/cc.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput editable={false} value={countryCode} onChangeText={FormikProps.handleChange(`countryCode`)} onBlur={FormikProps.handleBlur(`countryCode`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'+6'} placeholderTextColor={countryCodeTouched && countryCodeError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {countryCodeTouched && countryCodeError && <Text style={styles.error}>{countryCodeError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: phoneTouched && phoneError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mobile.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={phone} onChangeText={FormikProps.handleChange(`phone`)} onBlur={FormikProps.handleBlur(`phone`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'019 123456789'} placeholderTextColor={phoneTouched && phoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {phoneTouched && phoneError && <Text style={styles.error}>{phoneError}</Text>}
                                    </View>


                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' }]} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                                </View>

                            )
                        }}
                    </Formik >




                    {/* 

                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PHONE VERIFICATION</Text>
                        <Image source={require('../assets/images/2.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                        <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>OTP Verification</Text>

                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/cc.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput editable={false} value={countryCode} onChangeText={(countryCode) => setOTP({ countryCode })} placeholder={'+6'} style={{ marginLeft: 5 }} placeholderTextColor={'#000'} />
                        </View>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: phoneBorderColor, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                            <Image source={require('../assets/images/mobile.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput keyboardType={'phone-pad'} value={phone} onChangeText={(phone) => setOTP({ phone })} placeholder={(phoneErrorHint.length > 0) ? phoneErrorHint : '012 345 6789'} style={{ marginLeft: 5, flex: 1 }} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity onPress={() => registerOTP()} style={styles.box}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' }]} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}



export default SignupOtpScreen