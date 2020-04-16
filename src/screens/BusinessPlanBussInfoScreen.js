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

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    lokasi: Yup
        .string()
        .required()
        .min(3)
        .label('Lokasi'),

  

    compPhone: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),
    compFax: Yup
        .string()
        .required()
        .min(3)
        .label('No Fax'),
    compStatus: Yup
        .string()
        .required(),

});

const BusinessPlanBussInfoScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const {  lokasi,  compPhone, compFax, compStatus } = useSelector(state => state.businessPlanningReducer, shallowEqual)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })
    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{  lokasi, compPhone, compFax, compStatus }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setLatarBelakang(values)
                    props.navigation.navigate('BusinessPlanBussInfoB')
                    actions.resetForm({})
                    dispatch(actionCreator.saveBussPlanData())
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {


                    const { lokasi,   compPhone, compFax, compStatus } = FormikProps.values

                    const lokasiError = FormikProps.errors.lokasi
                    const lokasiTouched = FormikProps.touched.lokasi


                    const compPhoneError = FormikProps.errors.compPhone
                    const compPhoneTouched = FormikProps.touched.compPhone

                    const compFaxError = FormikProps.errors.compFax
                    const compFaxTouched = FormikProps.touched.compFax


                    const compStatusError = FormikProps.errors.compStatus
                    const compStatusTouched = FormikProps.touched.compStatus




                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible}  onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Maklumat Akaun'} nopaddingTop={false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>

                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={compStatus} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('compStatus', itemValue)}>
                                            <Picker.Item label={'Status Premis'} value={undefined} />
                                            <Picker.Item label="Sendiri" value="Sendiri" />
                                            <Picker.Item label="Sewa" value="Sewa" />


                                        </Picker>

                                    </View>
                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Butir-Butir Perniagaan</Text>
                            <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>

                                <CustomTextInput
                                    imageUri={require('../assets/images/address.png')}
                                    value={lokasi}
                                    handleChange={FormikProps.handleChange(`lokasi`)}
                                    handleBlur={FormikProps.handleBlur(`lokasi`)}
                                    touched={lokasiTouched}
                                    error={lokasiError}
                                    placeholder={'Lokasi Premis'}

                                />
                                <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Status Premis :</Text>

                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                    <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                        {ios ?
                                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                                <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('compStatus')}>
                                                    <Text style={{ fontSize: 12 }}>{compStatus ? compStatus : `Status Premis`}</Text>
                                                </TouchableOpacity>
                                                {compStatusTouched && compStatusError && <Text style={styles.error}>{compStatusError}</Text>}
                                            </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                                <Picker style={{ height: 35 }} selectedValue={compStatus} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('compStatus', itemValue)}>
                                                    <Picker.Item label={'Status Premis'} value={undefined} />
                                                    <Picker.Item label="Sendiri" value="Sendiri" />
                                                    <Picker.Item label="Sewa" value="Sewa" />

                                                </Picker>
                                                {compStatusTouched && compStatusError && <Text style={styles.error}>{compStatusError}</Text>}
                                            </View>}
                                    </View>
                                </View>

                                
                                <CustomTextInput
                                    imageUri={require('../assets/images/phoneNum.png')}
                                    value={compPhone}
                                    handleChange={FormikProps.handleChange(`compPhone`)}
                                    handleBlur={FormikProps.handleBlur(`compPhone`)}
                                    touched={compPhoneTouched}
                                    error={compPhoneError}
                                    placeholder={'No Tel Pejabat'}
                                    keyboardType={'phone-pad'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/compRegNum.png')}
                                    value={compFax}
                                    handleChange={FormikProps.handleChange(`compFax`)}
                                    handleBlur={FormikProps.handleBlur(`compFax`)}
                                    touched={compFaxTouched}
                                    error={compFaxError}
                                    placeholder={'No Faks Pejabat'}
                                    keyboardType={'phone-pad'}

                                />
                                 <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                            </ScrollView>

                           
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




export default BusinessPlanBussInfoScreen