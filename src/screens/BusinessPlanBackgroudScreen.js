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

    name: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    compName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Syarikat'),

    regNum: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),

    compAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),


});

const BusinessPlanBackgroudScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compName, name, regNum, compAlamat, compAlamat_2 } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ compName, name, regNum, compAlamat, compAlamat_2 }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanEstablishComp')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { name, compName, regNum, compAlamat, compAlamat_2 } = FormikProps.values

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const compNameError = FormikProps.errors.compName
                    const compNameTouched = FormikProps.touched.compName

                    const compAlamatError = FormikProps.errors.compAlamat
                    const compAlamatTouched = FormikProps.touched.compAlamat

                    const compAlamat_2Error = FormikProps.errors.compAlamat_2
                    const compAlamat_2Touched = FormikProps.touched.compAlamat_2

                    const regNumError = FormikProps.errors.regNum
                    const regNumTouched = FormikProps.touched.regNum




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={[styles.formTitle]}>Section A</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={name}
                                handleChange={FormikProps.handleChange(`name`)}
                                handleBlur={FormikProps.handleBlur(`name`)}
                                touched={nameTouched}
                                error={nameError}
                                placeholder={'Nama'}

                            />

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
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={regNum}
                                handleChange={FormikProps.handleChange(`regNum`)}
                                handleBlur={FormikProps.handleBlur(`regNum`)}
                                touched={regNumTouched}
                                error={regNumError}
                                placeholder={'No Pendaftaran Perniagaan'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={compAlamat}
                                handleChange={FormikProps.handleChange(`compAlamat`)}
                                handleBlur={FormikProps.handleBlur(`compAlamat`)}
                                touched={compAlamatTouched}
                                error={compAlamatError}
                                placeholder={'Alamat Syarikat Line 1'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={compAlamat_2}
                                handleChange={FormikProps.handleChange(`compAlamat_2`)}
                                handleBlur={FormikProps.handleBlur(`compAlamat_2`)}
                                touched={compAlamat_2Touched}
                                error={compAlamat_2Error}
                                placeholder={'Alamat Syarikat Line 2'}

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




export default BusinessPlanBackgroudScreen