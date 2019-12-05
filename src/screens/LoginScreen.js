import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import { connect, shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreator from '../store/actions/action'

const validationSchema = Yup.object().shape({

    email: Yup
        .string()
        .required()
        .email()
        .label('Email'),

    password: Yup
        .string()
        .required()
        .min(6)
        .label('Password'),

});

const LoginScreen = (props) => {

    forgotPassword = async () => {
        let result = await WebBrowser.openBrowserAsync('https://staging.bxcess.my/password/reset');
        //this.setState({ result });
    };

    const proceed = useSelector(state => state.loginScreenReducer.proceed, shallowEqual)
    const all = useSelector(state => state.loginScreenReducer.message, shallowEqual)

    useEffect(() => {
        proceed && props.navigation.navigate("Dashboard")
    }, [proceed]);

    const dispatch = useDispatch()

    const login = (values) => {
        dispatch(actionCreator.login(values))
        dispatch(actionCreator.loginLMS(values))
    }

    return (

        <Formik initialValues={{ email: '', password: '' }} onSubmit={(values, actions) => {
            console.log(JSON.stringify(values))
            setTimeout(() => {
                login(values);
                actions.setSubmitting(false);
            }, 1000);
        }}
            validationSchema={validationSchema}
        >
            {FormikProps => {
                const { email, password } = FormikProps.values

                const emailError = FormikProps.errors.email
                const emailTouched = FormikProps.touched.email

                const passwordError = FormikProps.errors.password
                const passwordTouched = FormikProps.touched.password

                return (

                    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                            <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                            <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#d94498', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                        <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={email} onBlur={FormikProps.handleBlur('email')} onChangeText={FormikProps.handleChange('email')} placeholder={emailError && emailTouched ? '' : 'email@mail.com'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                        {emailError && emailTouched && <Text style={styles.error}>{emailError}</Text>}
                                    </View>
                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#d94498', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                        <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput secureTextEntry value={password} onBlur={FormikProps.handleBlur('password')} onChangeText={FormikProps.handleChange('password')} placeholder={passwordError && passwordTouched ? '' : '******'} style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5 }} />
                                        {passwordError && passwordTouched && <Text style={styles.error}>{passwordError}</Text>}
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5 }]}>Forgot password?</Text>
                                        <TouchableOpacity onPress={() => forgotPassword()}>
                                            <Text style={[styles.textDefault, { margin: 5, color: 'dodgerblue' }]}>Click here</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={FormikProps.handleSubmit} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: FormikProps.isValid ? '#0A6496' : 'rgba(10,100,150,0.5)' }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#0A6496', '#055E7C'] : ['rgba(10,100,150,0.5)', 'rgba(5,94,124,0.5)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                {FormikProps.isSubmitting ? <ActivityIndicator color={'#fff'} /> : <Text style={[styles.butang, { color: '#fff', justifyContent: 'center', alignItems: 'center' }]}>Log In</Text>}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View >
                )
            }}
        </Formik>
    )
}

LoginScreen.navigationOptions = {
    header: null,
};

export default LoginScreen