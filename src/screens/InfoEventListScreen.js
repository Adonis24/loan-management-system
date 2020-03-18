//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


import * as actionCreator from '../store/actions/action'


const InfoEventListScreen = (props) => {

    const nav = (screen, item) => {
        props.navigation.navigate(screen, { item })
    }
    const dispatch = useDispatch()
    const { eventArray } = useSelector(state => state.eventScreenReducer, shallowEqual)

    useEffect(() => {

        dispatch(actionCreator.initiateEvent())

    }, []); // empty-array means don't watch for any updates



    return (
        <View style={styles.container}>
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
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                            <Image source={require('../assets/images/event.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Event</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    {eventArray && eventArray.length > 0 ? 
                        
                    <ScrollableTabView style={{ width: Layout.window.width }}>
                        <Latest tabLabel='Latest' nav={nav}  eventArray={eventArray} />
                        <Popular tabLabel='Popular' nav={nav}  eventArray={eventArray} />

                    </ScrollableTabView>

                        : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                            {/*                             
                                <Image source={require('../assets/images/bizlicensing.png')} style={{ flex:1,width: undefined, height: Layout.window.height / 1.5, alignSelf: 'center',opacity:0.3, borderWidth:1,borderColor:'#000' }} resizeMode={'contain'} /> */}

                        </View>
                    }
                </View>
            </View>
        </View>

    );

}


const Latest = (props) => {
    return (
        <ScrollView style={{ padding: 20 }}>
            {eventArray &&
                <FlatList
                    data={eventArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.nav('InfoEvent', item)}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10, borderRadius: 10 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    )} />
            }
        </ScrollView>
    )

}


const Popular = (props) => {

    return (
        <ScrollView style={{ padding: 20 }}>
            {eventArray &&
                <FlatList
                    data={eventArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.nav('InfoEvent', item)}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10, borderRadius: 10 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    )} />
            }
        </ScrollView>
    )
}





export default InfoEventListScreen