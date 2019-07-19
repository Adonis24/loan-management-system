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
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class MyAccountEditScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        //this.props.initiateMyAccount()
        //this.props.navigation.navigate('PopupScore')
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 6, backgroundColor: 'blue' }}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                   <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', padding: 5 }}>
                                <Image source={{ uri: this.props.profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff' }]} resizeMode={'cover'} />
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.props.name}</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.props.companyName}</Text>
                                <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 5, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                        <Ionicons name='ios-cube' color={'#2FD9FE'} size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toggleShow()} style={{ padding: 5,paddingLeft:10,paddingRight:10 }}>
                                        <Ionicons name='ios-qr-scanner' color={'#2FD9FE'} size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
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
                                <Ionicons name="ios-create" size={24} color="lightgrey" />
                            </View>
                            <View style={{ width: Layout.window.width, paddingLeft:5 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Name :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Mardhiah</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Gender :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Female</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Address :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>69-4, Taman Equine</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Postcode :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>43300</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Country :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={[styles.textDefault, {alignSelf:'flex-start',textAlign:'left'}]}>Malaysia</Text></View>
                                </View>
                            </View>
                            
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        member_id: state.myAccountReducer.member_id,
        name: state.myAccountReducer.name,
        email: state.myAccountReducer.email,
        phone_no: state.myAccountReducer.phone_no,
        profile_pic: state.myAccountReducer.profile_pic,
        email_verified_at: state.myAccountReducer.email_verified_at,

        companyName: state.bizInfoReducer.name,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccountEditScreen)