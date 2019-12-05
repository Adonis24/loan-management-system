import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { connect, shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    name: Yup
        .string()
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

    const message = useSelector(state => state.registrationReducer.message, shallowEqual)
    const proceed = useSelector(state => state.registrationReducer.proceed, shallowEqual)

    useEffect(() => {
        console.log(`proceed ialah ${proceed}`)
        proceed && props.navigation.navigate('SignUpPersonalSuccess');
    }, [proceed]);

    const register = (values) => {
        dispatch(actionCreator.getToken(values))
        dispatch({ type: 'SET_REGISTER', payload: { ...values } })
        dispatch(actionCreator.register(values))
        dispatch(actionCreator.getPersonalToken(values))
        dispatch(actionCreator.getTokenLMS(values))
        dispatch(actionCreator.registerLMS(values))
    }

    const dispatch = useDispatch()

    return (

        <Formik onSubmit={(values, actions) => {
            register(values)
            actions.setSubmitting(false)
        }}
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

                    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                            <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                                    <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Personal Info</Text>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={name} onBlur={FormikProps.handleBlur('name')} onChangeText={FormikProps.handleChange('name')} placeholder={nameTouched && nameError ? '' : 'Eg: Ahmad bin Ali'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                        {nameTouched && nameError && <Text style={styles.error}>{nameError}</Text>}
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailTouched && emailError ? '' : 'Eg: abc@email.com'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} keyboardType={'email-address'} />
                                        {emailTouched && emailError && <Text style={styles.error}>{emailError}</Text>}
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} placeholder={passwordTouched && passwordError ? '' : '******'} onChangeText={FormikProps.handleChange('password')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={passwordTouched && passwordError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {passwordTouched && passwordError && <Text style={styles.error}>{passwordError}</Text>}
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#5a83c2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password_confirmation} onBlur={FormikProps.handleBlur('password_confirmation')} placeholder={password_confirmationTouched && password_confirmationError ? '' : '******'} onChangeText={FormikProps.handleChange('password_confirmation')} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} placeholderTextColor={password_confirmationTouched && password_confirmationError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                        {password_confirmationTouched && password_confirmationError && <Text style={styles.error}>{password_confirmationError}</Text>}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }}>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, borderColor: '#D3D3D3', borderWidth: 1 }}>
                                            <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.butang, { color: 'lightgrey' }]}>Back</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ flex: 1, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)', borderWidth: 1 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff' }]}>Next</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                )
            }}
        </Formik>
    )

}

SignupPersonalScreen.navigationOptions = {
    header: null,
};

export default SignupPersonalScreen;