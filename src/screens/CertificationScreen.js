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


} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class CertificationScreen extends React.PureComponent {
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
                                <Image source={require('../assets/images/certification.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Certification</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        <Text style={[styles.caption, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }]}>My Certification</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                <Text style={[styles.textDefault, { margin: 5 }]}>Business Stratergy Training</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Venue:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Date:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ margin: 10, }} onPress={() => this.props.navigation.navigate('CertificationView')}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                <Text style={[styles.textDefault, { margin: 5 }]}>Online Business Training</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Venue:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Date:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ margin: 10, }} onPress={() => this.props.navigation.navigate('CertificationView')}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                <Text style={[styles.textDefault, { margin: 5 }]}>Brand Awareness Training</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Venue:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Date:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ margin: 10, }} onPress={() => this.props.navigation.navigate('CertificationView')}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                <Text style={[styles.textDefault, { margin: 5 }]}>Marketing Stratergy Training</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Venue:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>Date:</Text>
                                    <Text style={[styles.caption, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ margin: 10, }} onPress={() => this.props.navigation.navigate('CertificationView')}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(CertificationScreen)