//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
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
import { CustomTextInput,CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import styles from '../styles/styles'

import LayoutA from '../Layout/LayoutA';

import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    capacity: Yup
        .string()
        .required()
        .min(3)
        .label('Capacity'),

    nameCP: Yup
        .string()
        .required()
        .min(3)
        .label('Connected Party Name'),

    icNumber: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    relationship: Yup
        .string()
        .required()
        .min(3)
        .label('Relationship'),

    emailSME: Yup
        .string()
        .email()
        .required()
        .min(3)
        .label('Email SME'),


});

const DetailsOfConnectedPartiesScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const DetailConnect = async () => {
        dispatch(actionCreator.detailConnect())
        props.navigation.navigate('DeclarationDigitalSign')
    }

    const setDetailConnect = (value) => dispatch({ type: 'SET_DETAIL_CONNECT', payload: { ...value } })


    //const { capacity, nameCP, icNumber, relationship, emailSME, } = useSelector(state => state.companyInformationReducer, shallowEqual)

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)



    return (
        <LayoutA>


            <Formik
                validateOnMount
                initialValues={{}}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    await setDetailConnect(values)
                    DetailConnect()
                    //props.navigation.navigate('CompanyInfoSuccess')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { capacity, nameCP, icNumber, relationship, emailSME } = FormikProps.values

                    const capacityError = FormikProps.errors.capacity
                    const capacityTouched = FormikProps.touched.capacity

                    const nameCPError = FormikProps.errors.nameCP
                    const nameCPTouched = FormikProps.touched.nameCP

                    const icNumberError = FormikProps.errors.icNumber
                    const icNumberTouched = FormikProps.touched.icNumber

                    const relationshipError = FormikProps.errors.relationship
                    const relationshipTouched = FormikProps.touched.relationship

                    const emailSMEError = FormikProps.errors.emailSME
                    const emailSMETouched = FormikProps.touched.emailSME


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Details of Connected Party</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={capacity}
                                handleChange={FormikProps.handleChange(`capacity`)}
                                handleBlur={FormikProps.handleBlur(`capacity`)}
                                touched={capacityTouched}
                                error={capacityError}
                                placeholder={'Capacity'}

                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={nameCP}
                                handleChange={FormikProps.handleChange(`nameCP`)}
                                handleBlur={FormikProps.handleBlur(`nameCP`)}
                                touched={nameCPTouched}
                                error={nameCPError}
                                placeholder={'Name of Connected Party'}
                                keyboardType={'default'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={icNumber}
                                handleChange={FormikProps.handleChange(`icNumber`)}
                                handleBlur={FormikProps.handleBlur(`icNumber`)}
                                touched={icNumberTouched}
                                error={icNumberError}
                                placeholder={'MyKad No'}
                                keyboardType={'numbers-and-punctuation'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={relationship}
                                handleChange={FormikProps.handleChange(`relationship`)}
                                handleBlur={FormikProps.handleBlur(`relationship`)}
                                touched={relationshipTouched}
                                error={relationshipError}
                                placeholder={'Relationship'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={emailSME}
                                handleChange={FormikProps.handleChange(`emailSME`)}
                                handleBlur={FormikProps.handleBlur(`emailSME`)}
                                touched={emailSMETouched}
                                error={emailSMEError}
                                placeholder={'Email SME Bank'}
                                keyboardType={'email-address'}
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




export default DetailsOfConnectedPartiesScreen