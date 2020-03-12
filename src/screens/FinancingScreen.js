//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList


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


    const nav = (screen) => {
        props.navigation.navigate(screen)
    }

    const applyFinance = (agency_id) => {
        props.navigation.navigate('GrantApplication', { agency_id })
    }

    const changePage = (page = 1) => {
        dispatch(actionCreator.initiateGrantInfo(page))
    }

    all && console.log(`inilah loan info : ${JSON.stringify(all)}`)
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                </View>
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                            <Ionicons name='ios-arrow-back' size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 8, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                            <Image source={require('../assets/images/e-scoring.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Financing & Grant</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    {agencyArray && agencyArray.length > 0 &&
                        <ScrollableTabView style={{width:Layout.window.width}}>
                            <Micro tabLabel='Providers' nav={nav} agencyArray={agencyArray} applyFinance={applyFinance} />
                            <SME tabLabel='Status' nav={nav} grantStatusArray={grantStatusArray} current_page={current_page} last_page={last_page} changePage={changePage} />

                        </ScrollableTabView>
                    }


                    {/* {agencyArray && agencyArray.length > 0 &&
                        <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Providers">
                                <Micro nav={nav} agencyArray={agencyArray} applyFinance={applyFinance} />
                            </Tab>
                            <Tab heading="Status">
                                <SME nav={nav} grantStatusArray={grantStatusArray} current_page={current_page} last_page={last_page} changePage={changePage} />
                            </Tab>
                        </Tabs>} */}

                </View>
            </View>
        </View>

    );
}


const Micro = (props) => {
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList
                data={props.agencyArray}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                            <Image source={{ uri: item.logo }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                        </View>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.title}</Text>
                        <Text numberOfLines={3} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, }]}>{item.desc}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.applyFinance(item.id)} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Apply</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )

}


const SME = (props) => {

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>

            {props.last_page > 1 && <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', margin: 10 }}>
                {props.current_page > 1 && <TouchableOpacity onPress={() => props.changePage(current_page - 1)}><Text>Prev :  {props.current_page - 1}</Text></TouchableOpacity>}
                {props.current_page < props.last_page && <TouchableOpacity onPress={() => props.changePage(current_page + 1)}><Text>Next :  {props.current_page + 1}</Text></TouchableOpacity>}
            </View>}

            <FlatList
                data={props.grantStatusArray}
                keyExtractor={(item, index) => index.toString()}

                renderItem={({ item }) => (
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'flex-start', flexDirection: 'row' }]}>
                        <View style={{ flex: 1, alignSelf: 'stretch', margin: 5 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' }}>
                                <Text style={[styles.textDefault, { margin: 5, marginTop: 0, marginBottom: 0, alignSelf: 'flex-start', textAlign: 'left' }]}>View Proposal</Text>

                                <View style={{ backgroundColor: 'orange', alignSelf: 'flex-end', borderRadius: 5 }}>
                                    <Text style={[styles.caption, { margin: 5, }]}>{item.status}</Text>
                                </View>
                            </View>

                            <Text style={[styles.textDefault, { margin: 5, marginTop: 0, marginBottom: 0, alignSelf: 'flex-start', textAlign: 'left' }]}>Date : {moment(item.created_at).format('LL')}</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginTop: 0, marginBottom: 0, alignSelf: 'flex-start', textAlign: 'left' }]}>Type : {item.type}</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginTop: 0, marginBottom: 0, alignSelf: 'flex-start', textAlign: 'left' }]}>Provider : {item.title}</Text>
                        </View>

                    </View>
                )}
            />
        </View>
    )

}




export default FinancingScreen