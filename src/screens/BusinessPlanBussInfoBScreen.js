import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Picker,

    ScrollView

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({


    bilCawangan: Yup
        .number()
        .required()
        .min(0)
        .label('Cawangan'),

    bilPekerja: Yup
        .number()
        .required()
        .min(0)
        .label('Pekerja'),
    waktu: Yup
        .string()
        .required()
        .min(0)
        .label('Waktu Urusniaga'),



});

const BusinessPlanBussInfoBScreen = (props) => {


    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { bilCawangan, bilPekerja, waktu } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ bilCawangan, bilPekerja, waktu }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBussModal')
                    actions.resetForm({})
                    dispatch(actionCreator.saveBussPlanData())
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {


                    const { bilCawangan, bilPekerja, waktu, } = FormikProps.values

                    const waktuError = FormikProps.errors.waktu
                    const waktuTouched = FormikProps.touched.waktu

                    const bilCawanganError = FormikProps.errors.bilCawangan
                    const bilCawanganTouched = FormikProps.touched.bilCawangan



                    const bilPekerjaError = FormikProps.errors.bilPekerja
                    const bilPekerjaTouched = FormikProps.touched.bilPekerja






                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                            <Text style={[styles.formTitle]}>Section B</Text>
                            <Text style={[styles.formSubtitle]}>Butir-Butir Perniagaan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>



                                <CustomTextInput
                                    imageUri={require('../assets/images/company.png')}
                                    value={bilCawangan}
                                    handleChange={FormikProps.handleChange(`bilCawangan`)}
                                    handleBlur={FormikProps.handleBlur(`bilCawangan`)}
                                    touched={bilCawanganTouched}
                                    error={bilCawanganError}
                                    placeholder={'Bilangan Cawangan (Jika Ada)'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={bilPekerja}
                                    handleChange={FormikProps.handleChange(`bilPekerja`)}
                                    handleBlur={FormikProps.handleBlur(`bilPekerja`)}
                                    touched={bilPekerjaTouched}
                                    error={bilPekerjaError}
                                    placeholder={'Bilangan Pekerja'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/estimateTime.png')}
                                    value={waktu}
                                    handleChange={FormikProps.handleChange(`waktu`)}
                                    handleBlur={FormikProps.handleBlur(`waktu`)}
                                    touched={waktuTouched}
                                    error={waktuError}
                                    placeholder={'Waktu Urusniaga'}

                                />

                                <CustomFormAction
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




export default BusinessPlanBussInfoBScreen