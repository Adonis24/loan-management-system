//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image, 
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'


import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    capacity: Yup
        .string()
        .required()
        .min(3)
        .label('Capacity'),

    nameCP: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    icNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    relationship: Yup
        .string()
        .required()
        .min(3)
        .label('Relationship'),

    emailSME: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Email SME'),


});

const DetailsOfConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const DetailConnect = async () => {
        dispatch(actionCreator.detailConnect())
        props.navigation.navigate('DeclarationDigitalSign')
    }

    const setDetailConnect = (value) => dispatch({ type: 'SET_DETAIL_CONNECT', payload: { ...value } })


    //const { capacity, nameCP, icNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)



    return (
        <View style={styles.container}>
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
                            await setDetailConnect(values)
                            DetailConnect()
                            //props.navigation.navigate('CompanyInfoSuccess')
                            actions.setSubmitting(false)
                        }
                        }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {




                            const { capacity, nameCP, icNumber, relationship, emailSME } = FormikProps.values

                            const capacityError = FormikProps.errors.capacity
                            const capacityTouched = FormikProps.touched.capacity

                            const nameCPError = FormikProps.errors.nameCP
                            const nameCPTouched = FormikProps.touched.nameCP

                            const icNumberError = FormikProps.errors.icNumber
                            const icNumberTouched = FormikProps.touched.icNumber

                            const relationshipError = FormikProps.errors.relationship
                            const relationshipTouched = FormikProps.touched.relationship

                            const emailSMEError = FormikProps.errors.emailSME
                            const emailSMETouched = FormikProps.touched.emailSME


                            return (

                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                                    {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Details of Connected Party</Text>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: capacityTouched && capacityError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={capacity} onChangeText={FormikProps.handleChange(`capacity`)} onBlur={FormikProps.handleBlur(`capacity`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Capacity'} placeholderTextColor={capacityTouched && capacityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {capacityTouched && capacityError && <Text style={styles.error}>{capacityError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: nameCPTouched && nameCPError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={nameCP} onChangeText={FormikProps.handleChange(`nameCP`)} onBlur={FormikProps.handleBlur(`nameCP`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Name of Connected Party'} placeholderTextColor={nameCPTouched && nameCPError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {nameCPTouched && nameCPError && <Text style={styles.error}>{nameCPError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: icNumberTouched && icNumberError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={icNumber} onChangeText={FormikProps.handleChange(`icNumber`)} onBlur={FormikProps.handleBlur(`icNumber`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'MyKad No'} placeholderTextColor={icNumberTouched && icNumberError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'numbers-and-punctuation'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {icNumberTouched && icNumberError && <Text style={styles.error}>{icNumberError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: relationshipTouched && relationshipError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={relationship} onChangeText={FormikProps.handleChange(`relationship`)} onBlur={FormikProps.handleBlur(`relationship`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Relationship'} placeholderTextColor={relationshipTouched && relationshipError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {relationshipTouched && relationshipError && <Text style={styles.error}>{relationshipError}</Text>}
                                    </View>


                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: emailSMETouched && emailSMEError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={emailSME} onChangeText={FormikProps.handleChange(`emailSME`)} onBlur={FormikProps.handleBlur(`emailSME`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Email SME Bank'} placeholderTextColor={emailSMETouched && emailSMEError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'email-address'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {emailSMETouched && emailSMEError && <Text style={styles.error}>{emailSMEError}</Text>}
                                    </View>






                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid || !isInternetReachable} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={(FormikProps.isValid&&isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box,{ backgroundColor: '#5A647F' }]} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }}
                    </Formik >

                   
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}




export default DetailsOfConnectedPartiesScreen