//console.ignoredYellowBox = ['Setting a timer']
import React, { useState,useEffect } from 'react';
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
import QRCode from 'react-native-qrcode-svg'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Icon, Tabs, Tab, ScrollableTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'



const QRScreen = (props) => { 

    const [hasCameraPermission,setHasCameraPermission] = useState (null)
    const [scanned,setScanned] = useState(false)
   {/* constructor(props) {
        super(props)
        this.state = { hasCameraPermission: null, scanned: false }
    } */}

    const dispatch = useDispatch()
    const {  id, member_id, name, email, phone_no, profile_pic, email_verified_at, expo_token, phone} = useSelector(state => state.myAccountReducer, shallowEqual)
    const  allNoti  = useSelector(state => state.notificationScreenReducer, shallowEqual)

    const getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setHasCameraPermission({ hasCameraPermission: status === 'granted' })
    }

    useEffect(() => {
        console.log(`expo token ialah ${expo_token} dan id ialah ${id}`)
       getPermission()
    },[]); // empty-array means don't watch for any updates


  {/*  async componentDidMount() {

        console.log(`expo token ialah ${expo_token} dan id ialah ${id}`)

        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    } */}

    const requestConnect = (val) => dispatch(actionCreator.requestConnect(val))
    const sendNotification = (expo_token, id) => dispatch(actionCreator.sendNotification(expo_token, id))

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)

        const {connect_id,expo_token}=JSON.parse(data)

        await requestConnect(connect_id)
        // this.props.initiateBizDir()
        // this.props.initiateAssociateDir()
        // this.props.initiatePendingDir()
        sendNotification(expo_token,connect_id)
        //props.navigation.navigate('BizDirectory')
    };
    
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: 'transparent' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Scan">
                        <ScanQRScreen hasCameraPermission={hasCameraPermission} scanned={scanned} handleBarCodeScanned={handleBarCodeScanned} />
                    </Tab>
                    <Tab heading="QR">
                        <QR id={id} expo_token={expo_token} allNoti={allNoti} />
                    </Tab>
                </Tabs>
            </View>
        );
    }


const ScanQRScreen = (props) => {
    
        const { hasCameraPermission, scanned } = props;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Camera ref={ref => {camera = ref; }} ratio={'16:9'} onBarCodeScanned={scanned ? undefined : props.handleBarCodeScanned} style={[StyleSheet.absoluteFill, { flex: 1 }]} >
                </Camera>
            </View>
        );
    }



    const QR = (props) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ color: '#fff', borderRadius: 10, elevation: 3, padding: 10 }}>
                    <QRCode value={JSON.stringify({ connect_id: props.id, expo_token: props.expo_token })} size={Layout.window.width / 1.5} backgroundColor='#fff' color='#000' />
                <Text>{JSON.stringify(props.allNoti)}</Text>
                </View>
            </View>
        );
    
}


{/*function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        initiateBizDir: () => dispatch(actionCreator.initiateBizDir()),
        initiatePendingDir: () => dispatch(actionCreator.initiatePendingDir()),
        initiateAssociateDir: () => dispatch(actionCreator.initiateAssociateDir()),
    }
} */}
export default QRScreen