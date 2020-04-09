import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import malaysiaData from 'malaysia-state-city-postcode'
import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({


    compPhoneSendiriNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    compSendiriAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    compSendiriPoskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanBusinessAddrInfoScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { compPhoneSendiriNum, compSendiriAlamat, compSendiriAlamat_2, compSendiriPoskod, compSendiriCity, compSendiriState } = useSelector(state => state.financingReducer, shallowEqual)
    const [addressVisible, setAddressVisible] = useState(false)

    const setBusinessInfo = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>

            <Formik
                validateOnMount
                initialValues={{ compPhoneSendiriNum, compSendiriAlamat_2, compSendiriAlamat, compSendiriPoskod, compSendiriCity, compSendiriState }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setBusinessInfo(values)
                    dispatch(actionCreator.saveLoanData())
                    props.navigation.navigate('LoanSectionF')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { compPhoneSendiriNum, compSendiriAlamat, compSendiriAlamat_2, compSendiriPoskod, compSendiriCity, compSendiriState } = FormikProps.values



                    const compPhoneSendiriNumError = FormikProps.errors.compPhoneSendiriNum
                    const compPhoneSendiriNumTouched = FormikProps.touched.compPhoneSendiriNum

                    const compSendiriAlamatError = FormikProps.errors.compSendiriAlamat
                    const compSendiriAlamatTouched = FormikProps.touched.compSendiriAlamat

                    const compSendiriAlamat_2Error = FormikProps.errors.compSendiriAlamat_2
                    const compSendiriAlamat_2Touched = FormikProps.touched.compSendiriAlamat_2

                    const compSendiriPoskodError = FormikProps.errors.compSendiriPoskod
                    const compSendiriPoskodTouched = FormikProps.touched.compSendiriPoskod

                    const getCoordinate = (poskod) => {
                        console.log(poskod)
                        if (poskod.length === 5) {
                            const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                            if (coordinate) {
                                console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                FormikProps.setFieldValue('compSendiriPoskod', poskod)
                                FormikProps.setFieldValue(`compSendiriCity`, coordinate.City)
                                FormikProps.setFieldValue(`compSendiriState`, coordinate.State)
                            } else {
                                console.log(`no result found`)
                                FormikProps.setFieldValue('compSendiriPoskod', poskod)
                            }

                        } else {
                            console.log(`do nothing`)
                            FormikProps.setFieldValue('compSendiriPoskod', poskod)
                        }
                    }


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={true} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={compSendiriAlamat}
                                            handleChange={FormikProps.handleChange(`compSendiriAlamat`)}
                                            handleBlur={FormikProps.handleBlur(`compSendiriAlamat`)}
                                            touched={compSendiriAlamatTouched}
                                            error={compSendiriAlamatError}
                                            placeholder={'Alamat Syarikat Line 1'}
                                            keyboardType={'default'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={compSendiriAlamat_2}
                                            handleChange={FormikProps.handleChange(`compSendiriAlamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`compSendiriAlamat_2`)}
                                            touched={compSendiriAlamat_2Touched}
                                            error={compSendiriAlamat_2Error}
                                            placeholder={'Alamat Syarikat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={compSendiriPoskod}
                                            handleChange={(value)=>getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`compSendiriPoskod`)}
                                            touched={compSendiriPoskodTouched}
                                            error={compSendiriPoskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {compSendiriCity && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={compSendiriCity}

                                            placeholder={'City'}

                                        />}

                                        {compSendiriState && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={compSendiriState}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section D</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Perniagaan</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={compPhoneSendiriNum}
                                handleChange={FormikProps.handleChange(`compPhoneSendiriNum`)}
                                handleBlur={FormikProps.handleBlur(`compPhoneSendiriNum`)}
                                touched={compPhoneSendiriNumTouched}
                                error={compPhoneSendiriNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'phone-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}

                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}

                                touched={compSendiriAlamatTouched}
                                error={compSendiriAlamatError}
                                placeholder={'Alamat'}

                            ><Text style={styles.textDefault}>{compSendiriAlamat}</Text>
                                {compSendiriAlamat_2 && <Text style={styles.textDefault}>{compSendiriAlamat_2}</Text>}
                                <Text style={styles.textDefault}>{compSendiriPoskod}</Text>
                                <Text style={styles.textDefault}>{compSendiriCity},{compSendiriState}</Text>
                            </CustomTextInput>
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




export default LoanBusinessAddrInfoScreen