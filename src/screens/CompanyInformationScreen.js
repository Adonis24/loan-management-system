//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,    
    KeyboardAvoidingView,
    Modal,

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import moment from 'moment'



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

        props.navigation.navigate('CompanyContactInformation')
    }

    const [iosDatePickerShow, setIosDatePickerShow] = useState(false)
    const [chosenDate, setChosenDate] = useState(new Date())


    //proceed && props.navigation.navigate('CompanyContactInformation')

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

                                    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
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
                                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFORMATION</Text>
                                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_nameTouched && comp_nameError ? '#d94498' : '#5a83c2' }}>
                                            <Image source={require('../assets/images/company.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                            <TextInput value={comp_name} onChangeText={FormikProps.handleChange(`comp_name`)} onBlur={FormikProps.handleBlur(`comp_name`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Name'} placeholderTextColor={comp_nameTouched && comp_nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        </View>
                                        <View style={{ width: Layout.window.width * 0.65 }}>
                                            {comp_nameTouched && comp_nameError && <Text style={styles.error}>{comp_nameError}</Text>}
                                        </View>
                                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_regnoTouched && comp_regnoError ? '#d94498' : '#5a83c2' }}>
                                            <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                            <TextInput value={comp_regno} onChangeText={FormikProps.handleChange(`comp_regno`)} onBlur={FormikProps.handleBlur(`comp_regno`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Number'} placeholderTextColor={comp_regnoTouched && comp_regnoError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                        </View>
                                        <View style={{ width: Layout.window.width * 0.65 }}>
                                            {comp_regnoTouched && comp_regnoError && <Text style={styles.error}>{comp_regnoError}</Text>}
                                        </View>
                                        <TouchableOpacity onPress={() => showDatepicker()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_regdateTouched && comp_regdateError ? '#d94498' : '#5a83c2' }}>
                                            <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />

                                            <TextInput editable={false} value={moment(comp_regdate).format("MMMM Do YYYY")} onChangeText={FormikProps.handleChange(`comp_regdate`)} onBlur={FormikProps.handleBlur(`comp_regdate`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Company Registration Date'} placeholderTextColor={comp_regdateTouched && comp_regdateError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                        </TouchableOpacity>
                                        <View style={{ width: Layout.window.width * 0.65 }}>
                                            {comp_regdateTouched && comp_regdateError && <Text style={styles.error}>{comp_regdateError}</Text>}
                                        </View>
                                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: comp_main_biz_actError && comp_main_biz_actTouched ? '#d94498' : '#5a83c2' }}>
                                            <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                            <TextInput value={comp_main_biz_act} onChangeText={FormikProps.handleChange(`comp_main_biz_act`)} onBlur={FormikProps.handleBlur(`comp_main_biz_act`)} style={{ marginLeft: 5 }} placeholder={'Business Activities'} placeholderTextColor={comp_main_biz_actTouched && comp_main_biz_actError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        </View>
                                        <View style={{ width: Layout.window.width * 0.65 }}>
                                            {comp_main_biz_actTouched && comp_main_biz_actError && <Text style={styles.error}>{comp_main_biz_actError}</Text>}
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
                                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                            <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                                <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box,{backgroundColor: '#5A647F' }]} >
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                                    </View>
                                </>
                            )
                        }}
                    </Formik >
                    
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}



export default CompanyInformationScreen