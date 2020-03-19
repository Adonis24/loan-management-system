//console.ignoredYellowBox = ['Setting a timer']
import React,{ useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import Layout from '../constants/Layout'

import LayoutA from '../Layout/LayoutA';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'
import { CustomTextInput,CustomFormAction } from '../components/Custom'

const validationSchema = Yup.object().shape({

    comp_phone: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Company Phone'),

    comp_email: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Company Email'),


    // comp_address: Yup
    //     .string('Please enter')
    //     .required('Please enter')
    //     .min(3)
    //     .label('Address'),


});

const CompanyContactInformationScreen = (props) => {

    const dispatch = useDispatch()



    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)

    //proceedCompany && props.navigation.navigate('ContactPerson')


    return (
        <LayoutA>

            <Formik validateOnMount
                initialValues={{ comp_phone: undefined, comp_email: undefined, comp_address: comp_postcode }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setCompanyInfo(values)
                    props.navigation.navigate('ContactPerson')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { comp_phone, comp_email, comp_address } = FormikProps.values

                    const comp_phoneError = FormikProps.errors.comp_phone
                    const comp_phoneTouched = FormikProps.touched.comp_phone

                    const comp_emailError = FormikProps.errors.comp_email
                    const comp_emailTouched = FormikProps.touched.comp_email

                    const comp_addressError = FormikProps.errors.comp_address
                    const comp_addressTouched = FormikProps.touched.comp_address


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                         {showLogo &&   <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} /> }
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY CONTACT INFORMATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={comp_phone}
                                handleChange={FormikProps.handleChange(`comp_phone`)}
                                handleBlur={FormikProps.handleBlur(`comp_phone`)}
                                touched={comp_phoneTouched}
                                error={comp_phoneError}
                                placeholder={'Company Phone No'}
                                keyboardType={'phone-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={comp_email}
                                handleChange={FormikProps.handleChange(`comp_email`)}
                                handleBlur={FormikProps.handleBlur(`comp_email`)}
                                touched={comp_emailTouched}
                                error={comp_emailError}
                                placeholder={'Company Email'}
                                keyboardType={'default'}
                            />


                            <TouchableOpacity onPress={() => props.navigation.navigate('CompanyContactAddressInformation')} style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/company.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                {!comp_state ? <TextInput editable={false} value={comp_addr} onChangeText={(comp_addr) => setCompanyInfo({ comp_addr })} style={{ marginLeft: 5 }} placeholder={'Company Address'} placeholderTextColor={(false) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    : <View style={{ marginRight: 3, paddingBottom: 5 }}>
                                        <Text>{comp_addr}</Text>
                                        {comp_addr_2 && <Text>{comp_addr_2}</Text>}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{comp_postcode}</Text>
                                            <Text>{comp_city}</Text>
                                        </View>
                                        <Text>{comp_state}</Text>
                                    </View>}
                            </TouchableOpacity>
                            <View style={{ width: Layout.window.width * 0.65 }}>
                                {comp_addressTouched && comp_addressError && <Text style={styles.error}>{comp_addressError}</Text>}
                            </View>

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


export default CompanyContactInformationScreen