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
import { Icon } from 'native-base'

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

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(`data ialah : ${JSON.stringify(data)}`)
        this.props.sendNotification()
        this.props.navigation.navigate('UserAccount', { member_id: data })
    };


    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Camera ratio={'16:9'} onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={[StyleSheet.absoluteFill, { flex: 1 }]} type={this.state.type}>

                </Camera>
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

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        sendNotification: () => dispatch(actionCreator.sendNotification())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanQRScreen)