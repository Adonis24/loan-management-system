//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';


const BizAppDetailScreen = (props) => {

    const uri = props.route.param?.uri ?? 'NA' 
    
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <WebView style={{ flex: 1 }} source={{ uri }} />
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                        <Ionicons name='ios-arrow-back' size={32} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                    <View style={[{ backgroundColor: 'transparent', marginLeft: Layout.window.width / 7, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 5, height: Layout.window.height / 15 }]} />
                </View>
            </View>
        </View>
    );

}



export default BizAppDetailScreen