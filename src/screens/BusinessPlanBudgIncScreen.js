import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
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
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    income: Yup
        .string()
        .required()
        .min(1)
        .label('Pendapatan'),

    kosOperasi: Yup
        .string()
        .required()
        .min(1)
        .label('Kos Operasi'),

    totalExpenditure: Yup
        .string()
        .required()
        .min(1)
        .label('Jumlah Perbelanjaan'),
    untungKasar: Yup
        .string()
        .required()
        .min(1)
        .label('Untung Kasar'),

    perbelanjaanLain: Yup
        .string()
        .required()
        .min(1)
        .label('Perbelanjaan Lain'),

    untungBersih: Yup
        .string()
        .required()
        .min(1)
        .label('Untung Bersih'),

    totalIncome: Yup
        .string()
        .required()
        .min(1)
        .label('Jumlah Pendapatan'),

    pembelian: Yup
        .string()
        .required()
        .min(1)
        .label('Pembelian'),


});

const BusinessPlanBudgIncScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { pembelian, income, kosOperasi, totalExpenditure, untungKasar, perbelanjaanLain, untungBersih, totalIncome } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ pembelian, income, kosOperasi, totalExpenditure, untungKasar, perbelanjaanLain, untungBersih, totalIncome }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanProposal')
                    dispatch(actionCreator.saveBussPlanData())
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { income, pembelian, kosOperasi, totalExpenditure, untungKasar, perbelanjaanLain, untungBersih, totalIncome } = FormikProps.values

                    const incomeError = FormikProps.errors.income
                    const incomeTouched = FormikProps.touched.income

                    const pembelianError = FormikProps.errors.pembelian
                    const pembelianTouched = FormikProps.touched.pembelian

                    const totalExpenditureError = FormikProps.errors.totalExpenditure
                    const totalExpenditureTouched = FormikProps.touched.totalExpenditure

                    const untungKasarError = FormikProps.errors.untungKasar
                    const untungKasarTouched = FormikProps.touched.untungKasar

                    const perbelanjaanLainError = FormikProps.errors.perbelanjaanLain
                    const perbelanjaanLainTouched = FormikProps.touched.perbelanjaanLain

                    const untungBersihError = FormikProps.errors.untungBersih
                    const untungBersihTouched = FormikProps.touched.untungBersih

                    const kosOperasiError = FormikProps.errors.kosOperasi
                    const kosOperasiTouched = FormikProps.touched.kosOperasi

                    const totalIncomeError = FormikProps.errors.totalIncome
                    const totalIncomeTouched = FormikProps.touched.totalIncome




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                            <Text style={[styles.formTitle]}>Section C</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Anggaran Pendapatan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', paddingLeft: 10 }}>
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={income}
                                    handleChange={FormikProps.handleChange(`income`)}
                                    handleBlur={FormikProps.handleBlur(`income`)}
                                    touched={incomeTouched}
                                    error={incomeError}
                                    placeholder={'Pendapatan Jualan/Bayaran Perkidmatan'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={totalIncome}
                                    handleChange={FormikProps.handleChange(`totalIncome`)}
                                    handleBlur={FormikProps.handleBlur(`totalIncome`)}
                                    touched={totalIncomeTouched}
                                    error={totalIncomeError}
                                    placeholder={'Jumlah Pendapatan'}
                                    keyboardType={'phone-pad'}

                                />


                                <CustomTextInput
                                    imageUri={require('../assets/images/bizAct.png')}
                                    value={pembelian}
                                    handleChange={FormikProps.handleChange(`pembelian`)}
                                    handleBlur={FormikProps.handleBlur(`pembelian`)}
                                    touched={pembelianTouched}
                                    error={pembelianError}
                                    placeholder={'Pembelian'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={kosOperasi}
                                    handleChange={FormikProps.handleChange(`kosOperasi`)}
                                    handleBlur={FormikProps.handleBlur(`kosOperasi`)}
                                    touched={kosOperasiTouched}
                                    error={kosOperasiError}
                                    placeholder={'Kos Operasi'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={totalExpenditure}
                                    handleChange={FormikProps.handleChange(`totalExpenditure`)}
                                    handleBlur={FormikProps.handleBlur(`totalExpenditure`)}
                                    touched={totalExpenditureTouched}
                                    error={totalExpenditureError}
                                    placeholder={'Jumlah Pebelanjaan'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={untungKasar}
                                    handleChange={FormikProps.handleChange(`untungKasar`)}
                                    handleBlur={FormikProps.handleBlur(`untungKasar`)}
                                    touched={untungKasarTouched}
                                    error={untungKasarError}
                                    placeholder={'Untung Kasar'}
                                    keyboardType={'phone-pad'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={perbelanjaanLain}
                                    handleChange={FormikProps.handleChange(`perbelanjaanLain`)}
                                    handleBlur={FormikProps.handleBlur(`perbelanjaanLain`)}
                                    touched={perbelanjaanLainTouched}
                                    error={perbelanjaanLainError}
                                    placeholder={'Perbelanjaan Lain'}
                                    keyboardType={'phone-pad'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={untungBersih}
                                    handleChange={FormikProps.handleChange(`untungBersih`)}
                                    handleBlur={FormikProps.handleBlur(`untungBersih`)}
                                    touched={untungBersihTouched}
                                    error={untungBersihError}
                                    placeholder={'Untung Bersih'}
                                    keyboardType={'phone-pad'}

                                />
                            </ScrollView>
                            <CustomFormAction
                                label={`Save`}
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




export default BusinessPlanBudgIncScreen