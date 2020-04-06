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

    ruangNiaga: Yup
        .string()
        .required()
        .min(1)
        .label('Ruang Niaga'),

    membeli: Yup
        .string()
        .required()
        .min(1)
        .label('Membeli'),

    kenderaan: Yup
        .string()
        .required()
        .min(1)
        .label('Pembelian Kenderaan'),
    modalPusingan: Yup
        .string()
        .required()
        .min(1)
        .label('Modal Pusingan'),

    belanjaanLain: Yup
        .string()
        .required()
        .min(1)
        .label('Perbelanjaan Lain'),

    jumlah: Yup
        .string()
        .required()
        .min(1)
        .label('Jumlah'),

    perkakas: Yup
        .string()
        .required()
        .min(1)
        .label('Perkakas'),

    pembelianStok: Yup
        .string()
        .required()
        .min(1)
        .label('Pembelian Stok'),


});

const BusinessPlanProposalScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { pembelianStok, ruangNiaga, membeli, kenderaan, modalPusingan, belanjaanLain, jumlah, perkakas } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ pembelianStok, ruangNiaga, membeli, kenderaan, modalPusingan, belanjaanLain, jumlah, perkakas }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanSectionE')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { ruangNiaga, pembelianStok, membeli, kenderaan, modalPusingan, belanjaanLain, jumlah, perkakas } = FormikProps.values

                    const ruangNiagaError = FormikProps.errors.ruangNiaga
                    const ruangNiagaTouched = FormikProps.touched.ruangNiaga

                    const pembelianStokError = FormikProps.errors.pembelianStok
                    const pembelianStokTouched = FormikProps.touched.pembelianStok

                    const kenderaanError = FormikProps.errors.kenderaan
                    const kenderaanTouched = FormikProps.touched.kenderaan

                    const modalPusinganError = FormikProps.errors.modalPusingan
                    const modalPusinganTouched = FormikProps.touched.modalPusingan

                    const belanjaanLainError = FormikProps.errors.belanjaanLain
                    const belanjaanLainTouched = FormikProps.touched.belanjaanLain

                    const jumlahError = FormikProps.errors.jumlah
                    const jumlahTouched = FormikProps.touched.jumlah

                    const membeliError = FormikProps.errors.membeli
                    const membeliTouched = FormikProps.touched.membeli

                    const perkakasError = FormikProps.errors.perkakas
                    const perkakasTouched = FormikProps.touched.perkakas




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                            <Text style={[styles.formTitle]}>Section D</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Cadangan Keperluan Penggunaan Pembiayaan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', paddingLeft: 10 }}>
                                <CustomTextInput
                                    imageUri={require('../assets/images/estimateTime.png')}
                                    value={ruangNiaga}
                                    handleChange={FormikProps.handleChange(`ruangNiaga`)}
                                    handleBlur={FormikProps.handleBlur(`ruangNiaga`)}
                                    touched={ruangNiagaTouched}
                                    error={ruangNiagaError}
                                    placeholder={'Ruang Niaga/Premis/Tapak Projek (RM)'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/company.png')}
                                    value={perkakas}
                                    handleChange={FormikProps.handleChange(`perkakas`)}
                                    handleBlur={FormikProps.handleBlur(`perkakas`)}
                                    touched={perkakasTouched}
                                    error={perkakasError}
                                    placeholder={'Perkakas,Mesin Dan Peralatan (RM)'}
                                    keyboardType={'phone-pad'}

                                />


                                <CustomTextInput
                                    imageUri={require('../assets/images/bizAct.png')}
                                    value={pembelianStok}
                                    handleChange={FormikProps.handleChange(`pembelianStok`)}
                                    handleBlur={FormikProps.handleBlur(`pembelianStok`)}
                                    touched={pembelianStokTouched}
                                    error={pembelianStokError}
                                    placeholder={'Pembelian Stok/Bahan Mentah (RM)'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={membeli}
                                    handleChange={FormikProps.handleChange(`membeli`)}
                                    handleBlur={FormikProps.handleBlur(`membeli`)}
                                    touched={membeliTouched}
                                    error={membeliError}
                                    placeholder={'Membeli/Mengambil Alih Perniagaan (RM)'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/payment.png')}
                                    value={kenderaan}
                                    handleChange={FormikProps.handleChange(`kenderaan`)}
                                    handleBlur={FormikProps.handleBlur(`kenderaan`)}
                                    touched={kenderaanTouched}
                                    error={kenderaanError}
                                    placeholder={'Pembelian Kenderaan (RM)'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={modalPusingan}
                                    handleChange={FormikProps.handleChange(`modalPusingan`)}
                                    handleBlur={FormikProps.handleBlur(`modalPusingan`)}
                                    touched={modalPusinganTouched}
                                    error={modalPusinganError}
                                    placeholder={'Modal Pusingan (RM)'}
                                    keyboardType={'phone-pad'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={belanjaanLain}
                                    handleChange={FormikProps.handleChange(`belanjaanLain`)}
                                    handleBlur={FormikProps.handleBlur(`belanjaanLain`)}
                                    touched={belanjaanLainTouched}
                                    error={belanjaanLainError}
                                    placeholder={'Perbelanjaan Lain (RM)'}
                                    keyboardType={'phone-pad'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={jumlah}
                                    handleChange={FormikProps.handleChange(`jumlah`)}
                                    handleBlur={FormikProps.handleBlur(`jumlah`)}
                                    touched={jumlahTouched}
                                    error={jumlahError}
                                    placeholder={'Jumlah (RM)'}
                                    keyboardType={'phone-pad'}

                                />
                            </ScrollView>
                            <CustomFormAction
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




export default BusinessPlanProposalScreen