//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


  const InfoEventEdtScreen = (props) => {

        const item = props.route.param?.item ?? 'NA'
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View> */}
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'flex-start' }}>
                        <Image source={require('../assets/images/edt2.jpg')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width }} resizeMode={'cover'} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>
                           <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/event.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Event</Text>
                            </View>
                        </View>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 4 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[styles.subTitle, { margin: 15, alignSelf: 'flex-start' }]}>Entrepreneur Digital Transformation</Text>
                                                           
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { marginLeft: 5, }]}>Venue:</Text>
                                        <Text style={[styles.textDefault, { marginLeft: 5, fontWeight: 'bold' }]}>Main Auditorium IIUM Gombak</Text>
                                    </View>
                                    <View style={{  flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { marginLeft: 5, }]}>Date:</Text>
                                        <Text style={[styles.textDefault, { marginLeft: 5, fontWeight: 'bold' }]}>22nd July 2019</Text>
                                    </View>                                   
                                    <View style={{flexDirection: 'row', margin: 5 }}>
                                        <Text style={[styles.textDefault, { marginLeft: 5, }]}>Fee:</Text>
                                        <Text style={[styles.textDefault, { marginLeft: 5, fontWeight: 'bold' }]}>Free Admission</Text>                                       
                                    </View>                                   
                            
                            </View>
                        </View>
                    </View>
                </View>
            </View>


        );
    
}



export default InfoEventEdtScreen