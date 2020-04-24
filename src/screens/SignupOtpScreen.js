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

import Layout from '../constants/Layout'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import * as actionCreator from '../store/actions/action'
import LayoutLoan from '../Layout/LayoutLoan';

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
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const setOTP = (value) => dispatch({ type: 'SET_OTP', payload: { ...value } })
    const setRegister = (value) => dispatch({ type: 'SET_REGISTER', payload: { ...value } })

    const registerOTP = async () => {
        await dispatch(actionCreator.registerOTP())
        await props.navigation.navigate('VerifyPhone')
    }


    return (

        <LayoutLoan title={'Mobile Phone Number'} back={()=>props.navigation.goBack()}>
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


                        <View style={{ justifyContent: 'center', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>


                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PHONE VERIFICATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue',marginBottom:20 }]}>OTP Verification</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/cc.png')}
                                value={'+6'}
                                handleChange={FormikProps.handleChange(`countryCode`)}
                                handleBlur={FormikProps.handleBlur(`countryCode`)}
                                touched={countryCodeTouched}
                                error={countryCodeError}
                                placeholder={'Country Code'}
                                editable={false}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mobile.png')}
                                value={phone}
                                handleChange={FormikProps.handleChange(`phone`)}
                                handleBlur={FormikProps.handleBlur(`phone`)}
                                touched={phoneTouched}
                                error={phoneError}
                                placeholder={'Enter Phone No'}
                                keyboardType={'phone-pad'}

                            />
 <View style={{ borderColor: 'lightyellow', padding: 10, margin: 0, alignSelf: 'stretch', backgroundColor: 'lightyellow', borderWidth: 1, borderColor: 'lightgrey',marginBottom:20 }}>
                                <Text style={[styles.textSmall,{textAlign:'center'}]}>An SMS containing Verification Code will be sent to the number entered above</Text>
                           </View>

                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                            {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                        </View>

                    )
                }}
            </Formik >
        </LayoutLoan>
    );
}



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




export default SignupOtpScreen