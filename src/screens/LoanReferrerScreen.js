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


    refName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    refPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    relationship: Yup
        .string()
        .required()
        .min(3)
        .label('Hubungan'),

    refAlamat: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Alamat'),


});

const LoanReferrerScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { refAlamat, refAlamat_2, refName, refPhoneNum, relationship, } = useSelector(state => state.financingReducer, shallowEqual)


    const setReferrer = (value) => dispatch({ type: 'SET_REFERRER', payload: { ...value } })


    //const { capacity, refName, refPhoneNum, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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
                initialValues={{ refAlamat, refAlamat_2, refName, refPhoneNum, relationship, }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setReferrer(values)

                    props.navigation.navigate('LoanValidation')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { refAlamat, refAlamat_2, refName, refPhoneNum, relationship } = FormikProps.values


                    const refAlamatError = FormikProps.errors.refAlamat
                    const refAlamatTouched = FormikProps.touched.refAlamat

                    const refAlamat_2Error = FormikProps.errors.refAlamat_2
                    const refAlamat_2Touched = FormikProps.touched.refAlamat_2

                    const refNameError = FormikProps.errors.refName
                    const refNameTouched = FormikProps.touched.refName

                    const refPhoneNumError = FormikProps.errors.refPhoneNum
                    const refPhoneNumTouched = FormikProps.touched.refPhoneNum

                    const relationshipError = FormikProps.errors.relationship
                    const relationshipTouched = FormikProps.touched.relationship


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Pembiayaan Tekun</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Perujuk</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={refName}
                                handleChange={FormikProps.handleChange(`refName`)}
                                handleBlur={FormikProps.handleBlur(`refName`)}
                                touched={refNameTouched}
                                error={refNameError}
                                placeholder={'Nama'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={refPhoneNum}
                                handleChange={FormikProps.handleChange(`refPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`refPhoneNum`)}
                                touched={refPhoneNumTouched}
                                error={refPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={relationship}
                                handleChange={FormikProps.handleChange(`relationship`)}
                                handleBlur={FormikProps.handleBlur(`relationship`)}
                                touched={relationshipTouched}
                                error={relationshipError}
                                placeholder={'Hubungan'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={refAlamat}
                                handleChange={FormikProps.handleChange(`refAlamat`)}
                                handleBlur={FormikProps.handleBlur(`refAlamat`)}
                                touched={refAlamatTouched}
                                error={refAlamatError}
                                placeholder={'Alamat Line 1'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={refAlamat_2}
                                handleChange={FormikProps.handleChange(`refAlamat_2`)}
                                handleBlur={FormikProps.handleBlur(`refAlamat_2`)}
                                touched={refAlamat_2Touched}
                                error={refAlamat_2Error}
                                placeholder={'Alamat Line 2'}

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




export default LoanReferrerScreen