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
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class MyScoreScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    nav = (screen) => {
        this.props.navigation.navigate(screen)
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/grant.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                                <Tab heading="Mi-score">
                                    <Latest nav={this.nav} />
                                </Tab>
                                <Tab heading="E-score">
                                    <Popular nav={this.nav} />
                                </Tab>
                            </Tabs>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

class Latest extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Training                  :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>43 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Quiz                         :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>56 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Aggregate test   :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>38 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

class Popular extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Last year income        :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>43 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Paid up capital            :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>56 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Rejected profit/loss  :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>38 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Collateral                      :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>50 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Deposit/liquids         :</Text>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>46 points</Text>
                        <View style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Increase points</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}



function mapStateToProps(state) {
    return {



    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyScoreScreen)