import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Picker,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';

import LayoutLoan from '../Layout/LayoutLoan';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'



const validationSchema = Yup.object().shape({

    
    institusi: Yup
        .string()
        .required()
        .min(3)
        .label('Institusi'),

    totalLoan: Yup
        .string()
        .required()
        .min(3)
        .label('Jumlah Pembiayaan'),
    loanBal: Yup
        .string()
        .required()
        .min(3)
        .label('Baki Pembiayaan'),


});

const LoanBusinessDetail2Screen = (props) => {

   
    
    

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { institusi, totalLoan, pembiayaan,loanBal } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setPembiayaan = (value) => dispatch({ type: 'SET_PEMBIAYAAN', payload: { ...value } })

  

    //proceedContact && props.navigation.goBack()

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ institusi, totalLoan,loanBal }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setPembiayaan(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanDetail')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { institusi, totalLoan,loanBal } = FormikProps.values


                    const institusiError = FormikProps.errors.institusi
                    const institusiTouched = FormikProps.touched.institusi
                    const totalLoanError = FormikProps.errors.totalLoan
                    const totalLoanTouched = FormikProps.touched.totalLoan
                    const loanBalError = FormikProps.errors.loanBal
                    const loanBalTouched = FormikProps.touched.loanBal
                   


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
                            <Text style={[styles.formTitle]}>Section F</Text>
                            <Text style={[styles.formSubtitle]}>Pembiayaan Perniagaan Sedia Ada</Text>
                       
                                        <CustomTextInput
                                            imageUri={require('../assets/images/city.png')}
                                            value={institusi}
                                            handleChange={FormikProps.handleChange(`institusi`)}
                                            handleBlur={FormikProps.handleBlur(`institusi`)}
                                            touched={institusiTouched}
                                            error={institusiError}
                                            placeholder={'Institusi Pembiayaan'}
                                            keyboardType={'default'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/loanAmount.png')}
                                            value={totalLoan}
                                            handleChange={FormikProps.handleChange(`totalLoan`)}
                                            handleBlur={FormikProps.handleBlur(`totalLoan`)}
                                            touched={totalLoanTouched}
                                            error={totalLoanError}
                                            placeholder={'Jumlah Pembiayaan'}
                                            keyboardType={'decimal-pad'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={loanBal}
                                            handleChange={FormikProps.handleChange(`loanBal`)}
                                            handleBlur={FormikProps.handleBlur(`loanBal`)}
                                            touched={loanBalTouched}
                                            error={loanBalError}
                                            placeholder={'Baki Pembiayaan'}
                                            keyboardType={'decimal-pad'}
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



export default LoanBusinessDetail2Screen