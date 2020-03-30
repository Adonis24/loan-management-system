//console.ignoredYellowBox = ['Setting a timer']
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

import LayoutA from '../Layout/LayoutA';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({

    alamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    phoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    email: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Emel'),

    poskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanContactAddressInfoScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { alamat, alamat_2, phoneNum, email, poskod, } = useSelector(state => state.financingReducer, shallowEqual)
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
                initialValues={{ alamat, alamat_2, phoneNum, email, poskod }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanPendapatan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { alamat, alamat_2, email, phoneNum, poskod } = FormikProps.values

                    const alamatError = FormikProps.errors.alamat
                    const alamatTouched = FormikProps.touched.alamat

                    const alamat_2Error = FormikProps.errors.alamat_2
                    const alamat_2Touched = FormikProps.touched.alamat_2

                    const emailError = FormikProps.errors.email
                    const emailTouched = FormikProps.touched.email

                    const phoneNumError = FormikProps.errors.phoneNum
                    const phoneNumTouched = FormikProps.touched.phoneNum

                    const poskodError = FormikProps.errors.poskod
                    const poskodTouched = FormikProps.touched.poskod


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                             {/* <Modal animationType={'slide'}
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
                            </Modal> */}
                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT ADDRESS</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat}
                                handleChange={FormikProps.handleChange(`alamat`)}
                                handleBlur={FormikProps.handleBlur(`alamat`)}
                                touched={alamatTouched}
                                error={alamatError}
                                placeholder={'Alamat Line 1'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat_2}
                                handleChange={FormikProps.handleChange(`alamat_2`)}
                                handleBlur={FormikProps.handleBlur(`alamat_2`)}
                                touched={alamat_2Touched}
                                error={alamat_2Error}
                                placeholder={'Alamat Line 2'}

                            /> 
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={poskod}
                                handleChange={FormikProps.handleChange(`poskod`)}
                                handleBlur={FormikProps.handleBlur(`poskod`)}
                                touched={poskodTouched}
                                error={poskodError}
                                placeholder={'Poskod'}
                                keyboardType={'decimal-pad'}
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
                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={email}
                                handleChange={FormikProps.handleChange(`email`)}
                                handleBlur={FormikProps.handleBlur(`email`)}
                                touched={emailTouched}
                                error={emailError}
                                placeholder={'Emel'}
                                keyboardType={'default'}
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


        </LayoutA>
    );
}



export default LoanContactAddressInfoScreen