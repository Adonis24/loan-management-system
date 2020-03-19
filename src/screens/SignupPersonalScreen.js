//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { CustomTextInput,CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'
import LayoutA from '../Layout/LayoutA';

const validationSchema = Yup.object().shape({

    name: Yup
        .string('Please enter')
        .required()
        .min(3)
        .label('Name'),

    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),

    password: Yup
        .string()
        .min(6)
        .required()
        .label('Password'),

    password_confirmation: Yup
        .string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .label('Password Confirmation'),

});

const SignupPersonalScreen = (props) => {

    const dispatch = useDispatch()
    const publicToken = useSelector(state => state.registrationReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    publicToken && console.log(`registration token ialah :${JSON.stringify(publicToken)} `)

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    useEffect(() => {
        dispatch(actionCreator.getToken())
        dispatch(actionCreator.getTokenLMS())
    }, []);

    const [showLogo, setshowLogo] = useState(true)

    const register = async (values) => {

        await dispatch(actionCreator.register(values))
        await dispatch(actionCreator.registerLMS(values))
        //await this.props.getPersonalToken();
        await props.navigation.navigate('SignUpPersonalSuccess')
    }

    return (
        <LayoutA>
            <Formik
                validateOnMount
                initialValues={{}} onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    dispatch({ type: 'SET_REGISTER', payload: { ...values } })
                    register(values)
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { name, email, password, password_confirmation } = FormikProps.values

                    const nameError = FormikProps.errors.name
                    const nameTouched = FormikProps.touched.name

                    const emailError = FormikProps.errors.email
                    const emailTouched = FormikProps.touched.email

                    const passwordError = FormikProps.errors.password
                    const passwordTouched = FormikProps.touched.password

                    const password_confirmationError = FormikProps.errors.password_confirmation
                    const password_confirmationTouched = FormikProps.touched.password_confirmation

                    return (
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Personal Info</Text>

                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={name}
                                handleChange={FormikProps.handleChange(`name`)}
                                handleBlur={FormikProps.handleBlur(`name`)}
                                touched={nameTouched}
                                error={nameError}
                                placeholder={'Full name'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/email.png')}
                                value={email}
                                handleChange={FormikProps.handleChange(`email`)}
                                handleBlur={FormikProps.handleBlur(`email`)}
                                touched={emailTouched}
                                error={emailError}
                                placeholder={'email@address.com'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/password.png')}
                                value={password}
                                secureText={true}
                                handleChange={FormikProps.handleChange(`password`)}
                                handleBlur={FormikProps.handleBlur(`password`)}
                                touched={passwordTouched}
                                error={passwordError}
                                placeholder={'Password'}

                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/password.png')}
                                value={password_confirmation}
                                secureText={true}
                                handleChange={FormikProps.handleChange(`password_confirmation`)}
                                handleBlur={FormikProps.handleBlur(`password_confirmation`)}
                                touched={password_confirmationTouched}
                                error={password_confirmationError}
                                placeholder={'Confirm Password'}

                            />

                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                            {/* {indicator && <ActivityIndicator color={'#34c6f4'} style={{ marginLeft: 5 }} />} */}
                        </View>

                    )
                }}
            </Formik >
        </LayoutA>
    );
}

export default SignupPersonalScreen