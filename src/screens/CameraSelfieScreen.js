//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, createRef, useRef } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


const CameraSelfieScreen = (props) => {

    const dispatch = useDispatch()
    //(doc) => dispatch(actionCreator.saveSelfie(doc))
    const saveSelfie=(doc)=>dispatch(actionCreator.saveSelfie(doc))
    const cameraRef = useRef();

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    const getPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermission(status === 'granted')
    }

    useEffect(() => {
        getPermission();
        //getGalleryPermission()
    }, []); // empty-array means don't watch for any updates

    const [active, setActive] = useState(false)

    const takePicture = async () => {
        if (cameraRef) {
            setActive(true)
            let photo = await cameraRef.current.takePictureAsync();

            await saveSelfie(photo)
            

            setActive(false)
            props.navigation.goBack()
        }
    };



    if (hasCameraPermission === null) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Requesting for camera permission</Text>
        </View>
    }
    if (hasCameraPermission === false) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Requesting for camera permission</Text>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={cameraRef}
                style={[StyleSheet.absoluteFill, { marginTop: Constants.statusBarHeight }]}
                type={Camera.Constants.Type.front}
                ratio={'16:9'}
             
            >
                <View style={{ position: 'absolute', height: Layout.window.height - Constants.statusBarHeight, width: Layout.window.width }}>
                    <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#000000', }}>
                        <Text style={[styles.textDefault, { color: '#ffffff' }]}>Position your face inside the border</Text>
                    </View>
                    <View style={{ flex: 9, alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/faceborder.png')} resizeMode={'cover'}
                                style={{ alignSelf: 'stretch', flex: 1, height: undefined, width: undefined }}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#000000', flexDirection: 'row', flex: 1, padding: 5 }}>
                        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => props.navigation.goBack()}>
                                <Ionicons name={'ios-arrow-back'} size={48} color={'#ffffff'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#000000' }}>
                            <TouchableOpacity onPress={() => takePicture()}>
                                <View style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: '#ffffff', alignSelf: 'center', margin: 10 }}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <Text style={{ color: '#ffffff' }}></Text>
                        </View>
                    </View>

                </View>
                {active && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}><ActivityIndicator size={'large'} color={'#fff'} /></View>}

            </Camera>
        </View>
    );
}


export default CameraSelfieScreen