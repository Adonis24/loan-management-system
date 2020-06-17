//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    Platform

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'


import Layout from '../constants/Layout'

import LayoutLoan from '../Layout/LayoutLoan';
import styles from '../styles/styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import malaysiaData from 'malaysia-state-city-postcode'
import { ScrollView } from 'react-native-gesture-handler';

const ios = Platform.OS === 'ios' ? true : false

const validationSchema = Yup.object().shape({

    comp_phone: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Company Phone'),

    comp_email: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Company Email'),

    ic_no: Yup
        .string()

        .required()
        .min(12)
        .label('MyKad No'),


    // comp_address: Yup
    //     .string('Please enter')
    //     .required('Please enter')
    //     .min(3)
    //     .label('Address'),


});

const CompanyContactInformationScreen = (props) => {

    const dispatch = useDispatch()


    const { name, ic_no, } = useSelector(state => state.myAccountReducer, shallowEqual)

    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })

    const [addressVisible, setAddressVisible] = useState(false)


    return (
        <LayoutLoan title='Company Info'>

            <Formik validateOnMount
                initialValues={{ comp_phone: undefined, comp_email: undefined, comp_address: undefined, full_name: name, ic_no }}

                onSubmit={async(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setCompanyInfo(values)
                    await dispatch(actionCreator.companyInfo())
                    await dispatch(actionCreator.initiateMyAccount())
                    await dispatch(actionCreator.initiateCompanyInfo())
                    props.navigation.navigate('MyAccount')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_postcode, comp_city, comp_state, full_name, ic_no } = FormikProps.values

                    const comp_phoneError = FormikProps.errors.comp_phone
                    const comp_phoneTouched = FormikProps.touched.comp_phone

                    const ic_noError = FormikProps.errors.comp_phone
                    const ic_noTouched = FormikProps.touched.comp_phone

                    const comp_emailError = FormikProps.errors.comp_email
                    const comp_emailTouched = FormikProps.touched.comp_email

                    const comp_addrError = FormikProps.errors.comp_addr
                    const comp_addrTouched = FormikProps.touched.comp_addr

                    const comp_addr_2Error = FormikProps.errors.comp_addr_2
                    const comp_addr_2Touched = FormikProps.touched.comp_addr_2




                    const comp_postcodeError = FormikProps.errors.comp_postcode
                    const comp_postcodeTouched = FormikProps.touched.comp_postcode

                    const getCoordinate = (poskod) => {

                        if (poskod) {
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('comp_postcode', poskod)
                                    FormikProps.setFieldValue(`comp_city`, coordinate.City)
                                    FormikProps.setFieldValue(`comp_state`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('comp_postcode', poskod)
                                }

                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('comp_postcode', poskod)
                            }

                        }

                    }


                    return (
                        <>
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={!ios ? true : false} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={comp_addr}
                                            handleChange={FormikProps.handleChange(`comp_addr`)}
                                            handleBlur={FormikProps.handleBlur(`comp_addr`)}
                                            touched={comp_addrTouched}
                                            error={comp_addrError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={comp_addr_2}
                                            handleChange={FormikProps.handleChange(`comp_addr_2`)}
                                            handleBlur={FormikProps.handleBlur(`comp_addr_2`)}
                                            touched={comp_addr_2Touched}
                                            error={comp_addr_2Error}
                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={comp_postcode}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`comp_postcode`)}
                                            touched={comp_postcodeTouched}
                                            error={comp_postcodeError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {comp_city && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={comp_city}

                                            placeholder={'City'}

                                        />}

                                        {comp_state && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={comp_state}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>
                            <ScrollView contentContainerStyle={{ paddingLeft: 10, paddingRight: 10, alignItems: 'center' }}>
                                <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY CONTACT INFORMATION</Text>
                                <Text style={[styles.textDefault, { margin: 5, marginBottom: 20, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                                <CustomTextInput
                                    imageUri={require('../assets/images/phoneNum.png')}
                                    value={full_name}

                                    placeholder={'Contact Person'}

                                    editable={false}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/phoneNum.png')}
                                    value={ic_no}
                                    handleChange={FormikProps.handleChange(`ic_no`)}
                                    handleBlur={FormikProps.handleBlur(`ic_no`)}
                                    touched={ic_noTouched}
                                    error={ic_noError}
                                    placeholder={'MyKad No'}
                                    keyboardType={'phone-pad'}

                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/phoneNum.png')}
                                    value={comp_phone}
                                    handleChange={FormikProps.handleChange(`comp_phone`)}
                                    handleBlur={FormikProps.handleBlur(`comp_phone`)}
                                    touched={comp_phoneTouched}
                                    error={comp_phoneError}
                                    placeholder={'Company Phone No'}
                                    keyboardType={'phone-pad'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/email.png')}
                                    value={comp_email}
                                    handleChange={FormikProps.handleChange(`comp_email`)}
                                    handleBlur={FormikProps.handleBlur(`comp_email`)}
                                    touched={comp_emailTouched}
                                    error={comp_emailError}
                                    placeholder={'Company Email'}
                                    keyboardType={'default'}
                                />

                                <CustomTextInput
                                    imageUri={require('../assets/images/address.png')}
                                    value={comp_addr}
                                    handleClick={() => setAddressVisible(!addressVisible)}
                                    multiLine={true}
                                    touched={comp_addrTouched}
                                    error={comp_addrError}
                                    placeholder={'Address'}
                                >
                                    {comp_addr ? <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                        <Text style={[styles.textDefault, { color: '#000' }]}>{comp_addr}</Text>
                                        {comp_addr_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{comp_addr_2}</Text>}
                                        {comp_postcode && <Text style={[styles.textDefault, { color: '#000' }]}>{comp_postcode}</Text>}
                                        {comp_city && <Text style={[styles.textDefault, { color: '#000' }]}>{comp_city},{comp_state}</Text>}
                                    </View> : <View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                            <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>

                                        </View>}

                                </CustomTextInput>

                                <CustomFormAction
                                    navigation={props.navigation}
                                    isValid={FormikProps.isValid}
                                    handleSubmit={FormikProps.handleSubmit}
                                />
                            </ScrollView>
                        </>

                    )
                }}
            </Formik >
        </LayoutLoan>
    );
}


export default CompanyContactInformationScreen