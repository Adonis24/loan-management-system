//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList


} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import * as actionCreator from '../store/actions/action'
import moment from 'moment'
import _ from 'lodash'

const BizDirectoryScreen = (props) => {

    const dispatch = useDispatch()
    const { associateConnection, requestConnection, allConnection } = useSelector(state => state.myAccountReducer, shallowEqual)
    const { bizDirArray } = useSelector(state => state.bizDirReducer, shallowEqual)
    const { assoDirArray } = useSelector(state => state.assoDirReducer, shallowEqual)
    const { pendingDirArray } = useSelector(state => state.pendingDirReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.initiateBizDir()),
            dispatch(actionCreator.initiatePendingDir()),
            dispatch(actionCreator.initiateAssociateDir())
        dispatch(actionCreator.getConnectionStatus())
    }, []); // empty-array means don't watch for any updates


    const connect = (val) => {
        dispatch(actionCreator.requestConnect(val)),
            dispatch(actionCreator.getConnectionStatus())
        dispatch(actionCreator.initiateBizDir()),
            dispatch(actionCreator.initiateAssociateDir())
        dispatch(actionCreator.initiatePendingDir())
    }

    const accept = (val) => {
        dispatch(actionCreator.accept(val))
        dispatch(actionCreator.getConnectionStatus())
        dispatch(actionCreator.initiateBizDir())
        dispatch(actionCreator.initiateAssociateDir())
        dispatch(actionCreator.initiatePendingDir())
    }






    bizDirArray && console.log(`ini lah bizdir ${JSON.stringify(bizDirArray)}`)
    pendingDirArray && console.log(`ini lah pending ${JSON.stringify(pendingDirArray)}`)
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
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 5, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                            <Image source={require('../assets/images/directory.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Directory</Text>
                        </View>
                    </View>
                </View>
                {/* START CONTENT */}
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>

                    <ScrollableTabView style={{ width: Layout.window.width }}>
                        <Associate tabLabel={`Associate (${associateConnection})`} connect={connect} assoDirArray={assoDirArray} />
                        <Pending tabLabel={`Request (${requestConnection})`} connect={connect} accept={accept} pendingDirArray={pendingDirArray} />
                        <All tabLabel={`All (${allConnection})`} connect={connect} bizDirArray={bizDirArray} />                
                    </ScrollableTabView>



                </View>
                {/* END CONTENT */}
            </View>
        </View >
    );

}


const Associate = (props) => {

    const { assoDirArray } = props
    const assoSize = _.size(assoDirArray)

    if (assoSize % 2 > 0) { assoDirArray.push({ name: '' }) }


    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList
                data={assoDirArray}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    if (item.name != '') {
                        return (
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 5, marginRight: 5, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                                    <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                                </View>
                                <Text style={[styles.textDefault, { fontWeight: 'bold' }]}>{item.name}</Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.caption, {}]}># :{item.member_id}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                </View>
                            </View>
                        )
                    } else {
                        return (<View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>

                        </View>)
                    }
                }}
            />
        </View>
    )
}



const Pending = (props) => {
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList
                data={pendingDirArray}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                            <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                        </View>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.name}</Text>
                        <Text style={[styles.caption, { margin: 5, }]}>Member since : {moment(item.created_at).format('LL')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.accept(item.id)} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}



const All = (props) => {
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <FlatList
                data={bizDirArray}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <View style={[{ marginLeft: 10, padding: 2, height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'center' }]}>
                            <Image source={{ uri: item.profile_pic }} style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 20 }} resizeMode='cover' />
                        </View>
                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>{item.name}</Text>
                        <Text style={[styles.caption, { margin: 5, }]}>Member since : {moment(item.created_at).format('LL')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.connect(item.id)} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Connect</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}





export default BizDirectoryScreen


