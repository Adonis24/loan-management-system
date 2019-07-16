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

    componentDidMount() {
        //this.props.initiateCompanyInfo()
        this.props.initiateListWorkers()
    }
    render() {

        //console.log(`all biz : ${Jthis.props.all}`)
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
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                                <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 7 }}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <Image source={{uri:this.props.logo}} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                </View>
                                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', color: '#4A90E2' }]}>{this.props.companyName || 'John Doe Sdn Bhd'}</Text>
                                    <Text style={[styles.subTitle, { margin: 5 }]}>SSM NO :{this.props.companyRegNo || '123456789'}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactPerson')}>
                                <Text>Add Worker</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left' }]}>Business Model :</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'left' }]}>F {'&'} B Industry</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.caption, { margin: 5, textAlign: 'left' }]}>Add Info</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left' }]}>Years doing Business : </Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'left' }]}>5 </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.caption, { margin: 5, textAlign: 'left' }]}>Add Other Business</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left' }]}>Number of employee : </Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'left' }]}>40 people</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Ionicons name='ios-add' size={26} color='lawngreen' style={{ margin: 5 }} />
                                    <Text style={[styles.caption, { margin: 5, flex: 2, textAlign: 'left' }]}>Add Loan Details</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left' }]}>Scoring : </Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, fontWeight: 'bold', textAlign: 'center' }]}>48</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Ionicons name='ios-close' size={26} color='red' style={{ margin: 5 }} />
                                    <Text style={[styles.caption, { margin: 5, textAlign: 'left' }]}>Make Report</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, margin: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[styles.textDefault, { flex: 1, alignSelf: 'flex-start', margin: 5, fontSize: 12, textAlign: 'left' }]}>Scoring meter {'&'} chart</Text>
                                <View style={{ flex: 1, marginLeft: 20, marginLeft: 5, justifyContent: 'center', alignSelf: 'stretch' }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={[styles.caption, { flex: 1, }]}>Poor</Text>
                                        <Text style={[styles.caption, { flex: 1, }]}>Fair</Text>
                                        <Text style={[styles.caption, { flex: 1, }]}>Excellent</Text>
                                    </View>
                                    <View style={{ padding: 10, flex: 1, borderRadius: 10, borderWidth: 1, borderColor: '#000' }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5, justifyContent: 'space-evenly' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LoanApplication')} style={{ margin: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'blue' }}>
                                    <Text>Apply Loan</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Consultation')} style={{ margin: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'blue' }}>
                                    <Text>Get Consultation</Text>
                                </TouchableOpacity>
                            </View>
                            {this.props.listWorkers && this.props.listWorkers.map(
                                (lw, i) => <View key={i} style={{ flexDirection: 'row', }}>
                                    <Text >{i}</Text><Text>{lw.full_name}</Text></View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
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

    

    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo()),
        initiateListWorkers: () => dispatch(actionCreator.initiateListWorkers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)