//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
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
    KeyboardAvoidingView


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { DatePicker } from 'native-base'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const CompanyInformationScreen = (props) => {

    const dispatch = useDispatch()

    const companyInformation = async () => {
        await dispatch(actionCreator.companyInfo())
        props.navigation.navigate('CompanyContactInformation')
    }

    const [chosenDate, setChosenDate] = useState(new Date())

    const setCompanyInfo = (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } })

    const setDate = (newDate) => {
   
        setChosenDate(newDate)
        setCompanyInfo({ compAddress: moment(newDate).format() })
    }

    const { companyName, regNumber, compAddress, businessActivities,proceed, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)


    
   

    proceed && props.navigation.navigate('CompanyContactInformation')

    var nameBorderColor = '#5a83c2'
    const nameError = errorColor && errorColor.find(test => test == "Name")
    if (nameError == "Name") {
        nameBorderColor = '#d94498'
    }

    var regBorderColor = '#5a83c2'
    const regError = error && errorColor.find(test => test == "Reg Number")
    if (regError == "Reg Number") {
        regBorderColor = '#d94498'
    }

    var dateBorderColor = '#5a83c2'
    const dateError = error && errorColor.find(test => test == "Date")
    if (dateError == "Date") {
        dateBorderColor = '#d94498'
    }

    var businessBorderColor = '#5a83c2'
    const businessError = error && errorColor.find(test => test == "Business")
    if (businessError == "Business") {
        businessBorderColor = '#d94498'
    }

    var nameErrorHint = ''
    var regErrorHint = ''
    var dateErrorHint = ''
    var businessErrorHint = ''

    error && error.map(err => {
        if (err.title == 'name') { nameErrorHint = err.desc }
        if (err.title == 'reg number') { regErrorHint = err.desc }
        if (err.title == 'date') { dateErrorHint = err.desc }
        if (err.title == 'business') { businessErrorHint = err.desc }
    })
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFORMATION</Text>
                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/company.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput value={companyName} onChangeText={(companyName) => setCompanyInfo({ companyName })} style={{ marginLeft: 5, flex: 1 }} placeholder={(nameErrorHint.length > 0) ? nameErrorHint : 'Company/Firm Name'} placeholderTextColor={(nameErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                        </View>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput value={regNumber} onChangeText={(regNumber) => setCompanyInfo({ regNumber })} style={{ marginLeft: 5, flex: 1 }} placeholder={(regErrorHint.length > 0) ? regErrorHint : 'Company Registration Number'} placeholderTextColor={(regErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                        </View>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/regDate.png')} style={{ height: 30, width: 30, margin: 5, marginRight: 3 }} resizeMode={'contain'} />
                            <DatePicker
                                defaultDate={new Date()}
                                // minimumDate={new Date(2018, 1, 1)}
                                // maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                // placeHolderText="Company Registration Date"
                                placeHolderText={(dateErrorHint.length > 0) ? dateErrorHint : 'Company Registration Date'}
                                placeHolderTextColor={(dateErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'}
                                textStyle={{ color: "#000" }}
                                placeHolderTextStyle={{ fontFamily: 'Roboto-regular', color: 'lightgrey' }}
                                onDateChange={(newDate) => setDate(newDate)}
                                disabled={false}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                            <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                            <TextInput value={businessActivities} onChangeText={(businessActivities) => setCompanyInfo({ businessActivities })} style={{ marginLeft: 5, flex: 1 }} placeholder={(businessErrorHint.length > 0) ? businessErrorHint : 'Main Business Activities'} placeholderTextColor={(businessErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity onPress={() => companyInformation()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}



export default CompanyInformationScreen