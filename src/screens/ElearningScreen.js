//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    TouchableOpacity,
    View,
    Image

} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles/styles'

import Constants from 'expo-constants'
import { shallowEqual, useSelector } from 'react-redux'
import LayoutB from '../Layout/LayoutB'


const ElearningScreen = (props) => {

    const { jwt } = useSelector(state => state.myAccountReducer, shallowEqual)
    console.log(`jwt ialah ${jwt}`)
    const uri = `https://lms.bxcess.my/courses/?bx-token=${jwt}`


    const modifiedStyle = `document.querySelector("#breadcrumb").setAttribute("style", "display:none");
    document.querySelector("#slide").setAttribute("style", "display:none");
    
    
   ;`
    return (


        < LayoutB
            title={'E-Learning'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <WebView
                source={{ uri }}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                injectedJavaScript={modifiedStyle} />

        </ LayoutB>



    );

}



export default ElearningScreen