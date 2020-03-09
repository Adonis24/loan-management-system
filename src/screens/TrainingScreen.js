//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    View,
     WebView

} from 'react-native';

import Constants from 'expo-constants'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'

import * as actionCreator from '../store/actions/action'


const TrainingScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }

    const dispatch = useDispatch()
    const { trainingArray } = useSelector(state => state.trainingReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.initiateTraining())
    }, []); // empty-array means don't watch for any updates


    const { jwt } = useSelector(state => state.myAccountReducer, shallowEqual)
    console.log(`jwt ialah ${jwt}`)
    const uri = `https://lms.bxcess.my/category/training/courses/?bx-token=${jwt}`

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <WebView source={{ uri }} style={{ flex: 1, backgroundColor: 'transparent' }} />

            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, right: 0, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', border: 1, borderColor: '#000', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                        <View style={{ borderWidth: 3, borderColor: '#fff', width: Layout.window.width / 5 }} />

                    </TouchableOpacity>
                </View>

            </View>
        </View>

    );

}




export default TrainingScreen