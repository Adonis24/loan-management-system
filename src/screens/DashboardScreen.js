//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    Modal,


} from 'react-native';

import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import PopupScoreScreen from './PopupScoreScreen';

const DashboardScreen = (props) => {

    const dispatch = useDispatch()
    const { member_id, name, email, phone_no, profile_pic, email_verified_at } = useSelector(state => state.myAccountReducer, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)

    const toggleShow = () => {
        setPopUp(!popUp)
    }

    const [popUp, setPopUp] = useState(false)

    const [profilePic, setProfilePic] = useState(new Animated.Value(0))
    const [topBar, setTopBar] = useState(new Animated.Value(0))
    const [scrollBar, setScrollBar] = useState(new Animated.Value(0))
    const [logo, setLogo] = useState(new Animated.Value(0))

    const animate = () => {
        Animated.stagger(1000, [
            Animated.timing(logo, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(profilePic, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(topBar, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(scrollBar, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),

        ]).start();
    }

    const capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`


    useEffect(() => {
        dispatch(actionCreator.addExpoToken())
        //dispatch(actionCreator.initiateDashboardScreen())
        dispatch(actionCreator.initiateMyAccount())
        dispatch(actionCreator.initiateCompanyInfo())
        dispatch(actionCreator.generateJWT())
        animate()

    }, []); // empty-array means don't watch for any updates


    const profilePicOpac = profilePic.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const topBarOpac = topBar.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const scrollBarOpac = scrollBar.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const logoOpac = logo.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })



    return (
        <View style={styles.container }>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Image source={require('../assets/images/tekunD.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                {/* HEADER */}
                <View style={{ flex: 1 }}>
                    <Animated.View style={{ opacity: logoOpac, flex: 1, marginLeft: -10 }}>
                        <Image source={require('../assets/images/logo-white.png')} style={styles.logo} resizeMode='contain' />
                    </Animated.View>
                    <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                        <Animated.View style={{ opacity: profilePicOpac, flex: 5, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('MyAccount')} style={[{ marginLeft: 10, flexDirection: 'row' }]}>
                                <Image source={{ uri: profile_pic }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                    <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', color: '#fff' }]}>{capitalizeString(name)}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', color: '#fff' }]}>{member_id}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', color: '#fff' }]}>{companyName}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        {!(phone_no == null) && <Animated.View style={[{ opacity: topBarOpac, backgroundColor: '#fff', flex: 4, flexDirection: 'row', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, }, styles.shadowNew]}>
                            <TouchableOpacity onPress={() => companyName ? props.navigation.navigate('Profile') : props.navigation.navigate('NoCompany')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                                <Image source={require('../assets/images/profile.png')} style={{ width: Layout.window.width / 8, height: 40, }} resizeMode={'contain'} />
                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => companyName ? props.navigation.navigate('MyScore') : props.navigation.navigate('NoCompany')} style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../assets/images/my-score.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                            </TouchableOpacity> */}
                        </Animated.View>}
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 4, backgroundColor: 'transparent' }}>
                    <Animated.ScrollView style={{ opacity: scrollBarOpac, }} contentStyle={{ padding: 10 }} >
                        {companyName ?
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                         
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('Elearning')} style={[{ flex: 2, padding: 5, marginRight: 10, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                            <Image source={require('../assets/icon/e-learning.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Learning</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('InfoNewsList')} style={[{ flex: 2, padding: 5, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                            <Image source={require('../assets/icon/news.png')} style={styles.image} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-News</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('EAdvertisement')} style={[{ flex: 2, padding: 5, marginLeft: 10, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                            <Image source={require('../assets/images/ecommerce.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Advertisement</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('Financing')} style={[{ flex: 2, padding: 5, marginLeft: 10, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                            <Image source={require('../assets/icon/bill.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Financing</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                                {/* <View style={{ margin: 10 }} /> */}
                                <View style={{ margin: 5, paddingBottom: 5,  borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Features</Text>
                                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ flex:1, flexDirection: 'row',paddingLeft:5,paddingRight:5 }}>                                                               
                                            <TouchableOpacity onPress={() => props.navigation.navigate('Elearning')} style={[{ flex: 2, padding: 5, marginRight: 15, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/icon/e-learning.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Learning</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('InfoNewsList')} style={[{ flex: 2, padding: 5, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/icon/news.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-News</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('EAdvertisement')} style={[{ flex: 2, padding: 5, marginLeft: 15, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/images/ecommerce.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Advertisement</Text>
                                            </TouchableOpacity>
                                         
                                        </View>
                                    </View>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ flex:1, flexDirection: 'row',paddingLeft:5,paddingRight:5 }}>
                                         
                                            <TouchableOpacity onPress={() => props.navigation.navigate('Financing')} style={[{ flex: 2, padding: 5, marginRight: 15, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/images/loan.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Financing</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('Bill')} style={[{ flex: 2, padding: 5, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/icon/bill.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Billing</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => props.navigation.navigate('BizApp')} style={[{ flex: 2, padding: 5, marginLeft: 15, justifyContent: 'flex-start', borderRadius: 10 }, styles.shadowNew]}>
                                                <Image source={require('../assets/images/marketplace.png')} style={{ width: undefined, height: Layout.window.height / 12, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>E-Xplore</Text>
                                            </TouchableOpacity>
                                       
                                        </View>
                                    </View>
                                    <View style={{ margin: 10 }} />
                                </View>
                                <View style={{ margin: 10 }} />
                            </View>
                            : phone_no == null ? <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Highlight</Text>
                                        <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                                    </View>
                                </View>
                                <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
                                    <Text>Thank you for registering with us. To ensure that you get the best of what Tent offers, please have your phone number and your email address verified !</Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={{ width: Layout.window.width * 0.3, padding: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                        <Text style={[styles.caption, { color: '#fff' }]}>Go To Settings</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> :
                                <View />
                        }
                        {/**Highlight */}


                        <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Highlight</Text>
                                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => console.log(`navigate('None')`)} style={{ margin: 10 }}  >
                                <Image source={require('../assets/images/banner1.png')} style={styles.banner} resizeMode={'cover'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log(`navigate('None')`)} style={{ margin: 10 }}  >
                                <Image source={require('../assets/images/banner2.png')} style={styles.banner} resizeMode={'cover'} />
                            </TouchableOpacity>
                        </View>
                        {/*Notification */}
                        {/* <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Notifications</Text>
                                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                    <Text style={styles.caption}>No notifications yet...</Text>

                                </View>
                            </View>
                        </View> */}
                    </Animated.ScrollView>
                </View>
            </View>
            {/* <PopupScoreScreen /> */}
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0, padding: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('QR')}>
                    <Image source={require('../assets/images/qr.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
        </View>
    );

}



export default DashboardScreen
