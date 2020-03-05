//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
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
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import * as DocumentPicker from 'expo-document-picker';
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Button } from 'native-base';


const DocUploadScreen = (props) => {

    const dispatch = useDispatch()

    const { fullName, myKad, phoneNum, position } = useSelector(state => state.companyInformationReducer, shallowEqual)



    const saveDocument = (result) => dispatch(actionCreator.saveDocument(result))
    const saveDocumentDO = (result) => dispatch(actionCreator.saveDocumentDO(result))

    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))
                //saveDocument(result)
               saveDocumentDO(result)
            })
    }

    
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
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>CONTACT PERSON</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={fullName} onChangeText={(fullName) => setContactPerson({ fullName })} placeholder={'Full Name '} value={contactFullName} style={{ marginLeft: 5 }} />
                            </View>

                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12 }]}>
                                <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12, fontWeight: 'bold' }]}>Upload documents needed:</Text> Copies of identity cards of the owners or partners / copies of the identity cards of all the shareholders and directors / official registration document, business official documents.
                            </Text>
                            <View style={{ width: Layout.window.width * 0.7, height: Layout.window.height * 0.06, borderWidth: 1, alignSelf: 'center', borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => pickDoc()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: 'gainsboro' }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Upload documents</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </View >
        );
    }



    export default DocUploadScreen