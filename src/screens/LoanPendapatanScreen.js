import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    Picker,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView

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


const validationSchema = Yup.object().shape({

    alamatComp: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    phoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    pendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),

    pekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),
    status: Yup
        .string()
        .required(),


});

const LoanPendapatanScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { alamatComp,phoneNum, pendapatan, pekerjaan, status } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })

    // useEffect(() => {
    //     const open = () => setshowLogo(false)
    //     const off = () => setshowLogo(true)

    //     keyboardBeingDisplay(open)
    //     keyboardBeingClose(off)
    // }, []); // empty-array means don't watch for any updates

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    // const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()


    return (
        <LayoutA>
            <Formik
                initialValues={{ alamatComp, pendapatan, pekerjaan, status }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanSectionC')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { alamatComp,pendapatan, phoneNum, pekerjaan, status } = FormikProps.values

                    const alamatCompError = FormikProps.errors.alamatComp
                    const alamatCompTouched = FormikProps.touched.alamatComp

                    const statusError = FormikProps.errors.status
                    const statusTouched = FormikProps.touched.status

                    const pendapatanError = FormikProps.errors.pendapatan
                    const pendapatanTouched = FormikProps.touched.pendapatan

                    const phoneNumError = FormikProps.errors.phoneNum
                    const phoneNumTouched = FormikProps.touched.phoneNum

                    const pekerjaanError = FormikProps.errors.pekerjaan
                    const pekerjaanTouched = FormikProps.touched.pekerjaan


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
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

                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={status} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('status', itemValue)}>
                                            <Picker.Item label={'Status Kediaman'} value={undefined} />
                                            <Picker.Item label="Sendiri" value="sendiri" />
                                            <Picker.Item label="Sewa" value="sewa" />
                                            <Picker.Item label="Keluarga" value="keluarga" />

                                        </Picker>

                                    </View>
                                </View>
                            </Modal>
                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5,color:'black' }]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Peribadi</Text>

                            <View style={{marginTop:20, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('status')}>
                                                <Text style={{ fontSize: 12 }}>{status ? status : `Status Kediaman`}</Text>
                                            </TouchableOpacity>
                                            {statusTouched && statusError && <Text style={styles.error}>{statusError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={status} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('status', itemValue)}>
                                                <Picker.Item label={'Status Kediaman'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                                <Picker.Item label="Keluarga" value="keluarga" />
                                            </Picker>
                                            {statusTouched && statusError && <Text style={styles.error}>{statusError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pekerjaan}
                                handleChange={FormikProps.handleChange(`pekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`pekerjaan`)}
                                touched={pekerjaanTouched}
                                error={pekerjaanError}
                                placeholder={'Pekerjaan Sekarang'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={pendapatan}
                                handleChange={FormikProps.handleChange(`pendapatan`)}
                                handleBlur={FormikProps.handleBlur(`pendapatan`)}
                                touched={pendapatanTouched}
                                error={pendapatanError}
                                placeholder={'Pendapatan'}
                                keyboardType={'decimal-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamatComp}
                                handleChange={FormikProps.handleChange(`alamatComp`)}
                                handleBlur={FormikProps.handleBlur(`alamatComp`)}
                                touched={alamatCompTouched}
                                error={alamatCompError}
                                placeholder={'Alamat Syarikat'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phoneNum}
                                handleChange={FormikProps.handleChange(`phoneNum`)}
                                handleBlur={FormikProps.handleBlur(`phoneNum`)}
                                touched={phoneNumTouched}
                                error={phoneNumError}
                                placeholder={'No Tel'}
                                keyboardType={'decimal-pad'}
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

            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutA>
    );
}



export default LoanPendapatanScreen