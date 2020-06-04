//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'

import * as WebBrowser from 'expo-web-browser';
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import WebView from 'react-native-webview';
import LayoutB from '../Layout/LayoutB';


const EcommerceScreen = (props) => {

    const dispatch = useDispatch()


   

    const { jwt } = useSelector(state => state.myAccountReducer, shallowEqual)
    console.log(`jwt ialah ${jwt}`)
    const uri = `https://www.mayamall.io/guest-user/bxcess?bx-token=${jwt}`

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(uri);
        //this.setState({ result });
    };


    return (
        < LayoutB
            title={'Ecommerce'}
            screenType='form'
            elearning={true}
            navigation={props.navigation}
            imageUri={require('../assets/images/ecommerce.png')}
        >


            <WebView
                source={{ uri }}
                style={{
                    flex: 1,
                    backgroundColor: 'transparent'
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            // injectedJavaScript={modifiedStyle} 
            />
            <View style={{ borderColor: 'lightyellow', padding: 10, margin: 0, alignSelf: 'stretch', backgroundColor: 'lightyellow', borderTopWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={styles.textSmall}>For better  experience, please go to the website by clicking the button below :</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => _handlePressButtonAsync()} style={{ marginTop: 5, flex: 1 }} >
                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ backgroundColor: '#4DCB3E', padding: 5, borderRadius: 5, alignItems: 'center' }}>
                            <Text style={[styles.textSmall, { color: '#fff' }]}>MayaMall</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ LayoutB>
    );

}


export default EcommerceScreen