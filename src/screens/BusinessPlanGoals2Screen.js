import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
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

    tahun2: Yup
        .string()
        .required()
        .min(4)
        .max(4)
        .label('Tahun'),

    grossProfit2: Yup
        .string()
        .required()
        .min(2)
        .label('Untung Kasar'),

    belanjaLain2: Yup
        .string()
        .required()
        .min(2)
        .label('Perbelanjaan Lain'),
    netProfit2: Yup
        .string()
        .required()
        .min(2)
        .label('Untung Bersih'),

    jualan2: Yup
        .string()
        .required()
        .min(2)
        .label('Jumlah'),

    belian2: Yup
        .string()
        .required()
        .min(2)
        .label('Belian'),


});

const BusinessPlanGoals2Screen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { belian2, tahun2, grossProfit2, belanjaLain2, netProfit2, jualan2 } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ belian2, tahun2, grossProfit2, belanjaLain2, netProfit2, jualan2 }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanGoals3')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { tahun2, belian2, grossProfit2, belanjaLain2, netProfit2, jualan2 } = FormikProps.values

                    const tahun2Error = FormikProps.errors.tahun2
                    const tahun2Touched = FormikProps.touched.tahun2

                    const belian2Error = FormikProps.errors.belian2
                    const belian2Touched = FormikProps.touched.belian2

                    const belanjaLain2Error = FormikProps.errors.belanjaLain2
                    const belanjaLain2Touched = FormikProps.touched.belanjaLain2

                    const netProfit2Error = FormikProps.errors.netProfit2
                    const netProfit2Touched = FormikProps.touched.netProfit2

                    const grossProfit2Error = FormikProps.errors.grossProfit2
                    const grossProfit2Touched = FormikProps.touched.grossProfit2

                    const jualan2Error = FormikProps.errors.jualan2
                    const jualan2Touched = FormikProps.touched.jualan2




                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                            <Text style={[styles.formTitle]}>Section E</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Sasaran Pencapaian Perniagaan Tahunan      (3 tahun ke hadapan)</Text>
                          
                                <CustomTextInput
                                    imageUri={require('../assets/images/estimateTime.png')}
                                    value={tahun2}
                                    handleChange={FormikProps.handleChange(`tahun2`)}
                                    handleBlur={FormikProps.handleBlur(`tahun2`)}
                                    touched={tahun2Touched}
                                    error={tahun2Error}
                                    placeholder={'Tahun Kedua'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/company.png')}
                                    value={jualan2}
                                    handleChange={FormikProps.handleChange(`jualan2`)}
                                    handleBlur={FormikProps.handleBlur(`jualan2`)}
                                    touched={jualan2Touched}
                                    error={jualan2Error}
                                    placeholder={'Jualan'}
                                    keyboardType={'phone-pad'}

                                />


                                <CustomTextInput
                                    imageUri={require('../assets/images/bizAct.png')}
                                    value={belian2}
                                    handleChange={FormikProps.handleChange(`belian2`)}
                                    handleBlur={FormikProps.handleBlur(`belian2`)}
                                    touched={belian2Touched}
                                    error={belian2Error}
                                    placeholder={'Belian/Kos Operasi'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={grossProfit2}
                                    handleChange={FormikProps.handleChange(`grossProfit2`)}
                                    handleBlur={FormikProps.handleBlur(`grossProfit2`)}
                                    touched={grossProfit2Touched}
                                    error={grossProfit2Error}
                                    placeholder={'Untung Kasar'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={belanjaLain2}
                                    handleChange={FormikProps.handleChange(`belanjaLain2`)}
                                    handleBlur={FormikProps.handleBlur(`belanjaLain2`)}
                                    touched={belanjaLain2Touched}
                                    error={belanjaLain2Error}
                                    placeholder={'Perbelanjaan Lain'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={netProfit2}
                                    handleChange={FormikProps.handleChange(`netProfit2`)}
                                    handleBlur={FormikProps.handleBlur(`netProfit2`)}
                                    touched={netProfit2Touched}
                                    error={netProfit2Error}
                                    placeholder={'Untung Bersih'}
                                    keyboardType={'phone-pad'}

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




export default BusinessPlanGoals2Screen