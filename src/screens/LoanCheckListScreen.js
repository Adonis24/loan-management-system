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

const checklist = [
    { item: 'Borang permohonan pembiayaan TEKUN', button: 'LoanMaklumatAsas', check: true },
    { item: 'Kertas rancangan perniagaan', button: 'LoanMaklumatAsas', check: true },
    { item: 'Gambar berukuran passport', button: 'LoanMaklumatAsas', check: true }
]


const LoanCheckListScreen = (props) => {
    const dispatch = useDispatch()
    return (
        < LayoutB
            title={'Checklist'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        >
            <View style={{ margin: 10 }} />
            <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Dokumen-dokument Diperlukan:</Text>
            <View style={{ alignSelf: 'stretch', margin: 10 }}>
                <FlatList data={checklist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (<CustomRow
                        navigation={props.navigation}
                        no={index + 1}
                        item={item.item}
                        button={item.button}
                        check={item.check}

                    />)} />
            </View>
            <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            <TouchableOpacity
                onPress={() => console.log(`hantar`)}>
                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'flex-start', margin: 10, padding: 5, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}>
                    <Text style={[styles.textSmall, { color: '#fff' }]}>Hantar</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LayoutB >
    );
}

const CustomRow = (props) => {
    return (
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch', borderBottomWidth: 1, borderColor: 'lightgrey' }}>
            <View style={{ padding: 5, flex: 1, }}>
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.no} </Text>
            </View>
            <View style={{ flex: 8, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textSmall, { marginBottom: 5, textAlign: 'left' }]}>{props.item}</Text>
            </View>
            <View style={{ flex: 2, padding: 5, alignItems: 'flex-start' }} >
                <TouchableOpacity onPress={()=>props.navigation.navigate(props.button)} style={{ padding: 3,paddingRight:6,paddingLeft:6, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6 }}>
                    <Text style={[styles.textSmall, { marginBottom: 5, textAlign: 'left' }]}>Isi!</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.check && <Ionicons name='md-checkmark' color={'green'} style={{ fontSize: 27 }} />
                }</Text>
            </View>
        </View>
    )
}


export default LoanCheckListScreen