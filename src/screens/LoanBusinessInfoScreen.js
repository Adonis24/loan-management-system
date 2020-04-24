import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import moment from 'moment'

const validationSchema = Yup.object().shape({

    compSendiriAct: Yup
        .string()
        .required()
        .min(3)
        .label('Aktiviti'),

    compSendiriName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Syarikat'),

    compSendiriPengalaman: Yup
        .string()
        .required()
        .min(3)
        .label('Pengalaman'),

    compSendiriPendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),




});

const LoanConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compSendiriName, compSendiriPengalaman, compSendiriAct, compSendiriPendapatan, } = useSelector(state => state.financingReducer, shallowEqual)

    const { companyRegNo, reg_date, addr, addr_2, city, state, postcode, main_biz_act, basic_status, additional_status, logo } = useSelector(state => state.bizInfoReducer, shallowEqual)
    const companyEmail = useSelector(state => state.bizInfoReducer.email, shallowEqual)
    const companyPhone = useSelector(state => state.bizInfoReducer.phone, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)

    const setBusinessInfo = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ compSendiriName:companyName, compSendiriPengalaman:moment(reg_date).fromNow(), compSendiriAct:main_biz_act, compSendiriPendapatan, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setBusinessInfo(values)
                    props.navigation.navigate('LoanBusinessAddrInfo')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { compSendiriAct, compSendiriName, compSendiriPengalaman, compSendiriPendapatan, poskod } = FormikProps.values

                    const compSendiriActError = FormikProps.errors.compSendiriAct
                    const compSendiriActTouched = FormikProps.touched.compSendiriAct

                    const compSendiriNameError = FormikProps.errors.compSendiriName
                    const compSendiriNameTouched = FormikProps.touched.compSendiriName

                    const compSendiriPengalamanError = FormikProps.errors.compSendiriPengalaman
                    const compSendiriPengalamanTouched = FormikProps.touched.compSendiriPengalaman

                    const compSendiriPendapatanError = FormikProps.errors.compSendiriPendapatan
                    const compSendiriPendapatanTouched = FormikProps.touched.compSendiriPendapatan




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={[styles.formTitle]}>Section D</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Perniagaan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={compSendiriName}
                                handleChange={FormikProps.handleChange(`compSendiriName`)}
                                handleBlur={FormikProps.handleBlur(`compSendiriName`)}
                                touched={compSendiriNameTouched}
                                error={compSendiriNameError}
                                placeholder={'Nama Syarikat'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/bizAct.png')}
                                value={compSendiriAct}
                                handleChange={FormikProps.handleChange(`compSendiriAct`)}
                                handleBlur={FormikProps.handleBlur(`compSendiriAct`)}
                                touched={compSendiriActTouched}
                                error={compSendiriActError}
                                placeholder={'Aktiviti Perniagaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={compSendiriPengalaman}
                                handleChange={FormikProps.handleChange(`compSendiriPengalaman`)}
                                handleBlur={FormikProps.handleBlur(`compSendiriPengalaman`)}
                                touched={compSendiriPengalamanTouched}
                                error={compSendiriPengalamanError}
                                placeholder={'Tempoh/Pengalaman Berniaga'}
                            //keyboardType={''}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={compSendiriPendapatan}
                                handleChange={FormikProps.handleChange(`compSendiriPendapatan`)}
                                handleBlur={FormikProps.handleBlur(`compSendiriPendapatan`)}
                                touched={compSendiriPendapatanTouched}
                                error={compSendiriPendapatanError}
                                placeholder={'Anggaran Pendapatan'}
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
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan>
    );
}




export default LoanConnectedPartiesScreen