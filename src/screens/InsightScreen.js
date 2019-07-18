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
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class InsightScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />

                        </View>
                        <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 5, flexDirection: 'row' }}>

                            </View>
                            <View style={[{ backgroundColor: '#fff', flex: 4, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', paddingLeft: 5, flexDirection: 'row', elevation: 2 }]}>

                                <Image source={require('../assets/images/profile.png')} style={{ width: Layout.window.width / 10, height: undefined, }} resizeMode={'contain'} />
                                <Text style={[styles.textDefault, { fontSize: 18, fontWeight: "bold", paddingLeft: 5, }]} numberOfLines={1} ellipsizeMode={'tail'}>Contact</Text>

                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <ScrollView contentStyle={{ padding: 10 }} >                           

                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, paddingBottom: 10, marginBottom: 20 }]}>
                                <View style={{flexDirection: 'row',marginBottom:10}}>
                                    <View style={[{ marginLeft: 10, padding: 2 }]}>
                                        <Image source={require('../assets/images/girl.png')} style={{ height: Layout.window.height / 10, width: Layout.window.height / 10, borderWidth: 1, borderColor: 'lightgrey', borderRadius: Layout.window.height / 20 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Puteri Nursyahirah</Text>
                                            <View style={{ backgroundColor: '#6949EF', borderRadius: 10 }}>
                                                <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#fff' }]}>Friend</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-chatbubbles' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-share' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='ios-more' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row',marginBottom:10}}>
                                    <View style={[{ marginLeft: 10, padding: 2 }]}>
                                        <Image source={require('../assets/images/girl.png')} style={{ height: Layout.window.height / 10, width: Layout.window.height / 10, borderWidth: 1, borderColor: 'lightgrey', borderRadius: Layout.window.height / 20 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Puteri Nursyahirah</Text>
                                            <View style={{ backgroundColor: '#6949EF', borderRadius: 10 }}>
                                                <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#fff' }]}>Friend</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-chatbubbles' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-share' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='ios-more' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row',marginBottom:10}}>
                                    <View style={[{ marginLeft: 10, padding: 2 }]}>
                                        <Image source={require('../assets/images/girl.png')} style={{ height: Layout.window.height / 10, width: Layout.window.height / 10, borderWidth: 1, borderColor: 'lightgrey', borderRadius: Layout.window.height / 20 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Puteri Nursyahirah</Text>
                                            <View style={{ backgroundColor: '#6949EF', borderRadius: 10 }}>
                                                <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#fff' }]}>Friend</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-chatbubbles' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-share' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='ios-more' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row',marginBottom:10}}>
                                    <View style={[{ marginLeft: 10, padding: 2 }]}>
                                        <Image source={require('../assets/images/girl.png')} style={{ height: Layout.window.height / 10, width: Layout.window.height / 10, borderWidth: 1, borderColor: 'lightgrey', borderRadius: Layout.window.height / 20 }} resizeMode='cover' />
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Puteri Nursyahirah</Text>
                                            <View style={{ backgroundColor: '#6949EF', borderRadius: 10 }}>
                                                <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#fff' }]}>Friend</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-chatbubbles' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='md-share' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserAccount')} style={{ margin: 5 }}>
                                                <Ionicons name='ios-more' size={20} color='#2FD9FE' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>                                
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* <PopupScoreScreen /> */}

                <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanQR')}>
                        <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(InsightScreen)