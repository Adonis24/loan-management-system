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

import LayoutA from '../Layout/LayoutA';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    cpPekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),

    cpName: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    cpIcNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    cpPendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),

    cpRelation: Yup
        .string()
        .required(),



});

const LoanConnectedPartiesScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { cpName, cpIcNumber, cpPekerjaan, cpPendapatan,cpRelation } = useSelector(state => state.financingReducer, shallowEqual)


    const setConnectParties = (value) => dispatch({ type: 'SET_CONNECT_PARTIES', payload: { ...value } })


    //const { capacity, nameCP, cpIcNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{ cpName, cpIcNumber, cpPekerjaan, cpPendapatan,cpRelation }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    props.navigation.navigate('LoanConnectedPartiesAddr')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { cpPekerjaan, cpName, cpIcNumber, cpPendapatan, poskod,cpRelation } = FormikProps.values

                    const cpPekerjaanError = FormikProps.errors.cpPekerjaan
                    const cpPekerjaanTouched = FormikProps.touched.cpPekerjaan

                    const cpNameError = FormikProps.errors.cpName
                    const cpNameTouched = FormikProps.touched.cpName

                    const cpIcNumberError = FormikProps.errors.cpIcNumber
                    const cpIcNumberTouched = FormikProps.touched.cpIcNumber

                    const cpPendapatanError = FormikProps.errors.cpPendapatan
                    const cpPendapatanTouched = FormikProps.touched.cpPendapatan

                    const cpRelationError = FormikProps.errors.cpRelation
                    const cpRelationTouched = FormikProps.touched.cpRelation





                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
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

                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={cpRelation} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('cpRelation', itemValue)}>
                                            <Picker.Item label={'Hubungan'} value={undefined} />
                                            <Picker.Item label="Suami" value="suami" />
                                            <Picker.Item label="Isteri" value="isteri" />
                                            <Picker.Item label="Waris" value="waris" />

                                        </Picker>

                                    </View>
                                </View>
                            </Modal>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5,color:'black' }]}>Section C</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Pasangan</Text>

                            <View style={{marginTop:20, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('cpRelation')}>
                                                <Text style={{ fontSize: 12 }}>{cpRelation ? cpRelation : `Status Kediaman`}</Text>
                                            </TouchableOpacity>
                                            {cpRelationTouched && cpRelationError && <Text style={styles.error}>{cpRelationError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={cpRelation} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('cpRelation', itemValue)}>
                                            <Picker.Item label={'Hubungan'} value={undefined} />
                                            <Picker.Item label="Suami" value="suami" />
                                            <Picker.Item label="Isteri" value="isteri" />
                                            <Picker.Item label="Waris" value="waris" />
                                            </Picker>
                                            {cpRelationTouched && cpRelationError && <Text style={styles.error}>{cpRelationError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpName}
                                handleChange={FormikProps.handleChange(`cpName`)}
                                handleBlur={FormikProps.handleBlur(`cpName`)}
                                touched={cpNameTouched}
                                error={cpNameError}
                                placeholder={'Nama Suami/Isteri/Waris'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={cpIcNumber}
                                handleChange={FormikProps.handleChange(`cpIcNumber`)}
                                handleBlur={FormikProps.handleBlur(`cpIcNumber`)}
                                touched={cpIcNumberTouched}
                                error={cpIcNumberError}
                                placeholder={'No Kad Pengenalan'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpPekerjaan}
                                handleChange={FormikProps.handleChange(`cpPekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`cpPekerjaan`)}
                                touched={cpPekerjaanTouched}
                                error={cpPekerjaanError}
                                placeholder={'Pekerjaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={cpPendapatan}
                                handleChange={FormikProps.handleChange(`cpPendapatan`)}
                                handleBlur={FormikProps.handleBlur(`cpPendapatan`)}
                                touched={cpPendapatanTouched}
                                error={cpPendapatanError}
                                placeholder={'Pendapatan'}
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
        </LayoutA>
    );
}




export default LoanConnectedPartiesScreen