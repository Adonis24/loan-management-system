import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal, Platform

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import { CustomTextInput, CustomFormAction } from '../components/Custom'

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';
import malaysiaData from 'malaysia-state-city-postcode'
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    valName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    valPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    jawatan: Yup
        .string()
        .required()
        .min(3)
        .label('Jawatan'),

    valAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),
    valPoskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),

});

const LoanValidationScreen = (props) => {
    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, valCity, valState, valPoskod } = useSelector(state => state.financingReducer, shallowEqual)
    const [addressVisible, setAddressVisible] = useState(false)
    const ios = Platform.OS === "ios" ? true : false

    const setValidation = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, valCity, valState, valPoskod }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setValidation(values)
                    await dispatch(actionCreator.saveLoanData())
                    await dispatch(actionCreator.getLoanData())
                    props.navigation.navigate('LoanCheckList')
                    actions.resetForm({})
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, valCity, valState, valPoskod } = FormikProps.values

                    const valPoskodError = FormikProps.errors.valPoskod
                    const valPoskodTouched = FormikProps.touched.valPoskod

                    const valAlamatError = FormikProps.errors.valAlamat
                    const valAlamatTouched = FormikProps.touched.valAlamat

                    const valAlamat_2Error = FormikProps.errors.valAlamat_2
                    const valAlamat_2Touched = FormikProps.touched.valAlamat_2

                    const valNameError = FormikProps.errors.valName
                    const valNameTouched = FormikProps.touched.valName

                    const valPhoneNumError = FormikProps.errors.valPhoneNum
                    const valPhoneNumTouched = FormikProps.touched.valPhoneNum

                    const jawatanError = FormikProps.errors.jawatan
                    const jawatanTouched = FormikProps.touched.jawatan


                    const getCoordinate = (poskod) => {

                        if (poskod) {
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('valPoskod', poskod)
                                    FormikProps.setFieldValue(`valCity`, coordinate.City)
                                    FormikProps.setFieldValue(`valState`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('valPoskod', poskod)
                                }

                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('poskod', poskod)
                            }

                        }

                    }
                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={!ios ? true : false} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={valAlamat}
                                            handleChange={FormikProps.handleChange(`valAlamat`)}
                                            handleBlur={FormikProps.handleBlur(`valAlamat`)}
                                            touched={valAlamatTouched}
                                            error={valAlamatError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={valAlamat_2}
                                            handleChange={FormikProps.handleChange(`valAlamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`valAlamat_2`)}

                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={valPoskod}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`valPoskod`)}
                                            touched={valPoskodTouched}
                                            error={valPoskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'phone-pad'}
                                        />

                                        {valCity && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={valCity}

                                            placeholder={'City'}

                                        />}

                                        {valState && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={valState}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section I</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Pengesahan Dan Perakuan Menjalankan Perniagaan</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={valName}
                                handleChange={FormikProps.handleChange(`valName`)}
                                handleBlur={FormikProps.handleBlur(`valName`)}
                                touched={valNameTouched}
                                error={valNameError}
                                placeholder={'Nama'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/position.png')}
                                value={jawatan}
                                handleChange={FormikProps.handleChange(`jawatan`)}
                                handleBlur={FormikProps.handleBlur(`jawatan`)}
                                touched={jawatanTouched}
                                error={jawatanError}
                                placeholder={'Jawatan'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={valPhoneNum}
                                handleChange={FormikProps.handleChange(`valPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`valPhoneNum`)}
                                touched={valPhoneNumTouched}
                                error={valPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'phone-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}

                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}

                                touched={valAlamatTouched}
                                error={valAlamatError}
                                placeholder={'Alamat'}
                            >
                                {valAlamat ? <View style={{ paddingLeft: 5, paddingTop: 5 }}><Text style={styles.textDefault}>{valAlamat}</Text>
                                    {valAlamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{valAlamat_2}</Text>}
                                    {valPoskod && <Text style={[styles.textDefault, { color: '#000' }]}>{valPoskod}</Text>}
                                    {valCity && <Text style={[styles.textDefault, { color: '#000' }]}>{valCity},{valState}</Text>}
                                </View> : <View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                        <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>

                                    </View>}
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




export default LoanValidationScreen