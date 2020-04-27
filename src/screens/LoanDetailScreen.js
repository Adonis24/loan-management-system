import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Picker,
    View, Platform


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
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

                    actions.resetForm({})
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanSectionH')

                }}
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

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Bayaran'} nopaddingTop={false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        {(modalContent === "kekerapan") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={kekerapan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('kekerapan', itemValue)}>
                                                <Picker.Item label={'Kekerapan Bayaran'} value={undefined} />
                                                <Picker.Item label="Mingguan" value="Mingguan" />
                                                <Picker.Item label="Bulanan" value="Bulanan" />
                                                <Picker.Item label="Mengikut Tempoh Projek" value="Mengikut Tempoh Projek" />

                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={caraBayaran} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('caraBayaran', itemValue)}>
                                                <Picker.Item label={'Cara Bayaran'} value={undefined} />
                                                <Picker.Item label="Online" value="Online" />
                                                <Picker.Item label="Cek Tarikh Tertunda" value="Cek Tarikh Tertunda" />
                                                <Picker.Item label="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" value="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" />

                                            </Picker>
                                        }
                                    </View>
                                </LayoutLoan>
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
                                keyboardType={'phone-pad'}
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
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
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
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('caraBayaran')}>
                                                <Text style={{ fontSize: 12 }}>{caraBayaran ? caraBayaran : `Cara Bayaran`}</Text>
                                            </TouchableOpacity>
                                            {caraBayaranTouched && caraBayaranError && <Text style={styles.error}>{caraBayaranError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={caraBayaran} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('caraBayaran', itemValue)}>
                                                <Picker.Item label={'Cara Bayaran'} value={undefined} />
                                                <Picker.Item label="Online" value="Online" />
                                                <Picker.Item label="Cek Tarikh Tertunda" value="Cek Tarikh Tertunda" />
                                                <Picker.Item label="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" value="Kaunter (Pos Malaysia,Bank,Pejabat Tekun)" />
                                            </Picker>
                                            {caraBayaranTouched && caraBayaranError && <Text style={styles.error}>{caraBayaranError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            {/* <View style={{ marginTop: 10 }}>
                                <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', fontSize: 9, marginBottom: 5 }]}>*Pembiayaan RM 15,000 dan ke atas wajib membuat bayaran balik pembiayaan dengan Cek Tarikh Tertunda (Post-Dated-Cheque) sepanjang tempoh pembiayaan </Text>
                                <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', fontSize: 9 }]}>*Sila rujuk kaedah bayaran balik pembiayaan TEKUN secara terus oleh penerima biaya melalui Portal TEKUN (www.tekun.gov.my) </Text>
                            </View> */}
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