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

class FinancingScreen extends React.PureComponent {
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
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                                <Tab heading="Micro">
                                    <Micro nav={this.nav} />
                                </Tab>
                                <Tab heading="SME">
                                    <SME nav={this.nav} />
                                </Tab>
                                <Tab heading="Large Ent">
                                    <LargeEnt nav={this.nav} />
                                </Tab>
                            </Tabs>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

class Micro extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                </View>
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Tekun Nasional</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>KoFintech</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>BSN</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>MIDF</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

class SME extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                </View>
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Tekun Nasional</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>SME Bank</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Hong leong Bank</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Maybank</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

class LargeEnt extends React.PureComponent {
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                </View>
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Tekun Nasional</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>SME Bank</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>BSN</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Maybank</Text>
                        <View style={{ flex: 1, width: Layout.window.width * 0.15, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'darkblue', margin: 10 }}>
                            <Text style={[styles.caption]}>View</Text>
                        </View>
                        <View style={{ flex: 2, width: Layout.window.width * 0.3, height: Layout.window.height * 0.03, borderWidth: 2, borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                            <Text style={[styles.caption]}>Calculate</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(FinancingScreen)