//console.ignoredYellowBox = ['Setting a timer']
import React,{useEffect,useState} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import QRCode from 'react-native-qrcode-svg'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'



const MyAccountScreen = (props) => {

    const { member_id, name, email, phone_no, profile_pic, email_verified_at, associateConnection, requestConnection, allConnection } = useSelector(state => state.myAccountReducer, shallowEqual)
    const connect_id = useSelector(state => state.myAccountReducer.id, shallowEqual)
    const companyName = useSelector(state => state.bizInfoReducer.name, shallowEqual)
    {/*const { connect_id } = useSelector(state => state.notificationScreenReducer, shallowEqual)*/}

    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false)

    {/* constructor(props) {
        super(props)
        this.state = { popUp: false }

    }
    // toggleShow = () => {
    //     this.setState({ popUp: !this.state.popUp })
    // }

    process() {
        //this.props.accept(this.props.connect_id)
        //this.toggleShow()
    }
    componentDidMount() {
        //this.props.initiateMyAccount()
        //this.props.navigation.navigate('PopupScore')
        this.props.getConnectionStatus()
    }  */}

    useEffect(() => {
        dispatch(actionCreator.initiateMyAccount()),
        dispatch(actionCreator.getConnectionStatus())
    
    }, []); // empty-array means don't watch for any updates

    {/*accept: (val) => dispatch(actionCreator.accept(val)) */}


    const capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`


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
                <View style={{ flex: 6, backgroundColor: 'blue' }}>
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: profile_pic }} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff', marginBottom: 5 }]} resizeMode={'cover'} />
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{capitalizeString(name)}</Text>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{companyName}</Text>
                            <View style={{ flexDirection: 'row', padding: 5, margin: 10, borderRadius: 5, backgroundColor: '#fff' }}>

                                <TouchableOpacity onPress={() =>props.navigation.navigate('QR')} style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                                    <QRCode value={'test'} size={20} backgroundColor='#fff' color='#2FD9FE' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 5 }}>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>Connections</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('AssociateDir')}><Text style={[styles.caption, { color: '#fff' }]}>{associateConnection} connected</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('PendingDir')}><Text style={[styles.caption, { color: '#fff' }]}>{requestConnection} pending</Text></TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 9 }}>
                    <ScrollView contentStyle={{ padding: 10 }} >

                        {/**Projects */}
                        <View style={{ margin: 5, paddingBottom: 5, }}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Projects</Text>
                                    <Text style={styles.caption}>More ></Text>
                                </View>
                            </View>
                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                                    <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                </View> */}
                                {/* <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-end', textAlign: 'right' }]}>20/12/2019</Text> */}
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' /> */}
                                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#000' }]}>No active projects at the moment</Text>

                                </View>
                            </View>
                        </View>


                    </ScrollView>
                </View>
            </View>
        </View >
    );

}




export default MyAccountScreen