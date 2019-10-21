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

class DashboardScreen extends React.PureComponent {
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
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ width: Layout.window.width, height: Layout.window.height / 12, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={require('../assets/images/logo.png')} style={{ flex: 1, width: undefined, height: Layout.window.height / 12 }} resizeMode='contain' />
                    </View>
                    {/* menu */}
                    <View style={{ width: Layout.window.width, height: Layout.window.height / 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 4, padding: 5, justifyContent: 'flex-start', borderWidth: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                                    <Text>Test</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{}}>
                        {/* BUSINESS HUB */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Business Hub</Text>
                                <Text>More</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/eda.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>EDA</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/bizDir.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Biz Directory</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/crm.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>EDA</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>EDA</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>EDA</Text>
                                </View>
                            </View>
                        </View>

                        {/* Others */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Business Hub</Text><Text>More</Text></View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Social Charity</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Events</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Wallet</Text>
                                </View>
                                <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                </View>

                            </View>
                        </View>

                        {/* Contact Request */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Contact Request</Text><Text>More</Text></View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Social Charity</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Events</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Wallet</Text>
                                </View>
                                <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                </View>

                            </View>
                        </View>
                        {/* Newest RFQ */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Newest RFQ</Text><Text>More</Text></View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Social Charity</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Events</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Wallet</Text>
                                </View>
                                <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                </View>

                            </View>
                        </View>
                        {/* Highlight */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Hightlight</Text><Text>More</Text></View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Social Charity</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Events</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Wallet</Text>
                                </View>
                                <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                </View>

                            </View>
                        </View>
                        {/* Others */}
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Training</Text><Text>More</Text></View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                            <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Social Charity</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Events</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                    <Text>Wallet</Text>
                                </View>
                                <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)