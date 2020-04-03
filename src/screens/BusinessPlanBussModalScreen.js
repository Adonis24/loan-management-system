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

    waktu: Yup
        .string()
        .required()
        .min(3)
        .label('waktu'),

    sourceCap: Yup
        .string()
        .required()
        .min(1)
        .label('Sumber'),

    totalCap: Yup
        .string()
        .required()
        .min(3)
        .label('Jumlah'),
    sokongan: Yup
        .string()
        .required()
        .min(3)
        .label('Sokongan'),
    pengiktirafan: Yup
        .string()
        .required()
        .min(3)
        .label('Pengiktirafan'),

    Teknologi: Yup
        .string()
        .required()
        .min(3)
        .label('Teknologi'),


});

const BusinessPlanBussModalScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { Teknologi, waktu, sourceCap, totalCap, sokongan, pengiktirafan } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ Teknologi, waktu, sourceCap, totalCap, sokongan, pengiktirafan }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBudgInc')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { waktu, Teknologi, sourceCap, totalCap, sokongan, pengiktirafan } = FormikProps.values

                    const waktuError = FormikProps.errors.waktu
                    const waktuTouched = FormikProps.touched.waktu

                    const TeknologiError = FormikProps.errors.Teknologi
                    const TeknologiTouched = FormikProps.touched.Teknologi

                    const totalCapError = FormikProps.errors.totalCap
                    const totalCapTouched = FormikProps.touched.totalCap

                    const sokonganError = FormikProps.errors.sokongan
                    const sokonganTouched = FormikProps.touched.sokongan

                    const sourceCapError = FormikProps.errors.sourceCap
                    const sourceCapTouched = FormikProps.touched.sourceCap

                    const pengiktirafanError = FormikProps.errors.pengiktirafan
                    const pengiktirafanTouched = FormikProps.touched.pengiktirafan




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Butir Butir Perniagaan</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/estimateTime.png')}
                                value={waktu}
                                handleChange={FormikProps.handleChange(`waktu`)}
                                handleBlur={FormikProps.handleBlur(`waktu`)}
                                touched={waktuTouched}
                                error={waktuError}
                                placeholder={'Waktu Urusniaga'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={pengiktirafan}
                                handleChange={FormikProps.handleChange(`pengiktirafan`)}
                                handleBlur={FormikProps.handleBlur(`pengiktirafan`)}
                                touched={pengiktirafanTouched}
                                error={pengiktirafanError}
                                placeholder={'Pengiktirafan (sijil Halal,GMP,ISO dll)'}

                            />


                            <CustomTextInput
                                imageUri={require('../assets/images/bizAct.png')}
                                value={Teknologi}
                                handleChange={FormikProps.handleChange(`Teknologi`)}
                                handleBlur={FormikProps.handleBlur(`Teknologi`)}
                                touched={TeknologiTouched}
                                error={TeknologiError}
                                placeholder={'Tahap teknologi/Mesin/Peralatan dimiliki'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={sourceCap}
                                handleChange={FormikProps.handleChange(`sourceCap`)}
                                handleBlur={FormikProps.handleBlur(`sourceCap`)}
                                touched={sourceCapTouched}
                                error={sourceCapError}
                                placeholder={'Sumber Modal Memulakan Perniagaan'}
                               
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/payment.png')}
                                value={totalCap}
                                handleChange={FormikProps.handleChange(`totalCap`)}
                                handleBlur={FormikProps.handleBlur(`totalCap`)}
                                touched={totalCapTouched}
                                error={totalCapError}
                                placeholder={'Jumlah Modal Permulaan Perniagaan'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={sokongan}
                                handleChange={FormikProps.handleChange(`sokongan`)}
                                handleBlur={FormikProps.handleBlur(`sokongan`)}
                                touched={sokonganTouched}
                                error={sokonganError}
                                placeholder={'Sokongan/Bantuan Agensi Lain'}
                                

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




export default BusinessPlanBussModalScreen