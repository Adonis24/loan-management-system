import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    Picker,
    View,
    TextInput, Platform


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    pemilikan: Yup
        .string()
        .required(),



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

    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false



    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { pemilikan, compEstab, compOperation, businessType } = useSelector(state => state.businessPlanningReducer, shallowEqual)
    const {  reg_date,  } = useSelector(state => state.bizInfoReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [whichDate, setWhichDate] = useState(null);


    // const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ pemilikan, compEstab:compEstab?compEstab:reg_date, compOperation, businessType }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    dispatch(actionCreator.saveBussPlanData())
                    props.navigation.navigate('BusinessPlanEstablishCompB')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const onChange = (event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        //console.log(`val ialah ${val}`)
                        console.log(`selected date ialah ${currentDate}`)

                        setShow(!show);
                        setDate(currentDate);
                        FormikProps.setFieldValue(whichDate, currentDate)
                    };

                    const showMode = currentMode => {
                        setShow(true);
                        setMode(currentMode);
                    };

                    const showDatepicker = (val) => {
                        setWhichDate(val)
                        ios ? setIosDatePickerShow(!iosDatePickerShow) : showMode('date')
                    };

                    const { pemilikan, compEstab, compOperation, businessType } = FormikProps.values

                    const compEstabError = FormikProps.errors.compEstab
                    const compEstabTouched = FormikProps.touched.compEstab

                    const compOperationError = FormikProps.errors.compOperation
                    const compOperationTouched = FormikProps.touched.compOperation

                    const pemilikanError = FormikProps.errors.pemilikan
                    const pemilikanTouched = FormikProps.touched.pemilikan

                    const businessTypeError = FormikProps.errors.businessType
                    const businessTypeTouched = FormikProps.touched.businessType


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={iosDatePickerShow} onRequestClose={() => {
                                    console.log(`nothing happen`)

                                }}>

                                <LayoutLoan title={'Enter Date'} nopaddingTop={false} back={() => setIosDatePickerShow(!iosDatePickerShow)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
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
                                </LayoutLoan>
                            </Modal>
                            <Modal animationType={'slide'} visible={iosPickerVisible} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Bayaran'} nopaddingTop={false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        <Picker selectedValue={pemilikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemilikan', itemValue)}>
                                            <Picker.Item label={'Jenis Pemilikan'} value={undefined} />
                                            <Picker.Item label="Tunggal" value="Tunggal" />
                                            <Picker.Item label="Perkongsian" value="Perkongsian" />
                                            <Picker.Item label="Sdn Bhd" value="Sdn Bhd" />
                                        </Picker>
                                    </View>
                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section A</Text>
                            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

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
                                                <Picker.Item label="Tunggal" value="Tunggal" />
                                                <Picker.Item label="Perkongsian" value="Perkongsian" />
                                                <Picker.Item label="Sdn Bhd" value="Sdn Bhd" />

                                            </Picker>
                                            {pemilikanTouched && pemilikanError && <Text style={styles.error}>{pemilikanError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Tarikh Penubuhan Syarikat :</Text>
                            <TouchableOpacity onPress={() => showDatepicker('compEstab')} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 20, borderColor: compEstabTouched && compEstabError ? '#d94498' : '#5a83c2' }}>
                                <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput editable={false} value={compEstab ? moment(compEstab).format("MMMM Do YYYY") : null} onChangeText={FormikProps.handleChange(`compEstab`)} onBlur={FormikProps.handleBlur(`compEstab`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Date'} placeholderTextColor={compEstabTouched && compEstabError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                            </TouchableOpacity>
                            <View style={{ width: Layout.window.width * 0.65 }}>
                                {compEstabTouched && compEstabError && <Text style={styles.error}>{compEstabError}</Text>}
                            </View>

                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Tarikh Mula Operasi :</Text>
                            <TouchableOpacity onPress={() => showDatepicker('compOperation')} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 20, borderColor: compOperationTouched && compOperationError ? '#d94498' : '#5a83c2' }}>
                                <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput editable={false} value={compOperation ? moment(compOperation).format("MMMM Do YYYY") : null} onChangeText={FormikProps.handleChange(`compOperation`)} onBlur={FormikProps.handleBlur(`compOperation`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Operation'} placeholderTextColor={compOperationTouched && compOperationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                            </TouchableOpacity>
                            <View style={{ width: Layout.window.width * 0.65 }}>
                                {compOperationTouched && compOperationError && <Text style={styles.error}>{compOperationError}</Text>}
                            </View>



                            {!ios && show &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}

                                />
                            }

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