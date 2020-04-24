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
    totalLoan: Yup
        .number()
        .when("pembiayaan", {
            is: "Ada",
            then: Yup.number().required("Must enter total loan")
        }),
    loanBal: Yup
        .number()
        .when("pembiayaan", {
            is: "Ada",
            then: Yup.number().required("Must enter balance")
        }),
    institusi: Yup
        .string()
        .when("pembiayaan", {
            is: "Ada",
            then: Yup.string().required("Must enter institusi pembiayaan")
        }),

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


    const setPembiayaan = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })



    //proceedContact && props.navigation.goBack()

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ pembiayaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik pembiaayaan ialah ${JSON.stringify(values)}`)

                    setPembiayaan(values)
                    dispatch(actionCreator.saveLoanData())
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanDetail')

                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { pembiayaan } = FormikProps.values


                    const pembiayaanError = FormikProps.errors.pembiayaan
                    const pembiayaanTouched = FormikProps.touched.pembiayaan

                    const institusiError = FormikProps.errors.institusi
                    const institusiTouched = FormikProps.touched.institusi
                    const totalLoanError = FormikProps.errors.totalLoan
                    const totalLoanTouched = FormikProps.touched.totalLoan
                    const loanBalError = FormikProps.errors.loanBal
                    const loanBalTouched = FormikProps.touched.loanBal

                    const handleCheckBoxAda = () => { FormikProps.setFieldValue('pembiayaan', 'Ada') }
                    const handleCheckBoxTiada = () => { FormikProps.setFieldValue('pembiayaan', 'Tiada') }


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>


                            <Text style={[styles.formTitle]}>Section F</Text>
                            <Text style={[styles.formSubtitle]}>Pembiayaan Perniagaan Sedia Ada</Text>
                            <View style={{ margin: 10 }} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Pembiayaan Sedia Ada :</Text>
                                </View>
                            </View>

                            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                                <CheckBox2 onClick={() => handleCheckBoxAda()} isChecked={pembiayaan === 'Ada' ? true : false} />

                                <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                    Ya
                                </Text>
                            </View>
                            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                                <CheckBox2 onClick={() => handleCheckBoxTiada()} isChecked={pembiayaan === 'Tiada' ? true : false} />

                                <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                    Tidak
                                </Text>
                            </View>
                            {pembiayaan === 'Ada' && <>
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
                                    imageUri={require('../assets/images/loanAmount.png')}
                                    value={totalLoan}
                                    handleChange={FormikProps.handleChange(`totalLoan`)}
                                    handleBlur={FormikProps.handleBlur(`totalLoan`)}
                                    touched={totalLoanTouched}
                                    error={totalLoanError}
                                    placeholder={'Jumlah Pembiayaan'}
                                    keyboardType={'decimal-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={loanBal}
                                    handleChange={FormikProps.handleChange(`loanBal`)}
                                    handleBlur={FormikProps.handleBlur(`loanBal`)}
                                    touched={loanBalTouched}
                                    error={loanBalError}
                                    placeholder={'Baki Pembiayaan'}
                                    keyboardType={'decimal-pad'}
                                />
                            </>}

                            <CustomFormAction
                                label={'Submit'}
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