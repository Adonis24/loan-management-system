import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Picker,
    ScrollView
  

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';

const validationSchema = Yup.object().shape({
    cpPekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),

    cpName: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    cpIcNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    cpPendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),

    cpRelation: Yup
        .string()
        .required(),



});

const LoanConnectedPartiesScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { cpName, cpIcNumber, cpPekerjaan, cpPendapatan, cpRelation } = useSelector(state => state.financingReducer, shallowEqual)

    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    const setConnectParties = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ cpName, cpIcNumber, cpPekerjaan, cpPendapatan, cpRelation }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    props.navigation.navigate('LoanConnectedPartiesAddr')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { cpPekerjaan, cpName, cpIcNumber, cpPendapatan, poskod, cpRelation } = FormikProps.values

                    const cpPekerjaanError = FormikProps.errors.cpPekerjaan
                    const cpPekerjaanTouched = FormikProps.touched.cpPekerjaan

                    const cpNameError = FormikProps.errors.cpName
                    const cpNameTouched = FormikProps.touched.cpName

                    const cpIcNumberError = FormikProps.errors.cpIcNumber
                    const cpIcNumberTouched = FormikProps.touched.cpIcNumber

                    const cpPendapatanError = FormikProps.errors.cpPendapatan
                    const cpPendapatanTouched = FormikProps.touched.cpPendapatan

                    const cpRelationError = FormikProps.errors.cpRelation
                    const cpRelationTouched = FormikProps.touched.cpRelation


                    return (

                        <ScrollView style={{ flex: 1, alignSelf:'stretch'  }} contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Hubungan'} nopaddingTop={false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={cpRelation} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('cpRelation', itemValue)}>
                                            <Picker.Item label={'Hubungan'} value={undefined} />
                                            <Picker.Item label="Suami" value="Suami" />
                                            <Picker.Item label="Isteri" value="Isteri" />
                                            <Picker.Item label="Waris" value="Waris" />

                                        </Picker>
                                        </View>
                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section C</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Pasangan</Text>

                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Hubungan :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('cpRelation')}>
                                                <Text style={{ fontSize: 12 }}>{cpRelation ? cpRelation : `Hubungan`}</Text>
                                            </TouchableOpacity>
                                            {cpRelationTouched && cpRelationError && <Text style={styles.error}>{cpRelationError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={cpRelation} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('cpRelation', itemValue)}>
                                                <Picker.Item label={'Hubungan'} value={undefined} />
                                                <Picker.Item label="Suami" value="Suami" />
                                                <Picker.Item label="Isteri" value="Isteri" />
                                                <Picker.Item label="Waris" value="Waris" />
                                            </Picker>
                                            {cpRelationTouched && cpRelationError && <Text style={styles.error}>{cpRelationError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpName}
                                handleChange={FormikProps.handleChange(`cpName`)}
                                handleBlur={FormikProps.handleBlur(`cpName`)}
                                touched={cpNameTouched}
                                error={cpNameError}
                                placeholder={`Nama ${cpRelation ? cpRelation : 'Suami/Isteri/Waris'}`}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={cpIcNumber}
                                handleChange={FormikProps.handleChange(`cpIcNumber`)}
                                handleBlur={FormikProps.handleBlur(`cpIcNumber`)}
                                touched={cpIcNumberTouched}
                                error={cpIcNumberError}
                                placeholder={'No Kad Pengenalan'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={cpPekerjaan}
                                handleChange={FormikProps.handleChange(`cpPekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`cpPekerjaan`)}
                                touched={cpPekerjaanTouched}
                                error={cpPekerjaanError}
                                placeholder={'Pekerjaan'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/compRegNum.png')}
                                value={cpPendapatan}
                                handleChange={FormikProps.handleChange(`cpPendapatan`)}
                                handleBlur={FormikProps.handleBlur(`cpPendapatan`)}
                                touched={cpPendapatanTouched}
                                error={cpPendapatanError}
                                placeholder={'Pendapatan'}
                                keyboardType={'phone-pad'}
                            />


                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                        </ScrollView>

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




export default LoanConnectedPartiesScreen