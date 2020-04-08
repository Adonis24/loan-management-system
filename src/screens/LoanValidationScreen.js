import React, { useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({




    valName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    valPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    jawatan: Yup
        .string()
        .required()
        .min(3)
        .label('Jawatan'),

    valAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),


});

const LoanValidationScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, } = useSelector(state => state.financingReducer, shallowEqual)


    const setValidation = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })






    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setValidation(values)
                    dispatch(actionCreator.saveLoanData())
                    props.navigation.navigate('LoanDeclaration')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { valAlamat, valAlamat_2, valName, valPhoneNum, jawatan } = FormikProps.values


                    const valAlamatError = FormikProps.errors.valAlamat
                    const valAlamatTouched = FormikProps.touched.valAlamat

                    const valAlamat_2Error = FormikProps.errors.valAlamat_2
                    const valAlamat_2Touched = FormikProps.touched.valAlamat_2

                    const valNameError = FormikProps.errors.valName
                    const valNameTouched = FormikProps.touched.valName

                    const valPhoneNumError = FormikProps.errors.valPhoneNum
                    const valPhoneNumTouched = FormikProps.touched.valPhoneNum

                    const jawatanError = FormikProps.errors.jawatan
                    const jawatanTouched = FormikProps.touched.jawatan


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
                            <Text style={[styles.formTitle]}>Section I</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Pengesahan Dan Perakuan Menjalankan Perniagaan</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={valName}
                                handleChange={FormikProps.handleChange(`valName`)}
                                handleBlur={FormikProps.handleBlur(`valName`)}
                                touched={valNameTouched}
                                error={valNameError}
                                placeholder={'Nama'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/position.png')}
                                value={jawatan}
                                handleChange={FormikProps.handleChange(`jawatan`)}
                                handleBlur={FormikProps.handleBlur(`jawatan`)}
                                touched={jawatanTouched}
                                error={jawatanError}
                                placeholder={'Jawatan'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={valPhoneNum}
                                handleChange={FormikProps.handleChange(`valPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`valPhoneNum`)}
                                touched={valPhoneNumTouched}
                                error={valPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={valAlamat}
                                handleChange={FormikProps.handleChange(`valAlamat`)}
                                handleBlur={FormikProps.handleBlur(`valAlamat`)}
                                touched={valAlamatTouched}
                                error={valAlamatError}
                                placeholder={'Alamat Line 1'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={valAlamat_2}
                                handleChange={FormikProps.handleChange(`valAlamat_2`)}
                                handleBlur={FormikProps.handleBlur(`valAlamat_2`)}
                                touched={valAlamat_2Touched}
                                error={valAlamat_2Error}
                                placeholder={'Alamat Line 2'}

                            />

                            <CustomFormAction
                                label={`Save`}
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                        </View>

                    )
                }}
            </Formik >
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan>
    );
}




export default LoanValidationScreen