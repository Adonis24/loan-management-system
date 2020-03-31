//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
//import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'



const MyAccountScreen = (props) => {

    const { member_id, name, email, phone_no, profile_pic, email_verified_at, associateConnection, requestConnection, allConnection } = useSelector(state => state.myAccountReducer, shallowEqual)
    const connect_id = useSelector(state => state.myAccountReducer.id, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)
    {/*const { connect_id } = useSelector(state => state.notificationScreenReducer, shallowEqual)*/ }

    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(actionCreator.initiateMyAccount()),
            dispatch(actionCreator.getConnectionStatus())

    }, []); // empty-array means don't watch for any updates



    const capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>

            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                {/* HEADER */}
                <View style={{ flex: 6, backgroundColor: 'blue' }}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff', marginBottom: 5 }]} resizeMode={'cover'} />
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{capitalizeString(name)}</Text>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{companyName}</Text>
                            <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 5, backgroundColor: '#fff' }}>

                                <TouchableOpacity onPress={() => props.navigation.navigate('QR')} style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                    <QRCode value={'test'} size={20} backgroundColor='#fff' color='#2FD9FE' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 5 }}>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>Connections</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('AssociateDir')}><Text style={[styles.caption, { color: '#fff' }]}>{associateConnection} connected</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('PendingDir')}><Text style={[styles.caption, { color: '#fff' }]}>{requestConnection} pending</Text></TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 9 }}>
                    <ScrollView contentStyle={{ padding: 10 }} >

                        {/**Projects */}
                        <View style={{ margin: 5, paddingBottom: 5, }}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Projects</Text>
                                    <Text style={styles.caption}>More ></Text>
                                </View>
                            </View>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#000' }]}>No active projects at the moment</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View >
    );

}



const Test = (props) => {

    const { member_id, name, email, phone_no, profile_pic, email_verified_at, associateConnection, requestConnection, allConnection } = useSelector(state => state.myAccountReducer, shallowEqual)
    const connect_id = useSelector(state => state.myAccountReducer.id, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)

    const [scrollY, setScrollY] = useState(new Animated.Value(0))

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const _renderScrollViewContent = () => {
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styles.row}>
                        <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.fill}>
            <ScrollView
                style={styles.fill}
                scrollEventThrottle={20}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                )}
            >
                {_renderScrollViewContent()}
            </ScrollView>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Animated.Image
                    style={[
                        styles.backgroundImage,
                        { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
                    ]}
                    source={{ uri: profile_pic }}
                />
                 <View style={{ flex: 1 }}>
                     <Text>Test</Text>
                 </View>
                {/* <View style={{ flex: 1 }}>
                    <View style={{ flex: 6, backgroundColor: 'blue' }}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image source={{ uri: profile_pic }} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} resizeMode={'cover'} />
                            <BlurView tint="dark" intensity={0} style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>

                            </BlurView>
                            <>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1, marginLeft: 10, marginTop: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                        <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                            <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', padding: 5 }}>
                                    <Image source={{ uri: profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff', marginBottom: 5 }]} resizeMode={'cover'} />
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>{name}</Text>
                                    <Text style={[styles.textDefault, { color: '#fff' }]}>{companyName}</Text>
                                    
                                </View>
                            </>
                        </LinearGradient>
                    </View>
                </View> */}
            </Animated.View>
        </View>)
}


const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    logo: {
        width: Layout.window.width / 3,
        height: undefined,
        flex: 1
    },
});

export default Test