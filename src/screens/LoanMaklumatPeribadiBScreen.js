import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Picker,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

} from 'react-native';
import CheckBox2 from 'react-native-check-box'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { CustomTextInput, CustomFormAction } from '../components/Custom'

import { Ionicons } from '@expo/vector-icons';


import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';



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


            <Formik
                validateOnMount
                initialValues={{ agama, bangsa, jantina, }}

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



                    const { jantina, agama, bangsa } = FormikProps.values

                    const bangsaError = FormikProps.errors.bangsa
                    const bangsaTouched = FormikProps.touched.bangsa



                    const jantinaError = FormikProps.errors.jantina
                    const jantinaTouched = FormikProps.touched.jantina

                    const agamaError = FormikProps.errors.agama
                    const agamaTouched = FormikProps.touched.agama


                    const handleCheckBoxMelayu = () => { 
                     
                        FormikProps.setFieldValue('bangsa', 'Melayu') 
                    }
                    const handleCheckBoxLain = () => { 
                        
                        FormikProps.setFieldValue('bangsa', 'Lain-lain') 
                    }

                    return (

                        <View style={{ flex: 1,  alignSelf:'stretch', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Please Select'} nopaddingTop={true} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        {(modalContent === "jantina") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={jantina} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('jantina', itemValue)}>
                                                <Picker.Item label={'Jantina'} value={undefined} />
                                                <Picker.Item label="Lelaki" value="Lelaki" />
                                                <Picker.Item label="Wanita" value="Wanita" />

                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={agama} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('agama', itemValue)}>
                                                <Picker.Item label={'Agama'} value={undefined} />
                                                <Picker.Item label="Islam" value="Islam" />
                                                <Picker.Item label="Bukan Islam" value="Bukan Islam" />

                                            </Picker>
                                        }
                                    </View>
                                </LayoutLoan>
                            </Modal>

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
                                                <Picker.Item label="Lelaki" value="Lelaki" />
                                                <Picker.Item label="Wanita" value="Wanita" />

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
                                                <Picker.Item label="Islam" value="Islam" />
                                                <Picker.Item label="Bukan Islam" value="Bukan Islam" />

                                            </Picker>
                                            {agamaTouched && agamaError && <Text style={styles.error}>{agamaError}</Text>}
                                        </View>}
                                </View>
                            </View>

               

                            <View style={{ marginBottom: 10, justifyContent: 'center', alignSelf: 'stretch' }}>
                                <Text style={[styles.textDefault, { marginBottom: 5, color: 'darkblue' }]}>Bangsa :</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxMelayu()} isChecked={bangsa=='Melayu'?true:false} checkBoxColor={'#5a83c2'}  />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Melayu/Bumiputra</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <CheckBox2 onClick={() => handleCheckBoxLain()} isChecked={bangsa=='Lain-lain'?true:false} checkBoxColor={'#5a83c2'}  />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Lain-lain
                                </Text>
                                </View>
                            </View>

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