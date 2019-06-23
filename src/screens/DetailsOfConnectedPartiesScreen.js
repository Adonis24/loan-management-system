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
    ImageBackground


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class DetailsOfConnectedPartiesScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    async DetailConnect() {
        this.props.detailConnect()
        this.props.navigation.navigate('DeclarationDigitalSign')
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>REGISTRATION</Text>
                            <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} />
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Details of Connected Party</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.capacity} onChangeText={(capacity) => this.props.setDetailConnect({ capacity })} placeholder={'Capacity'} value={this.props.detailCapacity} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.capacnameCPity} onChangeText={(nameCP) => this.props.setDetailConnect({ nameCP })} placeholder={'Name of Connected Party'} value={this.props.detailConnected} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.icNumber} onChangeText={(icNumber) => this.props.setDetailConnect({ icNumber })} placeholder={'IC Number'} value={this.props.detailICNumber} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.capacirelationshipty} onChangeText={(relationship) => this.props.setDetailConnect({ relationship })} placeholder={'Relationship'} value={this.props.detailRelationship} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.emailSME} onChangeText={(emailSME) => this.props.setDetailConnect({ emailSME })} placeholder={'Email Address SME Bank'} value={this.props.detailEmailSME} style={{ marginLeft: 5 }} />
                            </View>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.DetailConnect()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Next</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        capacity: state.companyInformationReducer.capacity,
        nameCP: state.companyInformationReducer.nameCP,
        icNumber: state.companyInformationReducer.icNumber,
        relationship: state.companyInformationReducer.relationship,
        emailSME: state.companyInformationReducer.emailSME
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setDetailConnect: (value) => dispatch({ type: 'SET_DETAIL_CONNECT', payload: { ...value } }),
        detailConnect: () => dispatch(actionCreator.detailConnect())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsOfConnectedPartiesScreen)