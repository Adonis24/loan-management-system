//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'



const BizAppScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
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
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/marketplace.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Biz App Marketplace</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        <ScrollView style={{ padding: 20 }}>

                            <View style={[{ flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                                <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Our selection of various tools and systems to assist in day-to-day operation and beyond </Text>
                            </View>

                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Image source={require('../assets/images/urusniaga.png')} style={{ width: undefined, height: Layout.window.height / 10, }} resizeMode='contain' />
                                <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>UrusNiaga</Text>
                                <Text style={[styles.textDefault, { margin: 5, fontSize: 12 }]}>Created to help you to manage sales, purchases, products, goods in stock, simple accounting, employees and customers.</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('BizAppDetail', { uri: 'https://urusniaga.my/refgctc' })} style={{ margin: 5, }}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>Detail</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('BizAppDetail', { uri: 'https://register.urusniaga.my/' })} style={{ margin: 5, }}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>Subscribe</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('BizAppDetail', { uri: 'https://demo.urusniaga.my/' })} style={{ margin: 5, }}>
                                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                            <Text style={[styles.caption, { color: '#fff' }]}>Demo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                                <Text style={[styles.caption, { marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10, color: 'lightgrey' }]}>Come back soon for more recommendation</Text>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>

        );
    
}



export default BizAppScreen