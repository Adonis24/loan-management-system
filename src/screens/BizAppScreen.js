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
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class BizAppScreen extends React.PureComponent {
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
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
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
                                <Image source={require('../assets/images/marketplace.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz App Marketplace</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        <ScrollView style={{ padding: 20 }}>
                            <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'flex-start', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 5 }]}>
                                <Text style={[styles.textDefault, { margin: 5, textAlign: 'left', fontWeight: 'bold' }]}>Summary</Text>
                            </View>
                            <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                                <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Urus Niaga</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                            <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                                <Text style={[styles.caption, { color: '#fff' }]}>Subscribe</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                    <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Simpan Kira</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                            <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                                <Text style={[styles.caption, { color: '#fff' }]}>Subscribe</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(BizAppScreen)