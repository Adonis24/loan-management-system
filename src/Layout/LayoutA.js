//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    

} from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'

import styles from '../styles/styles'


const LayoutA = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunE.png')} style={{ width: Layout.window.width, height: Layout.window.height / 3.2 }} resizeMode={'cover'}  />
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    {props.children}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

export default LayoutA