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

class InfoNewsScreen extends React.PureComponent {
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
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                    <View style={{ position: 'absolute', top: -3, left: 0, right: 0, justifyContent: 'flex-start' }}>
                        <Image source={require('../assets/images/business.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width }} resizeMode={'contain'} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} color='white' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 2.5, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/event.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Event</Text>
                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.subTitle, { margin: 15, alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                                <ScrollView>
                                    <Text style={[styles.textDefault, { margin: 10 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Venue:</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Date:</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Time:</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>10.00m - 1.00pm</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { margin: 5, }]}>Price:</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>RM100</Text>
                                        <Text style={[styles.textDefault, { margin: 5, color: 'lawngreen' }]}>(Member price: RM85.00)</Text>
                                    </View>
                                    <TouchableOpacity style={{ width: Layout.window.width * 0.4, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 10 }}>
                                        <Text style={[styles.textDefault,]}>Join now</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 10 }}>
                                        <Text style={[styles.textDefault,]}>Remind me later</Text>
                                    </TouchableOpacity>
                                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(InfoNewsScreen)