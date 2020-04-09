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
import LayoutLoan from '../Layout/LayoutLoan';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'


const validationSchema = Yup.object().shape({

    pembiayaan: Yup
        .string()
        .required(),



});

const LoanBusinessDetailScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false
    const [loan, setLoan] = useState(null)

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { institusi, totalLoan, pembiayaan, loanBal } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)




    const setPembiayaan = (value) => dispatch({ type: 'SET_PEMBIAYAAN', payload: { ...value } })



    //proceedContact && props.navigation.goBack()

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    const changeLoan = (pembiayaan) => {
        console.log(`pembiayaan : ${pembiayaan}`)
        if (pembiayaan) {
            props.navigation.navigate('LoanBusinessDetail2')
        } else {
            props.navigation.navigate('LoanDetail')
        }
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ pembiayaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    const { pembiayaan } = values
                    setPembiayaan(values)
                    changeLoan(pembiayaan)
                    actions.setSubmitting(false)
                    actions.resetForm({})

                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { pembiayaan } = FormikProps.values


                    const pembiayaanError = FormikProps.errors.pembiayaan
                    const pembiayaanTouched = FormikProps.touched.pembiayaan

                    const handleCheckBox = () => { FormikProps.setFieldValue('pembiayaan', !pembiayaan) }


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
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={pembiayaan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pembiayaan', itemValue)}>
                                            <Picker.Item label={'Pembiayaan'} value={undefined} />
                                            <Picker.Item label="Ada" value={1} />
                                            <Picker.Item label="Tiada" value={2} />
                                        </Picker>
                                    </View>
                                </View>
                            </Modal>

                            <Text style={[styles.formTitle]}>Section F</Text>
                            <Text style={[styles.formSubtitle]}>Pembiayaan Perniagaan Sedia Ada</Text>



                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Pembiayaan :</Text>


                           
                                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox()} isChecked={pembiayaan} />
                                        :
                                        <CheckBox onValueChange={() => handleCheckBox()} value={pembiayaan} />
                                    }
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Ya
                                </Text>

                                </View>
                                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox()} isChecked={!pembiayaan} />
                                        :
                                        <CheckBox onValueChange={() => handleCheckBox()} value={!pembiayaan} />
                                    }
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Tidak
                                </Text>
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



export default LoanBusinessDetailScreen