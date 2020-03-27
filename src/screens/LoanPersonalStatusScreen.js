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

    taraf: Yup
        .string()
        .required(),

    pendidikan: Yup
        .string()
        .required(),

    bangsa: Yup
        .string()
        .required()
        .min(3)
        .label('Bangsa'),

    umur: Yup
        .string()
        .required()
        .min(3)
        .label('Umur'),

    tanggungan: Yup
        .string()
        .required()
        .min(3)
        .label('BilTanggungan'),




});

const LoanPersonalStatusScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { bangsa, umur, taraf, tanggungan,pendidikan } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })


    //const { capacity, nameCP, icNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

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



    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{bangsa, umur, taraf, tanggungan,pendidikan}}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    //props.navigation.navigate('CompanyInfoSuccess')
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { bangsa, umur, pendidikan, taraf, tanggungan } = FormikProps.values

                    const tanggunganError = FormikProps.errors.tanggungan
                    const tanggunganTouched = FormikProps.touched.tanggungan

                    const bangsaError = FormikProps.errors.bangsa
                    const bangsaTouched = FormikProps.touched.bangsa

                    const umurError = FormikProps.errors.umur
                    const umurTouched = FormikProps.touched.umur

                    const pendidikanError = FormikProps.errors.pendidikan
                    const pendidikanTouched = FormikProps.touched.pendidikan

                    const tarafError = FormikProps.errors.taraf
                    const tarafTouched = FormikProps.touched.taraf


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
                                        {(modalContent === "pendidikan") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={pendidikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pendidikan', itemValue)}>
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label="Ijazah" value="ijazah" />
                                                <Picker.Item label="Diploma" value="diploma" />
                                                <Picker.Item label="Sijil" value="sijil" />
                                                <Picker.Item label="STPM/setaraf" value="stpm/setaraf" />
                                                <Picker.Item label="SPM/setaraf" value="spm/setaraf" />
                                                <Picker.Item label="PMR/setaraf" value="pmr/setaraf" />
                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={taraf} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('taraf', itemValue)}>
                                                <Picker.Item label={'Taraf Perkahwinan'} value={undefined} />
                                                <Picker.Item label="Bujang" value="bujang" />
                                                <Picker.Item label="Berkahwin" value="berkahwin" />
                                                <Picker.Item label="Duda" value="duda" />
                                                <Picker.Item label="Ibu Tunggal" value="ibuTunggal" />
                                                
                                            </Picker>
                                        }
                                    </View>
                                </View>
                            </Modal>

                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Peribadi</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={bangsa}
                                handleChange={FormikProps.handleChange(`bangsa`)}
                                handleBlur={FormikProps.handleBlur(`bangsa`)}
                                touched={bangsaTouched}
                                error={bangsaError}
                                placeholder={'Bangsa/Kaum'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={umur}
                                handleChange={FormikProps.handleChange(`umur`)}
                                handleBlur={FormikProps.handleBlur(`umur`)}
                                touched={umurTouched}
                                error={umurError}
                                placeholder={'Umur'}
                                keyboardType={'phone-pad'}
                            />
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pendidikan')}>
                                                <Text style={{ fontSize: 12 }}>{pendidikan ? pendidikan : `Taraf Pendidikan`}</Text>
                                            </TouchableOpacity>
                                            {pendidikanTouched && pendidikanError && <Text style={styles.error}>{pendidikanError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={pendidikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pendidikan', itemValue)}>
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label="Ijazah" value="ijazah" />
                                                <Picker.Item label="Diploma" value="diploma" />
                                                <Picker.Item label="Sijil" value="sijil" />
                                                <Picker.Item label="STPM/setaraf" value="stpm/setaraf" />
                                                <Picker.Item label="SPM/setaraf" value="spm/setaraf" />
                                                <Picker.Item label="PMR/setaraf" value="pmr/setaraf" />
                                            </Picker>
                                            {pendidikanTouched && pendidikanError && <Text style={styles.error}>{pendidikanError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('taraf')}>
                                                <Text style={{ fontSize: 12 }}>{taraf ? taraf : `Taraf Perkahwinan`}</Text>
                                            </TouchableOpacity>
                                            {tarafTouched && tarafError && <Text style={styles.error}>{tarafError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={taraf} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('taraf', itemValue)}>
                                            <Picker.Item label={'Taraf Perkahwinan'} value={undefined} />
                                                <Picker.Item label="Bujang" value="bujang" />
                                                <Picker.Item label="Berkahwin" value="berkahwin" />
                                                <Picker.Item label="Duda" value="duda" />
                                                <Picker.Item label="Ibu Tunggal" value="ibuTunggal" />
                                            </Picker>
                                            {tarafTouched && tarafError && <Text style={styles.error}>{tarafError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={tanggungan}
                                handleChange={FormikProps.handleChange(`tanggungan`)}
                                handleBlur={FormikProps.handleBlur(`tanggungan`)}
                                touched={tanggunganTouched}
                                error={tanggunganError}
                                placeholder={'Bilangan Tanggungan'}
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




export default LoanPersonalStatusScreen