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
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView>

                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 15, marginRight: 15, borderWidth: 1, borderColor: '#ddd', paddingTop: 10 }]}>

                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PROFILE</Text>

                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Business Model</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>F {'&'} B Industry</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Years doing Business</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>5 years</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Number of employee</Text>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>40 people</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>Scoring</Text>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>48</Text>
                                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)