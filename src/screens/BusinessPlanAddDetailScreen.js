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

    experience: Yup
        .string()
        .required()
        .min(3)
        .label('Pengalaman'),

    kursus: Yup
        .string()
        .required()
        .min(3)
        .label('Kursus'),




});

const BusinessPlanAddDetailScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { kursus, experience, } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ kursus, experience, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('LoanCheckList')
                    dispatch(actionCreator.saveBussPlanData())
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { experience, kursus } = FormikProps.values

                    const experienceError = FormikProps.errors.experience
                    const experienceTouched = FormikProps.touched.experience

                    const kursusError = FormikProps.errors.kursus
                    const kursusTouched = FormikProps.touched.kursus






                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={[styles.formTitle]}>Section G</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Tambahan</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={experience}
                                handleChange={FormikProps.handleChange(`experience`)}
                                handleBlur={FormikProps.handleBlur(`experience`)}
                                touched={experienceTouched}
                                error={experienceError}
                                placeholder={'Pengalaman Dalam Perniagaan'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={kursus}
                                handleChange={FormikProps.handleChange(`kursus`)}
                                handleBlur={FormikProps.handleBlur(`kursus`)}
                                touched={kursusTouched}
                                error={kursusError}
                                placeholder={'Kursus Yang Dihadiri'}

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




export default BusinessPlanAddDetailScreen