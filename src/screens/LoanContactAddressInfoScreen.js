//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    Picker,
    TouchableOpacity,
    TextInput,
    View,


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import malaysiaData from 'malaysia-state-city-postcode'

import LayoutLoan from '../Layout/LayoutLoan';
import { Ionicons } from '@expo/vector-icons';

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'

const validationSchema = Yup.object().shape({

    alamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),
    status: Yup
        .string()
        .required(),

    phoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    email: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Emel'),

    poskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanContactAddressInfoScreen = (props) => {




    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false

    const [addressVisible, setAddressVisible] = useState(false)

    const dispatch = useDispatch()

    const { alamat, alamat_2, phoneNum, email, poskod, status, city, state } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })



    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ alamat, alamat_2, phoneNum, email, poskod, status, city, state }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanPendapatan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { alamat, alamat_2, email, phoneNum, poskod, status, city, state } = FormikProps.values
                    const statusError = FormikProps.errors.status
                    const statusTouched = FormikProps.touched.status

                    const alamatError = FormikProps.errors.alamat
                    const alamatTouched = FormikProps.touched.alamat

                    const alamat_2Error = FormikProps.errors.alamat_2
                    const alamat_2Touched = FormikProps.touched.alamat_2

                    const emailError = FormikProps.errors.email
                    const emailTouched = FormikProps.touched.email

                    const phoneNumError = FormikProps.errors.phoneNum
                    const phoneNumTouched = FormikProps.touched.phoneNum

                    const poskodError = FormikProps.errors.poskod
                    const poskodTouched = FormikProps.touched.poskod

                    // const setValue = (value) => {
                    //     console.log(`value is now ${value}`)
                    //     FormikProps.setFieldValue('poskod', value)
                    // }

                    const getCoordinate = (poskod) => {
                        
                        if(poskod){
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)
    
                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('poskod', poskod)
                                    FormikProps.setFieldValue(`city`, coordinate.City)
                                    FormikProps.setFieldValue(`state`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('poskod', poskod)
                                }
    
                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('poskod', poskod)
                            }

                        }
                        
                    }

                    //console.log(`value poskod ialah :${poskod}`)

                    //getCoordinate()
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
                                        <Picker style={{ flex: 1, height: 35 }} selectedValue={status} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('status', itemValue)}>
                                            <Picker.Item label={'Status Kediaman'} value={undefined} />
                                            <Picker.Item label="Sendiri" value="sendiri" />
                                            <Picker.Item label="Sewa" value="sewa" />
                                            <Picker.Item label="Keluarga" value="keluarga" />
                                        </Picker>
                                    </View>
                                </View>
                            </Modal>
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={true} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={alamat}
                                            handleChange={FormikProps.handleChange(`alamat`)}
                                            handleBlur={FormikProps.handleBlur(`alamat`)}
                                            touched={alamatTouched}
                                            error={alamatError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={alamat_2}
                                            handleChange={FormikProps.handleChange(`alamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`alamat_2`)}
                                            touched={alamat_2Touched}
                                            error={alamat_2Error}
                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={poskod}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`poskod`)}
                                            touched={poskodTouched}
                                            error={poskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {city && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={city}

                                            placeholder={'City'}

                                        />}

                                        {state && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={state}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section B</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>

                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Status Kediaman :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('status')}>
                                                <Text style={{ fontSize: 12 }}>{status ? status : `Status Kediaman`}</Text>
                                            </TouchableOpacity>
                                            {statusTouched && statusError && <Text style={styles.error}>{statusError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={status} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('status', itemValue)}>
                                                <Picker.Item label={'Status Kediaman'} value={undefined} />
                                                <Picker.Item label="Sendiri" value="sendiri" />
                                                <Picker.Item label="Sewa" value="sewa" />
                                                <Picker.Item label="Keluarga" value="keluarga" />
                                            </Picker>
                                            {statusTouched && statusError && <Text style={styles.error}>{statusError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                value={alamat}
                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}

                                touched={alamatTouched}
                                error={alamatError}
                                placeholder={'Alamat'}
                            >
                                <View style={{paddingLeft:5,paddingTop:5}}>
                                <Text style={[styles.textDefault, { color: '#000' }]}>{alamat}</Text>
                                {alamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{alamat_2}</Text>}
                                {poskod && <Text style={[styles.textDefault, { color: '#000' }]}>{poskod}</Text>}
                                {city && <Text style={[styles.textDefault, { color: '#000' }]}>{city},{state}</Text>}
                                </View>
                              

                            </CustomTextInput>

                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phoneNum}
                                handleChange={FormikProps.handleChange(`phoneNum`)}
                                handleBlur={FormikProps.handleBlur(`phoneNum`)}
                                touched={phoneNumTouched}
                                error={phoneNumError}
                                placeholder={'No Tel'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={email}
                                handleChange={FormikProps.handleChange(`email`)}
                                handleBlur={FormikProps.handleBlur(`email`)}
                                touched={emailTouched}
                                error={emailError}
                                placeholder={'Emel'}
                                keyboardType={'default'}
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

            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan>
    );
}



export default LoanContactAddressInfoScreen