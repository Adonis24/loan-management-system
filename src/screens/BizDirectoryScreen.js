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
    FlatList


} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import moment from 'moment'


class BizDirectoryScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    connect = (val) => {
        this.props.requestConnect(val)
    }



    componentDidMount() {
        this.props.getConnectionStatus()
        this.props.initiateBizDir()
        this.props.initiateAssociateDir()
        this.props.initiatePendingDir()

    }

    render() {
        this.props.bizDirArray && console.log(`ini lah bizdir ${JSON.stringify(this.props.bizDirArray)}`)
        this.props.pendingDirArray && console.log(`ini lah pending ${JSON.stringify(this.props.pendingDirArray)}`)
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 5, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/directory.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Directory</Text>
                            </View>
                        </View>
                    </View>
                    {/* START CONTENT */}
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>

                        <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading={`Associate (${this.props.associateConnection})`}>
                                <Associate connect={this.connect} assoDirArray={this.props.assoDirArray} />
                            </Tab>
                            <Tab heading={`Request (${this.props.requestConnection})`}>
                                <Pending connect={this.connect} pendingDirArray={this.props.pendingDirArray} />
                            </Tab>
                            <Tab heading={`All (${this.props.allConnection})`}>
                                <All connect={this.connect} bizDirArray={this.props.bizDirArray} />
                            </Tab>
                        </Tabs>

                    </View>
                    {/* END CONTENT */}
                </View>
            </View >
        );
    }
}

class Associate extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <FlatList
                    data={this.props.assoDirArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.name}</Text>
                            <Text style={[styles.caption, { margin: 5, }]}>Member since : {moment(item.created_at).format('LL')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.connect()} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

class Pending extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <FlatList
                    data={this.props.pendingDirArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.name}</Text>
                            <Text style={[styles.caption, { margin: 5, }]}>Member since : {moment(item.created_at).format('LL')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.connect(item.id)} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

class All extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <FlatList
                    data={this.props.bizDirArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.name}</Text>
                            <Text style={[styles.caption, { margin: 5, }]}>Member since : {moment(item.created_at).format('LL')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.connect(item.id)} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>Connect</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        bizDirArray: state.bizDirReducer.bizDirArray,
        assoDirArray: state.assoDirReducer.assoDirArray,
        pendingDirArray: state.pendingDirReducer.pendingDirArray,

        associateConnection: state.myAccountReducer.associateConnection,
        requestConnection: state.myAccountReducer.requestConnection,
        allConnection: state.myAccountReducer.allConnection,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateBizDir: () => dispatch(actionCreator.initiateBizDir()),
        initiatePendingDir: () => dispatch(actionCreator.initiatePendingDir()),
        initiateAssociateDir: () => dispatch(actionCreator.initiateAssociateDir()),

        getConnectionStatus: () => dispatch(actionCreator.getConnectionStatus()),
        requestConnect: (val) => dispatch(actionCreator.requestConnect(val)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BizDirectoryScreen)


