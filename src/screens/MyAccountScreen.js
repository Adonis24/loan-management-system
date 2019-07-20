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
    Modal
} from 'react-native';

import QRCode from 'react-native-qrcode-svg'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class MyAccountScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { popUp: false }

    }
    toggleShow = () => {
        this.setState({ popUp: !this.state.popUp })
    }
    componentDidMount() {
        //this.props.initiateMyAccount()
        //this.props.navigation.navigate('PopupScore')
        this.props.getConnectionStatus()
    }

    capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.popUp}
                    onRequestClose={() => this.toggleShow()}
                >
                    <TouchableOpacity onPress={() => this.toggleShow()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                        <View style={{ color: '#fff', borderRadius: 10, elevation: 3, padding: 10 }}>
                            <QRCode value={'test'} size={Layout.window.width / 1.5} backgroundColor='#fff' color='#000' />
                        </View>
                    </TouchableOpacity>
                </Modal>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 6, backgroundColor: 'blue' }}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', padding: 5 }}>
                                <Image source={{ uri: this.props.profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff', marginBottom: 5 }]} resizeMode={'cover'} />
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.capitalizeString(this.props.name)}</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.props.companyName}</Text>
                                <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 5, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                        <Ionicons name='ios-cube' color={'#2FD9FE'} size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toggleShow()} style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                        <QRCode value={'test'} size={20} backgroundColor='#fff' color='#2FD9FE' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                        <Ionicons name='ios-chatboxes' color={'#2FD9FE'} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 5 }}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Connections</Text>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AssociateDir')}><Text style={[styles.caption, { color: '#fff' }]}>{this.props.associateConnection} connected</Text></TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PendingDir')}><Text style={[styles.caption, { color: '#fff' }]}>{this.props.requestConnection} pending</Text></TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 9 }}>
                        <ScrollView contentStyle={{ padding: 10 }} >
                            

                            {/**Projects */}
                            <View style={{ margin: 5, paddingBottom: 5, }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Projects</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                                    <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                </View> */}
                                    {/* <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-end', textAlign: 'right' }]}>20/12/2019</Text> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        {/* <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' /> */}
                                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#000' }]}>No active projects at the moment</Text>

                                    </View>
                                </View>
                            </View>

                           
                        </ScrollView>
                    </View>
                </View>
            </View >
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

        associateConnection: state.myAccountReducer.associateConnection,
        requestConnection: state.myAccountReducer.requestConnection,
        allConnection: state.myAccountReducer.allConnection,

        companyName: state.bizInfoReducer.name,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        getConnectionStatus: () => dispatch(actionCreator.getConnectionStatus())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen)