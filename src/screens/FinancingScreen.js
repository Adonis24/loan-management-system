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
import ScrollableTabView from 'react-native-scrollable-tab-view'


import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';


const FinancingScreen = (props) => {

    const { current_page, last_page } = useSelector(state => state.grantApplicationReducer, shallowEqual)
    const grantStatusArray = useSelector(state => state.grantApplicationReducer.data, shallowEqual)
    const { agencyArray } = useSelector(state => state.agencyListReducer, shallowEqual)
    const all = useSelector(state => state.loanApplicationReducer, shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreator.initiateListAgency())
        dispatch(actionCreator.initiateGrantInfo())

    }, []); // empty-array means don't watch for any updates

    const [showLayak, setShowLayak] = useState(false)

    all && console.log(`inilah loan info : ${JSON.stringify(all)}`)
    return (
        < LayoutB
            title={'Financing'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        ><Modal visible={showLayak} onRequestClose={() => setShowLayak(false)}>
                <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
                    <Text>TEST</Text>
                    </View>
            </Modal>
            <View style={{ margin: 10 }} />
            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'lightgrey', margin: 10, borderRadius: 10 }}>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch' }}>
                    <View style={{ padding: 5, flex: 2, }}>
                        <Image source={require('../assets/images/TEKUN.png')} style={{ height: 60, width: 60 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 7, padding: 5 }} >
                        <Text style={[styles.textDefault, { textTransform: 'uppercase', marginBottom: 5, textAlign: 'left' }]}>Pembiayaan Tekun</Text>
                        <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.textSmall, { marginBottom: 5 }]}>Skim Pembiayaan Sederhana</Text>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-start', margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                            // onPress={() => setShowLayak(true)}
                            >
                            <Text style={[styles.textSmall, {}]}>Semak Kelayakan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(`LoanCheckList`)}>
                            <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'flex-start', margin: 3, padding: 5, borderRadius: 5, }}>
                                <Text style={[styles.textSmall, { color: '#fff' }]}>Borang Permohonan</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>   
        </LayoutB>

    );
}




export default FinancingScreen