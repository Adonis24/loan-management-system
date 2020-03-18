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


import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'

import { CustomTextInput } from '../components/Custom'

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
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

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

                                    <CustomTextInput
                                        imageUri={require('../assets/images/user.png')}
                                        value={declareSign}
                                        handleChange={FormikProps.handleChange(`declareSign`)}
                                        handleBlur={FormikProps.handleBlur(`declareSign`)}
                                        touched={declareSignTouched}
                                        error={declareSignError}
                                        placeholder={'Authorized Personal Digital Sign'}

                                    />
                                    <CustomTextInput
                                        imageUri={require('../assets/images/mykad.png')}
                                        value={declareName}
                                        handleChange={FormikProps.handleChange(`declareName`)}
                                        handleBlur={FormikProps.handleBlur(`declareName`)}
                                        touched={declareNameTouched}
                                        error={declareNameError}
                                        placeholder={'Name'}
                                        keyboardType={'default'}
                                    />

                                    <CustomTextInput
                                        imageUri={require('../assets/images/mykad.png')}
                                        value={declarePosition}
                                        handleChange={FormikProps.handleChange(`declarePosition`)}
                                        handleBlur={FormikProps.handleBlur(`declarePosition`)}
                                        touched={declarePositionTouched}
                                        error={declarePositionError}
                                        placeholder={'Position'}
                                        keyboardType={'numbers-and-punctuation'}
                                    />

                                    <CustomTextInput
                                        imageUri={require('../assets/images/user.png')}
                                        value={declareStamp}
                                        handleChange={FormikProps.handleChange(`declareStamp`)}
                                        handleBlur={FormikProps.handleBlur(`declareStamp`)}
                                        touched={declareStampTouched}
                                        error={declareStampError}
                                        placeholder={'Stamp'}
                                        keyboardType={'default'}
                                    />



                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid || !isInternetReachable} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={(FormikProps.isValid && isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' }]} >
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

export default DeclarationDigitalSignScreen