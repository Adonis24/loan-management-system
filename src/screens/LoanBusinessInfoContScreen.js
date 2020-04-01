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

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    compStat: Yup
        .string()
        .required(),

    pemilikan: Yup
        .string()
        .required(),







});

const LoanBusinessInfoContScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { noAhli, compStat, pemilikan, keahlian, noAhli2 } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPerniagaan = (value) => dispatch({ type: 'SET_MAKLUMAT_PERNIAGAAN', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ compStat, pemilikan, keahlian, noAhli, noAhli2 }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPerniagaan(values)
                    props.navigation.navigate('LoanSectionF')
                    actions.resetForm({})
                    actions.setSubmitting(false)

                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { pemilikan, compStat, keahlian, noAhli, noAhli2 } = FormikProps.values



                    const pemilikanError = FormikProps.errors.pemilikan
                    const pemilikanTouched = FormikProps.touched.pemilikan

                    const compStatError = FormikProps.errors.compStat
                    const compStatTouched = FormikProps.touched.compStat

                    const noAhliError = FormikProps.errors.noAhli
                    const noAhliTouched = FormikProps.touched.noAhli

                    const noAhli2Error = FormikProps.errors.noAhli2
                    const noAhli2Touched = FormikProps.touched.noAhli2


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
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

                                            </Picker> : <Picker style={{ flex: 1, height: 35 }} selectedValue={compStat} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('compStat', itemValue)}>
                                                <Picker.Item label={'Status Premis'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                                <Picker.Item label="Keluarga" value="keluarga" />

                                            </Picker>
                                        }
                                    </View>
                                </View>
                            </Modal>


                            <Text style={[styles.formTitle]}>Section E</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Perniagaan</Text>



                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Pemilikan Perniagaan :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
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
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Status Premis :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex:1  }}>
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
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={noAhli}
                                handleChange={FormikProps.handleChange(`noAhli`)}
                                handleBlur={FormikProps.handleBlur(`noAhli`)}
                                touched={noAhliTouched}
                                error={noAhliError}
                                placeholder={'No keahlian Dewan Perniagaan'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={noAhli2}
                                handleChange={FormikProps.handleChange(`noAhli2`)}
                                handleBlur={FormikProps.handleBlur(`noAhli2`)}
                                touched={noAhli2Touched}
                                error={noAhli2Error}
                                placeholder={'No Keahlian Persatuan Penjaja'}
                                keyboardType={'decimal-pad'}
                            />



                            <CustomFormAction
                                label={`Save`}
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




export default LoanBusinessInfoContScreen