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

import LayoutA from '../Layout/LayoutA';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

   
    cpPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    cpAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    cpPoskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanConnectedPartiesAddrScreeen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const {  cpPhoneNum ,cpAlamat,cpAlamat_2, cpPoskod } = useSelector(state => state.financingReducer, shallowEqual)


    const setConnectParties = (value) => dispatch({ type: 'SET_CONNECT_PARTIES', payload: { ...value } })


    //const { capacity, nameCP, cpPhoneNum, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)




    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{  cpPhoneNum,cpAlamat_2, cpAlamat,cpPoskod }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    props.navigation.navigate('LoanSectionD')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const {  cpPhoneNum, cpAlamat,cpAlamat_2, cpPoskod } = FormikProps.values

               

                    const cpPhoneNumError = FormikProps.errors.cpPhoneNum
                    const cpPhoneNumTouched = FormikProps.touched.cpPhoneNum

                    const cpAlamatError = FormikProps.errors.cpAlamat
                    const cpAlamatTouched = FormikProps.touched.cpAlamat

                    const cpAlamat_2Error = FormikProps.errors.cpAlamat_2
                    const cpAlamat_2Touched = FormikProps.touched.cpAlamat_2

                    const cpPoskodError = FormikProps.errors.cpPoskod
                    const cpPoskodTouched = FormikProps.touched.cpPoskod


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                             <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5,color:'black' }]}>Section C</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Pasangan</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={cpPhoneNum}
                                handleChange={FormikProps.handleChange(`cpPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`cpPhoneNum`)}
                                touched={cpPhoneNumTouched}
                                error={cpPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'phone-pad'}
                            />
                           
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={cpAlamat}
                                handleChange={FormikProps.handleChange(`cpAlamat`)}
                                handleBlur={FormikProps.handleBlur(`cpAlamat`)}
                                touched={cpAlamatTouched}
                                error={cpAlamatError}
                                placeholder={'Alamat Majikan Line 1'}
                                keyboardType={'default'}
                            />
                             <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={cpAlamat_2}
                                handleChange={FormikProps.handleChange(`cpAlamat_2`)}
                                handleBlur={FormikProps.handleBlur(`cpAlamat_2`)}
                                touched={cpAlamat_2Touched}
                                error={cpAlamat_2Error}
                                placeholder={'Alamat Majikan Line 2'}

                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={cpPoskod}
                                handleChange={FormikProps.handleChange(`cpPoskod`)}
                                handleBlur={FormikProps.handleBlur(`cpPoskod`)}
                                touched={cpPoskodTouched}
                                error={cpPoskodError}
                                placeholder={'Poskod'}
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
        </LayoutA>
    );
}




export default LoanConnectedPartiesAddrScreeen