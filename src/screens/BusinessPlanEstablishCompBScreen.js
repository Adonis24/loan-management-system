import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    Picker,
    View,
    TextInput, Platform


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

 

    paidCap: Yup
        .string()
        .required()
        .min(3)
        .label('Modal Dibayar'),

    authCap: Yup
        .string()
        .required()
        .min(3)
        .label('Modal Dibenarkan'),

    
});

const BusinessPlanEstablishCompBScreen = (props) => {

   


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { paidCap, authCap } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })


 

    // const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ paidCap, authCap }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    dispatch(actionCreator.saveBussPlanData())
                    props.navigation.navigate('BusinessPlanBank')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                 


                    const { paidCap, authCap, pemilikan, compEstab, compOperation, businessType } = FormikProps.values

                    const compEstabError = FormikProps.errors.compEstab
                    const compEstabTouched = FormikProps.touched.compEstab

                    const paidCapError = FormikProps.errors.paidCap
                    const paidCapTouched = FormikProps.touched.paidCap

                    const authCapError = FormikProps.errors.authCap
                    const authCapTouched = FormikProps.touched.authCap

                    const compOperationError = FormikProps.errors.compOperation
                    const compOperationTouched = FormikProps.touched.compOperation

                    const pemilikanError = FormikProps.errors.pemilikan
                    const pemilikanTouched = FormikProps.touched.pemilikan

                    const businessTypeError = FormikProps.errors.businessType
                    const businessTypeTouched = FormikProps.touched.businessType


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            

                            <Text style={[styles.formTitle]}>Section A</Text>
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

                           

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={paidCap}
                                handleChange={FormikProps.handleChange(`paidCap`)}
                                handleBlur={FormikProps.handleBlur(`paidCap`)}
                                touched={paidCapTouched}
                                error={paidCapError}
                                placeholder={'Modal Dibayar'}
                                keyboardType={'phone-pad'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={authCap}
                                handleChange={FormikProps.handleChange(`authCap`)}
                                handleBlur={FormikProps.handleBlur(`authCap`)}
                                touched={authCapTouched}
                                error={authCapError}
                                placeholder={'Modal Dibenarkan'}
                                keyboardType={'phone-pad'}
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




export default BusinessPlanEstablishCompBScreen