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

    pekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),

    name: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    icNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    pendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),




});

const LoanConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { name, icNumber, pekerjaan, pendapatan, } = useSelector(state => state.financingReducer, shallowEqual)


    const setConnectParties = (value) => dispatch({ type: 'SET_CONNECT_PARTIES', payload: { ...value } })


    //const { capacity, nameCP, icNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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
                initialValues={{ name, icNumber, pekerjaan, pendapatan, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setDetailConnect(values)
                    props.navigation.navigate('LoanConnectedPartiesAddr')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { pekerjaan, name, icNumber, pendapatan, poskod } = FormikProps.values

                    const pekerjaanError = FormikProps.errors.pekerjaan
                    const pekerjaanTouched = FormikProps.touched.pekerjaan

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const icNumberError = FormikProps.errors.icNumber
                    const icNumberTouched = FormikProps.touched.icNumber

                    const pendapatanError = FormikProps.errors.pendapatan
                    const pendapatanTouched = FormikProps.touched.pendapatan




                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Pasangan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={name}
                                handleChange={FormikProps.handleChange(`name`)}
                                handleBlur={FormikProps.handleBlur(`name`)}
                                touched={nameTouched}
                                error={nameError}
                                placeholder={'Nama Suami/Isteri/Waris'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={icNumber}
                                handleChange={FormikProps.handleChange(`icNumber`)}
                                handleBlur={FormikProps.handleBlur(`icNumber`)}
                                touched={icNumberTouched}
                                error={icNumberError}
                                placeholder={'No Kad Pengenalan'}
                                keyboardType={'numbers-and-punctuation'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pekerjaan}
                                handleChange={FormikProps.handleChange(`pekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`pekerjaan`)}
                                touched={pekerjaanTouched}
                                error={pekerjaanError}
                                placeholder={'Pekerjaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pendapatan}
                                handleChange={FormikProps.handleChange(`pendapatan`)}
                                handleBlur={FormikProps.handleBlur(`pendapatan`)}
                                touched={pendapatanTouched}
                                error={pendapatanError}
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