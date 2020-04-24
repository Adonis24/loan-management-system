import React, { useEffect, useState } from 'react';
import {

    Text,
    TouchableOpacity,
    View,
    ScrollView,


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    income: Yup
        .number()
        .required()
        .min(0)
        .label('Pendapatan'),
    kosOperasi: Yup
        .number()
        .required()
        .min(0)
        .label('Kos Operasi'),
    perbelanjaanLain: Yup
        .number()
        .required()
        .min(0)
        .label('Perbelanjaan Lain'),
    pembelian: Yup
        .number()
        .required()
        .min(0)
        .label('Perbelanjaan Lain'),
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
                initialValues={{
                    pembelian: '0',
                    income: income || '0',
                    kosOperasi: kosOperasi || '0',
                    totalExpenditure: totalExpenditure || '0',
                    untungKasar: untungKasar || '0',
                    perbelanjaanLain: perbelanjaanLain || '0',
                    untungBersih: untungBersih || '0',
                    totalIncome: totalIncome || '0'
                }}

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

                    const perbelanjaanLainError = FormikProps.errors.perbelanjaanLain
                    const perbelanjaanLainTouched = FormikProps.touched.perbelanjaanLain

                    const kosOperasiError = FormikProps.errors.kosOperasi
                    const kosOperasiTouched = FormikProps.touched.kosOperasi


                    const autoCalculateIncome = (val) => {
                        const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values
                        const untungKasar1 = parseFloat(val) - (parseFloat(pembelian) + parseFloat(kosOperasi))
                        const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)

                        FormikProps.setFieldValue('income', val)
                        FormikProps.setFieldValue('totalIncome', val)
                        FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                        FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                    }

                    const autoCalculatePembelian = (val) => {
                        const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values
                        const untungKasar1 = parseFloat(income) - (parseFloat(val) + parseFloat(kosOperasi))
                        const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)
                        const totalExpenditure1 = parseFloat(val) + parseFloat(kosOperasi)


                        FormikProps.setFieldValue('pembelian', val)
                        FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                        FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                        FormikProps.setFieldValue('totalExpenditure', totalExpenditure1.toString())
                    }

                    const autoCalculateKosOperasi = (val) => {
                        const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values

                        const untungKasar1 = parseFloat(income) - (parseFloat(pembelian) + parseFloat(val))
                        const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)

                        const totalExpenditure1 = parseFloat(pembelian) + parseFloat(val)

                        FormikProps.setFieldValue('kosOperasi', val)
                        FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                        FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                        FormikProps.setFieldValue('totalExpenditure', totalExpenditure1.toString())

                    }

                    const autoCalculatePerbelanjaanLain = (val) => {

                        const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values

                        const untungKasar1 = parseFloat(income) - (parseFloat(pembelian) + parseFloat(kosOperasi))
                        const untungBersih1 = untungKasar1 - parseFloat(val)

                        FormikProps.setFieldValue('perbelanjaanLain', val)
                        FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                    }


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                            <Text style={[styles.formTitle]}>Section C</Text>
                            <Text style={[styles.formSubtitle]}>Anggaran Pendapatan Bulanan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>

                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={income}
                                    handleChange={(val) => autoCalculateIncome(val)}
                                    handleBlur={FormikProps.handleBlur(`income`)}
                                    touched={incomeTouched}
                                    error={incomeError}
                                    placeholder={'Pendapatan Jualan/Bayaran Perkidmatan'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={income}
                                    placeholder={'Jumlah Pendapatan'}
                                    editable={false}

                                />


                                <CustomTextInput
                                    imageUri={require('../assets/images/bizAct.png')}
                                    value={pembelian}
                                    handleChange={(val) => autoCalculatePembelian(val)}
                                    handleBlur={FormikProps.handleBlur(`pembelian`)}
                                    touched={pembelianTouched}
                                    error={pembelianError}
                                    placeholder={'Pembelian'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={kosOperasi}
                                    handleChange={(val) => autoCalculateKosOperasi(val)}
                                    handleBlur={FormikProps.handleBlur(`kosOperasi`)}
                                    touched={kosOperasiTouched}
                                    error={kosOperasiError}
                                    placeholder={'Kos Operasi'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={totalExpenditure}
                                    placeholder={'Jumlah Pebelanjaan'}
                                    editable={false}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={untungKasar}
                                    placeholder={'Untung Kasar'}
                                    editable={false}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={perbelanjaanLain}
                                    handleChange={(val) => autoCalculatePerbelanjaanLain(val)}
                                    handleBlur={FormikProps.handleBlur(`perbelanjaanLain`)}
                                    touched={perbelanjaanLainTouched}
                                    error={perbelanjaanLainError}
                                    placeholder={'Perbelanjaan Lain'}
                                    keyboardType={'phone-pad'}


                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={untungBersih}
                                    placeholder={'Untung Bersih'}
                                    editable={false}

                                />
                                <CustomFormAction
                                    label={`Save`}
                                    navigation={props.navigation}
                                    isValid={FormikProps.isValid}
                                    handleSubmit={FormikProps.handleSubmit}
                                />
                            </ScrollView>


                        </View>

                    )
                }}
            </Formik >
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan >
    );
}

export default BusinessPlanBudgIncScreen