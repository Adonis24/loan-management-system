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
    KeyboardAvoidingView,
    ActivityIndicator

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'

import { Formik } from 'formik';
import * as Yup from 'yup';


//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    name: Yup
        .string('Please enter')
        .required()
        .min(3)
        .label('Name'),

    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),

    password: Yup
        .string()
        .min(6)
        .required()
        .label('Password'),

    password_confirmation: Yup
        .string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Password Confirmation'),

});

const SignupPersonalScreen = (props) => {

    const dispatch = useDispatch()

    //const { name, email, password, password_confirmation, proceed, error, errorColor, indicator } = useSelector(state => state.registrationReducer, shallowEqual)


    useEffect(() => {
        dispatch(actionCreator.getToken())
        dispatch(actionCreator.getTokenLMS())
    }, []);

    const register = async (values) => {

        await dispatch(actionCreator.register(values))
        await dispatch(actionCreator.registerLMS(values))
        //await this.props.getPersonalToken();
         await props.navigation.navigate('SignUpPersonalSuccess')
    }

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Formik 
                    validateOnMount
                     initialValues={{  }} onSubmit={(values, actions) => {
                        console.log(`values formik ialah ${JSON.stringify(values)}`)
                        dispatch({type:'SET_REGISTER',payload:{...values}}) 
                        register(values)
                         actions.setSubmitting(false)
                    }
                    }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {

                            const { name, email, password, password_confirmation } = FormikProps.values

                            const nameError = FormikProps.errors.name
                            const nameTouched = FormikProps.touched.name

                            const emailError = FormikProps.errors.email
                            const emailTouched = FormikProps.touched.email

                            const passwordError = FormikProps.errors.password
                            const passwordTouched = FormikProps.touched.password

                            const password_confirmationError = FormikProps.errors.password_confirmation
                            const password_confirmationTouched = FormikProps.touched.password_confirmation

                            return (


                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                                    <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Personal Info</Text>
                                 
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: nameTouched && nameError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={name} onChangeText={FormikProps.handleChange(`name`)} onBlur={FormikProps.handleBlur(`name`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Full name'} placeholderTextColor={nameTouched && nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: emailTouched && emailError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={email} onChangeText={FormikProps.handleChange(`email`)} onBlur={FormikProps.handleBlur(`email`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'email@address.com'} placeholderTextColor={emailTouched && emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'email-address'} />

                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: passwordError && passwordTouched ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password} onChangeText={FormikProps.handleChange(`password`)} onBlur={FormikProps.handleBlur(`password`)} style={{ marginLeft: 5 }} placeholder={'Password'} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                    </View>



                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20, borderColor: password_confirmationTouched && password_confirmationError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password_confirmation} onChangeText={FormikProps.handleChange(`password_confirmation`)} onBlur={FormikProps.handleBlur(`password_confirmation`)} style={{ marginLeft: 5 }} placeholder={'Confirm Password'} placeholderTextColor={passwordTouched && password_confirmationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {password_confirmationTouched && password_confirmationError && <Text style={styles.error}>{passwordError}</Text>}
                                    </View>

                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box,{backgroundColor: '#5A647F' }]} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                                </View>

                            )
                        }}
                    </Formik >
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

export default SignupPersonalScreen