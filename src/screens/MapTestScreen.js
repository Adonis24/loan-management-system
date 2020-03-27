//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Layout from '../constants/Layout'
import MapView, { Marker, } from 'react-native-maps';
import * as Permissions from 'expo-permissions'

import LayoutB from '../Layout/LayoutB'


const MapTestScreen = (props) => {

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

    const [region, setRegion] = useState({
        latitude: 3.681541,
        longitude: 101.520681,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })



    const [x, setX] = useState({
        latitude: 3.688461,
        longitude: 101.525081,
    })


    //console.log(`width ialah : ${JSON.stringify(Layout.window.width)}`)

    return (
        < LayoutB
            title={'Map'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <View style={{ margin: 10 }} />
            <MapView
                mapType={'standard'}
                showsUserLocation={true}
                initialRegion={malaysiaRegion}
                //onRegionChange={region => console.log(`region ialah ${JSON.stringify(region)}`)}
                style={styles.mapStyle} >
                {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

                <Marker draggable
                    coordinate={x}
                    onDragEnd={(e) => setX({ ...e.nativeEvent.coordinate })}
                />

            </MapView>
        </ LayoutB>
    );
}


const styles = StyleSheet.create({
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



export default MapTestScreen