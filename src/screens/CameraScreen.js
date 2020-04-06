//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground


} from 'react-native';


import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const CameraScreen = (props) => {



    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    const getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setCameraPermission(status === 'granted')

    }

    useEffect(() => {
        getPermission()
    }, []); // empty-array means don't watch for any updates





    if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera ratio={'16:9'} style={[StyleSheet.absoluteFill, { flex: 1 }]}>
                <View><Text style={{ color: '#fff' }}>TEST</Text></View>
            </Camera>
        </View>
    );

}


export default CameraScreen