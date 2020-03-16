//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator

} from 'react-native';


//import { Constants, LinearGradient, FileSystem } from 'expo'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'

import styles from '../styles/styles'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';


const InfoNewsListScreen = (props) => {

    const nav = (screen, item) => {
        props.navigation.navigate(screen, { item })
    }

    const hafiz = (item) => {
        console.log(`item ialah : ${JSON.stringify(item)}`)
        props.navigation.navigate('InfoNews', { item: JSON.stringify(item) })
    }

    // props.nav('InfoNews', { item })

    const dispatch = useDispatch()
    const { newsArray } = useSelector(state => state.newsScreenReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.initiateNews())

    }, []); // empty-array means don't watch for any updates

    return (

        < LayoutB
            title={'News'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                {newsArray ? newsArray.length > 0 ?

                    <ScrollableTabView style={{ width: Layout.window.width }}>
                        <Latest tabLabel='Latest' nav={nav} hafiz={hafiz} newsArray={newsArray} />
                        <Popular tabLabel='Popular' nav={nav} hafiz={hafiz} newsArray={newsArray} />

                    </ScrollableTabView>


                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>


                    </View>
                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <ActivityIndicator color={grey} />

                    </View>
                }
            </View>
        </ LayoutB>
    );

}

const Latest = (props) => {
    return (
        <View style={{ width: Layout.window.width, padding: 20 }}>
            {props.newsArray &&
                <FlatList
                    data={props.newsArray}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) => (

                        <TouchableOpacity onPress={() => props.hafiz(item)}>
                            <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 5, borderRadius: 10 }} resizeMode={'cover'} />
                        </TouchableOpacity>

                    )} />}
        </View>
    )

}



const Popular = (props) => {

    return (
        <View style={{ width: Layout.window.width, padding: 20 }}>
            {props.newsArray &&
                <FlatList
                    data={props.newsArray}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) => (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.hafiz(item)}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, width: Layout.window.width - 10, height: Layout.window.height * 0.2, margin: 10, borderRadius: 10 }} resizeMode={'cover'} />
                            </TouchableOpacity>
                        </View>
                    )} />
            }
        </View>
    )

}



export default InfoNewsListScreen 