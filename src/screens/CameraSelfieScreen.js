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


class CameraSelfieScreen extends React.PureComponent {
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

    async takePicture() {
        const document = await this.camera.takePictureAsync();

        await this.props.saveSelfie(document)
        await this.props.navigation.goBack()
        //console.log(`gambar ialah ${JSON.stringify(document)}`)


    }

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
                <Camera
                    style={[StyleSheet.absoluteFill, { marginTop: Constants.statusBarHeight }]}
                    type={Camera.Constants.Type.front}
                    ratio={'16:9'}
                    ref={ref => {
                        this.camera = ref;
                    }}
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
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                    <Ionicons name={'ios-arrow-back'} size={48} color={'#ffffff'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                                <TouchableOpacity onPress={() => this.takePicture()}>
                                    <View style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: '#ffffff', alignSelf: 'center', margin: 10 }}></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center' }}>
                                <Text style={{ color: '#ffffff' }}></Text>
                            </View>
                        </View>

                    </View>

                </Camera>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {


    }
}
function mapDispatchToProps(dispatch) {
    return {
        saveSelfie: (doc) => dispatch(actionCreator.saveSelfie(doc)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CameraSelfieScreen)