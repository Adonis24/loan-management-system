//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Layout from '../constants/Layout'
import MapView, { Marker } from 'react-native-maps';


import LayoutB from '../Layout/LayoutB'


const MapTestScreen = (props) => {

    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA + (Layout.window.width / Layout.window.height)

    const markers = [{ latitude:3.175006, longitude:101.653478 }]

    const [region, setRegion] = useState({
        latitude: 3.519862,
        longitude: 101.538116,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    console.log(`width ialah : ${JSON.stringify(Layout.window.width)}`)

    return (
        < LayoutB
            title={'Map'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/news.png')}
        >
            <View style={{ margin: 10 }} />
            <MapView
                region={region}
                style={styles.mapStyle} >
                {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
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