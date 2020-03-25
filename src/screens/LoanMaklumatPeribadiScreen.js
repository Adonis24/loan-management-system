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
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutA from '../Layout/LayoutA';

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

    tarikhLahir: Yup
        .string()
        .required()
        .min(3)
        .label('Tarikh Lahir'),




});

const LoanMaklumatPeribadiScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { name, icNumber, agama, tarikhLahir,jantina } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })


    //const { capacity, nameCP, icNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{name, icNumber, agama, tarikhLahir,jantina}}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    props.navigation.navigate('LoanPersonalStatus')
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { name, icNumber, jantina, agama, tarikhLahir } = FormikProps.values

                    const tarikhLahirError = FormikProps.errors.tarikhLahir
                    const tarikhLahirTouched = FormikProps.touched.tarikhLahir

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const icNumberError = FormikProps.errors.icNumber
                    const icNumberTouched = FormikProps.touched.icNumber

                    const jantinaError = FormikProps.errors.jantina
                    const jantinaTouched = FormikProps.touched.jantina

                    const agamaError = FormikProps.errors.agama
                    const agamaTouched = FormikProps.touched.agama


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
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

                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Peribadi</Text>


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
                                keyboardType={'numbers-and-punctuation'}
                            />
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('typeBusiness')}>
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
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('typeBusiness')}>
                                                <Text style={{ fontSize: 12 }}>{agama ? agama : `Agama`}</Text>
                                            </TouchableOpacity>
                                            {typeBusinessTouched && typeBusinessError && <Text style={styles.error}>{typeBusinessError}</Text>}
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
                                imageUri={require('../assets/images/mykad.png')}
                                value={tarikhLahir}
                                handleChange={FormikProps.handleChange(`tarikhLahir`)}
                                handleBlur={FormikProps.handleBlur(`tarikhLahir`)}
                                touched={tarikhLahirTouched}
                                error={tarikhLahirError}
                                placeholder={'Tarikh Lahir'}
                                keyboardType={'phone-pad'}
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




export default LoanMaklumatPeribadiScreen