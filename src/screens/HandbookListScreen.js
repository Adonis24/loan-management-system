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

class HandbookListScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    nav = (screen, item) => {
        this.props.navigation.navigate(screen, { item })
    }
    async componentDidMount() {
        await this.props.initiateHandbooks()
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
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/handbook.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Handbook</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                                <Tab heading="Latest">
                                    <Latest nav={this.nav} handbooksArray={this.props.handbooksArray} />
                                </Tab>
                                <Tab heading="Popular">
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
                {this.props.handbooksArray &&
                    <FlatList
                        data={this.props.handbooksArray}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.nav('Handbook', item)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                    <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>{item.title}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', fontWeight: 'bold', fontStyle: 'italic' }]}>{item.author}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                    <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                                        <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                }
                {/* <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity> */}
            </ScrollView>
        )
    }
}

class Popular extends React.PureComponent {
    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}



function mapStateToProps(state) {
    return {
        handbooksArray: state.handbookScreenReducer.handbooksArray
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateHandbooks: () => dispatch(actionCreator.initiateHandbooks())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HandbookListScreen)