//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import LayoutB from '../Layout/Layout B';

import Layout from '../constants/Layout'
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'
import { shallowEqual, useSelector } from 'react-redux'



const NotificationsScreen = (props) => {

    const notificationList = useSelector(state => [], shallowEqual)


    return (
        < LayoutB
            title={'Notifications'}
            screenType='logo'
            navigation={props.navigation}
            imageUri={require('../assets/images/profile.png')}
        >

            {/* CONTENT AREA */}
            
                <ScrollView contentStyle={{ padding: 10 }} >
                    {notificationList && notificationList.length > 0 ?
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                                    <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                </View> */}
                            <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-end', textAlign: 'right' }]}>20/12/2019</Text>
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcorper luctus porttitor. Sed a venenatis ipsum, eget suscipit sapien. Aliquam ornare sagittis felis et tempor. </Text>
                        </View> :
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            {/* <View style={[{ flex: 1, marginLeft: 10, padding: 2, alignSelf: 'stretch' }]}>
                            <Image source={require('../assets/images/girl.png')} style={{ flex: 1, height: Layout.window.height / 10, width: undefined, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                        </View> */}
                            <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', color: 'lightgrey' }]}>No notification yet</Text>
                        </View>}
                </ScrollView>
           
            {/* <PopupScoreScreen /> */}

            {/* <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('QR')}>
                        <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View> */}

        </ LayoutB>
    );

}



export default NotificationsScreen