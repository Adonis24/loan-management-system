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
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class FinancingScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.initiateListAgency()
        this.props.initiateLoanInfo()
    }

    nav = (screen) => {
        this.props.navigation.navigate(screen)
    }

    changePage = (page = 1) => {
        this.props.initiateLoanInfo(page)
    }

    render() {
        this.props.all && console.log(`inilah loan info : ${JSON.stringify(this.props.all)}`)
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
                                <Image source={require('../assets/images/e-scoring.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Financing</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        {this.props.agencyArray && this.props.agencyArray.length > 0 &&
                            <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                                <Tab heading="Providers">
                                    <Micro nav={this.nav} agencyArray={this.props.agencyArray} />
                                </Tab>
                                <Tab heading="SME">
                                    <SME nav={this.nav} loanStatusArray={this.props.loanStatusArray} current_page={this.props.current_page} last_page={this.props.last_page} changePage={this.changePage} />
                                </Tab>
                            </Tabs>}

                    </View>
                </View>
            </View>

        );
    }
}

class Micro extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <FlatList
                    data={this.props.agencyArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                <Image source={{ uri: item.logo }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.title}</Text>
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, }]}>{item.desc}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>Apply</Text>
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

class SME extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <Text>Current Page :{this.props.current_page} </Text>
                <Text>Total Page :{this.props.last_page} </Text>
                {this.props.last_page > 1 && <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', margin: 10 }}>
                    {this.props.current_page > 1 && <TouchableOpacity onPress={() => this.props.changePage(this.props.current_page - 1)}><Text>Prev :  {this.props.current_page - 1}</Text></TouchableOpacity>}
                    {this.props.current_page < this.props.last_page && <TouchableOpacity onPress={() => this.props.changePage(this.props.current_page + 1)}><Text>Next :  {this.props.current_page + 1}</Text></TouchableOpacity>}
                </View>}

                <FlatList
                    data={this.props.loanStatusArray}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) => (
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                <Image source={{ uri: item.logo }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.title}</Text>
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, }]}>{item.company_id}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>Apply</Text>
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

        agencyArray: state.agencyListReducer.agencyArray,

        all: state.loanApplicationReducer,
        loanStatusArray: state.loanApplicationReducer.data,
        current_page: state.loanApplicationReducer.current_page,
        last_page: state.loanApplicationReducer.last_page,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateListAgency: () => dispatch(actionCreator.initiateListAgency()),
        initiateLoanInfo: (page) => dispatch(actionCreator.initiateLoanInfo(page)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FinancingScreen)