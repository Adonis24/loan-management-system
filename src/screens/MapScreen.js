//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { takeSnapshotAsync } from 'expo'

import MapView, { Marker, Callout } from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import malaysiaData from 'malaysia-state-city-postcode'

import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import * as actionCreator from '../store/actions/action'
import LayoutMap from '../Layout/LayoutMap';
const ios = Platform.OS === "ios" ? true : false

const MapScreen = (props) => {
    const dispatch = useDispatch()
    const { logo } = useSelector(state => state.bizInfoReducer, shallowEqual)
    const { location, initialRegion } = useSelector(state => state.locationReducer, shallowEqual)
    const { compSendiriPoskod } = useSelector(state => state.financingReducer, shallowEqual)

    const mapRef = useRef()

    const takeSnapshot = () => {
        // 'takeSnapshot' takes a config object with the
        // following options
        const snapshot = mapRef.current.takeSnapshot({
            //width: 300,      // optional, when omitted the view-width is used
            //height: 300,     // optional, when omitted the view-height is used
            //region: {..},    // iOS only, optional region to render
            format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
            result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        snapshot.then((uri) => {
            //this.setState({ mapSnapshot: uri });
            console.log(`snapshot ialah : ${JSON.stringify(uri)}`)
        });
    }


    const getCoordinate = (val) => {
        console.log(val)
        if (val.length === 5) {
            const coordinate = malaysiaData.find(x => x.Postcode == val)

            if (coordinate) {
                const latitude = parseFloat(coordinate.Lat)
                const longitude = parseFloat(coordinate.Long)
                const latitudeDelta = LATITUDE_DELTA
                const longitudeDelta = LONGITUDE_DELTA
                setRegion({ latitude, longitude, latitudeDelta, longitudeDelta })
                setX({ latitude, longitude })
            } else {
                console.log(`no result found`)
            }

        } else {
            console.log(`do nothing`)
        }
    }

    //useEffect()

    const changeRegion = region => {
        console.log(`x sekarang ialah ${JSON.stringify(region)}`)
        setRegion({ ...region })
    }

    const getLocationPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.LOCATION
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        console.log(`status location : ${JSON.stringify(finalStatus)}`)

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
    }
    useEffect(() => {

        compSendiriPoskod && getCoordinate(compSendiriPoskod)

    }, [compSendiriPoskod])

    useEffect(() => {
        getLocationPermission()
    }, [])
    useEffect(() => {
        dispatch(actionCreator.getLocation())
    }, [])

    const LATITUDE_DELTA = 0.0922
    //const LONGITUDE_DELTA = LATITUDE_DELTA + (Layout.window.width / Layout.window.height)
    const LONGITUDE_DELTA = 0.0421


    const markers = [
        { title: 'yik mun', description: 'kuih pau yang lazat', latlng: { latitude: 3.681541, longitude: 101.520681 } },
        { title: 'agro bank', description: 'tempat duit', latlng: { latitude: 3.679721, longitude: 101.520488 } },
        { title: 'pusat darah', description: 'tempat derma darah', latlng: { latitude: 3.174273, longitude: 101.706213 } }
    ]


    const [malaysiaRegion, setMalaysiaRegion] = useState({
        latitude: -1.184623231940165,
        longitude: 108.66519464179873,
        latitudeDelta: 42.44841354246602,
        longitudeDelta: 23.20312131196259,
    })

    const initRegion = initialRegion ? initialRegion : malaysiaRegion
    const [region, setRegion] = useState({ ...initRegion })


    const initX = location ? location : {
        latitude: 3.688461,
        longitude: 101.525081,
    }
    const [x, setX] = useState({ ...initX })

    const getLocation = (e) => {
        const coor = e.nativeEvent.coordinate
        console.log(`coordinate mantap ${JSON.stringify(coor)}`)
        setX({ ...coor })
    }


    //console.log(`width ialah : ${JSON.stringify(Layout.window.width)}`)
    console.log(`location ialah ${JSON.stringify(location)}`)
    console.log(`region ialah ${JSON.stringify(initialRegion)}`)
    console.log(`x ialah ${JSON.stringify(x)}`)

    return (
        <LayoutMap
            title={'Map'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >



            <MapView
                mapType={'standard'}
                showsUserLocation={true}
                region={region}
                //region={null}
                onRegionChangeComplete={region => changeRegion(region)}
                style={mapStyles.mapStyle}
                ref={mapRef}>
                {/* {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))} */}

                <Marker draggable
                    coordinate={x}
                    onDragEnd={(e) => getLocation(e)}
                >
                    {/* <Callout tooltip/> */}
                    {/* <View style={{ width: 50, height: 50, backgroundColor: '#fff', borderRadius: 25, borderWidth: 1, borderColor: 'grey', padding: 5 }} >
                        <Image source={{ uri: logo }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'} />
                    </View> */}
                </Marker>

            </MapView>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#fff' }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={{ borderWidth: 1, flexDirection: 'row', backgroundColor: '#fff', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey' }}>
                                <Image source={props.imageUri} style={{ width: 30, height: 30, margin: 5, marginLeft: 10 }} resizeMode={'contain'} />

                                <Text style={[styles.headText, { paddingRight: 10 }]} numberOfLines={1} ellipsizeMode={'tail'}>Lokasi Premis</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }}>
                <TouchableOpacity
                    style={{ alignSelf: 'stretch' }}
                    onPress={() => takeSnapshot()}>
                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'stretch', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.textDefault, { color: '#fff' }]}>Snapshot</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ margin: 20 }} />
                <TouchableOpacity
                    style={{ alignSelf: 'stretch' }}
                    onPress={() => dispatch(actionCreator.saveLocation({ location: x, initialRegion: region }))}>
                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'stretch', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.textDefault, { color: '#fff' }]}>SIMPAN LOKASI</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </ LayoutMap>
    );
}


const mapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


export default MapScreen