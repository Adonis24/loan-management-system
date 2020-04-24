import React, { useEffect, useState } from 'react';
import {

    Text,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import CheckBox2 from 'react-native-check-box'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    lokasi: Yup
        .string()
        .required()
        .min(3)
        .label('Lokasi'),
    compPhone: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),
    compFax: Yup
        .string()
        .required()
        .min(3)
        .label('No Fax'),
    compStatus: Yup
        .string()
        .required(),

});

const BusinessPlanBussInfoScreen = (props) => {


    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { lokasi, compPhone, compFax, compStatus,compAlamat, compAlamat_2, compCity, compState, compPoskod } = useSelector(state => state.businessPlanningReducer, shallowEqual)
  
    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ lokasi, compPhone, compFax, compStatus }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBussInfoB')
                    actions.resetForm({})
                    dispatch(actionCreator.saveBussPlanData())
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { lokasi, compPhone, compFax, compStatus } = FormikProps.values
                    const lokasiError = FormikProps.errors.lokasi
                    const lokasiTouched = FormikProps.touched.lokasi
                    const compPhoneError = FormikProps.errors.compPhone
                    const compPhoneTouched = FormikProps.touched.compPhone
                    const compFaxError = FormikProps.errors.compFax
                    const compFaxTouched = FormikProps.touched.compFax
                    const compStatusError = FormikProps.errors.compStatus
                    const compStatusTouched = FormikProps.touched.compStatus

                    const handleCheckBoxPremisSendiri = () => {
                        FormikProps.setFieldValue('compStatus', 'Sendiri')
                    }
                    const handleCheckBoxPremisSewa = () => {
                        FormikProps.setFieldValue('compStatus', 'Sewa')
                    }


                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Butir-Butir Perniagaan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>
                            <CustomTextInput
                                    imageUri={require('../assets/images/address.png')}
                                    handleClick={() => console.log('do nothing')}
                                    multiLine={true}

                                    placeholder={'Alamat'}

                                >
                                    <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                        <Text style={[styles.textDefault, { color: '#000' }]}>{compAlamat}</Text>
                                        {compAlamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{compAlamat_2}</Text>}
                                        {compPoskod && <Text style={[styles.textDefault, { color: '#000' }]}>{compPoskod}</Text>}
                                        {compCity && <Text style={[styles.textDefault, { color: '#000' }]}>{compCity},{compState}</Text>}
                                    </View>
                                </CustomTextInput>
                                <View style={{ marginBottom: 10, justifyContent: 'center', alignSelf: 'stretch' }}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Status Premis :</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox2 onClick={() => handleCheckBoxPremisSendiri()} isChecked={compStatus === 'Sendiri'} checkBoxColor={'#5a83c2'} />
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Sendiri</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox2 onClick={() => handleCheckBoxPremisSewa()} isChecked={compStatus === 'Sewa'} checkBoxColor={'#5a83c2'} />
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Sewa</Text>
                                    </View>
                                </View>
                                <CustomTextInput
                                    imageUri={require('../assets/images/phoneNum.png')}
                                    value={compPhone}
                                    handleChange={FormikProps.handleChange(`compPhone`)}
                                    handleBlur={FormikProps.handleBlur(`compPhone`)}
                                    touched={compPhoneTouched}
                                    error={compPhoneError}
                                    placeholder={'No Tel Pejabat'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={compFax}
                                    handleChange={FormikProps.handleChange(`compFax`)}
                                    handleBlur={FormikProps.handleBlur(`compFax`)}
                                    touched={compFaxTouched}
                                    error={compFaxError}
                                    placeholder={'No Faks Pejabat'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomFormAction
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
        </LayoutLoan>
    );
}




export default BusinessPlanBussInfoScreen