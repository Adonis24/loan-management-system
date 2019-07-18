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

class SettingsScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    logout() {
        this.props.logout()
        this.props.navigation.navigate('Welcome')
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
                    {/* HEADER */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />

                        </View>
                        <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 5, flexDirection: 'row' }}>

                            </View>
                            <View style={[{ backgroundColor: '#fff', flex: 4, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', paddingLeft: 5, flexDirection: 'row', elevation: 2 }]}>

                                <Image source={require('../assets/images/profile.png')} style={{ width: Layout.window.width / 10, height: undefined, }} resizeMode={'contain'} />
                                <Text style={[styles.textDefault, { fontSize: 18, fontWeight: "bold", paddingLeft: 5, }]} numberOfLines={1} ellipsizeMode={'tail'}>Settings</Text>

                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <ScrollView contentStyle={{ padding: 10 }} >

                            <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={styles.subTitle}>Profile Picture</Text>
                                <Ionicons name="ios-create" size={24} color="lightgrey" />
                            </View>
                            <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                                <Image source={{ uri: this.props.profile_pic }} style={{ width: Layout.window.width / 3, height: Layout.window.height / 6 }} />
                            </View>
                            <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={styles.subTitle}>Profile</Text>
                                <Ionicons name="ios-create" size={24} color="lightgrey" />
                            </View>
                            <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Name :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.name}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.email}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Phone :</Text></View>
                                    <View style={{ flex: 2 }}>
                                        {this.props.phone_no ? <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.phone_no}</Text> :
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpOtp',{screen:'setting'})} style={{ borderRadius: 5 }}>
                                                <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', padding: 5 }]}>Add Phone</Text>
                                            </TouchableOpacity>}
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>IC :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.ic_no}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Membership:</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.member_id}</Text></View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
                                <TouchableOpacity onPress={() => this.logout()} style={{ marginLeft: 5, backgroundColor: 'orange', borderRadius: 5 }}>
                                    <Text style={[styles.textDefault, { margin: 10 }]}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* <PopupScoreScreen /> */}

                <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanQR')}>
                        <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
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
        ic_no: state.myAccountReducer.ic_no,
        member_id: state.myAccountReducer.member_id,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(actionCreator.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)