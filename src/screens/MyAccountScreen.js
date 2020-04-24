//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Animated, StyleSheet
} from 'react-native';
import moment from 'moment'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'


import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const MyAccountScreen = (props) => {

    const [scrollY, setScrollY] = useState(new Animated.Value(0))

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });

    const imageOpacityTerbalik = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1, 1],
        extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const _renderScrollViewContent = () => {
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styleParalax.row}>
                        <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    const { name, email, phone_no, profile_pic, email_verified_at, ic_no, member_id } = useSelector(state => state.myAccountReducer, shallowEqual)

    const connect_id = useSelector(state => state.myAccountReducer.id, shallowEqual)

    const { companyRegNo, reg_date, addr, addr_2, city, state, postcode, main_biz_act, basic_status, additional_status, logo } = useSelector(state => state.bizInfoReducer, shallowEqual)
    const companyEmail = useSelector(state => state.bizInfoReducer.email, shallowEqual)
    const companyPhone = useSelector(state => state.bizInfoReducer.phone, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)


    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(actionCreator.initiateMyAccount())
    }, []); // empty-array means don't watch for any updates




    return (
        <View style={styleParalax.fill}>
            <ScrollView
                style={styleParalax.fill}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                )}
            >
                <View style={{ marginTop: 250 }} />

                {/* PERSONAL PROFILE */}
                <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Personal</Text>
                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                        </View>
                    </View>
                    <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{name}</Text></View>
                        </View>
                        {ic_no && <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>IC :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{ic_no}</Text></View>
                        </View>}
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Membership:</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{member_id}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 8, }}>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.answer,]}>{email}</Text>
                                    </View>
                                    {email_verified_at && <View style={{ flex: 1, }}>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.answer,]}>
                                            <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} />
                                        </Text>
                                    </View>}
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Phone :</Text></View>
                            <View style={{ flex: 2 }}>
                                {phone_no ? <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.answer]}>{phone_no}</Text>
                                    <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} />
                                </View> :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('AddPhone', { screen: 'setting' })} style={{ flexDirection: 'row', paddingRight: 10 }}>
                                        <Text style={[styles.answer, { color: '#2C4690' }]}>Add Phone No</Text>
                                        <Ionicons name={'md-add'} size={15} color={'#2C4690'} style={{ paddingLeft: 10 }} />
                                    </TouchableOpacity>}
                            </View>
                        </View>

                    </View>
                </View>
                {/* END PERSONAL PROFILE --- START COMPANY */}
                {phone_no ? <>
                    <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Company</Text>
                                {companyName ? <Ionicons name={'md-more'} size={24} color={'#2C4690'} /> :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('AddCompany')} style={{ paddingRight: 10 }}>
                                        <Ionicons name={'md-add'} size={24} color={'#2C4690'} />
                                    </TouchableOpacity>}
                            </View>
                        </View>
                        {companyName ?
                            <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyName}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>SSM :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyRegNo || '123456789'}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Established :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{moment(reg_date).format('MMMM Do YYYY')}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Activities :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{main_biz_act}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Status :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{basic_status}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Email :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyEmail}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Phone :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyPhone}</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Address :</Text></View>
                                    <View style={{ flex: 2 }}>
                                        <Text style={[styles.answer]}>{addr}</Text>
                                        <Text style={[styles.answer]}>{addr_2}</Text>
                                        <Text style={[styles.answer]}>{postcode}</Text>
                                        <Text style={[styles.answer]}>{city}</Text>
                                        <Text style={[styles.answer]}>{state}</Text>
                                    </View>
                                </View>



                            </View> : <View />}
                    </View>
                    {/*  START COURSE */}
                    <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Courses</Text>
                                {companyName ? <Ionicons name={'md-more'} size={24} color={'#2C4690'} /> :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('AddCompany')} style={{ paddingRight: 10 }}>
                                        <Ionicons name={'md-add'} size={24} color={'#2C4690'} />
                                    </TouchableOpacity>}
                            </View>
                        </View>
                        {companyName ?
                            <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyName}</Text></View>
                                </View>
                            </View> : <View />}
                    </View>
                    {/*  START LOAN */}
                    <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Loan</Text>
                                {companyName ? <Ionicons name={'md-more'} size={24} color={'#2C4690'} /> :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('AddCompany')} style={{ paddingRight: 10 }}>
                                        <Ionicons name={'md-add'} size={24} color={'#2C4690'} />
                                    </TouchableOpacity>}
                            </View>
                        </View>
                        {companyName ?
                            <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                                    <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyName}</Text></View>
                                </View>




                            </View> : <View />}
                    </View>


                </> : <View style={{ borderColor: 'lightyellow', padding: 20, margin: 10, alignSelf: 'stretch', backgroundColor: 'lightyellow', borderWidth: 1, borderColor: 'lightgrey', marginBottom: 20 }}>
                        <Text style={[styles.textSmall, { textAlign: 'center' }]}>Adding Phone Number will give you access to more features</Text>
                    </View>}
                {/* {_renderScrollViewContent()} */}
                {/* <View  style={{marginBottom:400}} /> */}
                <View style={{ marginTop: 250 }} />
            </ScrollView>
            <Animated.View style={[styleParalax.header, { height: headerHeight }]}>
                <Animated.Image
                    style={[
                        styleParalax.backgroundImage,
                        { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
                    ]}
                    source={{ uri: profile_pic }}
                />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => props.navigation.navigate('CameraSelfie')}>
                        <Text>Add/Change</Text>
                    </TouchableOpacity>

                </View>
                {/* <View style={styleParalax.bar}>
                    <Animated.Text style={[styleParalax.title, { color: 'white', opacity: imageOpacityTerbalik }]}>Title</Animated.Text>
                </View> */}
                <Animated.View style={[{ backgroundColor: '#192f6a', flexDirection: 'row', }, styleParalax.bar, { paddingLeft: 10, paddingRight: 10, paddingBottom: 10, opacity: imageOpacityTerbalik }]}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons name={'ios-arrow-back'} size={24} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3, alignItems: 'center' }}>
                        <Text style={[styles.textDefault, { color: '#fff', textTransform: 'uppercase' }]}>{name}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>

                </Animated.View>
            </Animated.View>
        </View>
    );
}


const styleParalax = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        height: 40,
        margin: 16,
        // backgroundColor: '#D3D3D3',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#192f6a',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
})

export default MyAccountScreen