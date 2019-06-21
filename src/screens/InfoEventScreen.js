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

class InfoEventScreen extends React.PureComponent {
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
                        <View style={{ margin: 5, borderBottomWidth: 1, borderColor: '#000' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/icon/eda.png')} style={{ width: undefined, height: Layout.window.height / 13, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]}>News</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/icon/bizDir.png')} style={{ width: undefined, height: Layout.window.height / 13, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]}>Promotions</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/icon/crm.png')} style={{ width: undefined, height: Layout.window.height / 13, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]}>Event</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/icon/rfq.png')} style={{ width: undefined, height: Layout.window.height / 13, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]}>Guide Book</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView>
                                <Image source={require('../assets/images/business.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7, margin: 15 }} resizeMode={'contain'} />
                                <Text style={[styles.subTitle, { margin: 10 }]}>Business Writing Conference</Text>
                                <Text style={[styles.textDefault, { margin: 10 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(InfoEventScreen)