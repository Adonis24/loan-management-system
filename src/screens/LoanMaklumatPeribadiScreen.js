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

  

    name: Yup
        .string()
        .required()
        .min(3)
        .label('Name'),

    icNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

});

const LoanMaklumatPeribadiScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)

    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { name, icNumber, umur, tarikhLahir } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })




    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }






    return (
        <LayoutLoan navigation={props.navigation}>
            

            <Formik
                validateOnMount
                initialValues={{ name, icNumber,  tarikhLahir }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    const { icNumber } = values
                    //const dobInfo = getUmur(icNumber)
                    //console.log(`dob info ${JSON.stringify(dobInfo)}`)
                    setMaklumatPeribadi({ ...values })
                    props.navigation.navigate('LoanMaklumatPeribadiB')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {



                    const { name, icNumber, umur, tarikhLahir } = FormikProps.values

    
                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const icNumberError = FormikProps.errors.icNumber
                    const icNumberTouched = FormikProps.touched.icNumber
                    



                    const getUmur = (icNumber) => {
                        FormikProps.setFieldValue('icNumber', icNumber.toString())
                        if (icNumber) {
                            if (icNumber.length > 5) {
                                console.log(icNumber)

                                const tl19 = `19${icNumber.slice(0, 2)}-${icNumber.slice(2, 4)}-${icNumber.slice(4, 6)}`
                                const tl20 = `20${icNumber.slice(0, 2)}-${icNumber.slice(2, 4)}-${icNumber.slice(4, 6)}`


                                let dob, umur

                                if (moment().diff(moment(tl19), 'years') < 70) {
                                    umur = moment().diff(moment(tl19), 'years')
                                    dob = moment(tl19).format('D MMMM, YYYY')
                                } else {
                                    umur = moment().diff(moment(tl20), 'years')
                                    dob = moment(tl20).format('D MMMM, YYYY')
                                }
                                console.log(`umur sebenar ialah ${umur}`)
                                console.log(`dob sebenar ialah ${dob}`)
                                FormikProps.setFieldValue('icNumber', icNumber.toString())
                                FormikProps.setFieldValue('umur', umur.toString())
                                FormikProps.setFieldValue('tarikhLahir', dob.toString())

                                //return { tarikhLahir: dob, umur }
                                //const u

                                //FormikProps.setFieldValue('umur',umur)


                            }
                        }


                    }


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>


                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={name}
                                handleChange={FormikProps.handleChange(`name`)}
                                handleBlur={FormikProps.handleBlur(`name`)}
                                touched={nameTouched}
                                error={nameError}
                                placeholder={'Nama'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={icNumber}
                                handleChange={(icNumber) => getUmur(icNumber)}
                                handleBlur={FormikProps.handleBlur(`icNumber`)}
                                touched={icNumberTouched}
                                error={icNumberError}
                                placeholder={'MyKad No'}
                                keyboardType={'phone-pad'}
                            />

                            {umur && <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={`${tarikhLahir} (${umur} tahun)`}
                                placeholder={'Tarikh Lahir'}
                                editable={false}

                            />}
                           


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




export default LoanMaklumatPeribadiScreen