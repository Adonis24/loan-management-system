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


import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';

const SettingScreen = (props) => {

    const logout = async () => {
        await dispatch(actionCreator.logout())
        //await props.navigation.navigate('AuthenticationStack')
    }
    const dispatch = useDispatch()
    const { name, email, phone_no, profile_pic, email_verified_at, ic_no, member_id, expo_token } = useSelector(state => state.myAccountReducer, shallowEqual)
    //const { expo_token } = useSelector(state => state.myAccountReducer, shallowEqual)
    const local_expo_token = useSelector(state => state.registrationReducer.expo_token, shallowEqual)

    const toggleNotification = () => {
        expo_token ? dispatch(actionCreator.addExpoToken({ expo_token: null })) : dispatch(actionCreator.addExpoToken({ expo_token: local_expo_token }))
        dispatch(actionCreator.initiateMyAccount())
    }

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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20 }} />
            <ScrollView contentStyle={{ padding: 10 }} >


                <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[styles.subTitle, { margin: 5 }]}>Tools</Text>
                    <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                </View>
                {/* <View style={{ width: Layout.window.width, paddingLeft: 5 }}> */}
                <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                    <View style={{ flex: 1, marginBottom: 5, marginTop: 5, alignSelf: 'stretch', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10, paddingRight: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Notification Setting</Text>
                            <Ionicons name='ios-notifications-outline' size={25} color='black' />
                        </View>
                        <Text style={styles.textSmall}>Notification is {expo_token ? 'enabled' : 'disabled'}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => toggleNotification()} style={{ padding: 5, margin: 5, marginLeft: 0, borderWidth: 1, borderColor: expo_token ? 'red' : 'black', borderRadius: 5 }}>
                                <Text style={[styles.textSmall, { color: expo_token ? 'red' : 'black' }]}>{expo_token ? `Disable!` : 'Enable!'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => logout()} style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 5, alignSelf: 'stretch', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10, paddingRight: 10 }}>
                        <Text>Logout</Text>

                        <Ionicons name='ios-log-out' size={25} color='black' />

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </LayoutB>
    );

}



export default SettingScreen