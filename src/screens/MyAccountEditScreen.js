//console.ignoredYellowBox = ['Setting a timer']
import React,{ useEffect} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import * as actionCreator from '../store/actions/action'

const MyAccountEditScreen = (props) => {

    const dispatch = useDispatch()
    const { member_id, name, email,phone_no,profile_pic,email_verified_at} = useSelector(state => state.bizInfoReducer, shallowEqual)
    const  companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)
    

    useEffect(() => {
        dispatch(actionCreator.initiateMyAccount())
    }, []); // empty-array means don't watch for any updates


   {/* componentDidMount() {
        //this.props.initiateMyAccount()
        //this.props.navigation.navigate('PopupScore')
    } */}
    

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>
                {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View> */}
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 6, backgroundColor: 'blue' }}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff' }]} resizeMode={'cover'} />
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{name}</Text>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{companyName}</Text>
                            <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 5, backgroundColor: '#fff' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                    <Ionicons name='ios-cube' color={'#2FD9FE'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleShow()} style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                    <Ionicons name='ios-qr-scanner' color={'#2FD9FE'} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                    <Ionicons name='ios-chatboxes' color={'#2FD9FE'} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 5 }}>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>43 Connections</Text>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>5 Projects</Text>
                        </View>
                    </LinearGradient>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 9 }}>
                    <ScrollView contentStyle={{ padding: 10 }} >
                        <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                            <Text style={styles.subTitle}>Profile</Text>
                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                        </View>
                        <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Name :</Text></View>
                                <View style={{ flex: 3 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Mardhiah</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Gender :</Text></View>
                                <View style={{ flex: 3 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Female</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Address :</Text></View>
                                <View style={{ flex: 3 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>69-4, Taman Equine</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Postcode :</Text></View>
                                <View style={{ flex: 3 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>43300</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Country :</Text></View>
                                <View style={{ flex: 3 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Malaysia</Text></View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </View>
    );

}


export default MyAccountEditScreen