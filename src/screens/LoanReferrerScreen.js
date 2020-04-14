import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'
import malaysiaData from 'malaysia-state-city-postcode'

const validationSchema = Yup.object().shape({


    refName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    refPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    refRelationship: Yup
        .string()
        .required()
        .min(3)
        .label('Hubungan'),

    refAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),
    refPoskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanReferrerScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { refAlamat, refAlamat_2, refName, refPhoneNum, refRelationship, refCity, refState, refPoskod } = useSelector(state => state.financingReducer, shallowEqual)
    const [addressVisible, setAddressVisible] = useState(false)

    const setReferrer = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ refAlamat, refAlamat_2, refName, refPhoneNum, refRelationship, refCity, refState, refPoskod }}
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setReferrer(values)
                    dispatch(actionCreator.saveLoanData())
                    actions.resetForm({})

                    actions.setSubmitting(false)
                    props.navigation.goBack()
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { refAlamat, refAlamat_2, refName, refPhoneNum, refRelationship, refCity, refState, refPoskod } = FormikProps.values

                    const refPoskodError = FormikProps.errors.refPoskod
                    const refPoskodTouched = FormikProps.touched.refPoskod

                    const refAlamatError = FormikProps.errors.refAlamat
                    const refAlamatTouched = FormikProps.touched.refAlamat

                    const refAlamat_2Error = FormikProps.errors.refAlamat_2
                    const refAlamat_2Touched = FormikProps.touched.refAlamat_2

                    const refNameError = FormikProps.errors.refName
                    const refNameTouched = FormikProps.touched.refName

                    const refPhoneNumError = FormikProps.errors.refPhoneNum
                    const refPhoneNumTouched = FormikProps.touched.refPhoneNum

                    const refRelationshipError = FormikProps.errors.refRelationship
                    const refRelationshipTouched = FormikProps.touched.refRelationship


                    const getCoordinate = (poskod) => {

                        if (poskod) {
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('refPoskod', poskod)
                                    FormikProps.setFieldValue(`refCity`, coordinate.City)
                                    FormikProps.setFieldValue(`refState`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('refPoskod', poskod)
                                }

                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('refPoskod', poskod)
                            }

                        }
                        FormikProps.setFieldValue('refPoskod', poskod)

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
                                            value={refAlamat}
                                            handleChange={FormikProps.handleChange(`refAlamat`)}
                                            handleBlur={FormikProps.handleBlur(`refAlamat`)}
                                            touched={refAlamatTouched}
                                            error={refAlamatError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={refAlamat_2}
                                            handleChange={FormikProps.handleChange(`refAlamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`refAlamat_2`)}

                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={refPoskod}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`refPoskod`)}
                                            touched={refPoskodTouched}
                                            error={refPoskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {refCity && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={refCity}

                                            placeholder={'City'}

                                        />}

                                        {refState && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={refState}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>

                            <Text style={[styles.formTitle]}>Section H</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Perujuk (a)</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={refName}
                                handleChange={FormikProps.handleChange(`refName`)}
                                handleBlur={FormikProps.handleBlur(`refName`)}
                                touched={refNameTouched}
                                error={refNameError}
                                placeholder={'Nama'}
                                keyboardType={'default'}
                            />


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={refRelationship}
                                handleChange={FormikProps.handleChange(`refRelationship`)}
                                handleBlur={FormikProps.handleBlur(`refRelationship`)}
                                touched={refRelationshipTouched}
                                error={refRelationshipError}
                                placeholder={'Hubungan'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={refPhoneNum}
                                handleChange={FormikProps.handleChange(`refPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`refPhoneNum`)}
                                touched={refPhoneNumTouched}
                                error={refPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}
                                touched={refAlamatTouched}
                                error={refAlamatError}
                                placeholder={'Alamat'}

                            > 
                               {refAlamat? <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                    <Text style={styles.textDefault}>{refAlamat}</Text>
                                    {refAlamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{refAlamat_2}</Text>}
                                    {refPoskod && <Text style={[styles.textDefault, { color: '#000' }]}>{refPoskod}</Text>}
                                    {refCity && <Text style={[styles.textDefault, { color: '#000' }]}>{refCity},{refState}</Text>}
                                </View>:<View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                    <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>
                                 
                                </View>} 
                            </CustomTextInput>

                            <CustomFormAction
                                label={'Save'}
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

export default LoanReferrerScreen