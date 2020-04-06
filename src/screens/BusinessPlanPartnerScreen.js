import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Picker,
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

    partJawatan: Yup
        .string()
        .required()
        .min(3)
        .label('Jawatan'),

    partName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Rakan Kongsi'),

    partIcNum: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    saham: Yup
        .string()
        .required()
        .min(3)
        .label('Jumlah Saham'),




});

const BusinessPlanPartnerScreen = (props) => {

    

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { partName, partIcNum, partJawatan, saham, } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })


    //const { capacity, nameCP, partIcNum, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

   

   



    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ partName, partIcNum, partJawatan, saham, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanSectionB')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { partJawatan, partName, partIcNum, saham,  } = FormikProps.values

                    const partJawatanError = FormikProps.errors.partJawatan
                    const partJawatanTouched = FormikProps.touched.partJawatan

                    const partNameError = FormikProps.errors.partName
                    const partNameTouched = FormikProps.touched.partName

                    const partIcNumError = FormikProps.errors.partIcNum
                    const partIcNumTouched = FormikProps.touched.partIcNum

                    const sahamError = FormikProps.errors.saham
                    const sahamTouched = FormikProps.touched.saham

               




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
                         
                            <Text style={[styles.formTitle]}>Section A</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={partName}
                                handleChange={FormikProps.handleChange(`partName`)}
                                handleBlur={FormikProps.handleBlur(`partName`)}
                                touched={partNameTouched}
                                error={partNameError}
                                placeholder={'Nama Rakan Kongsi'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={partIcNum}
                                handleChange={FormikProps.handleChange(`partIcNum`)}
                                handleBlur={FormikProps.handleBlur(`partIcNum`)}
                                touched={partIcNumTouched}
                                error={partIcNumError}
                                placeholder={'No Kad Pengenalan'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={partJawatan}
                                handleChange={FormikProps.handleChange(`partJawatan`)}
                                handleBlur={FormikProps.handleBlur(`partJawatan`)}
                                touched={partJawatanTouched}
                                error={partJawatanError}
                                placeholder={'Jawatan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={saham}
                                handleChange={FormikProps.handleChange(`saham`)}
                                handleBlur={FormikProps.handleBlur(`saham`)}
                                touched={sahamTouched}
                                error={sahamError}
                                placeholder={'Jumlah Pegangan Saham (%)'}
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




export default BusinessPlanPartnerScreen