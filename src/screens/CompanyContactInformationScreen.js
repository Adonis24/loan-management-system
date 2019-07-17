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
    KeyboardAvoidingView


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class CompanyContactInformationScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async Next() {
        await this.props.companyContactInfo()
        // await this.props.navigation.navigate('CompanyInfoSuccess')
    }

    render() {
        this.props.proceedCompany && this.props.navigation.navigate('CompanyInfoSuccess')

        var phoneBorderColor = '#5a83c2'
        const phoneError = this.props.errorColor && this.props.errorColor.find(test => test == "Phone")
        if (phoneError == "Phone") {
            phoneBorderColor = '#d94498'
        }

        var emailBorderColor = '#5a83c2'
        const emailError = this.props.error && this.props.errorColor.find(test => test == "Email")
        if (emailError == "Email") {
            emailBorderColor = '#d94498'
        }

        var addressBorderColor = '#5a83c2'
        const addressError = this.props.error && this.props.errorColor.find(test => test == "Address")
        if (addressError == "Address") {
            addressBorderColor = '#d94498'
        }

        var phoneErrorHint = ''
        var emailErrorHint = ''
        var addressErrorHint = ''

        this.props.error && this.props.error.map(err => {
            if (err.title == 'phone') { phoneErrorHint = err.desc }
            if (err.title == 'email') { emailErrorHint = err.desc }
            if (err.title == 'address') { addressErrorHint = err.desc }
        })
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
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY CONTACT INFORMATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.comp_phone} onChangeText={(comp_phone) => this.props.setCompanyInfo({ comp_phone })} style={{ marginLeft: 5 }} placeholder={(phoneErrorHint.length > 0) ? phoneErrorHint : 'Company Phone Number'} placeholderTextColor={(phoneErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.comp_email} onChangeText={(comp_email) => this.props.setCompanyInfo({ comp_email })} style={{ marginLeft: 5 }} placeholder={(emailErrorHint.length > 0) ? emailErrorHint : 'Company Email Address'} placeholderTextColor={(emailErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyContactAddressInformation')} style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                {!this.props.comp_state ? <TextInput editable={false} value={this.props.comp_addr} onChangeText={(comp_addr) => this.props.setCompanyInfo({ comp_addr })} style={{ marginLeft: 5 }} placeholder={(addressErrorHint.length > 0) ? addressErrorHint : 'Company Address'} placeholderTextColor={(addressErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                                    : <View style={{ marginRight: 3, paddingBottom: 5 }}>
                                        <Text>{this.props.comp_addr}</Text>
                                        {this.props.comp_addr_2 && <Text>{this.props.comp_addr_2}</Text>}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{this.props.comp_postcode}</Text>
                                            <Text>{this.props.comp_city}</Text>
                                        </View>
                                        <Text>{this.props.comp_state}</Text>
                                    </View>}
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.Next()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        comp_phone: state.companyInformationReducer.comp_phone,
        comp_email: state.companyInformationReducer.comp_email,
        comp_addr: state.companyInformationReducer.comp_addr,
        comp_addr_2: state.companyInformationReducer.comp_addr_2,
        comp_city: state.companyInformationReducer.comp_city,
        comp_state: state.companyInformationReducer.comp_state,
        comp_postcode: state.companyInformationReducer.comp_postcode,

        proceedCompany: state.companyInformationReducer.proceedCompany,
        error: state.companyInformationReducer.error,
        errorColor: state.companyInformationReducer.errorColor,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCompanyInfo: (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } }),
        companyContactInfo: () => dispatch(actionCreator.companyContactInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyContactInformationScreen)