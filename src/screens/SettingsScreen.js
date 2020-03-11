//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
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

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'


import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';

const SettingScreen = (props) => {

    const logout = async () => {
        await dispatch(actionCreator.logout())
        //await props.navigation.navigate('AuthenticationStack')
    }
    const dispatch = useDispatch()
    const { name, email, phone_no, profile_pic, email_verified_at, ic_no, member_id } = useSelector(state => state.myAccountReducer, shallowEqual)

    useEffect(() => {
        dispatch(actionCreator.enableNotification())
    }, []); // empty-array means don't watch for any updates

    return (

        < LayoutB
            title={'Settings'}
            screenType='logo'
            navigation={props.navigation}
            imageUri={require('../assets/images/profile.png')}
        >
            <ScrollView contentStyle={{ padding: 10 }} >
                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[styles.subTitle, { margin: 5 }]}>Profile Picture</Text>
                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                </View>
                <View style={{ width: Layout.window.width, paddingLeft: 5, alignItems: 'center' }}>
                    <Image source={{ uri: profile_pic }} style={{ width: Layout.window.width / 3, height: Layout.window.width / 3, borderRadius: Layout.window.width / 6 }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('CameraSelfie')}><Text>Add/Change</Text></TouchableOpacity>
                </View>
                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[styles.subTitle, { margin: 5 }]}>Profile</Text>
                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                </View>
                {/* <View style={{ width: Layout.window.width, paddingLeft: 5 }}> */}
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Name :</Text></View>
                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{name}</Text></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{email}</Text><TouchableOpacity >
                                {email_verified_at ? <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} /> : <Text style={[styles.caption, { padding: 3, margin: 3, }]}>Verify</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Phone :</Text></View>
                        <View style={{ flex: 2 }}>
                            {phone_no ? <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{phone_no}</Text>
                                <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} />
                            </View> :
                                <TouchableOpacity onPress={() => props.navigation.navigate('SignUpOtp', { screen: 'setting' })} style={{ borderRadius: 5 }}>
                                    <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', padding: 5 }]}>Add Phone</Text>
                                </TouchableOpacity>}
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>IC :</Text></View>
                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{ic_no}</Text></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Membership:</Text></View>
                        <View style={{ flex: 2 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>{member_id}</Text></View>
                    </View>
                </View>

                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[styles.subTitle, { margin: 5 }]}>Tools</Text>
                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                </View>
                {/* <View style={{ width: Layout.window.width, paddingLeft: 5 }}> */}
                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 10, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 1 }}><Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left' }]}>Clicking the button will log you out from the application. Username and password are required to log back in. :</Text></View>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 5, alignSelf: 'flex-start' }}>
                        <TouchableOpacity onPress={() => logout()} style={{ marginLeft: 0, backgroundColor: 'orange', borderRadius: 5 }}>
                            <Text style={[styles.textDefault, { margin: 10, color: '#fff' }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 5, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.enableNotification()} style={{ marginLeft: 5, backgroundColor: 'crimson', borderRadius: 5 }}>
                                    <Text style={[styles.textDefault, { margin: 10, color: '#fff' }]}>Enable Notification</Text>
                                </TouchableOpacity>
                            </View> */}

            </ScrollView>


            {/* <PopupScoreScreen /> */}

            {/* <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('QR')}>
                        <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View> */}
        </LayoutB>
    );

}



export default SettingScreen