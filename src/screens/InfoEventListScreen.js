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
    FlatList,
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class InfoEventListScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    nav = (screen,item) => {
        this.props.navigation.navigate(screen,{item})
    }

    async componentDidMount() {
        await this.props.initiateEvent()
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
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/event.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Event</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Latest">
                                <Latest nav={this.nav} eventArray={this.props.eventArray} />
                            </Tab>
                            <Tab heading="Popular">
                                <Popular nav={this.nav} eventArray={this.props.eventArray} />
                            </Tab>
                        </Tabs>
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
                {this.props.eventArray &&
                    <FlatList
                        data={this.props.eventArray}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.nav('InfoEvent', item)}>
                                <Image source={{ uri: item.picture }} style={{ width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10 }} resizeMode={'cover'} />
                            </TouchableOpacity>
                        )} />
                }
            </ScrollView>
        )
    }
}

class Popular extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                {this.props.eventArray &&
                    <FlatList
                        data={this.props.eventArray}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.nav('InfoEvent', item)}>
                                <Image source={{ uri: item.picture }} style={{ width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10 }} resizeMode={'cover'} />
                            </TouchableOpacity>
                        )} />
                }
            </ScrollView>
        )
    }
}



function mapStateToProps(state) {
    return {

        eventArray: state.eventScreenReducer.eventArray

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateEvent: () => dispatch(actionCreator.initiateEvent())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoEventListScreen)