//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,

} from 'react-native';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'

import * as actionCreator from '../store/actions/action'

    const ScanQRScreen = (props) => {
    
    const [hasCameraPermission,setHasCameraPermission] = useState(null)
    const [scanned,setScanned] = useState(false)

    const dispatch = useDispatch()
    const {  id, member_id, name, email, phone_no, profile_pic, email_verified_at, expo_token} = useSelector(state => state.myAccountReducer, shallowEqual)

    const getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setHasCameraPermission({ hasCameraPermission: status === 'granted' })
    } 

    useEffect(() => {
        console.log(`expo token ialah ${expo_token} dan id ialah ${id}`)
       getPermission()
    },[]); // empty-array means don't watch for any updates


    const initiateMyAccount = () => dispatch(actionCreator.initiateMyAccount())
    const requestConnect = (val) => dispatch(actionCreator.requestConnect(val))

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)
        
        await requestConnect(data)
        dispatch(actionCreator.initiateBizDir())
        dispatch(actionCreator.initiateAssociateDir())
        dispatch(actionCreator.initiatePendingDir())
        dispatch(actionCreator.sendNotification(expo_token,id))
        props.navigation.navigate('BizDirectory')
    };
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Camera ratio={'16:9'} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, { flex: 1 }]} type={state.type}>
                </Camera>
            </View>
        );
    
}


export default ScanQRScreen