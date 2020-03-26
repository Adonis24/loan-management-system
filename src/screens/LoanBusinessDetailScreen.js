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
    institusi: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Institusi'),

    totalLoan: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Jumlah Pembiayaan'),
    loanBal: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Baki Pembiayaan'),


});

const LoanBusinessDetailScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false
    const [loan, setLoan] = useState(null)

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { institusi, totalLoan, pembiayaan,loanBal } = useSelector(state => state.financingReducer, shallowEqual)
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


    return (
        <LayoutA>
            <Formik
                initialValues={{ institusi, totalLoan, pembiayaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setPembiayaan(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanMaklumatPeribadi')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { institusi, totalLoan, pembiayaan,loanBal } = FormikProps.values


                    const institusiError = FormikProps.errors.institusi
                    const institusiTouched = FormikProps.touched.institusi
                    const totalLoanError = FormikProps.errors.totalLoan
                    const totalLoanTouched = FormikProps.touched.totalLoan
                    const loanBalError = FormikProps.errors.loanBal
                    const loanBalTouched = FormikProps.touched.loanBal
                    const pembiayaanError = FormikProps.errors.pembiayaan
                    const pembiayaanTouched = FormikProps.touched.pembiayaan

                    const changeLoan = (itemValue, itemIndex) => {
                        FormikProps.setFieldValue('pembiayaan', itemValue)
                        setLoan(itemValue)
                    }



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
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={pembiayaan} onValueChange={(itemValue, itemIndex) => changeLoan(itemValue, itemIndex)}>
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
                                                <Picker style={{ flex: 1, height: 35 }} selectedValue={pembiayaan} onValueChange={(itemValue, itemIndex) => changeLoan(itemValue, itemIndex)}>
                                                    <Picker.Item label={'Pembiayaan'} value={undefined} />
                                                    <Picker.Item label="Ada" value={1} />
                                                    <Picker.Item label="Tiada" value={2} />
                                                </Picker>
                                                {pembiayaanTouched && pembiayaanError && <Text style={styles.error}>{pembiayaanError}</Text>}
                                            </View>}
                                    </View>
                                </View>
                                {loan && pembiayaan == 1 &&
                                    <View>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/city.png')}
                                            value={institusi}
                                            handleChange={FormikProps.handleChange(`institusi`)}
                                            handleBlur={FormikProps.handleBlur(`institusi`)}
                                            touched={institusiTouched}
                                            error={institusiError}
                                            placeholder={'Institusi Pembiayaan'}
                                            keyboardType={'default'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/state.png')}
                                            value={totalLoan}
                                            handleChange={FormikProps.handleChange(`totalLoan`)}
                                            handleBlur={FormikProps.handleBlur(`totalLoan`)}
                                            touched={totalLoanTouched}
                                            error={totalLoanError}
                                            placeholder={'Jumlah Pembiayaan'}
                                            keyboardType={'phone-pad'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/state.png')}
                                            value={loanBal}
                                            handleChange={FormikProps.handleChange(`loanBal`)}
                                            handleBlur={FormikProps.handleBlur(`loanBal`)}
                                            touched={loanBalTouched}
                                            error={loanBalError}
                                            placeholder={'Baki Pembiayaan'}
                                            keyboardType={'phone-pad'}
                                        />
                                    </View>}
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


        </LayoutA>
    );
}



export default LoanBusinessDetailScreen