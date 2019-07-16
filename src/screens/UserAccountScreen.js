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

import QRCode from 'react-native-qrcode'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class UserAccountScreen extends React.PureComponent {
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
    }
    render() {

        const member_id=this.props.navigation.getParam('member_id','no_id')

        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.popUp}
                    onRequestClose={() => this.toggleShow()}
                >
                    <QRCode value={this.props.member_id} size={Layout.window.width / 2} bgColor='black' fgColor='white' />

                </Modal>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 6, backgroundColor: 'blue' }}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center', padding: 5 }}>
                                <Image source={{ uri: this.props.profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff' }]} resizeMode={'cover'} />
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.props.name}</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{member_id}</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>{this.props.companyName}</Text>

                                <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 3, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                        <Ionicons name='ios-cube' color={'#2FD9FE'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toggleShow()} style={{ padding: 5 }}>
                                        <Ionicons name='ios-qr-scanner' color={'#2FD9FE'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccountEdit')} style={{ padding: 5 }}>
                                        <Ionicons name='ios-chatboxes' color={'#2FD9FE'} />
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
                            {/** Recent Activities */}
                            <View style={{ margin: 5, paddingBottom: 5, }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Recent Activities</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Text style={[styles.caption, { alignSelf: 'flex-end' }]}>20/2/2019</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', padding: 5 }}>
                                        <Image source={require('../assets/images/e-info.png')} style={{ flex: 1, width: undefined, height: Layout.window.height / 20, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                        <Text style={[styles.caption, { flex: 3, alignItems: 'flex-start', textAlign: 'left' }]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Text style={[styles.caption, { alignSelf: 'flex-end' }]}>20/2/2019</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', padding: 5 }}>
                                        <Image source={require('../assets/images/e-info.png')} style={{ flex: 1, width: undefined, height: Layout.window.height / 20, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                        <Text style={[styles.caption, { flex: 3, alignItems: 'flex-start', textAlign: 'left' }]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                    </View>
                                </View>
                            </View>

                            {/**Projects */}
                            <View style={{ margin: 5, paddingBottom: 5, }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Projects</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Text style={[styles.caption, { alignSelf: 'flex-end' }]}>20/2/2019</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', padding: 5 }}>
                                        <Image source={require('../assets/images/e-info.png')} style={{ flex: 1, width: undefined, height: Layout.window.height / 20, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                        <Text style={[styles.caption, { flex: 3, alignItems: 'flex-start', textAlign: 'left' }]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Text style={[styles.caption, { alignSelf: 'flex-end' }]}>20/2/2019</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', padding: 5 }}>
                                        <Image source={require('../assets/images/e-info.png')} style={{ flex: 1, width: undefined, height: Layout.window.height / 20, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                        <Text style={[styles.caption, { flex: 3, alignItems: 'flex-start', textAlign: 'left' }]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountScreen)