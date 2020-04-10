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

    caraBayaran: Yup
        .string()
        .required(),

    kekerapan: Yup
        .string()
        .required(),

    loanNeed: Yup
        .string()
        .required()
        .min(3)
        .label('Jumlah'),

    payBack: Yup
        .string()
        .required()
        
        .label('Tempoh Bayaran'),




});

const LoanDetailScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { loanNeed, caraBayaran, payBack, kekerapan } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPembiayaan = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>

            <Formik
                validateOnMount
                initialValues={{ loanNeed, caraBayaran, payBack, kekerapan }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPembiayaan(values)
                    dispatch(actionCreator.saveLoanData())
                    props.navigation.navigate('LoanSectionH')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { loanNeed, kekerapan, caraBayaran, payBack } = FormikProps.values

                    const payBackError = FormikProps.errors.payBack
                    const payBackTouched = FormikProps.touched.payBack


                    const loanNeedError = FormikProps.errors.loanNeed
                    const loanNeedTouched = FormikProps.touched.loanNeed

                    const kekerapanError = FormikProps.errors.kekerapan
                    const kekerapanTouched = FormikProps.touched.kekerapan

                    const caraBayaranError = FormikProps.errors.caraBayaran
                    const caraBayaranTouched = FormikProps.touched.caraBayaran


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
                                        {(modalContent === "kekerapan") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={kekerapan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('kekerapan', itemValue)}>
                                                <Picker.Item label={'Kekerapan Bayaran'} value={undefined} />
                                                <Picker.Item label="Mingguan" value="mingguan" />
                                                <Picker.Item label="Bulanan" value="bulanan" />
                                                <Picker.Item label="Mengikut Tempoh Projek" value="projek" />

                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={caraBayaran} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('caraBayaran', itemValue)}>
                                                <Picker.Item label={'Cara Bayaran'} value={undefined} />
                                                <Picker.Item label="Online" value="online" />
                                                <Picker.Item label="Cek Tarikh Tertunda" value="cekTarikh" />
                                                <Picker.Item label="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" value="kaunter" />

                                            </Picker>
                                        }
                                    </View>
                                </View>
                            </Modal>

                            
                            <Text style={[styles.formTitle]}>Section G</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Pembiayaan</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/loanAmount.png')}
                                value={loanNeed}
                                handleChange={FormikProps.handleChange(`loanNeed`)}
                                handleBlur={FormikProps.handleBlur(`loanNeed`)}
                                touched={loanNeedTouched}
                                error={loanNeedError}
                                placeholder={'Jumlah Pembiayaan Diperlukan'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/estimateTime.png')}
                                value={payBack}
                                handleChange={FormikProps.handleChange(`payBack`)}
                                handleBlur={FormikProps.handleBlur(`payBack`)}
                                touched={payBackTouched}
                                error={payBackError}
                                placeholder={'Tempoh Bayaran Balik(bulan)'}
                                keyboardType={'phone-pad'}
                            />

                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Kekerapan Bayaran :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/payment.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('kekerapan')}>
                                                <Text style={{ fontSize: 12 }}>{kekerapan ? kekerapan : `Kekerapan Bayaran`}</Text>
                                            </TouchableOpacity>
                                            {kekerapanTouched && kekerapanError && <Text style={styles.error}>{kekerapanError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={kekerapan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('kekerapan', itemValue)}>
                                                <Picker.Item label={'Kekerapan Bayaran'} value={undefined} />
                                                <Picker.Item label="Mingguan" value="mingguan" />
                                                <Picker.Item label="Bulanan" value="bulanan" />
                                                <Picker.Item label="Mengikut Tempoh Projek" value="projek" />
                                            </Picker>
                                            {kekerapanTouched && kekerapanError && <Text style={styles.error}>{kekerapanError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Cara Bayaran :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1}}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('caraBayaran')}>
                                                <Text style={{ fontSize: 12 }}>{caraBayaran ? caraBayaran : `Cara Bayaran`}</Text>
                                            </TouchableOpacity>
                                            {caraBayaranTouched && caraBayaranError && <Text style={styles.error}>{caraBayaranError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={caraBayaran} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('caraBayaran', itemValue)}>
                                                <Picker.Item label={'Cara Bayaran'} value={undefined} />
                                                <Picker.Item label="Online" value="online" />
                                                <Picker.Item label="Cek Tarikh Tertunda" value="cekTarikh" />
                                                <Picker.Item label="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" value="kaunter" />
                                            </Picker>
                                            {caraBayaranTouched && caraBayaranError && <Text style={styles.error}>{caraBayaranError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <View style={{  marginTop: 10 }}>
                                <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', fontSize: 9, marginBottom: 5 }]}>*Pembiayaan RM 15,000 dan ke atas wajib membuat bayaran balik pembiayaan dengan Cek Tarikh Tertunda (Post-Dated-Cheque) sepanjang tempoh pembiayaan </Text>
                                <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', fontSize: 9 }]}>*Sila rujuk kaedah bayaran balik pembiayaan TEKUN secara terus oleh penerima biaya melalui Portal TEKUN (www.tekun.gov.my) </Text>
                            </View>
                            <CustomFormAction
                                label={`Save`}
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




export default LoanDetailScreen