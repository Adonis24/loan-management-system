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

class ProfileScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
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
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>FINTECH CAPITAL</Text>
                                    <Text style={[styles.subTitle, { margin: 5 }]}>SSM NO :123456789</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Business Model</Text>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>F {'&'} B Industry</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Years doing Business</Text>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>5 years</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Number of employee</Text>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>40 people</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Scoring</Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <Text style={[styles.textDefault, { margin: 5, }]}>48</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={[styles.textDefault, { margin: 5, marginBottom: 10 }]}>Scoring meter {'&'} chart</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 20, justifyContent: 'center' }}>
                                    <Text style={[styles.textDefault, { margin: 20, }]}>Poor</Text>
                                    <Text style={[styles.textDefault, { margin: 20, }]}>Fair</Text>
                                    <Text style={[styles.textDefault, { margin: 20, }]}>Excellent</Text>
                                </View>
                                <View style={{ width: Layout.window.width * 0.6, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderRightColor: 'green', borderLeftColor: 'red' }}>
                                </View>
                                <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                                    <Text style={[styles.caption]}>Excellent : 71 - 85</Text>
                                </View>
                                <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                                    <Text style={[styles.caption]}>Good : 56 - 70</Text>
                                </View>
                                <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'yellow', margin: 10 }}>
                                    <Text style={[styles.caption]}>Excellent : 36 - 55</Text>
                                </View>
                                <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'orange', margin: 10 }}>
                                    <Text style={[styles.caption]}>Excellent : 16 - 35</Text>
                                </View>
                                <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'red', margin: 10 }}>
                                    <Text style={[styles.caption]}>Excellent : 1 - 15</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>

        );
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)