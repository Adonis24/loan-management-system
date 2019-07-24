//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
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

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Icon, Tabs, Tab, ScrollableTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'


class QRScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = { hasCameraPermission: null, scanned: false }
    }

    async componentDidMount() {

        console.log(`expo token ialah ${this.props.expo_token} dan id ialah ${this.props.id}`)

        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)

        const {connect_id,expo_token}=JSON.parse(data)

        await this.props.requestConnect(connect_id)
        // this.props.initiateBizDir()
        // this.props.initiateAssociateDir()
        // this.props.initiatePendingDir()
        this.props.sendNotification(expo_token,connect_id)
        //this.props.navigation.navigate('BizDirectory')
    };
    render() { 
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: 'transparent' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Scan">
                        <ScanQRScreen hasCameraPermission={this.state.hasCameraPermission} scanned={this.state.scanned} handleBarCodeScanned={this.handleBarCodeScanned} />
                    </Tab>
                    <Tab heading="QR">
                        <QR id={this.props.id} expo_token={this.props.expo_token} allNoti={this.props.allNoti} />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

class ScanQRScreen extends React.PureComponent {


    render() {
        const { hasCameraPermission, scanned } = this.props;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Camera ref={ref => { this.camera = ref; }} ratio={'16:9'} onBarCodeScanned={scanned ? undefined : this.props.handleBarCodeScanned} style={[StyleSheet.absoluteFill, { flex: 1 }]} >
                </Camera>
            </View>
        );
    }
}

class QR extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ color: '#fff', borderRadius: 10, elevation: 3, padding: 10 }}>
                    <QRCode value={JSON.stringify({ connect_id: this.props.id, expo_token: this.props.expo_token })} size={Layout.window.width / 1.5} backgroundColor='#fff' color='#000' />
                <Text>{JSON.stringify(this.props.allNoti)}</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.myAccountReducer.id,
        member_id: state.myAccountReducer.member_id,
        name: state.myAccountReducer.name,
        email: state.myAccountReducer.email,
        phone_no: state.myAccountReducer.phone_no,
        profile_pic: state.myAccountReducer.profile_pic,
        email_verified_at: state.myAccountReducer.email_verified_at,

        expo_token: state.myAccountReducer.expo_token,

        allNoti:state.notificationScreenReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        sendNotification: (expo_token, id) => dispatch(actionCreator.sendNotification(expo_token, id)),
        requestConnect: (val) => dispatch(actionCreator.requestConnect(val)),

        initiateBizDir: () => dispatch(actionCreator.initiateBizDir()),
        initiatePendingDir: () => dispatch(actionCreator.initiatePendingDir()),
        initiateAssociateDir: () => dispatch(actionCreator.initiateAssociateDir()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QRScreen)