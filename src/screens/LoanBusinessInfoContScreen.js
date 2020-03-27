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

    compStat: Yup
        .string()
        .required(),

    pemilikan: Yup
        .string()
        .required(),
    keahlian: Yup
        .string()
        .required(),






});

const LoanBusinessInfoContScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compStat, pemilikan,keahlian } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPerniagaan = (value) => dispatch({ type: 'SET_MAKLUMAT_PERNIAGAAN', payload: { ...value } })


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
                initialValues={{ compStat, pemilikan,keahlian }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPerniagaan(values)
                    props.navigation.navigate('LoanBusinessDetail')
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { pemilikan, compStat,keahlian } = FormikProps.values



                    const pemilikanError = FormikProps.errors.pemilikan
                    const pemilikanTouched = FormikProps.touched.pemilikan

                    const compStatError = FormikProps.errors.compStat
                    const compStatTouched = FormikProps.touched.compStat

                    const keahlianError = FormikProps.errors.keahlian
                    const keahlianTouched = FormikProps.touched.keahlian


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
                                        {(modalContent === "pemilikan") ?
                                            <Picker style={{ flex: 1, height: 35 }} selectedValue={pemilikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemilikan', itemValue)}>
                                                <Picker.Item label={'Pemilikan Perniagaan'} value={undefined} />
                                                <Picker.Item label="Individu" value="individu" />
                                                <Picker.Item label="Pemilik Tunggal" value="pemilikTunggal" />
                                                <Picker.Item label="Perkongsian" value="perkongsian" />
                                                <Picker.Item label="Sendirian Berhad" value="sendirianBerhad" />

                                            </Picker> : (modalContent === "compStat") ? <Picker style={{ flex: 1, height: 35 }} selectedValue={compStat} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('compStat', itemValue)}>
                                                <Picker.Item label={'Status Premis'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                                <Picker.Item label="Keluarga" value="keluarga" />

                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={keahlian} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('keahlian', itemValue)}>
                                                    <Picker.Item label={'Keahlian Persatuan'} value={undefined} />
                                                    <Picker.Item label="Dewan Perniagaan" value="dewanPerniagaan" />
                                                    <Picker.Item label="Persatuan Penjaja/Peniaga" value="persatuanPenjaja" />
                                                    
                                                </Picker>
                                        }
                                    </View>
                                </View>
                            </Modal>

                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Perniagaan</Text>



                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pemilikan')}>
                                                <Text style={{ fontSize: 12 }}>{pemilikan ? pemilikan : `Pemilikan Perniagaan`}</Text>
                                            </TouchableOpacity>
                                            {pemilikanTouched && pemilikanError && <Text style={styles.error}>{pemilikanError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={pemilikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pemilikan', itemValue)}>
                                                <Picker.Item label={'Pemilikan Perniagaan'} value={undefined} />
                                                <Picker.Item label="Individu" value="individu" />
                                                <Picker.Item label="Pemilik Tunggal" value="pemilikTunggal" />
                                                <Picker.Item label="Perkongsian" value="perkongsian" />
                                                <Picker.Item label="Sendirian Berhad" value="sendirianBerhad" />

                                            </Picker>
                                            {pemilikanTouched && pemilikanError && <Text style={styles.error}>{pemilikanError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('compStat')}>
                                                <Text style={{ fontSize: 12 }}>{compStat ? compStat : `Status Premis`}</Text>
                                            </TouchableOpacity>
                                            {compStatTouched && compStatError && <Text style={styles.error}>{compStatError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={compStat} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('compStat', itemValue)}>
                                                <Picker.Item label={'Status Premis'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                                <Picker.Item label="Keluarga" value="keluarga" />
                                            </Picker>
                                            {compStatTouched && compStatError && <Text style={styles.error}>{compStatError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginLeft: 3 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, width: Layout.window.width * 0.53, }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('keahlian')}>
                                                <Text style={{ fontSize: 12 }}>{keahlian ? keahlian : `Keahlian Persatuan`}</Text>
                                            </TouchableOpacity>
                                            {keahlianTouched && keahlianError && <Text style={styles.error}>{keahlianError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={keahlian} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('keahlian', itemValue)}>
                                            <Picker.Item label={'Keahlian Persatuan'} value={undefined} />
                                                    <Picker.Item label="Dewan Perniagaan" value="dewanPerniagaan" />
                                                    <Picker.Item label="Persatuan Penjaja/Peniaga" value="persatuanPenjaja" />
                                            </Picker>
                                            {keahlianTouched && keahlianError && <Text style={styles.error}>{keahlianError}</Text>}
                                        </View>}
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

        </LayoutA>
    );
}




export default LoanBusinessInfoContScreen