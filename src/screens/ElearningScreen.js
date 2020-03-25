//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text

} from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import styles from '../styles/styles'

import Constants from 'expo-constants'
import { shallowEqual, useSelector } from 'react-redux'
import LayoutB from '../Layout/LayoutB'
import { LinearGradient } from 'expo-linear-gradient'

const ElearningScreen = (props) => {



    const { jwt } = useSelector(state => state.myAccountReducer, shallowEqual)
    console.log(`jwt ialah ${jwt}`)
    const uri = `https://lms.bxcess.my/?bx-token=${jwt}`

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(uri);
        //this.setState({ result });
    };
    const modifiedStyle = `
    
    document.querySelector("#slide").setAttribute("style", "display:none");
    document.querySelector("#main-menu").setAttribute("style", "display:none"); 
    document.querySelector(".best-course-section").setAttribute("style", "background-color:#fff");
   
       `
    return (


        < LayoutB
            title={'E-Learning'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <View style={{ margin: 10 }} />
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, margin: 10, alignSelf: 'stretch', borderRadius: 15 }}>
                <Text style={styles.textSmall}>For better learning experience, please go to the website by clicking the button below :</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => _handlePressButtonAsync()} style={{ marginTop: 5 }} >
                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ backgroundColor: '#4DCB3E', padding: 5, borderRadius: 10, }}>
                            <Text style={[styles.textSmall, { color: '#fff' }]}>TEKUN Academy</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <WebView
                source={{ uri }}
                style={{
                    flex: 1,
                    backgroundColor: 'transparent'
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                injectedJavaScript={modifiedStyle} />

        </ LayoutB>



    );

}



export default ElearningScreen