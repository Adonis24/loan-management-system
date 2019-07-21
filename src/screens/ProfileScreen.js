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
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'
import _ from 'lodash'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class ProfileScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        //this.props.initiateCompanyInfo()
        this.props.initiateListWorkers()
    }
    render() {

        const score = this.props.score

        const scoreColor = score > 66 ? 'green' : score > 33 ? 'yellow' : 'red'

        console.log(`logo gempak : ${this.props.logo}`)

        if (this.props.companyName) {
            return (
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                        </View>
                        {/* <View style={{ alignItems: 'flex-start' }}>
                            <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                        </View> */}
                    </View>
                    <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                        {/* HEADER */}
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                   <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                        <Ionicons name='ios-arrow-back' size={32} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                        <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                        <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* CONTENT AREA */}
                        <View style={{ flex: 7 }}>
                            <ScrollView>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={{ uri: this.props.logo }} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode={'cover'} />
                                    </View>
                                    <View style={{ flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', paddingLeft: 2 }}>
                                        <Text style={[styles.subTitle, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.companyName || 'John Doe Sdn Bhd'}</Text>
                                        <Text style={[styles.subTitle, { alignSelf: 'flex-start', textAlign: 'left' }]}>SSM NO : {this.props.companyRegNo || '123456789'}</Text>
                                    </View>
                                </View>
                                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }} />

                                <View style={{ margin: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={[styles.textDefault, { flex: 1, margin: 5, alignSelf: 'center', fontSize: 24, textAlign: 'center' }]}>{score}</Text>
                                    <View style={{ flex: 1, marginLeft: 20, marginLeft: 5, justifyContent: 'center', alignSelf: 'stretch' }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={[styles.caption, { flex: 1, }]}>Poor</Text>
                                            <Text style={[styles.caption, { flex: 1, }]}>Fair</Text>
                                            <Text style={[styles.caption, { flex: 1, }]}>Excellent</Text>
                                        </View>
                                        <View style={{ flex: 1, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', flexDirection: 'row' }}>
                                            <LinearGradient start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]} colors={[scoreColor, '#fff',]} style={{ flex: score, padding: 10, borderRadius: 10, }} />
                                            <View style={{ flex: 100 - score, borderRadius: 10, backgroundColor: '#fff', padding: 10, }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'space-evenly' }}>
                                    
                                    
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Financing')} style={{ margin: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'blue' }}>
                                        <Text style={styles.caption}>Seek Financial Assistance</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                    <Text style={styles.subTitle}>Basic Info</Text>
                                    <Ionicons name="ios-create" size={24} color="lightgrey" />
                                </View>
                                <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Main Business :</Text></View>
                                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.main_biz_act}</Text></View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Years in Business :</Text></View>
                                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.reg_date}</Text></View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Employee :</Text></View>
                                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
                                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{_.size(this.props.listWorkers)}</Text>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactPersonMain')} style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start' }}>
                                                <Text style={[styles.caption, { textAlign: 'left', paddingLeft: 5, paddingTop: 0, textAlignVertical: 'top' }]}>Add Worker</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                    <Text style={styles.subTitle}>Address</Text>
                                    <Ionicons name="ios-create" size={24} color="lightgrey" />
                                </View>
                                <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.email}</Text></View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Phone :</Text></View>
                                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.phone}</Text></View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Address :</Text></View>
                                        <View style={{ flex: 2 }}>
                                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.addr}</Text>
                                            {this.props.addr_2 && <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.addr_2}</Text>}
                                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.postcode} {this.props.city}</Text>
                                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{this.props.state}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                        </View>
                        {/* <View style={{ alignItems: 'flex-start' }}>
                            <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                        </View> */}
                    </View>
                    <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                        {/* HEADER */}
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                   <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                        <Ionicons name='ios-arrow-back' size={32} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                        <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                        <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* CONTENT AREA */}
                        <View style={{ flex: 7 }}>
                            <ScrollView>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5, height: Layout.window.height / 15, }} />

                                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                    <Text style={styles.subTitle}>Score</Text>
                                    <Ionicons name="ios-create" size={24} color="lightgrey" />
                                </View>
                                <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', marginLeft: 5 }]}>You have not registered a company yet.</Text>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCompany')}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, justifyContent: 'center' }}>
                                            <Text style={[styles.textDefault, { color: '#fff', margin: 10 }]}>Register Company</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            );
        }

    }
}


function mapStateToProps(state) {
    return {
        all: state.bizInfoReducer,
        companyName: state.bizInfoReducer.name,
        companyRegNo: state.bizInfoReducer.reg_no,
        reg_date: state.bizInfoReducer.reg_date,
        addr: state.bizInfoReducer.addr,
        addr_2: state.bizInfoReducer.addr_2,
        city: state.bizInfoReducer.city,
        state: state.bizInfoReducer.state,
        postcode: state.bizInfoReducer.postcode,
        main_biz_act: state.bizInfoReducer.main_biz_act,
        phone: state.bizInfoReducer.phone,
        email: state.bizInfoReducer.email,
        basic_status: state.bizInfoReducer.basic_status,
        additional_status: state.bizInfoReducer.additional_status,
        logo: state.bizInfoReducer.logo,

        listWorkers: state.listWorkersReducer.listWorkers,

        profile_pic: state.myAccountReducer.profile_pic,

        score: 25



    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo()),
        initiateListWorkers: () => dispatch(actionCreator.initiateListWorkers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)