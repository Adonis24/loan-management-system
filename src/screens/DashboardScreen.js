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
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />
                        </View>
                        <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', flex: 1, marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2 }]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoNews')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }} >
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Knowledge Hub</Text>
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
                        <ScrollView contentStyle={{padding:10}} >
                            {/*Business Hub */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Business Hub</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/eda.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/bizDir.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>Biz Directory</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/crm.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]}>EDA</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/*Others */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Others</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoEvent')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
                                        </View>
                                        <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>

                                    </View>
                                </View>
                            </View>
                            {/*Contact Request */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ border: 1, borderColor: 'lightgrey', shadowColor: "#000", marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Contact Request</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.width / 2.5, padding: 5, justifyContent: 'flex-start', alignItems: 'center', elevation: 2 }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.height / 13, height: Layout.window.height / 13, borderRadius: Layout.window.height / 26, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Accept</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/**Newest RFQ */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ border: 1, borderColor: 'lightgrey', shadowColor: "#000", marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Newest RFQ</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.width / 2.5, padding: 5, justifyContent: 'flex-start', alignItems: 'center', elevation: 2 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../assets/icon/socialCharity.png')} style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.height / 13, height: Layout.window.height / 13, borderRadius: Layout.window.height / 26, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                                <Text style={[styles.caption]}>Social Charity</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Accept</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/**Highlight */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Hightlight</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
                                        </View>
                                        <View style={{ flex: 2, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>

                                    </View>
                                </View>
                            </View>

                            {/**Training */}
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Training</Text>
                                        <Text style={styles.subTitle}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Social Charity</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/event.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Events</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/icon/wallet.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                            <Text style={[styles.caption]}>Wallet</Text>
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