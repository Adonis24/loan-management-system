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

    agama: Yup
        .string()
        .required(),

    jantina: Yup
        .string()
        .required(),

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

    bangsa: Yup
        .string()
        .required()
        .min(3)
        .label('Bangsa'),




});

const LoanMaklumatPeribadiScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)

    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { name, icNumber, agama, bangsa, jantina, umur, tarikhLahir } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })




    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    const getUmur = (icNumber) => {
        if (icNumber) {
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

            return { tarikhLahir: dob, umur }
            //const u

            //FormikProps.setFieldValue('umur',umur)


        }

    }



    return (
        <LayoutLoan navigation={props.navigation}>
            <Modal animationType={'slide'}
                visible={iosPickerVisible} onRequestClose={() => {
                    console.log(`test`)
                    setIosPickerVisible(!iosPickerVisible)
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
                        {(modalContent === "jantina") ?
                            <Picker style={{ flex: 1, height: 35 }} selectedValue={jantina} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('jantina', itemValue)}>
                                <Picker.Item label={'Jantina'} value={undefined} />
                                <Picker.Item label="Lelaki" value="lelaki" />
                                <Picker.Item label="Wanita" value="wanita" />

                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={agama} onValueChange={(itemValue, itemIndex) =>
                                FormikProps.setFieldValue('agama', itemValue)}>
                                <Picker.Item label={'Agama'} value={undefined} />
                                <Picker.Item label="Islam" value="islam" />
                                <Picker.Item label="Bukan Islam" value="bukanIslam" />

                            </Picker>
                        }
                    </View>
                </View>

            </Modal>

            <Formik
                validateOnMount
                initialValues={{ name, icNumber, agama, bangsa, jantina, tarikhLahir }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    const { icNumber } = values
                    const dobInfo = getUmur(icNumber)
                    console.log(`dob info ${JSON.stringify(dobInfo)}`)
                    setMaklumatPeribadi({ ...values, ...dobInfo })
                    props.navigation.navigate('LoanPersonalStatus')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {



                    const { name, icNumber, jantina, agama, bangsa, umur, tarikhLahir } = FormikProps.values

                    const bangsaError = FormikProps.errors.bangsa
                    const bangsaTouched = FormikProps.touched.bangsa

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const icNumberError = FormikProps.errors.icNumber
                    const icNumberTouched = FormikProps.touched.icNumber

                    const jantinaError = FormikProps.errors.jantina
                    const jantinaTouched = FormikProps.touched.jantina

                    const agamaError = FormikProps.errors.agama
                    const agamaTouched = FormikProps.touched.agama



                    //getUmur()


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
                                handleChange={FormikProps.handleChange(`icNumber`)}
                                handleBlur={FormikProps.handleBlur(`icNumber`)}
                                touched={icNumberTouched}
                                error={icNumberError}
                                placeholder={'MyKad No'}
                                keyboardType={'phone-pad'}
                            />
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Jantina :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('jantina')}>
                                                <Text style={{ fontSize: 12 }}>{jantina ? jantina : `Jantina`}</Text>
                                            </TouchableOpacity>
                                            {jantinaTouched && jantinaError && <Text style={styles.error}>{jantinaError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={jantina} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('jantina', itemValue)}>
                                                <Picker.Item label={'Jantina'} value={undefined} />
                                                <Picker.Item label="Lelaki" value="lelaki" />
                                                <Picker.Item label="Wanita" value="wanita" />

                                            </Picker>
                                            {jantinaTouched && jantinaError && <Text style={styles.error}>{jantinaError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Agama :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('agama')}>
                                                <Text style={{ fontSize: 12 }}>{agama ? agama : `Agama`}</Text>
                                            </TouchableOpacity>
                                            {agamaTouched && agamaError && <Text style={styles.error}>{agamaError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={agama} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('agama', itemValue)}>
                                                <Picker.Item label={'Agama'} value={undefined} />
                                                <Picker.Item label="Islam" value="islam" />
                                                <Picker.Item label="Bukan Islam" value="bukanIslam" />

                                            </Picker>
                                            {agamaTouched && agamaError && <Text style={styles.error}>{agamaError}</Text>}
                                        </View>}
                                </View>
                            </View>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={bangsa}
                                handleChange={FormikProps.handleChange(`bangsa`)}
                                handleBlur={FormikProps.handleBlur(`bangsa`)}
                                touched={bangsaTouched}
                                error={bangsaError}
                                placeholder={'Bangsa/Kaum'}

                            />


                            {/* <Text>Umur:{umur}</Text> */}


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