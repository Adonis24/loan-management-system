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

class InsightScreen extends React.PureComponent {
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
                            <View style={[{ backgroundColor:'#fff', flex: 1, marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth:0,borderColor:'lightgrey', flexDirection: 'row',elevation:2 }]}>
                                <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                    <Image source={require('../assets/icon/rfq.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                    <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                </View>
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
                        <ScrollView >
                            {/*Business Hub */}
                           <Text>Insight</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(InsightScreen)