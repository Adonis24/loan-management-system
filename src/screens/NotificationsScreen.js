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
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class NotificationsScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    render() {
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
                                <Text style={[styles.textDefault, { fontSize: 18, fontWeight: "bold", paddingLeft: 5, }]} numberOfLines={1} ellipsizeMode={'tail'}>Notifications</Text>

                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <ScrollView contentStyle={{ padding: 10 }} >
                            {this.props.notificationList && this.props.notificationList.length > 0 ?
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                                    <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                </View> */}
                                    <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-end', textAlign: 'right' }]}>20/12/2019</Text>
                                    <Text numberOfLines={3} ellipsizeMode={'tail'} style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcorper luctus porttitor. Sed a venenatis ipsum, eget suscipit sapien. Aliquam ornare sagittis felis et tempor. </Text>
                                </View> :
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                            <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                        </View> */}
                                    <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start',color:'lightgrey' }]}>No notification yet</Text>
                                </View>}
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

        notificationList: []

    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)