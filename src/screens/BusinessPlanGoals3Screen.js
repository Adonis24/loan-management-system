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

    tahun3: Yup
        .string()
        .required()
        .min(4)
        .max(4)
        .label('Tahun'),

    grossProfit3: Yup
        .string()
        .required()
        .min(2)
        .label('Untung Kasar'),

    belanjaLain3: Yup
        .string()
        .required()
        .min(2)
        .label('Perbelanjaan Lain'),
    netProfit3: Yup
        .string()
        .required()
        .min(2)
        .label('Untung Bersih'),

    jualan3: Yup
        .string()
        .required()
        .min(2)
        .label('Jumlah'),

    belian3: Yup
        .string()
        .required()
        .min(2)
        .label('Belian'),


});

const BusinessPlanGoals3Screen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { belian3, tahun3, grossProfit3, belanjaLain3, netProfit3, jualan3 } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ belian3, tahun3, grossProfit3, belanjaLain3, netProfit3, jualan3 }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanMarketing')
                    actions.resetForm({})
                    dispatch(actionCreator.saveBussPlanData())
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { tahun3, belian3, grossProfit3, belanjaLain3, netProfit3, jualan3 } = FormikProps.values

                    const tahun3Error = FormikProps.errors.tahun3
                    const tahun3Touched = FormikProps.touched.tahun3

                    const belian3Error = FormikProps.errors.belian3
                    const belian3Touched = FormikProps.touched.belian3

                    const belanjaLain3Error = FormikProps.errors.belanjaLain3
                    const belanjaLain3Touched = FormikProps.touched.belanjaLain3

                    const netProfit3Error = FormikProps.errors.netProfit3
                    const netProfit3Touched = FormikProps.touched.netProfit3

                    const grossProfit3Error = FormikProps.errors.grossProfit3
                    const grossProfit3Touched = FormikProps.touched.grossProfit3

                    const jualan3Error = FormikProps.errors.jualan3
                    const jualan3Touched = FormikProps.touched.jualan3




                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                            <Text style={[styles.formTitle]}>Section E</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Sasaran Pencapaian Perniagaan Tahunan      (3 tahun ke hadapan)</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/estimateTime.png')}
                                value={tahun3}
                                handleChange={FormikProps.handleChange(`tahun3`)}
                                handleBlur={FormikProps.handleBlur(`tahun3`)}
                                touched={tahun3Touched}
                                error={tahun3Error}
                                placeholder={'Tahun Ketiga'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/company.png')}
                                value={jualan3}
                                handleChange={FormikProps.handleChange(`jualan3`)}
                                handleBlur={FormikProps.handleBlur(`jualan3`)}
                                touched={jualan3Touched}
                                error={jualan3Error}
                                placeholder={'Jualan'}
                                keyboardType={'phone-pad'}

                            />


                            <CustomTextInput
                                imageUri={require('../assets/images/bizAct.png')}
                                value={belian3}
                                handleChange={FormikProps.handleChange(`belian3`)}
                                handleBlur={FormikProps.handleBlur(`belian3`)}
                                touched={belian3Touched}
                                error={belian3Error}
                                placeholder={'Belian/Kos Operasi'}
                                keyboardType={'phone-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={grossProfit3}
                                handleChange={FormikProps.handleChange(`grossProfit3`)}
                                handleBlur={FormikProps.handleBlur(`grossProfit3`)}
                                touched={grossProfit3Touched}
                                error={grossProfit3Error}
                                placeholder={'Untung Kasar'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/payment.png')}
                                value={belanjaLain3}
                                handleChange={FormikProps.handleChange(`belanjaLain3`)}
                                handleBlur={FormikProps.handleBlur(`belanjaLain3`)}
                                touched={belanjaLain3Touched}
                                error={belanjaLain3Error}
                                placeholder={'Perbelanjaan Lain'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={netProfit3}
                                handleChange={FormikProps.handleChange(`netProfit3`)}
                                handleBlur={FormikProps.handleBlur(`netProfit3`)}
                                touched={netProfit3Touched}
                                error={netProfit3Error}
                                placeholder={'Untung Bersih'}
                                keyboardType={'phone-pad'}

                            />


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




export default BusinessPlanGoals3Screen