//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    Modal,ScrollView

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { Formik } from 'formik';
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import moment from 'moment'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import LayoutA from '../Layout/LayoutA';
import LayoutLoan from '../Layout/LayoutLoan';

const validationSchema = Yup.object().shape({

    comp_name: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Company Name'),

    comp_regno: Yup
        .string()
        .required()
        .min(3)
        .label('Registration Number'),

    comp_regdate: Yup
        .date()
        .required()
        .min(3)
        .label('Registration Date'),

    comp_main_biz_act: Yup
        .string()
        .min(6)
        .required()
        .label('Business Activities'),
});

const CompanyInformationScreen = (props) => {

    const ios = Platform.OS === "ios" ? true : false
    const dispatch = useDispatch()

    const companyInformation = (values) => {
        const reg_date = moment(values.comp_regdate).format("YYYY-MM-DD HH:mm:ss")
        //const reg_date ='2020-03-09 02:05:38'
        const newValues = { ...values, reg_date }
        console.log(`new values ialah : ${JSON.stringify(newValues)}`)
        dispatch({ type: 'SET_COMPANY_INFO', payload: { ...newValues } })

        props.navigation.navigate('AddCompanyContact')
    }
    // useEffect(() => {
    //     const open = () => setshowLogo(false)
    //     const off = () => setshowLogo(true)

    //     keyboardBeingDisplay(open)
    //     keyboardBeingClose(off)
    // }, []); // empty-array means don't watch for any updates

    //const [showLogo, setshowLogo] = useState(true)


    const [iosDatePickerShow, setIosDatePickerShow] = useState(false)
    const [chosenDate, setChosenDate] = useState(new Date())
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    //proceed && props.navigation.navigate('CompanyContactInformation')

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    return (
        <LayoutLoan title='Company Info'>
            <Formik
                validateOnMount
                initialValues={{ comp_name: undefined, comp_regno: undefined, comp_main_biz_act: undefined, }}
                onSubmit={(values, actions) => {

                    companyInformation(values)
                    actions.setSubmitting(false)
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const onChange = (event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        console.log(`selected date ialah ${currentDate}`)

                        setShow(ios);
                        setDate(currentDate);
                        FormikProps.setFieldValue('comp_regdate', currentDate)
                    };

                    const showMode = currentMode => {
                        setShow(true);
                        setMode(currentMode);
                    };

                    const showDatepicker = () => {
                        showMode('date');
                    };



                    const { comp_name, comp_regno, comp_main_biz_act, comp_regdate } = FormikProps.values

                    const comp_nameError = FormikProps.errors.comp_name
                    const comp_nameTouched = FormikProps.touched.comp_name

                    const comp_regnoError = FormikProps.errors.comp_regno
                    const comp_regnoTouched = FormikProps.touched.comp_regno

                    const comp_regdateError = FormikProps.errors.comp_regdate
                    const comp_regdateTouched = FormikProps.touched.comp_regdate

                    const comp_main_biz_actError = FormikProps.errors.comp_main_biz_act
                    const comp_main_biz_actTouched = FormikProps.touched.comp_main_biz_act



                    return (
                        <><Modal
                            animationType="slide"
                            transparent={false}
                            visible={ios && show}
                            onRequestClose={() => {
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
                            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                                <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFORMATION</Text>
                                <Text style={[styles.textDefault, {  marginBottom: 20, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>

                                <CustomTextInput
                                    imageUri={require('../assets/images/company.png')}
                                    value={comp_name}
                                    handleChange={FormikProps.handleChange(`comp_name`)}
                                    handleBlur={FormikProps.handleBlur(`comp_name`)}
                                    touched={comp_nameTouched}
                                    error={comp_nameError}
                                    placeholder={'Company Name'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={comp_regno}
                                    handleChange={FormikProps.handleChange(`comp_regno`)}
                                    handleBlur={FormikProps.handleBlur(`comp_regno`)}
                                    touched={comp_regnoTouched}
                                    error={comp_regnoError}
                                    placeholder={'Company Registration Number'}
                                    keyboardType={'default'}
                                />

                                <TouchableOpacity onPress={() => showDatepicker()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5,  borderColor: comp_regdateTouched && comp_regdateError ? '#d94498' : '#5a83c2',marginBottom:20 }}>
                                    <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />

                                    <TextInput editable={false} value={comp_regdate?moment(comp_regdate).format("MMMM Do YYYY"):null} onChangeText={FormikProps.handleChange(`comp_regdate`)} onBlur={FormikProps.handleBlur(`comp_regdate`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Date'} placeholderTextColor={comp_regdateTouched && comp_regdateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                </TouchableOpacity>

                                <View style={{ width: Layout.window.width * 0.65 }}>
                                    {comp_regdateTouched && comp_regdateError && <Text style={styles.error}>{comp_regdateError}</Text>}
                                </View>
                                <CustomTextInput
                                    imageUri={require('../assets/images/password.png')}
                                    value={comp_main_biz_act}
                                    handleChange={FormikProps.handleChange(`comp_main_biz_act`)}
                                    handleBlur={FormikProps.handleBlur(`comp_main_biz_act`)}
                                    touched={comp_main_biz_actTouched}
                                    error={comp_main_biz_actError}
                                    placeholder={'Business Activities'}
                                />

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
                                {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                            </ScrollView>
                        </>
                    )
                }}
            </Formik >
        </LayoutLoan>
    );
}



export default CompanyInformationScreen