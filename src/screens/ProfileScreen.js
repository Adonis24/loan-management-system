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

class ProfileScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount(){
        this.props.initiateCompanyInfo()
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                <Text style={[styles.default]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <ScrollView>
                            <View style={[{ backgroundColor: 'transparent', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                    <View style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
                                        <Image source={require('../assets/images/profile.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'column', alignSelf: 'flex-start' }}>
                                        <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', color: '#4A90E2' }]}>{this.props.companyName}</Text>
                                        <Text style={[styles.subTitle, { margin: 5 }]}>SSM NO :{this.props.companyRegNo}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Business Model</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'center' }]}>F {'&'} B Industry</Text>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Add Info</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Years doing Business</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'center' }]}>5 years +</Text>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Add Other Business</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Number of employee</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'center' }]}>40 people</Text>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Add Loan Details</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Scoring</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', flex: 1, textAlign: 'center' }]}>48</Text>
                                    <Ionicons name='ios-close' size={26} color='red' style={{ margin: 5 }} />
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, flex: 2, textAlign: 'left' }]}>Make Report</Text>
                                </View>
                            </View>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, fontSize: 12, fontWeight: 'bold' }]}>Scoring meter {'&'} chart</Text>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 20, justifyContent: 'center' }}>
                                <Text style={[styles.textDefault, { margin: 20, }]}>Poor</Text>
                                <Text style={[styles.textDefault, { margin: 20, }]}>Fair</Text>
                                <Text style={[styles.textDefault, { margin: 20, }]}>Excellent</Text>
                            </View>
                            <View style={{ width: Layout.window.width * 0.6, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderRightColor: 'green', borderLeftColor: 'red' }}>
                            </View>
                            {/* <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                                <Text style={[styles.caption]}>Excellent : 71 - 85</Text>
                            </View>
                            <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'lawngreen', margin: 10 }}>
                                <Text style={[styles.caption]}>Good : 56 - 70</Text>
                            </View>
                            <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'yellow', margin: 10 }}>
                                <Text style={[styles.caption]}>Excellent : 36 - 55</Text>
                            </View>
                            <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'orange', margin: 10 }}>
                                <Text style={[styles.caption]}>Excellent : 16 - 35</Text>
                            </View>
                            <View style={{ width: Layout.window.width * 0.5, height: Layout.window.height * 0.03, borderWidth: 2, alignSelf: 'center', borderRadius: 15, borderColor: 'red', margin: 10 }}>
                                <Text style={[styles.caption]}>Excellent : 1 - 15</Text>
                            </View> */}
                        
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoanApplication')} style={{margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'blue'}}>
                            <Text>Apply Loan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log('Consultation')} style={{margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'blue'}}>
                            <Text>Get Consultation</Text>
                        </TouchableOpacity>


                        </ScrollView>

                    </View>

                </View>
            </View>

        );
    }
}


function mapStateToProps(state) {
    return {
        companyName: state.bizInfoReducer.name,
        companyRegNo: state.bizInfoReducer.reg_no,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)