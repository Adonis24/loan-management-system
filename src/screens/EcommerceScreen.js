//console.ignoredYellowBox = ['Setting a timer']
import React,{useEffect} from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'

import * as actionCreator from '../store/actions/action'
import WebView from 'react-native-webview';


const EcommerceScreen = (props) => {
  
    const dispatch = useDispatch()



    const { jwt } = useSelector(state => state.myAccountReducer, shallowEqual)
    console.log(`jwt ialah ${jwt}`)
    const uri = `https://www.mayamall.com/guest-user/bxcess?bx-token=${jwt}`
    return (
        <View style={styles.container}>
            <WebView source={{ uri }} style={{ flex: 1, backgroundColor: 'transparent' }} />

            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, right: 0, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', border: 1, borderColor: '#000', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                        <View style={{ borderWidth: 3, borderColor: '#fff', width: Layout.window.width / 5 }} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );

}


export default EcommerceScreen