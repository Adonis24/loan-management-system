//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    TextInput

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import striptags from 'striptags'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'
import moment from 'moment'
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';

const tags = ['current', 'latest', 'finance', 'commerce', 'covid-19', 'mro']


const InfoNewsListScreen = (props) => {

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

    const [tagMode, setTagMode] = useState(true)

    return (

        < LayoutB
            title={'News'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end',  }}>

                {tagMode ?
                    <View style={{ flexDirection: 'row', alignItems: 'center',  flex: 1, }}>
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            horizontal
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                    onPress={() => console.log('tag pressed')}>
                                    <Text style={styles.textSmall}>{item}</Text>
                                </TouchableOpacity>} />
                        <TouchableOpacity onPress={() => setTagMode(false)} >
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5, paddingLeft: 10 }} />
                        </TouchableOpacity>

                    </View> :
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, padding: 10 }}>
                        <View style={{ flex: 4, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                            <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]} onChangeText={(val) => console.log(val)} />
                        </View>
                        <TouchableOpacity onPress={props.navigation.openDrawer} >
                            <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5,paddingLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTagMode(true)}>
                            <Ionicons name="ios-pricetags" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5,  }} />
                        </TouchableOpacity>
                    </View>}

            </View>
            <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                {newsArray ? newsArray.length > 0 ?
                    <FlatList
                    contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        data={newsArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => hafiz(item)}
                                style={{ width: Layout.window.width, marginBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch' }}>
                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch' }}>
                                    <View style={{ padding: 5, flex: 2, }}>
                                        <Image source={{ uri: item.picture }} style={{ flex: 1, height: undefined, width: undefined }} />
                                    </View>
                                    <View style={{ flex: 5, padding: 5 }} >
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.textSmall, { flex: 1 }]}>{item.source}</Text>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.textSmall, { flex: 1, textAlign: 'right' }]}>{moment(item.date).format("ddd, MMM D, YYYY")}</Text>
                                        </View>
                                        <Text style={[styles.textDefault, { textTransform: 'uppercase', marginBottom: 5, textAlign: 'justify' }]}>{item.title}</Text>
                                        <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.textSmall, { marginBottom: 5 }]}>{striptags(item.content)}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                                    onPress={() => console.log('tag pressed')}>
                                                    <Text style={[styles.textSmall, {}]}>TEKUN</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                                    onPress={() => console.log('tag pressed')}>
                                                    <Text style={[styles.textSmall, {}]}>LIFESTYLE</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={{borderWidth:1,borderColor:'lightgrey', height:26,width:26,borderRadius:13,justifyContent:'center',alignItems:'center'}}>
                                            <Ionicons name="ios-bookmark" color={'lightgrey'} style={{ fontSize: 17, paddingRight: 5, paddingLeft: 5 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        } />
                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                    </View>
                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <ActivityIndicator color={'lightgrey'} />
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