//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import LayoutB from '../Layout/LayoutB';

import Layout from '../constants/Layout'


import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];


const InfoScreen = (props) => {

    const nav = (screen, item) => {
        props.navigation.navigate(screen, { item })
    }
    const dispatch = useDispatch()
    const { einfosArray } = useSelector(state => state.bizInfoReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.intitiateEinfo())

    }, []); // empty-array means don't watch for any updates

    return (
        < LayoutB
            title={'e-info'}
            screenType='NO'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-info.png')}
        >

            {/** Content */}
            <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'transparent' }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                    {/*                             
                                <Image source={require('../assets/images/bizlicensing.png')} style={{ flex:1,width: undefined, height: Layout.window.height / 1.5, alignSelf: 'center',opacity:0.3, borderWidth:1,borderColor:'#000' }} resizeMode={'contain'} /> */}

                </View></View>
        </ LayoutB>
    );

}


export default InfoScreen