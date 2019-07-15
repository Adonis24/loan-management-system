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

class PopupScoreScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', elevation: 3, paddingTop: Layout.window.height / 5 }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 3, flexDirection: 'row', backgroundColor: '#2b488b', borderTopLeftRadius: Layout.window.width / 1.5, borderTopRightRadius: Layout.window.width / 1.5, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.props.toggleShow()}><Ionicons name='ios-close' color='#fff' size={32} style={{ margin: 7 }} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: '#2b488b', justifyContent: 'space-evenly' }}>
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Hello Syahirah</Text>
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Your current score is</Text>
                    <Text style={[styles.textDefault, { color: '#fff', fontSize: 48 }]}>48</Text>
                    <View style={{ backgroundColor: '#fff', padding: 20, margin: 20, borderRadius: 5 }}>
                        <Text style={[styles.textDefault, { color: '#fff' }]}>Progress bar tu</Text>
                    </View>
                    {/* <Text style={[styles.textDefault, { color: '#fff' }]}>Your score is currently blah blah blah</Text> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(PopupScoreScreen)