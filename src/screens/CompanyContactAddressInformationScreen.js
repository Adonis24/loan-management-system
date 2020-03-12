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
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'

import Layout from '../constants/Layout'

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
    const {  comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode,  } = useSelector(state => state.companyInformationReducer, shallowEqual)


    const Save = () => {
        dispatch(actionCreator.companyContactAddress())
    }

    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })


    //proceedContact && props.navigation.goBack()


    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                        initialValues={{comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode}}
                        validateOnMount
                        onSubmit={(values, actions) => {
                            console.log(`values formik ialah ${JSON.stringify(values)}`)
                            dispatch({ type: 'SET_REGISTER', payload: { ...values } })
                            setCompanyInfo(values)
                            Save(values)
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
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY ADDRESS</Text>


                       

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_addrTouched && comp_addrError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/address.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_addr} onChangeText={FormikProps.handleChange(`comp_addr`)} onBlur={FormikProps.handleBlur(`comp_addr`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Address Line 1'} placeholderTextColor={comp_addrTouched && comp_addrError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_addrTouched && comp_addrError && <Text style={styles.error}>{comp_addrError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_addr_2Touched && comp_addr_2Error ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/address.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_addr_2} onChangeText={FormikProps.handleChange(`comp_addr_2`)} onBlur={FormikProps.handleBlur(`comp_addr_2`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Address Line 2'} placeholderTextColor={comp_addr_2Touched && comp_addr_2Error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_addr_2Touched && comp_addr_2Error && <Text style={styles.error}>{comp_addr_2Error}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_cityTouched && comp_cityError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/city.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_city} onChangeText={FormikProps.handleChange(`comp_city`)} onBlur={FormikProps.handleBlur(`comp_city`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'City'} placeholderTextColor={comp_cityTouched && comp_cityError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_cityTouched && comp_cityError && <Text style={styles.error}>{comp_cityError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_stateTouched && comp_stateError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/state.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_state} onChangeText={FormikProps.handleChange(`comp_state`)} onBlur={FormikProps.handleBlur(`comp_state`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'State'} placeholderTextColor={comp_stateTouched && comp_stateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_cityTouched && comp_cityError && <Text style={styles.error}>{comp_cityError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_postcodeTouched && comp_postcodeError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={comp_postcode} onChangeText={FormikProps.handleChange(`comp_postcode`)} onBlur={FormikProps.handleBlur(`comp_postcode`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Postcode'} placeholderTextColor={comp_postcodeTouched && comp_postcodeError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {comp_postcodeTouched && comp_postcodeError && <Text style={styles.error}>{comp_postcodeError}</Text>}
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
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



export default CompanyContactAddressInformationScreen