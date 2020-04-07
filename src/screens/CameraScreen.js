//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect, createRef, useRef } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import styles from '../styles/styles'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const CameraScreen = (props) => {
    const dispatch = useDispatch()
    const cameraRef = useRef();

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    const getPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermission(status === 'granted')
    }

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    useEffect(() => {
        getPermission();
        //getGalleryPermission()
    }, []); // empty-array means don't watch for any updates

    const attachment = props.route.params?.attachment ?? 'NA'
    const file = props.route.params?.file ?? 'NA'
    const label = props.route.params?.label ?? 'NA'
    //console.log(`uri ialah ${uri}`)

    const snap = async () => {
        if (cameraRef) {
            let photo = await cameraRef.current.takePictureAsync();

            await dispatch(actionCreator.savePicture(photo, attachment, file))
            await dispatch(actionCreator.getAllAttachment())
            //props.navigation.goBack()
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
                ratio={'16:9'}
                type={type}
                style={[StyleSheet.absoluteFill, { flex: 1, justifyContent: 'space-between', alignItems: 'stretch' }]}>
                <View style={{ padding: 10, backgroundColor: '#000', flexDirection: 'row', borderTopWidth: 1, paddingTop: Constants.statusBarHeight,paddingRight:10,paddingLeft:10 }}>

                    <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>

                        <Text style={[styles.textDefault, { color: '#fff' }]}>{label}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons name={'ios-close'} size={60} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 10, backgroundColor: '#000', flexDirection: 'row', paddingRight:10,paddingLeft:10 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        )}>
                            <Ionicons name={'ios-repeat'} size={60} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => snap()} style={{ height: 60, width: 60, borderRadius: 39, backgroundColor: '#fff' }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={() => openImagePickerAsync()}>
                            <Ionicons name={'ios-folder'} size={60} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </View >
    );

}


export default CameraScreen