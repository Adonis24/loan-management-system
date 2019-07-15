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
import WebView from 'react-native-webview';

class EcommerceScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.initiateDashboardScreen()
        //this.props.navigation.navigate('PopupScore')
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <WebView source={{ uri: 'https://www.mayamall.com/supplier' }} style={{ flex: 1 }} />
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={32} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                        <View style={[{ backgroundColor: 'transparent', marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderRightWidth: 0, flexDirection: 'row', elevation: 2, justifyContent: 'flex-start', alignItems: 'center', padding: 5, height: Layout.window.height / 15 }]} />
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return {
        initiateDashboardScreen: () => dispatch(actionCreator.initiateDashboardScreen())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EcommerceScreen)