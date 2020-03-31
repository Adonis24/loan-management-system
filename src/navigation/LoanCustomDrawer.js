import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker, Platform, Modal } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
const LoanCustomDrawer = (props) => {
    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }
    console.log(`active ${JSON.stringify(props.state.routes[props.state.index].name)}`)
    return (
        <LinearGradient colors={['#fff', '#fff']} style={{ position: 'absolute', top: Constants.statusBarHeight, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => nav('LoanSectionA')} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                    <Text style={[styles.textDefault]}>Section A</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav('LoanSectionB')} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                    <Text style={[styles.textDefault]}>Section B</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, height: 30 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, height: 30 }} />

            </View>
        </LinearGradient>
    );
}


export default LoanCustomDrawer