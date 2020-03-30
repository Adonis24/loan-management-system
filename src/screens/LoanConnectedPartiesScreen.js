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

import styles from '../styles/styles'

import LayoutA from '../Layout/LayoutA';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    cpPekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),

    cpName: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    cpIcNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    cpPendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),




});

const LoanConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { cpName, cpIcNumber, cpPekerjaan, cpPendapatan, } = useSelector(state => state.financingReducer, shallowEqual)


    const setConnectParties = (value) => dispatch({ type: 'SET_CONNECT_PARTIES', payload: { ...value } })


    //const { capacity, nameCP, cpIcNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{ cpName, cpIcNumber, cpPekerjaan, cpPendapatan, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    props.navigation.navigate('LoanConnectedPartiesAddr')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { cpPekerjaan, cpName, cpIcNumber, cpPendapatan, poskod } = FormikProps.values

                    const cpPekerjaanError = FormikProps.errors.cpPekerjaan
                    const cpPekerjaanTouched = FormikProps.touched.cpPekerjaan

                    const cpNameError = FormikProps.errors.cpName
                    const cpNameTouched = FormikProps.touched.cpName

                    const cpIcNumberError = FormikProps.errors.cpIcNumber
                    const cpIcNumberTouched = FormikProps.touched.cpIcNumber

                    const cpPendapatanError = FormikProps.errors.cpPendapatan
                    const cpPendapatanTouched = FormikProps.touched.cpPendapatan




                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Pasangan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpName}
                                handleChange={FormikProps.handleChange(`cpName`)}
                                handleBlur={FormikProps.handleBlur(`cpName`)}
                                touched={cpNameTouched}
                                error={cpNameError}
                                placeholder={'Nama Suami/Isteri/Waris'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={cpIcNumber}
                                handleChange={FormikProps.handleChange(`cpIcNumber`)}
                                handleBlur={FormikProps.handleBlur(`cpIcNumber`)}
                                touched={cpIcNumberTouched}
                                error={cpIcNumberError}
                                placeholder={'No Kad Pengenalan'}
                                keyboardType={'numbers-and-punctuation'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpPekerjaan}
                                handleChange={FormikProps.handleChange(`cpPekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`cpPekerjaan`)}
                                touched={cpPekerjaanTouched}
                                error={cpPekerjaanError}
                                placeholder={'Pekerjaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={cpPendapatan}
                                handleChange={FormikProps.handleChange(`cpPendapatan`)}
                                handleBlur={FormikProps.handleBlur(`cpPendapatan`)}
                                touched={cpPendapatanTouched}
                                error={cpPendapatanError}
                                placeholder={'Pendapatan'}
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

        </LayoutA>
    );
}




export default LoanConnectedPartiesScreen