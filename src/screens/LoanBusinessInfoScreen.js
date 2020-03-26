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

    compAct: Yup
        .string()
        .required()
        .min(3)
        .label('Aktiviti'),

    compName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Syarikat'),

    pengalaman: Yup
        .string()
        .required()
        .min(3)
        .label('Pengalaman'),

    pendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),




});

const LoanConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compName, pengalaman, compAct, pendapatan, } = useSelector(state => state.financingReducer, shallowEqual)


    const setBusinessInfo = (value) => dispatch({ type: 'SET_BUSINESS_INFO', payload: { ...value } })


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
                initialValues={{ compName, pengalaman, compAct, pendapatan, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setBusinessInfo(values)
                    props.navigation.navigate('LoanBusinessAddrInfo')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { compAct, compName, pengalaman, pendapatan, poskod } = FormikProps.values

                    const compActError = FormikProps.errors.compAct
                    const compActTouched = FormikProps.touched.compAct

                    const compNameError = FormikProps.errors.compName
                    const compNameTouched = FormikProps.touched.compName

                    const pengalamanError = FormikProps.errors.pengalaman
                    const pengalamanTouched = FormikProps.touched.pengalaman

                    const pendapatanError = FormikProps.errors.pendapatan
                    const pendapatanTouched = FormikProps.touched.pendapatan




                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Perniagaan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={compName}
                                handleChange={FormikProps.handleChange(`compName`)}
                                handleBlur={FormikProps.handleBlur(`compName`)}
                                touched={compNameTouched}
                                error={compNameError}
                                placeholder={'Nama Syarikat'}
                                keyboardType={'default'}
                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={compAct}
                                handleChange={FormikProps.handleChange(`compAct`)}
                                handleBlur={FormikProps.handleBlur(`compAct`)}
                                touched={compActTouched}
                                error={compActError}
                                placeholder={'Aktivi Perniagaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={pengalaman}
                                handleChange={FormikProps.handleChange(`pengalaman`)}
                                handleBlur={FormikProps.handleBlur(`pengalaman`)}
                                touched={pengalamanTouched}
                                error={pengalamanError}
                                placeholder={'Tempoh/Pengalaman Berniaga'}
                                keyboardType={'phone-pad'}
                            />
                           
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pendapatan}
                                handleChange={FormikProps.handleChange(`pendapatan`)}
                                handleBlur={FormikProps.handleBlur(`pendapatan`)}
                                touched={pendapatanTouched}
                                error={pendapatanError}
                                placeholder={'Anggaran Pendapatan'}
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