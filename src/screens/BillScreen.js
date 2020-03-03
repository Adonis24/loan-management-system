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
    ImageBackground,

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

 const BillScreen = (props) => { 

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }
    
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
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/wallet.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>E-Billing</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                    <ScrollView style={{ padding: 20 }}>

<View style={[{ flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20,alignItems:'flex-start',justifyContent:'flex-start' }]}>
    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left',alignSelf:'flex-start' }]}>Select Services</Text>
</View>



<View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom:10, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'darkgrey', flexDirection: 'row' }]}>
    <TextInput style={{ flex: 5 }} />
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Ionicons name='ios-search' color={'darkgrey'} style={{ fontSize: 17 }} />
    </View>
</View>


{/* <View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1,paddingLeft:10 }}>
        <Text>Boost</Text>
    </View>
</View>
<View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1 ,paddingLeft:10}}>
        <Text>Touch n Go</Text>
    </View>
</View>
<View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1,paddingLeft:10 }}>
        <Text>MCash</Text>
    </View>
</View> */}



</ScrollView>
                    </View>
                </View>
            </View>

        );
    
}



export default BillScreen