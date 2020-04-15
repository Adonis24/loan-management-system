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
import LayoutB from '../Layout/LayoutB';



const BizAppScreen = (props) => {
    return (
        < LayoutB
            title={'App Marketplace'}
            screenType='form'          
            navigation={props.navigation}
            imageUri={require('../assets/images/marketplace.png')}
        >
                    <ScrollView style={{}}>
                        <View style={{ margin: 10 }} />
                        <View style={[{ flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                            <Text style={[styles.textDefault, { margin: 5, textAlign: 'justify' }]}>Our selection of various tools and systems to assist in day-to-day operation and beyond </Text>
                        </View>

                        <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
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



                    </ScrollView>
               </ LayoutB>
    );

}



export default BizAppScreen