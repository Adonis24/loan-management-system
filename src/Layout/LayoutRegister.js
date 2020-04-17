//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform


} from 'react-native';
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'
const ios = Platform.OS === "ios" ? true : false


const LayoutRegister = (props) => {
    return (

        <KeyboardAvoidingView behavior={ios?'padding':null} enabled style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: !props.nopaddingTop ? Constants.statusBarHeight : 0,backgroundColor:'#fff' }}>
            <View style={{ backgroundColor: '#192f6a', alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 1 }}>
                    
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Text style={[styles.textDefault, { color: '#fff', textTransform: 'uppercase' }]}>{!props.title?`Pembiayaan Tekun`:props.title}</Text>
                </View>
                <View style={{ flex: 1 }}></View>

            </View>
            {props.children}

        </KeyboardAvoidingView>

    );
}

export default LayoutRegister