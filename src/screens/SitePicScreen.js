//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    Modal

} from 'react-native';

import moment from 'moment'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';
import { ScrollView } from 'react-native-gesture-handler';



const SitePicScreen = (props) => {
    const dispatch = useDispatch()

    const getPicture = async () => {
        await dispatch(actionCreator.getAttachment('sitePicture'))
    }

    useEffect(() => {
        getPicture()

    }, []); // empty-array means don't watch for any updates

    return (
        < LayoutB
            title={'Checklist'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        >

            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <View style={{ margin: 7 }} />

                    <Placeholder
                        label={'Picture 1'}
                        navigation={props.navigation}
                        param={{ attachment: 'sitePicture', file: 'picture1' }}
                    />
                    <Placeholder
                        label={'Picture 2'}
                        navigation={props.navigation}
                        param={{ attachment: 'sitePicture', file: 'picture2' }}
                    />

                    <TouchableOpacity onPress={() => dispatch(actionCreator.resetAllAttachment())} style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: 'red' }}><Text>RESET</Text></TouchableOpacity>

                </View>
            </View>
        </LayoutB >
    );
}

const Placeholder = (props) => {
    return (
        <>
            <Text style={[styles.textDefault, { paddingLeft: 10 }]}>{props.label}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Camera', { ...props.param, label: props.label })} style={{ width: Layout.window.width / 2, height: Layout.window.width / 3, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10 }}>
                <Ionicons name='ios-folder' size={60} color="grey" />
            </TouchableOpacity>
        </>)
}

export default SitePicScreen