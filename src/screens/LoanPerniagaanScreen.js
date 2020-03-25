import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Picker,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

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
import CheckBox2 from 'react-native-check-box'


const validationSchema = Yup.object().shape({

    typeBusiness: Yup
        .string()
        .required(),
    bank: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Bank'),

    noAkaun: Yup
        .string('Please enter')
        .required('Please enter')
        .min(16)
        .label('No Akaun'),


});

const LoanPerniagaanScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { bank, noAkaun, typeBusiness } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutA>
            <Formik
                initialValues={{ bank, noAkaun, typeBusiness }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanMaklumatPeribadi')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { bank, noAkaun, typeBusiness } = FormikProps.values


                    const bankError = FormikProps.errors.bank
                    const bankTouched = FormikProps.touched.bank
                    const noAkaunError = FormikProps.errors.noAkaun
                    const noAkaunTouched = FormikProps.touched.noAkaun
                    const typeBusinessError = FormikProps.errors.typeBusiness
                    const typeBusinessTouched = FormikProps.touched.typeBusiness



                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
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
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={typeBusiness} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('typeBusiness', itemValue)}>
                                            <Picker.Item label={'Please Select'} value={undefined} />
                                            <Picker.Item label="Pertanian Dan Perusahaan Asas Tani" value="pertanian" />
                                            <Picker.Item label="Peruncitan" value="peruncitan" />
                                            <Picker.Item label="Perkhidmatan" value="perkhidmatan" />
                                            <Picker.Item label="Pembuatan" value="pembuatan" />
                                            <Picker.Item label="Kontraktor Kecil" value="kontraktorKecil" />
                                        </Picker>
                                    </View>
                                </View>
                            </Modal>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Asas</Text>
<ScrollView>

                            <CustomTextInput
                                imageUri={require('../assets/images/city.png')}
                                value={bank}
                                handleChange={FormikProps.handleChange(`bank`)}
                                handleBlur={FormikProps.handleBlur(`bank`)}
                                touched={bankTouched}
                                error={bankError}
                                placeholder={'Bank Islam/Maybank/Bank Rakyat/BSN/Agrobank'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/state.png')}
                                value={noAkaun}
                                handleChange={FormikProps.handleChange(`noAkaun`)}
                                handleBlur={FormikProps.handleBlur(`noAkaun`)}
                                touched={noAkaunTouched}
                                error={noAkaunError}
                                placeholder={'No.Akaun'}
                                keyboardType={'phone-pad'}
                            />
                            <View style={{ marginBottom: 20, alignSelf: 'stretch' }}>
                            <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.65,}}>
                    
            
                                {ios ?
                                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                        <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('typeBusiness')}>
                                            <Text style={{ fontSize: 12 }}>{typeBusiness ? typeBusiness : `Sektor Perniagaan`}</Text>
                                        </TouchableOpacity>
                                        {typeBusinessTouched && typeBusinessError && <Text style={styles.error}>{typeBusinessError}</Text>}
                                    </View> : <View style={{ alignSelf: 'stretch',borderWidth:1, borderColor: '#5a83c2' }}>
                                        <Picker style={{ height: 35 }} selectedValue={typeBusiness} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('typeBusiness', itemValue)}>
                                            <Picker.Item label={'Sektor Perniagaan'} value={undefined} />
                                            <Picker.Item label="Pertanian Dan Perusahaan Asas Tani" value="pertanian" />
                                            <Picker.Item label="Peruncitan" value="peruncitan" />
                                            <Picker.Item label="Perkhidmatan" value="perkhidmatan" />
                                            <Picker.Item label="Pembuatan" value="pembuatan" />
                                            <Picker.Item label="Kontraktor Kecil" value="kontraktorKecil" />
                                        </Picker>
                                        {typeBusinessTouched && typeBusinessError && <Text style={styles.error}>{typeBusinessError}</Text>}
                                    </View>}
                            </View>
                            </View>
</ScrollView>

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



export default LoanPerniagaanScreen