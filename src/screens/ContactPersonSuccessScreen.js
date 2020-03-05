//console.ignoredYellowBox = ['Setting a timer']
import React,{useEffect} from 'react';
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
import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Button } from 'native-base';


const ContactPersonSuccessScreen = (props) => {

    const dispatch = useDispatch()
    const { listWorkers } = useSelector(state => state.listWorkersReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.initiateListWorkers())
    }, []); // empty-array means don't watch for any updates

    const done = () => {
        //await this.props.companyInfo()
        //this.props.contactPerson()
        dispatch(actionCreator.doneForNow())
        props.navigation.navigate('Dashboard')
    }

  {/*  async done() {
        //await this.props.companyInfo()
        //this.props.contactPerson()
        this.props.doneForNow()
        this.props.navigation.navigate('Dashboard')
    }  */}

   

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
                        {listWorkers && listWorkers.map(
                            (lw, i) => <View key={i} style={{ flexDirection: 'row', }}>
                                <Text >{i}</Text><Text>{lw.full_name}</Text></View>
                        )}
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <TouchableOpacity onPress={() => done()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Enter Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

}



export default ContactPersonSuccessScreen