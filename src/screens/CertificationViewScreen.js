//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
  
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


const CertificationViewScreen = (props) => {

    const item = props.route.params?.item ?? 'NA'
    console.log(`dapat item : ${JSON.stringify(item)}`)
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
                    <Image source={require('../assets/images/business.png')} style={{ height: Layout.window.height * 0.3, width: Layout.window.width }} resizeMode={'cover'} />
                </View>
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
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                            <Image source={require('../assets/images/certification.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Certification</Text>
                        </View>
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 2 }}>
                </View>
                <View style={{ flex: 7 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.subTitle, { margin: 15, alignSelf: 'flex-start' }]}>Business Strategy Training</Text>
                            <ScrollView>
                                <Text style={[styles.textDefault, { margin: 10 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.textDefault, { margin: 5, }]}>Venue:</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PWTC, Kuala Lumpur</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                    <Text style={[styles.textDefault, { margin: 5, }]}>Date:</Text>
                                    <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>10 Jun 2019</Text>
                                </View>
                                <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 15, marginRight: 15, borderWidth: 1, borderColor: '#ddd', paddingTop: 5, marginBottom: 20, justifyContent: 'space-between', marginTop: 10 }]}>
                                    <Text style={[styles.textDefault, { color: 'yellowgreen', fontSize: 12, margin: 10 }]}>Congratulation you have earn certification for this training</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </View>


    );

}



export default CertificationViewScreen