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

const checklist = [
    { item: 'Borang permohonan pembiayaan TEKUN', button: 'LoanDrawer', check: true },
    { item: 'Kertas rancangan perniagaan', button: 'LoanDrawer', check: true },
    { item: 'Gambar berukuran passport', button: 'LoanDrawer', check: true },
    { item: 'Salinan kad pengenalan pemohon dan pasangan', button: 'LoanDrawer', check: true },
    { item: '3 keping gambar premis/tapak perniagaan', button: 'LoanDrawer', check: true },
    { item: 'Salinan buku simpanan/penyata bank ( 3 bulan terakhir)', button: 'LoanDrawer', check: true },
    { item: 'Salinan bil utiliti rumah atau premis perniagaan', button: 'LoanDrawer', check: true },
    { item: 'Borang kebenaran penzahiran maklumat kredit individu', button: 'LoanDrawer', check: true },
    { item: 'Peta ringkas lokasi tempat perniagaan ke pejabat cawangan tekun', button: 'Map', check: true },

]


const SitePicScreen = (props) => {
    const dispatch = useDispatch()
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
                    <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Gambal gambal:</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}><Text>Test</Text></TouchableOpacity>
                </View>
            </View>
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
                <TouchableOpacity onPress={() => props.navigation.navigate(props.button)} style={{ padding: 3, paddingRight: 6, paddingLeft: 6, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, justifyContent: 'center', borderColor: 'lightblue' }}>
                    <Text style={[styles.textSmall, { textAlign: 'left', color: 'lightblue' }]}>Isi!</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.check && <Ionicons name='md-checkmark' color={'green'} style={{ fontSize: 27 }} />
                }</Text>
            </View>
        </View>
    )
}


export default SitePicScreen