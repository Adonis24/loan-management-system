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

const LoanBusinessDetail2Screen = (props) => {

   
    
    

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
                initialValues={{ institusi, totalLoan,loanBal }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setPembiayaan(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanDetail')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { institusi, totalLoan,loanBal } = FormikProps.values


                    const institusiError = FormikProps.errors.institusi
                    const institusiTouched = FormikProps.touched.institusi
                    const totalLoanError = FormikProps.errors.totalLoan
                    const totalLoanTouched = FormikProps.touched.totalLoan
                    const loanBalError = FormikProps.errors.loanBal
                    const loanBalTouched = FormikProps.touched.loanBal
                   


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Pembiayaan Perniagaan Sedia Ada</Text>
                         
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



export default LoanBusinessDetail2Screen