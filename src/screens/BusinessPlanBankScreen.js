import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Picker,
    View,
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

    pemegang: Yup
        .string()
        .required(),

    akaun: Yup
        .string()
        .required(),

    bankName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Bank'),

    noAkaun: Yup
        .string()
        .required()
        .min(16)
        .max(16)
        .label('No Akaun'),







});

const BusinessPlanBankScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { bankName, pemegang, akaun, noAkaun } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ pemegang, akaun, bankName, noAkaun }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanPartner')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { akaun, pemegang, bankName, noAkaun } = FormikProps.values



                    const akaunError = FormikProps.errors.akaun
                    const akaunTouched = FormikProps.touched.akaun

                    const pemegangError = FormikProps.errors.pemegang
                    const pemegangTouched = FormikProps.touched.pemegang

                    const bankNameError = FormikProps.errors.bankName
                    const bankNameTouched = FormikProps.touched.bankName

                    const noAkaunError = FormikProps.errors.noAkaun
                    const noAkaunTouched = FormikProps.touched.noAkaun


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
                                        {(modalContent === "akaun") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={akaun} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('akaun', itemValue)}>
                                                <Picker.Item label={'Jenis Akaun'} value={undefined} />
                                                <Picker.Item label="Semasa" value="semasa" />
                                                <Picker.Item label="Simpanan" value="simpanan" />


                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={pemegang} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('pemegang', itemValue)}>
                                                <Picker.Item label={'Pemegang Akaun'} value={undefined} />
                                                <Picker.Item label="Individu" value="individu" />
                                                <Picker.Item label="Syarikat" value="syarikat" />
                                                <Picker.Item label="Perkongsian" value="perkongsian" />

                                            </Picker>
                                        }
                                    </View>
                                </View>
                            </Modal>


                            <Text style={[styles.formTitle]}>Section A</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={bankName}
                                handleChange={FormikProps.handleChange(`bankName`)}
                                handleBlur={FormikProps.handleBlur(`bankName`)}
                                touched={bankNameTouched}
                                error={bankNameError}
                                placeholder={'Nama Bank'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={noAkaun}
                                handleChange={FormikProps.handleChange(`noAkaun`)}
                                handleBlur={FormikProps.handleBlur(`noAkaun`)}
                                touched={noAkaunTouched}
                                error={noAkaunError}
                                placeholder={'No Akaun'}
                                keyboardType={'decimal-pad'}
                            />

                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Jenis Akaun :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('akaun')}>
                                                <Text style={{ fontSize: 12 }}>{akaun ? akaun : `Jenis Akaun`}</Text>
                                            </TouchableOpacity>
                                            {akaunTouched && akaunError && <Text style={styles.error}>{akaunError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={akaun} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('akaun', itemValue)}>
                                                <Picker.Item label={'Jenis Akaun'} value={undefined} />
                                                <Picker.Item label="Semasa" value="semasa" />
                                                <Picker.Item label="Simpanan" value="simpanan" />

                                            </Picker>
                                            {akaunTouched && akaunError && <Text style={styles.error}>{akaunError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Pemegang Akaun :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pemegang')}>
                                                <Text style={{ fontSize: 12 }}>{pemegang ? pemegang : `Status Premis`}</Text>
                                            </TouchableOpacity>
                                            {pemegangTouched && pemegangError && <Text style={styles.error}>{pemegangError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={pemegang} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemegang', itemValue)}>
                                                <Picker.Item label={'Pemegang Akaun'} value={undefined} />
                                                <Picker.Item label="Individu" value="individu" />
                                                <Picker.Item label="Syarikat" value="syarikat" />
                                                <Picker.Item label="Perkongsian" value="perkongsian" />
                                            </Picker>
                                            {pemegangTouched && pemegangError && <Text style={styles.error}>{pemegangError}</Text>}
                                        </View>}
                                </View>
                            </View>




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




export default BusinessPlanBankScreen