import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Picker,
    TextInput,
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

    lokasi: Yup
        .string()
        .required()
        .min(3)
        .label('Lokasi'),

    bilPekerja: Yup
        .string()
        .required()
        .min(1)
        .label('Pekerja'),

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

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { bilCawangan, lokasi, bilPekerja, compPhone, compFax, compStatus } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ bilCawangan, lokasi, bilPekerja, compPhone, compFax, compStatus }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBussModal')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { lokasi, bilCawangan, bilPekerja, compPhone, compFax, compStatus } = FormikProps.values

                    const lokasiError = FormikProps.errors.lokasi
                    const lokasiTouched = FormikProps.touched.lokasi

                    const bilCawanganError = FormikProps.errors.bilCawangan
                    const bilCawanganTouched = FormikProps.touched.bilCawangan

                    const compPhoneError = FormikProps.errors.compPhone
                    const compPhoneTouched = FormikProps.touched.compPhone

                    const compFaxError = FormikProps.errors.compFax
                    const compFaxTouched = FormikProps.touched.compFax

                    const bilPekerjaError = FormikProps.errors.bilPekerja
                    const bilPekerjaTouched = FormikProps.touched.bilPekerja

                    const compStatusError = FormikProps.errors.compStatus
                    const compStatusTouched = FormikProps.touched.compStatus




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={iosPickerVisible} onRequestClose={() => console.log(`onRequestClose`)}
                            >
                                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                                    <View style={{ paddingLeft: 20, paddingRight: 20, flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <TouchableOpacity onPress={() => setIosPickerVisible(!iosPickerVisible)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                                <Ionicons name="ios-arrow-back" color={'#5a83c2'} style={{ fontSize: 30 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>Select</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                    </View>
                                    <View style={{ flex: 9, justifyContent: 'flex-start' }}>

                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={compStatus} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('compStatus', itemValue)}>
                                            <Picker.Item label={'Status Premis'} value={undefined} />
                                            <Picker.Item label="Sendiri" value="sendiri" />
                                            <Picker.Item label="Sewa" value="sewa" />


                                        </Picker>

                                    </View>
                                </View>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Butir-Butir Perniagaan</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={lokasi}
                                handleChange={FormikProps.handleChange(`lokasi`)}
                                handleBlur={FormikProps.handleBlur(`lokasi`)}
                                touched={lokasiTouched}
                                error={lokasiError}
                                placeholder={'Lokasi Premis'}

                            />
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Status Premis :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('compStatus')}>
                                                <Text style={{ fontSize: 12 }}>{compStatus ? compStatus : `Status Premis`}</Text>
                                            </TouchableOpacity>
                                            {compStatusTouched && compStatusError && <Text style={styles.error}>{compStatusError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={compStatus} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('compStatus', itemValue)}>
                                                <Picker.Item label={'Status Premis'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                               
                                            </Picker>
                                            {compStatusTouched && compStatusError && <Text style={styles.error}>{compStatusError}</Text>}
                                        </View>}
                                </View>
                                </View>

                                <CustomTextInput
                                    imageUri={require('../assets/images/company.png')}
                                    value={bilCawangan}
                                    handleChange={FormikProps.handleChange(`bilCawangan`)}
                                    handleBlur={FormikProps.handleBlur(`bilCawangan`)}
                                    touched={bilCawanganTouched}
                                    error={bilCawanganError}
                                    placeholder={'Bilangan Cawangan (Jika Ada)'}
                                    keyboardType={'default'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={bilPekerja}
                                    handleChange={FormikProps.handleChange(`bilPekerja`)}
                                    handleBlur={FormikProps.handleBlur(`bilPekerja`)}
                                    touched={bilPekerjaTouched}
                                    error={bilPekerjaError}
                                    placeholder={'Bilangan Pekerja'}
                                    keyboardType={'phone-pad'}
                                />
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