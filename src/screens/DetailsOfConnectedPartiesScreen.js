//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
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
import { CustomTextInput } from '../components/Custom'

import styles from '../styles/styles'

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



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>



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
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
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


                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid || !isInternetReachable} onPress={() => FormikProps.handleSubmit()} style={styles.box}>
                                            <LinearGradient colors={(FormikProps.isValid && isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' }]} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }}
                    </Formik >


                </KeyboardAvoidingView>
            </View>
        </View>
    );
}




export default DetailsOfConnectedPartiesScreen