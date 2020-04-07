import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import LayoutLoan from '../Layout/LayoutLoan';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'

const validationSchema = Yup.object().shape({

    namaPemohon: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Pemohon'),

    akuan: Yup
        .bool()
        .oneOf([true], 'Field must be checked')
        .required()
        .label('Pengundi'),

    cerTarikh: Yup
        .string()
        .required()
        .min(3)
        .label('Tarikh'),




});

const BusinessPlanCertScreen = (props) => {

    const [iosDatePickerShow, setIosDatePickerShow] = useState(false)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()


    const { namaPemohon, cerTarikh } = useSelector(state => state.businessPlanningReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);



    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ namaPemohon, akuan: false, cerTarikh }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('Dashboard')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const onChange = (event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        console.log(`selected date ialah ${currentDate}`)

                        setShow(ios);
                        setDate(currentDate);
                        FormikProps.setFieldValue('cerTarikh', currentDate)
                    };

                    const showMode = currentMode => {
                        setShow(true);
                        setMode(currentMode);
                    };

                    const showDatepicker = () => {
                        showMode('date');
                    };


                    const { namaPemohon, akuan, cerTarikh } = FormikProps.values
                    const namaPemohonError = FormikProps.errors.namaPemohon
                    const namaPemohonTouched = FormikProps.touched.namaPemohon

                    const cerTarikhError = FormikProps.errors.cerTarikh
                    const cerTarikhTouched = FormikProps.touched.cerTarikh


                    const handleCheckBox = () => { console.log(`apa ni ${akuan}`); FormikProps.setFieldValue('akuan', !akuan) }

                    return (
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={ios && show} onRequestClose={() => {
                                    console.log(`test`)
                                    setIosDatePickerShow(!iosDatePickerShow)

                                }}>
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
                            </Modal>
                            <Text style={[styles.formTitle]}>Section H</Text>
                            <Text style={[styles.formSubtitle]}>Akuan Pemohon</Text>


                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start',marginLeft:15 }]}>Perakuan Pemohon</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:15 }}>
                                {(Platform.OS == 'ios') ?

                                    <CheckBox2 onClick={() => handleCheckBox()} isChecked={akuan} />
                                    :
                                    <CheckBox onValueChange={handleCheckBox} value={akuan} />
                                }
                                <Text style={[styles.caption, { textAlign: 'left', marginLeft: 10,margin:5, fontSize: 10.5 }]}>
                                    Saya mengaku bahawa maklumat yang dikemukakan ini adalah benar. Saya akan mematuhi syarat-syarat pembiayaan yang ditetapkan
                                    dan bersedia untuk menandatangani Dokumen Perjanjian Pembiayaan TEKUN Nasional sekiranya permohonan pembiayaan saya diluluskan.
                                 </Text>
                            </View>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={namaPemohon}
                                handleChange={FormikProps.handleChange(`namaPemohon`)}
                                handleBlur={FormikProps.handleBlur(`namaPemohon`)}
                                touched={namaPemohonTouched}
                                error={namaPemohonError}
                                placeholder={'Nama Pemohon'}
                                keyboardType={'default'}
                            />
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start',marginLeft:15 }]}>Tarikh :</Text>
                            <TouchableOpacity onPress={() => showDatepicker()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 5, borderColor: cerTarikhTouched && cerTarikhError ? '#d94498' : '#5a83c2' }}>
                                <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />

                                <TextInput editable={false} value={moment(cerTarikh).format("MMMM Do YYYY")} onChangeText={FormikProps.handleChange(`cerTarikh`)} onBlur={FormikProps.handleBlur(`cerTarikh`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Date'} placeholderTextColor={cerTarikhTouched && cerTarikhError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                            </TouchableOpacity>
                            <View style={{ width: Layout.window.width * 0.65 }}>
                                {cerTarikhTouched && cerTarikhError && <Text style={styles.error}>{cerTarikhError}</Text>}
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

                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />

                        </View>
                    )
                }}
            </Formik >
        </LayoutLoan>
    );
}



export default BusinessPlanCertScreen