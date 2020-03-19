//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
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

import LayoutA from '../Layout/LayoutA';
import Layout from '../constants/Layout'
import { CustomTextInput,CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({

    comp_addr: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Address'),

    comp_state: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('State'),

    comp_city: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('City'),

    comp_postcode: Yup
        .string('Please enter')
        .required('Please enter')
        .min(5)
        .max(5)
        .label('Postcode'),


});

const CompanyContactAddressInformationScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()


    return (
        <LayoutA>
            <Formik
                initialValues={{ comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    dispatch({ type: 'SET_REGISTER', payload: { ...values } })
                    setCompanyInfo(values)

                    actions.setSubmitting(false)
                    props.navigation.goBack()
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { comp_addr, comp_addr_2, comp_city, comp_state, comp_postcode } = FormikProps.values

                    const comp_addrError = FormikProps.errors.comp_addr
                    const comp_addrTouched = FormikProps.touched.comp_addr

                    const comp_addr_2Error = FormikProps.errors.comp_addr_2
                    const comp_addr_2Touched = FormikProps.touched.comp_addr_2

                    const comp_cityError = FormikProps.errors.comp_city
                    const comp_cityTouched = FormikProps.touched.comp_city

                    const comp_stateError = FormikProps.errors.comp_state
                    const comp_stateTouched = FormikProps.touched.comp_state

                    const comp_postcodeError = FormikProps.errors.comp_postcode
                    const comp_postcodeTouched = FormikProps.touched.comp_postcode


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY ADDRESS</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={comp_addr}
                                handleChange={FormikProps.handleChange(`comp_addr`)}
                                handleBlur={FormikProps.handleBlur(`comp_addr`)}
                                touched={comp_addrTouched}
                                error={comp_addrError}
                                placeholder={'Address Line 1'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={comp_addr_2}
                                handleChange={FormikProps.handleChange(`comp_addr_2`)}
                                handleBlur={FormikProps.handleBlur(`comp_addr_2`)}
                                touched={comp_addr_2Touched}
                                error={comp_addr_2Error}
                                placeholder={'Address Line 2'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/city.png')}
                                value={comp_city}
                                handleChange={FormikProps.handleChange(`comp_city`)}
                                handleBlur={FormikProps.handleBlur(`comp_city`)}
                                touched={comp_cityTouched}
                                error={comp_cityError}
                                placeholder={'City'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/state.png')}
                                value={comp_state}
                                handleChange={FormikProps.handleChange(`comp_state`)}
                                handleBlur={FormikProps.handleBlur(`comp_state`)}
                                touched={comp_cityTouched}
                                error={comp_cityError}
                                placeholder={'State'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={comp_postcode}
                                handleChange={FormikProps.handleChange(`comp_postcode`)}
                                handleBlur={FormikProps.handleBlur(`comp_postcode`)}
                                touched={comp_postcodeTouched}
                                error={comp_postcodeError}
                                placeholder={'Postcode'}
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


        </LayoutA>
    );
}



export default CompanyContactAddressInformationScreen