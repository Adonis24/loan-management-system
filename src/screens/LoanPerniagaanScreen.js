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
import LayoutLoan from '../Layout/LayoutLoan';


const validationSchema = Yup.object().shape({

    typeBusiness: Yup
        .string()
        .required(),
    bank: Yup
        .string(),

    noAkaun: Yup
        .string()
        .required()
        .min(16)
        .label('No Akaun'),


});

const LoanPerniagaanScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()

  

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { bank, noAkaun, typeBusiness,statusPerniagaan } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const [sedangBerniaga, setSedangBerniaga] = useState(statusPerniagaan === 'Sedang Berniaga' ? true : false)
    const [mulaBerniaga, setMulaBerniaga] = useState(statusPerniagaan === 'Memulakan Perniagaan' ? true : false)
    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }




    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ bank, noAkaun, typeBusiness,statusPerniagaan }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    //dispatch(actionCreator.saveLoanData())

                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanBank')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const {  typeBusiness } = FormikProps.values


                
                    const typeBusinessError = FormikProps.errors.typeBusiness
                    const typeBusinessTouched = FormikProps.touched.typeBusiness

                    const sedangBerniagaCB = () => {
                        setSedangBerniaga(!sedangBerniaga)
                        setMulaBerniaga(sedangBerniaga)
                        FormikProps.setFieldValue('statusPerniagaan', !sedangBerniaga ? 'Sedang Berniaga' : 'Memulakan Perniagaan')
                    }
                    const mulaBerniagaCB = () => {
                        setMulaBerniaga(!mulaBerniaga)
                        setSedangBerniaga(mulaBerniaga)
                        FormikProps.setFieldValue('statusPerniagaan', !sedangBerniaga ? 'Sedang Berniaga' : 'Memulakan Perniagaan')
                
                    }



                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',paddingLeft:10,paddingRight:10,alignSelf:'stretch' }}>
                           

                            <Text style={[styles.formTitle]}>Section A</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Asas</Text>
                            {/* <CustomTextInput /> */}
                            
                            <View style={{ marginBottom: 10, justifyContent: 'center',alignSelf:'stretch' }}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Status perniagaan</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => sedangBerniagaCB()} isChecked={sedangBerniaga} />
                                            :
                                            <CheckBox onValueChange={(val) => sedangBerniagaCB()} value={sedangBerniaga} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                            Sedang Berniaga
                                </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => mulaBerniagaCB()} isChecked={mulaBerniaga} />
                                            :
                                            <CheckBox onValueChange={() => mulaBerniagaCB()} value={mulaBerniaga} />
                                        }
                                        <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Memulakan Perniagaan</Text>
                                    </View>
                                </View>

                                
                                <Text style={[styles.label, { margin: 5,alignSelf:'flex-start' }]}>Sektor Perniagaan :</Text>

                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center',marginBottom:10 }}>
                                    <Image source={require('../assets/images/bizAct.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('typeBusiness')}>
                                                    <Text style={{ fontSize: 12 }}>{typeBusiness ? typeBusiness : `Sektor Perniagaan`}</Text>
                                                </TouchableOpacity>
                                                {typeBusinessTouched && typeBusinessError && <Text style={styles.error}>{typeBusinessError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
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
                          

                            <CustomFormAction
                            label={'Next'}
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



export default LoanPerniagaanScreen