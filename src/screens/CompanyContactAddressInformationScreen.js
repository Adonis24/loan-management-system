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

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class CompanyContactAddressInformationScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async companyInformation() {
        await this.props.companyInfo()
        await this.props.navigation.navigate('CompanyInfoSuccess')
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
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>COMPANY ADDRESS</Text>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'Line 1'} value={this.props.comp_addr} onChangeText={(comp_addr) => this.props.setCompanyInfo({ comp_addr })} style={{ marginLeft: 5,flex:1 }} />
                            </View>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'Line 2'} value={this.props.comp_addr_2} onChangeText={(comp_addr_2) => this.props.setCompanyInfo({ comp_addr_2 })} style={{ marginLeft: 5,flex:1 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'City'} value={this.props.comp_city} onChangeText={(comp_city) => this.props.setCompanyInfo({ comp_city })} style={{ marginLeft: 5,flex:1 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput placeholder={'State'} value={this.props.comp_state} onChangeText={(comp_state) => this.props.setCompanyInfo({ comp_state })} style={{ marginLeft: 5,flex:1 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput keyboardType='number-pad' placeholder={'Postcode'} value={this.props.comp_postcode} onChangeText={(comp_postcode) => this.props.setCompanyInfo({ comp_postcode })} style={{ marginLeft: 5,flex:1 }} />
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end' }}>

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
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCompanyInfo: (value) => dispatch({ type: 'SET_COMPANY_INFO', payload: { ...value } }),
        companyInfo: () => dispatch(actionCreator.companyInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyContactAddressInformationScreen)