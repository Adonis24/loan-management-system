//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout'
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import malaysiaData from 'malaysia-state-city-postcode'
import LayoutB from '../Layout/LayoutB'
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import * as actionCreator from '../store/actions/action'

const MapScreen = (props) => {
    const dispatch = useDispatch()
    const { logo } = useSelector(state => state.bizInfoReducer, shallowEqual)
    const { location, initialRegion } = useSelector(state => state.locationReducer, shallowEqual)

    console.log(`location ialah ${JSON.stringify(location)}`)
    console.log(`region ialah ${JSON.stringify(initialRegion)}`)

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

    const changeRegion = region => {
        console.log(JSON.stringify(region))
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


    //console.log(`width ialah : ${JSON.stringify(Layout.window.width)}`)

    return (
        < LayoutB
            title={'Map'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>

                <TextInput onChangeText={val => getCoordinate(val)} keyboardType={'number-pad'} placeholder='Enter Postcode' style={{ borderWidth: 1, borderColor: 'lightgrey', margin: 5, borderRadius: 5, paddingLeft: 5, flex: 1 }} />
                <TouchableOpacity onPress={() => dispatch(actionCreator.saveLocation({ location: x, initialRegion: region }))} style={{ padding: 5, borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey' }}>
                    <Text style={styles.caption}>Save Location</Text>
                </TouchableOpacity>
                <View style={{ flex: 2, flexDirection: 'row' }} />
            </View>

            <MapView
                mapType={'standard'}
                showsUserLocation={true}
                region={region}
                //region={null}
                onRegionChangeComplete={region => changeRegion(region)}
                style={mapStyles.mapStyle} >
                {/* {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))} */}

                <Marker draggable
                    coordinate={x}
                    onDragEnd={(e) => setX({ ...e.nativeEvent.coordinate })}
                >
                    {/* <Callout tooltip/> */}
                    {/* <View style={{ width: 50, height: 50, backgroundColor: '#fff', borderRadius: 25, borderWidth: 1, borderColor: 'grey', padding: 5 }} >
                        <Image source={{ uri: logo }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'} />
                    </View> */}
                </Marker>

            </MapView>
        </ LayoutB>
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