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
    CheckBox

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import * as DocumentPicker from 'expo-document-picker';
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Button } from 'native-base';

class ContactPersonMainScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    pickDoc() {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))
                //this.props.saveDocument(result)
                this.props.saveDocumentDO(result)
            })
    }

    async ContactPerson() {
        //await this.props.companyInfo()
        this.props.contactPersonMain()
        // this.props.navigation.navigate('ContactPersonSuccess')
    }

    render() {
        this.props.proceedMain && this.props.navigation.navigate('ContactPersonSuccess')

        var nameBorderColor = '#5a83c2'
        const nameError = this.props.errorColor && this.props.errorColor.find(test => test == "Name")
        if (nameError == "Name") {
            nameBorderColor = '#d94498'
        }

        var mykadBorderColor = '#5a83c2'
        const mykadError = this.props.error && this.props.errorColor.find(test => test == "MyKad")
        if (mykadError == "MyKad") {
            mykadBorderColor = '#d94498'
        }

        var positionBorderColor = '#5a83c2'
        const positionError = this.props.error && this.props.errorColor.find(test => test == "Position")
        if (positionError == "Position") {
            positionBorderColor = '#d94498'
        }

        var phoneBorderColor = '#5a83c2'
        const phoneError = this.props.errorColor && this.props.errorColor.find(test => test == "Phone")
        if (phoneError == "Phone") {
            phoneBorderColor = '#d94498'
        }

        var nameErrorHint = ''
        var mykadErrorHint = ''
        var positionErrorHint = ''
        var phoneErrorHint = ''

        this.props.error && this.props.error.map(err => {
            if (err.title == 'name') { nameErrorHint = err.desc }
            if (err.title == 'mykad') { mykadErrorHint = err.desc }
            if (err.title == 'position') { positionErrorHint = err.desc }
            if (err.title == 'phone') { phoneErrorHint = err.desc }
        })

        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} />
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT PERSON</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(full_name) => this.props.setContactPerson({ full_name })} value={this.props.full_name} style={{ marginLeft: 5 }} placeholder={(nameErrorHint.length > 0) ? nameErrorHint : 'Full Name'} placeholderTextColor={(nameErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(ic_no) => this.props.setContactPerson({ ic_no })} value={this.props.ic_no} style={{ marginLeft: 5, flex: 1 }} placeholder={(mykadErrorHint.length > 0) ? mykadErrorHint : 'MyKad Number'} placeholderTextColor={(mykadErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/position.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.position} onChangeText={(position) => this.props.setContactPerson({ position })} value={this.props.contactPosition} style={{ marginLeft: 5, flex: 1 }} placeholder={(positionErrorHint.length > 0) ? positionErrorHint : 'Position'} placeholderTextColor={(positionErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20 }}>
                                <Image source={require('../assets/images/phoneNum.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput onChangeText={(phone) => this.props.setContactPerson({ phone })} value={this.props.phone} style={{ marginLeft: 5, flex: 1 }} placeholder={(phoneErrorHint.length > 0) ? phoneErrorHint : 'Phone Number'} placeholderTextColor={(phoneErrorHint.length > 0) ? 'rgba(255,0,0,0.3)' : 'lightgrey'} keyboardType={'phone-pad'} />
                            </View>
                            {/* <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12 }]}>
                                <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12, fontWeight: 'bold' }]}>Upload documents needed:</Text> Scanned copy of identity card
                            </Text> */}
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row' }}>
                                {!this.props.fileName ? <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>MyKad Scanned Copy</Text> :
                                    <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>{this.props.fileName}</Text>}
                                <TouchableOpacity onPress={() => this.pickDoc()} style={{ padding: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: 'gainsboro', margin: 10 }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Select</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <TouchableOpacity onPress={() => this.ContactPerson()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Submit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
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
        full_name: state.companyInformationReducer.full_name,
        ic_no: state.companyInformationReducer.ic_no,
        phone: state.companyInformationReducer.phone,
        position: state.companyInformationReducer.position,
        ic_image: state.companyInformationReducer.ic_image,

        proceedMain: state.companyInformationReducer.proceedMain,
        error: state.companyInformationReducer.error,
        errorColor: state.companyInformationReducer.errorColor,
        fileName: state.companyInformationReducer.fileName,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setContactPerson: (value) => dispatch({ type: 'SET_CONTACT_PERSON', payload: { ...value } }),
        contactPersonMain: () => dispatch(actionCreator.contactPersonMain()),
        saveDocument: (result) => dispatch(actionCreator.saveDocument(result)),
        saveDocumentDO: (result) => dispatch(actionCreator.saveDocumentDO(result))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactPersonMainScreen)