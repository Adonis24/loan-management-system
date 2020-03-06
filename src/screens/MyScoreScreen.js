//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
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
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab} from 'native-base'

const MyScoreScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }
    const dispatch = useDispatch()
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)


    if (companyName) {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/grant.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                                <Tab heading="Mi-score">
                                    <Latest nav={nav} />
                                </Tab>
                                <Tab heading="E-score">
                                    <Popular nav={nav} />
                                </Tab>
                            </Tabs>
                        </View>
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
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 7, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start', alignItems: 'center', padding: 5 }]}>
                                <Image source={require('../assets/icon/rfq.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                <Text style={[styles.textBold, { alignSelf: 'center', }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
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
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                </View>
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                            <Ionicons name='ios-arrow-back' size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                            <Image source={require('../assets/images/grant.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Tabs tabBarBackgroundColor={'#fff'} tabContainerStyle={{ backgroundColor: '#fff' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Mi-score">
                                <Latest nav={this.nav} />
                            </Tab>
                            <Tab heading="E-score">
                                <Popular nav={this.nav} />
                            </Tab>
                        </Tabs>
                    </View>
                </View>
            </View>
        </View>

    );

}


const Latest = () => {

    return (
        <ScrollView style={{ padding: 20 }}>
            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Training                  :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Quiz                         :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Aggregate test   :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>0 points</Text>

                </View>
            </View>
        </ScrollView>
    )

}


const Popular = () => {

    return (
        <ScrollView style={{ padding: 20 }}>
            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Last year income        :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Paid up capital            :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12 }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Rejected profit/loss  :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Collateral                      :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>0 points</Text>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Deposit/liquids         :</Text>
                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold', fontSize: 12, alignSelf: 'center' }]}>0 points</Text>

                </View>
            </View>
        </ScrollView>
    )

}




export default MyScoreScreen