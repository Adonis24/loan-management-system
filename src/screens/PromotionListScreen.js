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

class PromotionListScreen extends React.PureComponent {
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
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/wallet.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Promotion</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ margin: 10, borderBottomWidth: 1, borderColor: '#000' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Text style={[styles.textDefault]}>Latest</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Text style={[styles.textDefault, { fontWeight: 'bold' }]}>Popular</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView style={{ marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoNews')}>
                                        <Image source={require('../assets/images/business.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width * 0.4, margin: 15 }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={[styles.textDefault, { fontWeight: 'bold', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                                        <Text style={[styles.caption, { alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                                        <Text style={[styles.caption, { alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5 }]}>Join now !</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoNews')}>
                                        <Image source={require('../assets/images/economy.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width * 0.4, margin: 15 }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={[styles.textDefault, { fontWeight: 'bold', alignSelf: 'flex-start' }]}>Buy 1 free 1 book!</Text>
                                        <Text style={[styles.caption, { alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                                        <Text style={[styles.caption, { alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5 }]}>Buy now !</Text>
                                    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(PromotionListScreen)