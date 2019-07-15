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
        this.state = { hasCameraPermission: null }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    }

    handleBarCodeScanned = async ({ type, data }) => {

        const requestQR = data.includes('REQUEST')

        if (requestQR) {

            const transfer_id = await data.replace('REQUEST', '')
            console.log(`transfer_id ialah ${transfer_id}`)
            await this.props.setFulfillRequest({ transfer_id })
            //await this.getBillDetail({ billId, token_type: this.props.token_type, access_token: this.props.access_token })
            await this.props.navigation.navigate('FulfillRequest')

        } else {
            const billId = await data.replace('http://staging.lunapay.co/pay/option/', '')
            console.log(`billId ialah ${billId}`)
            //alert(`Bar code with type ${type} and data ${data} has been scanned!`)
            await this.props.setBill({ billId })
            await this.getBillDetail({ billId, token_type: this.props.token_type, access_token: this.props.access_token })
            await this.props.navigation.navigate('ScanBillSuccess')
        }

    }

    getBillDetail = (val) => {
        const { billId, access_token, token_type } = val

        fetch(`http://uat.lunapay.co/api/QrScanInfo/${billId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token_type + ' ' + access_token
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(`responseJson : ${responseJson}`)
                this.props.setBill(responseJson.data)
                //dispatch({type:'SET_BILL',payload:{...val}})
            })
            .catch((error) => {
                console.error('Error : ' + error);
            });
    }
    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <BarCodeScanner style={[StyleSheet.absoluteFill,{  flex: 1 }]}
                onBarCodeScanned={this.handleBarCodeScanned}
            >
            </BarCodeScanner>
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
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanQRScreen)