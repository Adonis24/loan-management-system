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

    pasaran: Yup
        .string()
        .required()
        .min(3)
        .label('Pasaran'),

    perancangan: Yup
        .string()
        .required()
        .min(3)
        .label('Perancangan'),




});

const BusinessPlanMarketingScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { perancangan, pasaran, } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ perancangan, pasaran, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanAddDetail')
                    dispatch(actionCreator.saveBussPlanData())
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { pasaran, perancangan } = FormikProps.values

                    const pasaranError = FormikProps.errors.pasaran
                    const pasaranTouched = FormikProps.touched.pasaran

                    const perancanganError = FormikProps.errors.perancangan
                    const perancanganTouched = FormikProps.touched.perancangan






                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={[styles.formTitle]}>Section F</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Rancangan Pemasaran</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pasaran}
                                handleChange={FormikProps.handleChange(`pasaran`)}
                                handleBlur={FormikProps.handleBlur(`pasaran`)}
                                touched={pasaranTouched}
                                error={pasaranError}
                                placeholder={'Pasaran Produk'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={perancangan}
                                handleChange={FormikProps.handleChange(`perancangan`)}
                                handleBlur={FormikProps.handleBlur(`perancangan`)}
                                touched={perancanganTouched}
                                error={perancanganError}
                                placeholder={'Perancangan Dan Strategi Pasaran Produk'}
                                keyboardType={'default'}
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




export default BusinessPlanMarketingScreen