import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Picker,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';

import LayoutA from '../Layout/LayoutA';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'
import LayoutLoan from '../Layout/LayoutLoan';


const validationSchema = Yup.object().shape({

 
    bank: Yup
        .string(),

    noAkaun: Yup
        .string()
        .required()
        .min(16)
        .label('No Akaun'),


});

const LoanBankScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { bank, noAkaun, typeBusiness } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ bank, noAkaun }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    dispatch(actionCreator.saveLoanData())

                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanSectionB')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { bank, noAkaun, typeBusiness } = FormikProps.values


                    const bankError = FormikProps.errors.bank
                    const bankTouched = FormikProps.touched.bank
                    const noAkaunError = FormikProps.errors.noAkaun
                    const noAkaunTouched = FormikProps.touched.noAkaun
                  



                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10 }}>
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
                                        {(modalContent === "typeBusiness") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={typeBusiness} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('typeBusiness', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Pertanian Dan Perusahaan Asas Tani" value="pertanian" />
                                                <Picker.Item label="Peruncitan" value="peruncitan" />
                                                <Picker.Item label="Perkhidmatan" value="perkhidmatan" />
                                                <Picker.Item label="Pembuatan" value="pembuatan" />
                                                <Picker.Item label="Kontraktor Kecil" value="kontraktorKecil" />
                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={bank} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('bank', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Bank Islam" value="bankIslam" />
                                                <Picker.Item label="Maybank" value="maybank" />
                                                <Picker.Item label="Bank Rakyat" value="bankRakyat" />
                                                <Picker.Item label="BSN" value="bsn" />
                                                <Picker.Item label="Agrobank" value="agrobank" />
                                            </Picker>}
                                    </View>
                                </View>
                            </Modal>

                            <Text style={[styles.formTitle]}>Section A</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Asas</Text>
                            

                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={noAkaun}
                                    handleChange={FormikProps.handleChange(`noAkaun`)}
                                    handleBlur={FormikProps.handleBlur(`noAkaun`)}
                                    touched={noAkaunTouched}
                                    error={noAkaunError}
                                    placeholder={'No.Akaun'}
                                    keyboardType={'decimal-pad'}
                                />
                                <Text style={[styles.label, { margin: 5,alignSelf:'flex-start' }]}>Bank :</Text>

                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center',marginBottom:10 }}>
                                    <Image source={require('../assets/images/city.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', margin: 5, flex:1 }}>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('bank')}>
                                                    <Text style={{ fontSize: 12 }}>{bank ? bank : `Bank`}</Text>
                                                </TouchableOpacity>
                                                {bankTouched && bankError && <Text style={styles.error}>{bankError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                                <Picker style={{ height: 35 }} selectedValue={bank} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('bank', itemValue)}>
                                                    <Picker.Item label={'Bank'} value={undefined} />
                                                    <Picker.Item label="Bank Islam" value="bankIslam" />
                                                    <Picker.Item label="Maybank" value="maybank" />
                                                    <Picker.Item label="Bank Rakyat" value="bankRakyat" />
                                                    <Picker.Item label="BSN" value="bsn" />
                                                    <Picker.Item label="Agrobank" value="agrobank" />

                                                </Picker>
                                                {bankTouched && bankError && <Text style={styles.error}>{bankError}</Text>}
                                            </View>}
                                    </View>
                                </View>
                                
                          

                            <CustomFormAction
                            label={'Save'}
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



export default LoanBankScreen