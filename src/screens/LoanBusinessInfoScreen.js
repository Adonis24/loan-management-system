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
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    compAct: Yup
        .string()
        .required()
        .min(3)
        .label('Aktiviti'),

    compName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Syarikat'),

    pengalaman: Yup
        .string()
        .required()
        .min(3)
        .label('Pengalaman'),

    compPendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),




});

const LoanConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compName, pengalaman, compAct, compPendapatan, } = useSelector(state => state.financingReducer, shallowEqual)


    const setBusinessInfo = (value) => dispatch({ type: 'SET_BUSINESS_INFO', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ compName, pengalaman, compAct, compPendapatan, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setBusinessInfo(values)
                    props.navigation.navigate('LoanBusinessAddrInfo')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { compAct, compName, pengalaman, compPendapatan, poskod } = FormikProps.values

                    const compActError = FormikProps.errors.compAct
                    const compActTouched = FormikProps.touched.compAct

                    const compNameError = FormikProps.errors.compName
                    const compNameTouched = FormikProps.touched.compName

                    const pengalamanError = FormikProps.errors.pengalaman
                    const pengalamanTouched = FormikProps.touched.pengalaman

                    const compPendapatanError = FormikProps.errors.compPendapatan
                    const compPendapatanTouched = FormikProps.touched.compPendapatan




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
                            <Text style={[styles.formTitle]}>Section D</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Perniagaan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={compName}
                                handleChange={FormikProps.handleChange(`compName`)}
                                handleBlur={FormikProps.handleBlur(`compName`)}
                                touched={compNameTouched}
                                error={compNameError}
                                placeholder={'Nama Syarikat'}
                                keyboardType={'default'}
                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/bizAct.png')}
                                value={compAct}
                                handleChange={FormikProps.handleChange(`compAct`)}
                                handleBlur={FormikProps.handleBlur(`compAct`)}
                                touched={compActTouched}
                                error={compActError}
                                placeholder={'Aktivi Perniagaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={pengalaman}
                                handleChange={FormikProps.handleChange(`pengalaman`)}
                                handleBlur={FormikProps.handleBlur(`pengalaman`)}
                                touched={pengalamanTouched}
                                error={pengalamanError}
                                placeholder={'Tempoh/Pengalaman Berniaga'}
                                keyboardType={'phone-pad'}
                            />
                           
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={compPendapatan}
                                handleChange={FormikProps.handleChange(`compPendapatan`)}
                                handleBlur={FormikProps.handleBlur(`compPendapatan`)}
                                touched={compPendapatanTouched}
                                error={compPendapatanError}
                                placeholder={'Anggaran Pendapatan'}
                                keyboardType={'decimal-pad'}
                            />


                            <CustomFormAction
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




export default LoanConnectedPartiesScreen