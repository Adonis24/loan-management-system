//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground,
    CheckBox,
    KeyboardAvoidingView

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import * as DocumentPicker from 'expo-document-picker';
import Layout from '../constants/Layout'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Button } from 'native-base';



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

    const { full_name, ic_no, phone, position, ic_image, proceedSubmit, error, errorColor, fileName } = useSelector(state => state.companyInformationReducer, shallowEqual)

    const setContactPerson = (value) => dispatch({ type: 'SET_CONTACT_PERSON', payload: { ...value } })

    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))
                //this.props.saveDocument(result)
                dispatch(actionCreator.saveDocumentDO(result))
            })
    }

    const ContactPerson = async () => {
        //await this.props.companyInfo()
        dispatch(actionCreator.contactPerson())
         props.navigation.navigate('CompanyInfoSuccess')
    }


    //proceedSubmit && props.navigation.navigate('CompanyInfoSuccess')



    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
                                    <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT PERSON</Text>
                                    <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>


                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: full_nameTouched && full_nameError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={full_name} onChangeText={FormikProps.handleChange(`full_name`)} onBlur={FormikProps.handleBlur(`full_name`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Full Name'} placeholderTextColor={full_nameTouched && full_nameError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {full_nameTouched && full_nameError && <Text style={styles.error}>{full_nameError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: ic_noTouched && ic_noError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={ic_no} onChangeText={FormikProps.handleChange(`ic_no`)} onBlur={FormikProps.handleBlur(`ic_no`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'MyKad No'} placeholderTextColor={ic_noTouched && ic_noError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {ic_noTouched && ic_noError && <Text style={styles.error}>{ic_noError}</Text>}
                                    </View>


                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: positionTouched && positionError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/position.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={position} onChangeText={FormikProps.handleChange(`position`)} onBlur={FormikProps.handleBlur(`position`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Position'} placeholderTextColor={positionTouched && positionError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'default'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {positionTouched && positionError && <Text style={styles.error}>{positionError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: phoneTouched && phoneError ? '#d94498' : '#5a83c2' }}>
                                        <Image source={require('../assets/images/phoneNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                        <TextInput value={phone} onChangeText={FormikProps.handleChange(`phone`)} onBlur={FormikProps.handleBlur(`phone`)} style={{ marginLeft: 5, flex: 1 }} placeholder={'Phone'} placeholderTextColor={phoneTouched && phoneError ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'decimal-pad'} />
                                    </View>
                                    <View style={{ width: Layout.window.width * 0.65 }}>
                                        {phoneTouched && phoneError && <Text style={styles.error}>{phoneError}</Text>}
                                    </View>

                                    <View style={{ alignSelf: 'stretch', borderWidth: 1, borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row' }}>
                                        {!fileName ? <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>MyKad Scanned Copy</Text> :
                                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>{fileName}</Text>}
                                        <TouchableOpacity onPress={() => pickDoc()} style={{ padding: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: 'gainsboro', margin: 10 }}>
                                            <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Select</Text>
                                        </TouchableOpacity>
                                    </View>




                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <TouchableOpacity disabled={!FormikProps.isValid} onPress={() => FormikProps.handleSubmit()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                            <LinearGradient colors={FormikProps.isValid ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }}
                    </Formik >


                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT PERSON</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(full_name) => setContactPerson({ full_name })} value={full_name} style={{ marginLeft: 5 }} placeholder={(nameErrorHint.length > 0) ? nameErrorHint : 'Full Name'} placeholderTextColor={(nameErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(ic_no) => setContactPerson({ ic_no })} value={ic_no} style={{ marginLeft: 5, flex: 1 }} placeholder={(mykadErrorHint.length > 0) ? mykadErrorHint : 'MyKad Number'} placeholderTextColor={(mykadErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/position.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={position} onChangeText={(position) => setContactPerson({ position })} style={{ marginLeft: 5, flex: 1 }} placeholder={(positionErrorHint.length > 0) ? positionErrorHint : 'Position'} placeholderTextColor={(positionErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/phoneNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(phone) => setContactPerson({ phone })} value={phone} style={{ marginLeft: 5, flex: 1 }} placeholder={(phoneErrorHint.length > 0) ? phoneErrorHint : 'Phone Number'} placeholderTextColor={(phoneErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                            </View>
                         
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row' }}>
                                {!fileName ? <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>MyKad Scanned Copy</Text> :
                                    <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>{fileName}</Text>}
                                <TouchableOpacity onPress={() => pickDoc()} style={{ padding: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: 'gainsboro', margin: 10 }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Select</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => ContactPerson()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Submit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}


export default ContactPersonScreen