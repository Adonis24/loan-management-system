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

import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import ScrollableTabView from 'react-native-scrollable-tab-view'


import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class ScanQRScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { hasCameraPermission: null, scanned: false }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)

        await this.props.requestConnect(data)
        this.props.initiateBizDir()
        this.props.initiateAssociateDir()
        this.props.initiatePendingDir()
        this.props.sendNotification(this.props.expo_token)
        this.props.navigation.navigate('BizDirectory')
    };


    render() {
        const { hasCameraPermission, scanned } = this.state;


        return (
            <View style={{ flex: 1 }}>
                 <ScrollableTabView style={{ width: Layout.window.width }}>
                 <Scanner tabLabel='Scanner'
                            scanned={this.state.scanned}
                            hasCameraPermission={this.state.hasCameraPermission}
                        />
                          <QR tabLabel='QR Code' />
                        <Latest tabLabel='Latest' nav={nav}  eventArray={eventArray} />
                        <Popular tabLabel='Popular' nav={nav}  eventArray={eventArray} />

                    </ScrollableTabView>
                
            </View>
        );
    }
}


class Scanner extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { hasCameraPermission: null, scanned: false }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)

        await this.props.requestConnect(data)
        this.props.initiateBizDir()
        this.props.initiateAssociateDir()
        this.props.initiatePendingDir()
        this.props.sendNotification(this.props.expo_token)
        this.props.navigation.navigate('BizDirectory')
    };


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
                <Camera ratio={'16:9'} onBarCodeScanned={scanned ? undefined : this.props.handleBarCodeScanned} style={[StyleSheet.absoluteFill, { flex: 1 }]} type={this.props.type}>
                </Camera>
            </View>
        );
    }
}

class QR extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };




    render() {



        return (<View style={{ flex: 1 }}>
            <View style={{ color: '#fff', borderRadius: 10, elevation: 3, padding: 10 }}>
                <QRCode value={JSON.stringify(this.props.connect_id)} size={Layout.window.width / 1.5} backgroundColor='#fff' color='#000' />
            </View>

            <View><Text>Noti : {JSON.stringify(this.props.noti)}</Text></View>
        </View>
        );
    }
}



function mapStateToProps(state) {
    return {
        member_id: state.myAccountReducer.member_id,
        name: state.myAccountReducer.name,
        email: state.myAccountReducer.email,
        phone_no: state.myAccountReducer.phone_no,
        profile_pic: state.myAccountReducer.profile_pic,
        email_verified_at: state.myAccountReducer.email_verified_at,

        expo_token: state.myAccountReducer.expo_token,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        sendNotification: (expo_token) => dispatch(actionCreator.sendNotification(expo_token)),
        requestConnect: (val) => dispatch(actionCreator.requestConnect(val)),

        initiateBizDir: () => dispatch(actionCreator.initiateBizDir()),
        initiatePendingDir: () => dispatch(actionCreator.initiatePendingDir()),
        initiateAssociateDir: () => dispatch(actionCreator.initiateAssociateDir()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanQRScreen)