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
    ImageBackground,
    KeyboardAvoidingView


} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
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



const validationSchema = Yup.object().shape({

    declareSign: Yup
        .string()
        .required()
        .min(3)
        .label('Declaration Sign'),

    declareName: Yup
        .string()
        .required()
        .min(3)
        .label('Name'),

    declarePosition: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('Position'),

    declareStamp: Yup
        .string()
        .required()
        .min(3)
        .label('Stamp'),




});

const DeclarationDigitalSignScreen = (props) => {

    const dispatch = useDispatch()

    const DeclarationSign = () => {
        dispatch(actionCreator.declarationSign())
        //props.navigation.navigate('DeclarationDigitalSign')
    }

    const setDeclarationSign = (value) => dispatch({ type: 'SET_DECLARE_SIGN', payload: { ...value } })

    //const { declareSign, declareName, declarePosition, declareStamp, declareDate, } = useSelector(state => state.companyInformationReducer, shallowEqual)



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Formik
                        validateOnMount
                        initialValues={{}}

                        onSubmit={async (values, actions) => {
                            console.log(`values formik ialah ${JSON.stringify(values)}`)
                            await setDeclarationSign(values)
                            DeclarationSign()
                            //props.navigation.navigate('CompanyInfoSuccess')
                            actions.setSubmitting(false)
                        }
                        }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {

                            const { declareSign, declareName, declarePosition, declareStamp } = FormikProps.values

                            const declareSignError = FormikProps.errors.declareSign
                            const declareSignTouched = FormikProps.touched.declareSign

                            const declareNameError = FormikProps.errors.declareName
                            const declareNameTouched = FormikProps.touched.declareName

                            const declarePositionError = FormikProps.errors.declarePosition
                            const declarePositionTouched = FormikProps.touched.declarePosition

                            const declareStampError = FormikProps.errors.declareStamp
                            const declareStampTouched = FormikProps.touched.declareStamp

                        


                            return (

                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                                    {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Details of Connected Party</Text>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: declareSignTouched && declareSignError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={declareSign} onChangeText={FormikProps.handleChange(`declareSign`)} onBlur={FormikProps.handleBlur(`declareSign`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Authorized Personal Digital Sign'} placeholderTextColor={declareSignTouched && declareSignError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {declareSignTouched && declareSignError && <Text style={styles.error}>{declareSignError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: declareNameTouched && declareNameError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={declareName} onChangeText={FormikProps.handleChange(`declareName`)} onBlur={FormikProps.handleBlur(`declareName`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Name'} placeholderTextColor={declareNameTouched && declareNameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {declareNameTouched && declareNameError && <Text style={styles.error}>{declareNameError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: declarePositionTouched && declarePositionError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={declarePosition} onChangeText={FormikProps.handleChange(`declarePosition`)} onBlur={FormikProps.handleBlur(`declarePosition`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Position'} placeholderTextColor={declarePositionTouched && declarePositionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'numbers-and-punctuation'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {declarePositionTouched && declarePositionError && <Text style={styles.error}>{declarePositionError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: declareStampTouched && declareStampError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={declareStamp} onChangeText={FormikProps.handleChange(`declareStamp`)} onBlur={FormikProps.handleBlur(`declareStamp`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Stamp'} placeholderTextColor={declareStampTouched && declareStampError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {declareStampTouched && declareStampError && <Text style={styles.error}>{declareStampError}</Text>}
                                    </View>


                                 

                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.box,{backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }}
                    </Formik >


                    {/* /////////////////////////////////////////////// */}
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                            <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Declaration Digital Sign</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={declareSign} onChangeText={(declareSign) => setDeclarationSign({ declareSign })} placeholder={'Authorized Personal Digital Sign'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={declareName} onChangeText={(declareName) => setDeclarationSign({ declareName })} placeholder={'Name'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={declarePosition} onChangeText={(declarePosition) => setDeclarationSign({ declarePosition })} placeholder={'Position'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={declareStamp} onChangeText={(declareStamp) => setDeclarationSign({ declareStamp })} placeholder={'Company Stamp'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={declareDate} onChangeText={(declareDate) => setDeclarationSign({ declareDate })} placeholder={'Date'} style={{ marginLeft: 5 }} />
                            </View>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Next</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
                </KeyboardAvoidingView>
            </View>

        </View>
    );
}

export default DeclarationDigitalSignScreen