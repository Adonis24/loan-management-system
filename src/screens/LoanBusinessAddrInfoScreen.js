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

   
    compPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    compAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    compPoskod: Yup
        .string('Please enter')
        .required('Please enter')
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanBusinessAddrInfoScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const {  compPhoneNum ,compAlamat,compAlamat_2, compPoskod } = useSelector(state => state.financingReducer, shallowEqual)


    const setBusinessInfo = (value) => dispatch({ type: 'SET_BUSINESS_INFO', payload: { ...value } })


    //const { capacity, nameCP, compPhoneNum, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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
                initialValues={{  compPhoneNum,compAlamat_2, compAlamat,compPoskod }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setBusinessInfo(values)
                    props.navigation.navigate('LoanBusinessInfoCont')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const {  compPhoneNum, compAlamat,compAlamat_2, compPoskod } = FormikProps.values

               

                    const compPhoneNumError = FormikProps.errors.compPhoneNum
                    const compPhoneNumTouched = FormikProps.touched.compPhoneNum

                    const compAlamatError = FormikProps.errors.compAlamat
                    const compAlamatTouched = FormikProps.touched.compAlamat

                    const compAlamat_2Error = FormikProps.errors.compAlamat_2
                    const compAlamat_2Touched = FormikProps.touched.compAlamat_2

                    const compPoskodError = FormikProps.errors.compPoskod
                    const compPoskodTouched = FormikProps.touched.compPoskod


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Perniagaan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={compPhoneNum}
                                handleChange={FormikProps.handleChange(`compPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`compPhoneNum`)}
                                touched={compPhoneNumTouched}
                                error={compPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'numbers-and-punctuation'}
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
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={compPoskod}
                                handleChange={FormikProps.handleChange(`compPoskod`)}
                                handleBlur={FormikProps.handleBlur(`compPoskod`)}
                                touched={compPoskodTouched}
                                error={compPoskodError}
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




export default LoanBusinessAddrInfoScreen