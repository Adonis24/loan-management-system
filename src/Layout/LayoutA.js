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

import Layout from '../constants/Layout'

import styles from '../styles/styles'


const LayoutA = (props) => {

 


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    {props.children}
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

export default LayoutA