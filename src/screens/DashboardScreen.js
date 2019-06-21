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
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, }}>
                            <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={[{ flex: 1, marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, flexDirection: 'row' }]}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'head'}>e-info</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'head'}>Biz Profile</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'head'}>Knowledge Hub</Text>
                                </View>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Scoring</Text>
                                </View>
  
                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <ScrollView >
                            {/*Business Hub */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Business Hub</Text>
                                        <Text>More</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width,  flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/eda.png')} style={{ width: undefined, height: Layout.window.height / 13,  }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/bizDir.png')} style={{ width: undefined, height: Layout.window.height / 13,  }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>Biz Directory</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/crm.png')} style={{ width: undefined, height: Layout.window.height / 13, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 13,  }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 13,  }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/*Others */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Others</Text><Text>More</Text></View></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
                                        </View>
                                        <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>

                                    </View>
                                </View>
                            </View>
                            {/*Contact Request */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Contact Request</Text><Text>More</Text></View></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                        <View style={{ width:Layout.window.width/2.5, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text>Social Charity</Text>
                                            <View style={{flexDirection:'row',}}><Text>Accept</Text><Text>Delete</Text></View>
                                        </View>   
                                    </View>
                                </View>
                            </View>

                            {/**Newest RFQ */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Newest RFQ</Text><Text>More</Text></View></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
                                        </View>
                                        <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>

                                    </View>
                                </View>
                            </View>

                            {/**Highlight */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Hightlight</Text><Text>More</Text></View></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, height: Layout.window.height / 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 10, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
                                        </View>
                                        <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>

                                    </View>
                                </View>
                            </View>

                            {/**Training */}
                            <View style={{margin:5,borderBottomWidth:1,borderColor:'#000'}}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Training</Text><Text>More</Text></View></View>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)