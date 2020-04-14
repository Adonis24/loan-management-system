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


    bangsa: Yup
        .string()
        .required()
        .min(3)
        .label('Bangsa'),




});

const LoanMaklumatPeribadiBScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)

    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { agama, bangsa, jantina, } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })




    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
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
                initialValues={{  agama, bangsa, jantina,  }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
              
                    //const dobInfo = getUmur(icNumber)
                    //console.log(`dob info ${JSON.stringify(dobInfo)}`)
                    setMaklumatPeribadi({ ...values })
                    props.navigation.navigate('LoanPersonalStatus')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {



                    const {  jantina, agama, bangsa} = FormikProps.values

                    const bangsaError = FormikProps.errors.bangsa
                    const bangsaTouched = FormikProps.touched.bangsa

          

                    const jantinaError = FormikProps.errors.jantina
                    const jantinaTouched = FormikProps.touched.jantina

                    const agamaError = FormikProps.errors.agama
                    const agamaTouched = FormikProps.touched.agama




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>


                            <Text style={[styles.formTitle]}>Section B</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>


                            
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




export default LoanMaklumatPeribadiBScreen