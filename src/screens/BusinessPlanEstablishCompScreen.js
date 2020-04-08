import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
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
import moment from 'moment'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    pemilikan: Yup
        .string()
        .required(),

    paidCap: Yup
        .string()
        .required()
        .min(3)
        .label('Modal Dibayar'),

    authCap: Yup
        .string()
        .required()
        .min(3)
        .label('Modal Dibenarkan'),

    compEstab: Yup
        .string()
        .required()
        .min(3)
        .label('Tarikh Penubuhan'),

    compOperation: Yup
        .string()
    
        .min(3)
        .label('Tarikh Mula'),

    businessType: Yup
        .string()
        .required()
        .min(3)
        .label('Jenis Perniagaan'),



});

const BusinessPlanEstablishCompScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [iosDatePickerShow, setIosDatePickerShow] = useState(false)
    const [iosDatePickerShow2, setIosDatePickerShow2] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false
    const ios2 = Platform.OS === "ios2" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { paidCap, authCap, pemilikan, compEstab, compOperation, businessType } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })


    //const { capacity, paidCapCP, authCap, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [date2, setDate2] = useState(new Date(1598051730000));
    const [mode2, setMode2] = useState('date2');
    const [show2, setShow2] = useState(false);

    // const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ paidCap, authCap, pemilikan, compEstab, compOperation, businessType }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    dispatch(actionCreator.saveBussPlanData())
                    props.navigation.navigate('BusinessPlanBank')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const onChange = (event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        console.log(`selected date ialah ${currentDate}`)

                        setShow(ios);
                        setDate(currentDate);
                        FormikProps.setFieldValue('compEstab', currentDate)
                    };

                    const showMode = currentMode => {
                        setShow(true);
                        setMode(currentMode);
                    };

                    const showDatepicker = () => {
                        showMode('date');
                    };


                    const onChange2 = (event, selectedDate2) => {
                        const currentDate2 = selectedDate2 || date2;
                        console.log(`selected date ialah ${currentDate2}`)

                        setShow2(ios2);
                        setDate2(currentDate2);
                        FormikProps.setFieldValue('compEstab', currentDate2)
                    };

                    const showMode2 = currentMode2 => {
                        setShow2(true);
                        setMode2(currentMode2);
                    };

                    const showDatepicker2 = () => {
                        showMode2('date2');
                    };




                    const { paidCap, authCap, pemilikan, compEstab, compOperation, businessType } = FormikProps.values

                    const compEstabError = FormikProps.errors.compEstab
                    const compEstabTouched = FormikProps.touched.compEstab

                    const paidCapError = FormikProps.errors.paidCap
                    const paidCapTouched = FormikProps.touched.paidCap

                    const authCapError = FormikProps.errors.authCap
                    const authCapTouched = FormikProps.touched.authCap

                    const compOperationError = FormikProps.errors.compOperation
                    const compOperationTouched = FormikProps.touched.compOperation

                    const pemilikanError = FormikProps.errors.pemilikan
                    const pemilikanTouched = FormikProps.touched.pemilikan

                    const businessTypeError = FormikProps.errors.businessType
                    const businessTypeTouched = FormikProps.touched.businessType


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={iosPickerVisible && show && show2} onRequestClose={() => {
                                    console.log(`test`)
                                    setIosDatePickerShow(!iosDatePickerShow)
                                    setIosDatePickerShow2(!iosDatePickerShow2)
                                }}>

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
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={pemilikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemilikan', itemValue)}>
                                            <Picker.Item label={'Jenis Pemilikan'} value={undefined} />
                                            <Picker.Item label="Tunggal" value="tunggal" />
                                            <Picker.Item label="Perkongsian" value="perkongsian" />
                                            <Picker.Item label="Sdn Bhd" value="sdnbhd" />


                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                            <TouchableOpacity onPress={() => setShow(!ios)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                                <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.title, { color: '#055E7C' }]}>Select Date</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 9, justifyContent: 'flex-start' }}>

                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            //timeZoneOffsetInMinutes={0}
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                                            <TouchableOpacity onPress={() => setShow2(!ios2)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                                <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[styles.title, { color: '#055E7C' }]}>Select Date</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 9, justifyContent: 'flex-start' }}>

                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            //timeZoneOffsetInMinutes={0}
                                            value={date2}
                                            mode={mode2}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange2}
                                        />
                                    </View>
                                </View>
                            </Modal>

                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.formTitle]}>Section A</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>
                            

                                <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Tarikh Penubuhan Syarikat :</Text>
                                <TouchableOpacity onPress={() => showDatepicker()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 5, borderColor: compEstabTouched && compEstabError ? '#d94498' : '#5a83c2' }}>
                                    <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />

                                    <TextInput editable={false} value={moment(compEstab).format("MMMM Do YYYY")} onChangeText={FormikProps.handleChange(`compEstab`)} onBlur={FormikProps.handleBlur(`compEstab`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Date'} placeholderTextColor={compEstabTouched && compEstabError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                </TouchableOpacity>
                                <View style={{ width: Layout.window.width * 0.65 }}>
                                    {compEstabTouched && compEstabError && <Text style={styles.error}>{compEstabError}</Text>}
                                </View>

                                <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Tarikh Mula Operasi :</Text>
                                <TouchableOpacity onPress={() => showDatepicker2()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 5, borderColor: compOperationTouched && compOperationError ? '#d94498' : '#5a83c2' }}>
                                    <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />

                                    <TextInput editable={false} value={moment(compOperation).format("MMMM Do YYYY")} onChangeText={FormikProps.handleChange(`compOperation`)} onBlur={FormikProps.handleBlur(`compOperation`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Operation'} placeholderTextColor={compOperationTouched && compOperationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                </TouchableOpacity>
                                <View style={{ width: Layout.window.width * 0.65 }}>
                                    {compOperationTouched && compOperationError && <Text style={styles.error}>{compOperationError}</Text>}
                                </View>

                                <CustomTextInput
                                    imageUri={require('../assets/images/user.png')}
                                    value={paidCap}
                                    handleChange={FormikProps.handleChange(`paidCap`)}
                                    handleBlur={FormikProps.handleBlur(`paidCap`)}
                                    touched={paidCapTouched}
                                    error={paidCapError}
                                    placeholder={'Modal Dibayar'}
                                    keyboardType={'phone-pad'}

                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/mykad.png')}
                                    value={authCap}
                                    handleChange={FormikProps.handleChange(`authCap`)}
                                    handleBlur={FormikProps.handleBlur(`authCap`)}
                                    touched={authCapTouched}
                                    error={authCapError}
                                    placeholder={'Modal Dibenarkan'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/bizAct.png')}
                                    value={businessType}
                                    handleChange={FormikProps.handleChange(`businessType`)}
                                    handleBlur={FormikProps.handleBlur(`businessType`)}
                                    touched={businessTypeTouched}
                                    error={businessTypeError}
                                    placeholder={'Jenis Perniagaan'}

                                />
                                <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Jenis Pemilikan :</Text>

                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                    <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pemilikan')}>
                                                    <Text style={{ fontSize: 12 }}>{pemilikan ? pemilikan : `Jenis Pemilikan`}</Text>
                                                </TouchableOpacity>
                                                {pemilikanTouched && pemilikanError && <Text style={styles.error}>{pemilikanError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                                <Picker style={{ height: 35 }} selectedValue={pemilikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemilikan', itemValue)}>
                                                    <Picker.Item label={'Jenis Pemilikan'} value={undefined} />
                                                    <Picker.Item label="Tunggal" value="tunggal" />
                                                    <Picker.Item label="Perkongsian" value="perkongsian" />
                                                    <Picker.Item label="Sdn Bhd" value="sdnbhd" />

                                                </Picker>
                                                {pemilikanTouched && pemilikanError && <Text style={styles.error}>{pemilikanError}</Text>}
                                            </View>}
                                    </View>
                                </View>

                                {!ios && show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}

                                {!ios2 && show2 && (
                                    <DateTimePicker
                                        testID="dateTimePicker2"
                                        timeZoneOffsetInMinutes={0}
                                        value={date2}
                                        mode={mode2}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange2}
                                    />
                                )}

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




export default BusinessPlanEstablishCompScreen