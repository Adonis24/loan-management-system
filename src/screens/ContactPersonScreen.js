//console.ignoredYellowBox = ['Setting a timer']
import React,{ useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import { LinearGradient } from 'expo-linear-gradient'
import * as DocumentPicker from 'expo-document-picker';
import Layout from '../constants/Layout'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'
import { CustomTextInput,CustomFormAction } from '../components/Custom'
import * as actionCreator from '../store/actions/action'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    full_name: Yup
        .string()
        .required()
        .min(3)
        .label('Full Name'),

    position: Yup
        .string()
        .required()
        .min(3)
        .label('Position'),

    ic_no: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    phone: Yup
        .string()
        .required()
        .min(3)
        .label('Phone No'),


});


const ContactPersonScreen = (props) => {

    const dispatch = useDispatch()

    const { fileName, name } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const all = useSelector(state => state.companyInformationReducer, shallowEqual)

    const setContactPerson = (value) => dispatch({ type: 'SET_CONTACT_PERSON', payload: { ...value } })

    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                setContactPerson(result)
            })
    }

    const ContactPerson = async () => {

        dispatch(actionCreator.contactPersonUploadFirst())
        props.navigation.navigate('CompanyInfoSuccess')
    }

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
                initialValues={{ full_name: undefined, ic_no: undefined, phone: undefined, position: undefined }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setContactPerson(values)
                    ContactPerson(values)
                    //props.navigation.navigate('CompanyInfoSuccess')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { full_name, position, ic_no, phone } = FormikProps.values

                    const full_nameError = FormikProps.errors.full_name
                    const full_nameTouched = FormikProps.touched.full_name

                    const positionError = FormikProps.errors.position
                    const positionTouched = FormikProps.touched.position

                    const ic_noError = FormikProps.errors.ic_no
                    const ic_noTouched = FormikProps.touched.ic_no

                    const phoneError = FormikProps.errors.phone
                    const phoneTouched = FormikProps.touched.phone


                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                           {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} /> }
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT PERSON</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={full_name}
                                handleChange={FormikProps.handleChange(`full_name`)}
                                handleBlur={FormikProps.handleBlur(`full_name`)}
                                touched={full_nameTouched}
                                error={full_nameError}
                                placeholder={'Full Name'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={ic_no}
                                handleChange={FormikProps.handleChange(`ic_no`)}
                                handleBlur={FormikProps.handleBlur(`ic_no`)}
                                touched={ic_noTouched}
                                error={ic_noError}
                                placeholder={'MyKad No'}
                                keyboardType={'decimal-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/position.png')}
                                value={position}
                                handleChange={FormikProps.handleChange(`position`)}
                                handleBlur={FormikProps.handleBlur(`position`)}
                                touched={positionTouched}
                                error={positionError}
                                placeholder={'Position'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phone}
                                handleChange={FormikProps.handleChange(`phone`)}
                                handleBlur={FormikProps.handleBlur(`phone`)}
                                touched={phoneTouched}
                                error={phoneError}
                                placeholder={'Phone'}
                                keyboardType={'decimal-pad'}
                            />


                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row' }}>
                                {!name ? <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>MyKad Scanned Copy</Text> :
                                    <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>{name}</Text>}
                                <TouchableOpacity onPress={() => pickDoc()} style={{ padding: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: 'gainsboro', margin: 10 }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Select</Text>
                                </TouchableOpacity>
                            </View>

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


export default ContactPersonScreen