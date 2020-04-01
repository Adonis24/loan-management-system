//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    Picker,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import LayoutLoan from '../Layout/LayoutLoan';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({

    alamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    phoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    email: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Emel'),

    poskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanContactAddressInfoScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { alamat, alamat_2, phoneNum, email, poskod, } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })

    // useEffect(() => {
    //     const open = () => setshowLogo(false)
    //     const off = () => setshowLogo(true)

    //     keyboardBeingDisplay(open)
    //     keyboardBeingClose(off)
    // }, []); // empty-array means don't watch for any updates

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    // const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ alamat, alamat_2, phoneNum, email, poskod }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanPendapatan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { alamat, alamat_2, email, phoneNum, poskod } = FormikProps.values

                    const alamatError = FormikProps.errors.alamat
                    const alamatTouched = FormikProps.touched.alamat

                    const alamat_2Error = FormikProps.errors.alamat_2
                    const alamat_2Touched = FormikProps.touched.alamat_2

                    const emailError = FormikProps.errors.email
                    const emailTouched = FormikProps.touched.email

                    const phoneNumError = FormikProps.errors.phoneNum
                    const phoneNumTouched = FormikProps.touched.phoneNum

                    const poskodError = FormikProps.errors.poskod
                    const poskodTouched = FormikProps.touched.poskod


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
                            
                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat}
                                handleChange={FormikProps.handleChange(`alamat`)}
                                handleBlur={FormikProps.handleBlur(`alamat`)}
                                touched={alamatTouched}
                                error={alamatError}
                                placeholder={'Alamat Line 1'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat_2}
                                handleChange={FormikProps.handleChange(`alamat_2`)}
                                handleBlur={FormikProps.handleBlur(`alamat_2`)}
                                touched={alamat_2Touched}
                                error={alamat_2Error}
                                placeholder={'Alamat Line 2'}

                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={poskod}
                                handleChange={FormikProps.handleChange(`poskod`)}
                                handleBlur={FormikProps.handleBlur(`poskod`)}
                                touched={poskodTouched}
                                error={poskodError}
                                placeholder={'Poskod'}
                                keyboardType={'decimal-pad'}
                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phoneNum}
                                handleChange={FormikProps.handleChange(`phoneNum`)}
                                handleBlur={FormikProps.handleBlur(`phoneNum`)}
                                touched={phoneNumTouched}
                                error={phoneNumError}
                                placeholder={'No Tel'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={email}
                                handleChange={FormikProps.handleChange(`email`)}
                                handleBlur={FormikProps.handleBlur(`email`)}
                                touched={emailTouched}
                                error={emailError}
                                placeholder={'Emel'}
                                keyboardType={'default'}
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



export default LoanContactAddressInfoScreen