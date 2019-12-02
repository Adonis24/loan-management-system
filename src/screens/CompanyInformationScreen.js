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
import { DatePicker } from 'native-base'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class CompanyInformationScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async companyInformation() {
        await this.props.companyInfo()
    }

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        this.props.setCompanyInfo({ comp_regdate: moment(newDate).format() })
    }

    render() {
        this.props.proceed && this.props.navigation.navigate('CompanyContactInformation')

        var nameBorderColor = '#5a83c2'
        const nameError = this.props.errorColor && this.props.errorColor.find(test => test == "Name")
        if (nameError == "Name") {
            nameBorderColor = '#d94498'
        }

        var regBorderColor = '#5a83c2'
        const regError = this.props.error && this.props.errorColor.find(test => test == "Reg Number")
        if (regError == "Reg Number") {
            regBorderColor = '#d94498'
        }

        var dateBorderColor = '#5a83c2'
        const dateError = this.props.error && this.props.errorColor.find(test => test == "Date")
        if (dateError == "Date") {
            dateBorderColor = '#d94498'
        }

        var businessBorderColor = '#5a83c2'
        const businessError = this.props.error && this.props.errorColor.find(test => test == "Business")
        if (businessError == "Business") {
            businessBorderColor = '#d94498'
        }

        var nameErrorHint = ''
        var regErrorHint = ''
        var dateErrorHint = ''
        var businessErrorHint = ''

        this.props.error && this.props.error.map(err => {
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
                                <TextInput value={this.props.comp_name} onChangeText={(comp_name) => this.props.setCompanyInfo({ comp_name })} style={{ marginLeft: 5, flex: 1 }} placeholder={(nameErrorHint.length > 0) ? nameErrorHint : 'Company/Firm Name'} placeholderTextColor={(nameErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/compRegNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.comp_regno} onChangeText={(comp_regno) => this.props.setCompanyInfo({ comp_regno })} style={{ marginLeft: 5, flex: 1 }} placeholder={(regErrorHint.length > 0) ? regErrorHint : 'Company Registration Number'} placeholderTextColor={(regErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
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
                                    onDateChange={(newDate) => this.setDate(newDate)}
                                    disabled={false}
                                />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.comp_main_biz_act} onChangeText={(comp_main_biz_act) => this.props.setCompanyInfo({ comp_main_biz_act })} style={{ marginLeft: 5, flex: 1 }} placeholder={(businessErrorHint.length > 0) ? businessErrorHint : 'Main Business Activities'} placeholderTextColor={(businessErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.companyInformation()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
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
        comp_name: state.companyInformationReducer.companyName,
        comp_regno: state.companyInformationReducer.regNumber,
        comp_regdate: state.companyInformationReducer.compAddress,
        comp_main_biz_act: state.companyInformationReducer.businessActivities,

        proceed: state.companyInformationReducer.proceed,
        error: state.companyInformationReducer.error,
        errorColor: state.companyInformationReducer.errorColor,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCompanyInfo: (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } }),
        companyInfo: () => dispatch(actionCreator.companyInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformationScreen)