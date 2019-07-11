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

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

import moment from 'moment'

class SignupOtpEnterScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            duration: 180,
            durationFormat: null
        }
    }

    componentDidMount() {
       this.state.duration>0? this.timeLapsed():null;
    }

    async verifyPhone() {
        await this.props.verifyPhone()
        await this.props.navigation.navigate('SignUpSuccess')
    }

    timeLapsed() {
        this.interval = setInterval(() => {
            const durationFormat = moment().toObject()
            const durationFormatFormatted = durationFormat.format
            this.setState({ duration: this.state.duration - 1, durationFormat });
        }, 1000);
    }

    reset(){
        this.props.reset()
    }

    getBoxes() {
        //var d1Focus,d2Focus,d3Focus,d4Focus=false

        if (this.props.c1 && this.props.c2 && this.props.c3) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c1} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c3} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={this.props.d4} onChangeText={c4 => this.props.verifyOTP({ c4 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
            </View>)

        } else if (this.props.c1 && this.props.c2) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={this.props.c3} onChangeText={c3 => this.props.verifyOTP({ c3 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
            </View>)

        } else if (this.props.c1) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} value={this.props.c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={this.props.c2} onChangeText={c2 => this.props.verifyOTP({ c2 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>

            </View>)

        } else

            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={this.props.c1} onChangeText={c1 => this.props.verifyOTP({ c1 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ position: 'absolute' }}><Text></Text></View>
            </View>)

    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <View>

                            </View>

                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue', fontWeight: 'bold' }]}>Enter OTP code</Text>
                            <Text style={[styles.textDefault, { margin: 5 }]}>We have sent an OTP code to your number</Text>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5 }}>
                                {this.getBoxes()}
                            </View>
                            {this.props.c1&&<TouchableOpacity onPress={()=>this.reset()} style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                                <Text style={[styles.caption, { margin: 5 }]}>Reset</Text>
                            </TouchableOpacity>}
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                                <Text style={[styles.textDefault, { margin: 5 }]}>Resend OTP code : </Text>
                                {this.state.duration>0?
                                <Text style={[styles.textDefault, { margin: 5, color: 'orange' }]}>{this.state.duration} s</Text>:
                                <TouchableOpacity onPress={()=>this.props.registerOTP()} style={{justifyContent:'center',alignItems:'center', borderWidth:1,borderColor:'orange', borderRadius:5,padding:5}}><Text style={styles.caption}>Resend</Text></TouchableOpacity>}
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.verifyPhone()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Verify</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        c1: state.registrationReducer.c1,
        c2: state.registrationReducer.c2,
        c3: state.registrationReducer.c3,
        c4: state.registrationReducer.c4,
        phoneVerified:state.registrationReducer.phoneVerified
    }
}
function mapDispatchToProps(dispatch) {
    return {
        verifyOTP: (value) => dispatch({ type: 'VERIFY_OTP', payload: { ...value } }),
        verifyPhone: () => dispatch(actionCreator.verifyPhone()),
        registerOTP: () => dispatch(actionCreator.registerOTP()),
        reset:()=>dispatch({type:'RESET_OTP',})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupOtpEnterScreen)