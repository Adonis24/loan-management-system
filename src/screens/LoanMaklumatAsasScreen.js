import React, { useEffect, useState } from 'react';
import {
    Text,
    Platform, 
    View, 
    CheckBox
} from 'react-native';


import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';

import LayoutLoan from '../Layout/LayoutLoan';

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'

import CheckBox2 from 'react-native-check-box'

const validationSchema = Yup.object().shape({

    negeri: Yup
        .string()
        .required()
        .min(3)
        .label('Negeri'),

    cawanganParlimen: Yup
        .string()
        .required()
        .min(3)
        .label('Cawangan Parlimen'),


});

const LoanMaklumatAsasScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanSektorPerniagaan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan } = FormikProps.values
                    const negeriError = FormikProps.errors.negeri
                    const negeriTouched = FormikProps.touched.negeri
                    const cawanganParlimenError = FormikProps.errors.cawanganParlimen
                    const cawanganParlimenTouched = FormikProps.touched.cawanganParlimen

                    const handleCheckBox = () => { console.log(`apa ni ${pengundiBerdaftar}`); FormikProps.setFieldValue('pengundiBerdaftar', !pengundiBerdaftar) }
                    const handleCheckBox1 = () => { console.log(`apa ni ${statusPerniagaan}`); FormikProps.setFieldValue('statusPerniagaan', !statusPerniagaan) }

                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={[styles.formTitle]}>Section A</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Asas</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>

                                <CustomTextInput
                                    imageUri={require('../assets/images/city.png')}
                                    value={negeri}
                                    handleChange={FormikProps.handleChange(`negeri`)}
                                    handleBlur={FormikProps.handleBlur(`negeri`)}
                                    touched={negeriTouched}
                                    error={negeriError}
                                    placeholder={'Negeri'}
                                    keyboardType={'default'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/state.png')}
                                    value={cawanganParlimen}
                                    handleChange={FormikProps.handleChange(`cawanganParlimen`)}
                                    handleBlur={FormikProps.handleBlur(`cawanganParlimen`)}
                                    touched={cawanganParlimenTouched}
                                    error={cawanganParlimenError}
                                    placeholder={'Cawangan Parlimen'}
                                    keyboardType={'default'}
                                />
                                <View style={{ marginBottom: 10, justifyContent: 'center', }}>
                                    <Text style={[styles.textDefault, { marginBottom: 5, color: 'darkblue' }]}>Pengundi berdaftar cawangan parlimen</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox()} isChecked={pengundiBerdaftar} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox} value={pengundiBerdaftar} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                            Ya
                                </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox()} isChecked={!pengundiBerdaftar} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox} value={!pengundiBerdaftar} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                            Tidak
                                </Text>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Status perniagaan</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox1()} isChecked={statusPerniagaan} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox1} value={statusPerniagaan} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                            Sedang berniaga
                                </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox1()} isChecked={!statusPerniagaan} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox1} value={!statusPerniagaan} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Memulakan Perniagaan</Text>
                                    </View>
                                </View>

                                <CustomFormAction
                                    navigation={props.navigation}
                                    isValid={FormikProps.isValid}
                                    handleSubmit={FormikProps.handleSubmit}
                                />
                            </View>
                        </View>
                    )
                }}
            </Formik >
        </LayoutLoan>
    );
}

export default LoanMaklumatAsasScreen