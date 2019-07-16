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
        await this.props.navigation.navigate('CompanyContactInformation')
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
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY INFORMATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for your company.</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'Company Name'} value={this.props.comp_name} onChangeText={(comp_name) => this.props.setCompanyInfo({ comp_name })} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'Company Registration Number'} value={this.props.comp_regno} onChangeText={(comp_regno) => this.props.setCompanyInfo({ comp_regno })} style={{ marginLeft: 5 }} />
                            </View>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5, marginRight: 3 }} resizeMode={'contain'} />

                                <DatePicker
                                    defaultDate={new Date()}
                                    // minimumDate={new Date(2018, 1, 1)}
                                    // maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Company Registration Date"
                                    textStyle={{ color: "#000" }}
                                    placeHolderTextStyle={{ fontFamily: 'Roboto-regular', color: 'lightgrey' }}
                                    onDateChange={(newDate) => this.setDate(newDate)}
                                    disabled={false}
                                />
                            </View>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'Main Business Activities'} value={this.props.comp_main_biz_act} onChangeText={(comp_main_biz_act) => this.props.setCompanyInfo({ comp_main_biz_act })} style={{ marginLeft: 5 }} />
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

    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCompanyInfo: (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } }),
        companyInfo: () => dispatch(actionCreator.companyInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformationScreen)