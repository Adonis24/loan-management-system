import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView

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

const BusinessPlanBussModalBScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { Teknologi, pengiktirafan } = useSelector(state => state.businessPlanningReducer, shallowEqual)

    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ Teknologi, pengiktirafan }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBudgInc')
                    dispatch(actionCreator.saveBussPlanData())
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { Teknologi, pengiktirafan } = FormikProps.values



                    const TeknologiError = FormikProps.errors.Teknologi
                    const TeknologiTouched = FormikProps.touched.Teknologi



                    const pengiktirafanError = FormikProps.errors.pengiktirafan
                    const pengiktirafanTouched = FormikProps.touched.pengiktirafan




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Butir Butir Perniagaan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>

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


                                <CustomFormAction
                                    label={`Save`}
                                    navigation={props.navigation}
                                    isValid={FormikProps.isValid}
                                    handleSubmit={FormikProps.handleSubmit}
                                />
                            </ScrollView>


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




export default BusinessPlanBussModalBScreen