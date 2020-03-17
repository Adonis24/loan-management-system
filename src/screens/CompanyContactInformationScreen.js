//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
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

import Layout from '../constants/Layout'

import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'


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

    const Next = async () => {
        await dispatch(actionCreator.companyContactInfo())
        // await props.navigation.navigate('CompanyInfoSuccess')
    }

    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })


    //proceedCompany && props.navigation.navigate('ContactPerson')


    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY CONTACT INFORMATION</Text>
                                    <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>


                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_phoneTouched && comp_phoneError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/phoneNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_phone} onChangeText={FormikProps.handleChange(`comp_phone`)} onBlur={FormikProps.handleBlur(`comp_phone`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Phone No'} placeholderTextColor={comp_phoneTouched && comp_phoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'}  />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_phoneTouched && comp_phoneError && <Text style={styles.error}>{comp_phoneError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_emailTouched && comp_emailError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_email} onChangeText={FormikProps.handleChange(`comp_email`)} onBlur={FormikProps.handleBlur(`comp_email`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Email'} placeholderTextColor={comp_emailTouched && comp_emailError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_emailTouched && comp_emailError && <Text style={styles.error}>{comp_emailError}</Text>}
                                    </View>

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

                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid || !isInternetReachable} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={(FormikProps.isValid&&isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box,{backgroundColor: '#5A647F' }]} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }}
                    </Formik >

                </KeyboardAvoidingView>
            </View>
        </View>
    );
}


export default CompanyContactInformationScreen