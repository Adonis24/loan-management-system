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
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



class InfoNewsListScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    nav = (screen, item) => {
        this.props.navigation.navigate(screen, { item })
    }

    async componentDidMount() {
        await this.props.initiateNews()
    }
    render() {
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
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/news.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>News</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        {this.props.newsArray && this.props.newsArray.length > 0 ? <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: 'transparent' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Latest">
                                <Latest nav={this.nav} newsArray={this.props.newsArray} />
                            </Tab>
                            <Tab heading="Popular">
                                <Popular nav={this.nav} newsArray={this.props.newsArray} />
                            </Tab>
                        </Tabs> : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                                {/*                             
                                <Image source={require('../assets/images/bizlicensing.png')} style={{ flex:1,width: undefined, height: Layout.window.height / 1.5, alignSelf: 'center',opacity:0.3, borderWidth:1,borderColor:'#000' }} resizeMode={'contain'} /> */}

                            </View>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

class Latest extends React.PureComponent {
    render() {
        return (
            <ScrollView contentContainerStyle={{ width: Layout.window.width }} style={{ width: Layout.window.width, padding: 20 }}>
                {this.props.newsArray &&
                    <FlatList
                        data={this.props.newsArray}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={() => this.props.nav('InfoNews', item)}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 5, borderRadius: 10 }} resizeMode={'cover'} />
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
                {this.props.newsArray &&
                    <FlatList
                        data={this.props.newsArray}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) => (
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.nav('InfoNews', item)}>
                                    <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10, borderRadius: 10 }} resizeMode={'cover'} />
                                </TouchableOpacity>
                            </View>
                        )} />
                }
            </ScrollView>
        )
    }
}


function mapStateToProps(state) {
    return {

        newsArray: state.newsScreenReducer.newsArray

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateNews: () => dispatch(actionCreator.initiateNews())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoNewsListScreen)