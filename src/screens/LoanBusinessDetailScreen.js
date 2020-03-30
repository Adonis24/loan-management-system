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

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    const changeLoan = (pembiayaan) => {
        console.log(`pembiayaan : ${pembiayaan}`)
        if (pembiayaan == 1) {
            props.navigation.navigate('LoanBusinessDetail2')
        } else {
            props.navigation.navigate('LoanDetail')
        }
    }


    return (
        <LayoutA>
            <Formik
                initialValues={{ pembiayaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    const { pembiayaan } = values
                    setPembiayaan(values)
                    changeLoan(pembiayaan)
                    actions.setSubmitting(false)

                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { pembiayaan } = FormikProps.values


                    const pembiayaanError = FormikProps.errors.pembiayaan
                    const pembiayaanTouched = FormikProps.touched.pembiayaan




                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
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
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Pembiayaan Perniagaan Sedia Ada</Text>
                            <ScrollView>


                                <View style={{ marginTop: 10, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                    <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pembiayaan')}>
                                                    <Text style={{ fontSize: 12 }}>{pembiayaan == 1 ? 'Ada' : pembiayaan == 2 ? 'Tiada' : 'Select invoiceType'}</Text>
                                                </TouchableOpacity>
                                                {pembiayaanTouched && pembiayaanError && <Text style={styles.error}>{pembiayaanError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                                <Picker style={{ flex: 1, height: 35 }} selectedValue={pembiayaan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pembiayaan', itemValue)}>
                                                    <Picker.Item label={'Pembiayaan'} value={undefined} />
                                                    <Picker.Item label="Ada" value={1} />
                                                    <Picker.Item label="Tiada" value={2} />
                                                </Picker>
                                                {pembiayaanTouched && pembiayaanError && <Text style={styles.error}>{pembiayaanError}</Text>}
                                            </View>}
                                    </View>
                                </View>

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

        </LayoutA>
    );
}



export default LoanBusinessDetailScreen