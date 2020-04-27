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
    const { bank, noAkaun, } = useSelector(state => state.financingReducer, shallowEqual)
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
                    const { bank, noAkaun,  } = FormikProps.values


                    const bankError = FormikProps.errors.bank
                    const bankTouched = FormikProps.touched.bank
                    const noAkaunError = FormikProps.errors.noAkaun
                    const noAkaunTouched = FormikProps.touched.noAkaun




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Bank'} nopaddingTop={!ios?true:false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        {(modalContent === "bank") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={bank} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('bank', itemValue)}>
                                                <Picker.Item label={'Please Select'} value={undefined} />
                                                <Picker.Item label="Bank Islam" value="Bank Islam" />
                                                <Picker.Item label="Maybank" value="Maybank" />
                                                <Picker.Item label="Bank Rakyat" value="Bank Rakyat" />
                                                <Picker.Item label="BSN" value="bsn" />
                                                <Picker.Item label="Agrobank" value="Agrobank" />
                                            </Picker> : <View />}
                                    </View>
                                </LayoutLoan>
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
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Bank :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/city.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <TouchableOpacity onPress={() => handleIosPicker('bank')} style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <View style={{ justifyContent: 'center', margin: 5 }} >
                                                <Text style={{ fontSize: 12 }}>{bank ? bank : `Bank`}</Text>
                                            </View>
                                            {bankTouched && bankError && <Text style={styles.error}>{bankError}</Text>}
                                        </TouchableOpacity> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={bank} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('bank', itemValue)}>
                                                <Picker.Item label={'Bank'} value={undefined} />
                                                <Picker.Item label="Bank Islam" value="Bank Islam" />
                                                <Picker.Item label="Maybank" value="Maybank" />
                                                <Picker.Item label="Bank Rakyat" value="Bank Rakyat" />
                                                <Picker.Item label="BSN" value="bsn" />
                                                <Picker.Item label="Agrobank" value="Agrobank" />

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