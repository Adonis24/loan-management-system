import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import * as actionCreator from '../store/actions/action'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import moment from 'moment'


const DashboardScreen = (props) => {

    const dispatch = useDispatch()
    const { member_id, name, email, phone_no, profile_pic, email_verified_at } = useSelector(state => state.myAccountReducer, shallowEqual)

    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)
    const { logo } = useSelector(state => state.bizInfoReducer, shallowEqual)

 
    const goInfoNews = (item) => {  
        props.navigation.navigate('InfoNews', { item: JSON.stringify(item) })
    }

    useEffect(() => {
        dispatch(actionCreator.initiateNews())
    }, []); // empty-array means don't watch for any updates

    const { newsArray } = useSelector(state => state.newsScreenReducer, shallowEqual)
    const [profilePic, setProfilePic] = useState(new Animated.Value(0))
    const [topBar, setTopBar] = useState(new Animated.Value(0))
    const [scrollBar, setScrollBar] = useState(new Animated.Value(0))


    const animate = () => {
        Animated.stagger(1000, [
            Animated.timing(profilePic, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(topBar, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(scrollBar, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
        ]).start();
    }

    const advert = [require('../assets/images/banner1.png'), require('../assets/images/banner2.png')]

    const capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`

    useEffect(() => {
        dispatch(actionCreator.initiateMyAccount())
        dispatch(actionCreator.initiateCompanyInfo())
        dispatch(actionCreator.generateJWT())
        animate()

    }, []); 


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

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Image source={require('../assets/images/tekunE.png')} style={{ width: Layout.window.width, height: Layout.window.height / 3.2 }} resizeMode={'cover'} />
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                {/* HEADER */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                        <Animated.View style={{ opacity: profilePicOpac, flex: 5, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('MyAccount')} style={[{ marginLeft: 10, flexDirection: 'row' }]}>
                                <Image source={{ uri: profile_pic }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                    <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', color: '#fff' }]}>{capitalizeString(name)}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', color: '#fff' }]}>{member_id}</Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        {companyName && <Animated.View style={[{ opacity: topBarOpac, flex: 4 }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={{ flex:1,flexDirection: 'row', backgroundColor: '#fff', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderRightWidth: 0, }}>
                                    <View style={{flex:1}}>
                                        <Image source={!logo ? require('../assets/images/profile.png') : { uri: logo }} style={{ width: 30, height: 30, margin: 5, }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={[styles.headText, { paddingRight: 10,paddingLeft: 10,flex:5}]} numberOfLines={1} ellipsizeMode={'tail'}>{companyName} </Text>
                                </View>
                            </View>
                        </Animated.View>}
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 8, backgroundColor: 'transparent' }}>
                    <Animated.View style={{ opacity: scrollBarOpac, flex: 1 }} >
                        <View style={{ flex: 2, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                            <View style={{ margin: 5, paddingBottom: 5, borderStyle: 'solid' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'stretch' }}>
                                    <FeatureIcon link={'Elearning'} caption={'E-Learning'} navigation={props.navigation}>
                                        <Image source={require('../assets/icon/e-learning.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon link={'InfoNewsList'} caption={'E-News'} navigation={props.navigation}>
                                        <Image source={require('../assets/icon/news.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon link={'EAdvertisement'} caption={'E-Advertisement'} navigation={props.navigation}>
                                        <Image source={require('../assets/images/ecommerce.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon link={'Financing'} caption={'E-Financing'} navigation={props.navigation}>
                                        <Image source={require('../assets/images/loan.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                </View>
                                <View style={{ margin: 5 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'stretch' }}>
                                    <FeatureIcon link={'Bill'} caption={'Bill'} navigation={props.navigation}>
                                        <Image source={require('../assets/icon/bill.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon link={'BizApp'} caption={'BizApp'} navigation={props.navigation}>
                                        <Image source={require('../assets/icon/marketplace.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon link={'Ecommerce'} caption={'E-Commerce'} navigation={props.navigation}>
                                        <Image source={require('../assets/icon/ecommerce.png')} style={styles.featureIconStyle} resizeMode={'contain'} />
                                    </FeatureIcon>
                                    <FeatureIcon />
                                </View>
                                <View style={{ margin: 5 }} />
                            </View>
                        </View>
                        {/**Latest Info */}
                        <View style={{ flex: 3, margin: 0, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid', backgroundColor: 'transparent' }}>
                            <View style={{ marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor: 'transparent' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                                    <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Latest Info</Text>
                                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                                </View>
                            </View>
                            {newsArray ? newsArray.length > 0 ?
                                <FlatList
                                    contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                    data={newsArray}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => goInfoNews(item)}
                                            style={{ width: Layout.window.width - 20, marginBottom: 5, borderBottomWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch' }}>
                                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch' }}>
                                                <View style={{ padding: 5, flex: 2, }}>
                                                    <Image source={{ uri: item.picture }} style={{ flex: 1, height: undefined, width: undefined }} />
                                                </View>
                                                <View style={{ flex: 5, padding: 5 }} >
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.textSmall, { flex: 1 }]}>{item.source}</Text>
                                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.textSmall, { flex: 1, textAlign: 'right' }]}>{moment(item.date).fromNow()}</Text>
                                                    </View>
                                                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.textSmall, { marginBottom: 5, textAlign: 'justify', color: '#000' }]}>{item.title}</Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    } />
                                : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                                </View>
                                : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <ActivityIndicator color={'lightgrey'} />
                                </View>
                            }
                        </View>
                        {/**Advertisement */}
                        <View style={{ flex: 1, }}>
                            {advert ? <SliderBox
                                images={advert}
                                autoplay
                                circleLoop
                            /> : <Text>No Advert</Text>}
                        </View>
                    </Animated.View>
                </View>
            </View>
        </View>
    );

}


const FeatureIcon = (props) => {
    if (props.link)
        return (<TouchableOpacity onPress={() => props.navigation.navigate(props.link)} style={[{ width: Layout.window.height / 10, height: Layout.window.height / 10, padding: 5, justifyContent: 'flex-start', borderRadius: 10, alignSelf: 'stretch' }, styles.shadowNew]}>
            <View style={{ flex: 1, opacity: 1 }}>
                {props.children}
                <Text style={[styles.caption, { flex: 1 }]} numberOfLines={1} ellipsizeMode={'tail'}>{props.caption}</Text>
            </View>
        </TouchableOpacity>)
    else
        return (<View style={[{ width: Layout.window.height / 10, height: Layout.window.height / 10, padding: 5, justifyContent: 'flex-start', borderRadius: 10, alignSelf: 'stretch' }, styles.shadowNew]} />

        )

}

export default DashboardScreen