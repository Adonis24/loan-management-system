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

   
    phoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    alamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    poskod: Yup
        .string('Please enter')
        .required('Please enter')
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanConnectedPartiesAddrScreeen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const {  phoneNum ,alamat,alamat_2, poskod } = useSelector(state => state.financingReducer, shallowEqual)


    const setConnectParties = (value) => dispatch({ type: 'SET_CONNECT_PARTIES', payload: { ...value } })


    //const { capacity, nameCP, phoneNum, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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
                initialValues={{  phoneNum,alamat_2, alamat,poskod }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    //props.navigation.navigate('CompanyInfoSuccess')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const {  phoneNum, alamat,alamat_2, poskod } = FormikProps.values

               

                    const phoneNumError = FormikProps.errors.phoneNum
                    const phoneNumTouched = FormikProps.touched.phoneNum

                    const alamatError = FormikProps.errors.alamat
                    const alamatTouched = FormikProps.touched.alamat

                    const alamat_2Error = FormikProps.errors.alamat_2
                    const alamat_2Touched = FormikProps.touched.alamat_2

                    const poskodError = FormikProps.errors.poskod
                    const poskodTouched = FormikProps.touched.poskod


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Pasangan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phoneNum}
                                handleChange={FormikProps.handleChange(`phoneNum`)}
                                handleBlur={FormikProps.handleBlur(`phoneNum`)}
                                touched={phoneNumTouched}
                                error={phoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'numbers-and-punctuation'}
                            />
                           
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat}
                                handleChange={FormikProps.handleChange(`alamat`)}
                                handleBlur={FormikProps.handleBlur(`alamat`)}
                                touched={alamatTouched}
                                error={alamatError}
                                placeholder={'Alamat Majikan Line 1'}
                                keyboardType={'default'}
                            />
                             <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat_2}
                                handleChange={FormikProps.handleChange(`alamat_2`)}
                                handleBlur={FormikProps.handleBlur(`alamat_2`)}
                                touched={alamat_2Touched}
                                error={alamat_2Error}
                                placeholder={'Alamat Majikan Line 2'}

                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={poskod}
                                handleChange={FormikProps.handleChange(`poskod`)}
                                handleBlur={FormikProps.handleBlur(`poskod`)}
                                touched={poskodTouched}
                                error={poskodError}
                                placeholder={'Poskod'}
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




export default LoanConnectedPartiesAddrScreeen