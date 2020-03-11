//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import LayoutB from '../Layout/LayoutB';

import Layout from '../constants/Layout'
import _ from 'lodash'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import * as actionCreator from '../store/actions/action'


const ProfileScreen = (props) => {


    // componentDidMount() {
    //     //this.props.initiateCompanyInfo()
    //     this.props.initiateListWorkers()
    // }

    const dispatch = useDispatch()

    const { companyRegNo, reg_date, addr, addr_2, city, state, postcode, main_biz_act, phone, email, basic_status, additional_status, logo } = useSelector(state => state.bizInfoReducer, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)
    const { listWorkers } = useSelector(state => state.listWorkersReducer, shallowEqual)
    const { profile_pic } = useSelector(state => state.myAccountReducer, shallowEqual)
    const score = 0



    useEffect(() => {

        dispatch(actionCreator.initiateCompanyInfo())
        dispatch(actionCreator.initiateListWorkers())
    }, []); // empty-array means don't watch for any updates


    const scoreColor = score > 66 ? 'green' : score > 33 ? 'yellow' : 'red'

    console.log(`logo gempak : ${logo}`)

    if (companyName) {
        return (
            < LayoutB
                title={'Biz Profile'}
                screenType='NO'
                navigation={props.navigation}
                imageUri={require('../assets/icon/rfq.png')}
            >

                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={{ uri: logo }} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode={'cover'} />
                        </View>
                        <View style={{ flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', paddingLeft: 2 }}>
                            <Text style={[styles.subTitle, { alignSelf: 'flex-start', textAlign: 'left' }]}>{companyName || 'John Doe Sdn Bhd'}</Text>
                            <Text style={[styles.subTitle, { alignSelf: 'flex-start', textAlign: 'left' }]}>SSM NO : {companyRegNo || '123456789'}</Text>
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={[styles.box,{ borderRadius: 5, backgroundColor: '#5A647F' }]} >
                            <Text style={[styles.caption, { color: '#fff' }]}>Go To Settings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <Text style={styles.subTitle}>Basic Info</Text>
                        <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                    </View>
                    <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Main Business :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{main_biz_act}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Years in Business :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{reg_date}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Employee :</Text></View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{_.size(listWorkers)}</Text>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ContactPersonMain')} style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start' }}>
                                    <Text style={[styles.caption, { textAlign: 'left', paddingLeft: 5, paddingTop: 0, textAlignVertical: 'top' }]}>Add Worker</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <Text style={styles.subTitle}>Address</Text>
                        <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                    </View>
                    <View style={{ width: Layout.window.width, paddingLeft: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{email}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Phone :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{phone}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Address :</Text></View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{addr}</Text>
                                {addr_2 && <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{addr_2}</Text>}
                                <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{postcode} {city}</Text>
                                <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{state}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
               </ LayoutB>
        )
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
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={styles.headText} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
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
                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                        </View>
                        <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', marginLeft: 5 }]}>You have not registered a company yet.</Text>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('AddCompany')}>
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





export default ProfileScreen