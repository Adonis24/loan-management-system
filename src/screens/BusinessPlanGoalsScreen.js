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

    tahun: Yup
        .string()
        .required()
        .min(4)
        .max(4)
        .label('Tahun'),

    grossProfit: Yup
        .string()
        .required()
        .min(1)
        .label('Untung Kasar'),

    belanjaLain: Yup
        .string()
        .required()
        .min(1)
        .label('Perbelanjaan Lain'),
    netProfit: Yup
        .string()
        .required()
        .min(1)
        .label('Untung Bersih'),

    jualan: Yup
        .string()
        .required()
        .min(2)
        .label('Jualan'),

    belian: Yup
        .string()
        .required()
        .min(2)
        .label('Belian'),


});

const BusinessPlanGoalsScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { belian, tahun, grossProfit, belanjaLain, netProfit, jualan } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ belian, tahun, grossProfit, belanjaLain, netProfit, jualan }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanGoals2')
                    dispatch(actionCreator.saveBussPlanData())
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { tahun, belian, grossProfit, belanjaLain, netProfit, jualan } = FormikProps.values

                    const tahunError = FormikProps.errors.tahun
                    const tahunTouched = FormikProps.touched.tahun

                    const belianError = FormikProps.errors.belian
                    const belianTouched = FormikProps.touched.belian

                    const belanjaLainError = FormikProps.errors.belanjaLain
                    const belanjaLainTouched = FormikProps.touched.belanjaLain

                    const netProfitError = FormikProps.errors.netProfit
                    const netProfitTouched = FormikProps.touched.netProfit

                    const grossProfitError = FormikProps.errors.grossProfit
                    const grossProfitTouched = FormikProps.touched.grossProfit

                    const jualanError = FormikProps.errors.jualan
                    const jualanTouched = FormikProps.touched.jualan




                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',  }}>

                            <Text style={[styles.formTitle]}>Section E</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Sasaran Pencapaian Perniagaan Tahunan      (3 tahun ke hadapan)</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start',paddingLeft:10,paddingRight:10}}>

                            <CustomTextInput
                                imageUri={require('../assets/images/estimateTime.png')}
                                value={tahun}
                                handleChange={FormikProps.handleChange(`tahun`)}
                                handleBlur={FormikProps.handleBlur(`tahun`)}
                                touched={tahunTouched}
                                error={tahunError}
                                placeholder={'Tahun'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={jualan}
                                handleChange={FormikProps.handleChange(`jualan`)}
                                handleBlur={FormikProps.handleBlur(`jualan`)}
                                touched={jualanTouched}
                                error={jualanError}
                                placeholder={'Jualan'}
                                keyboardType={'phone-pad'}

                            />


                            <CustomTextInput
                                imageUri={require('../assets/images/bizAct.png')}
                                value={belian}
                                handleChange={FormikProps.handleChange(`belian`)}
                                handleBlur={FormikProps.handleBlur(`belian`)}
                                touched={belianTouched}
                                error={belianError}
                                placeholder={'Belian/Kos Operasi'}
                                keyboardType={'phone-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={grossProfit}
                                handleChange={FormikProps.handleChange(`grossProfit`)}
                                handleBlur={FormikProps.handleBlur(`grossProfit`)}
                                touched={grossProfitTouched}
                                error={grossProfitError}
                                placeholder={'Untung Kasar'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/payment.png')}
                                value={belanjaLain}
                                handleChange={FormikProps.handleChange(`belanjaLain`)}
                                handleBlur={FormikProps.handleBlur(`belanjaLain`)}
                                touched={belanjaLainTouched}
                                error={belanjaLainError}
                                placeholder={'Perbelanjaan Lain'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={netProfit}
                                handleChange={FormikProps.handleChange(`netProfit`)}
                                handleBlur={FormikProps.handleBlur(`netProfit`)}
                                touched={netProfitTouched}
                                error={netProfitError}
                                placeholder={'Untung Bersih'}
                                keyboardType={'phone-pad'}

                            />

</ScrollView>
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




export default BusinessPlanGoalsScreen