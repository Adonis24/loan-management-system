//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutB from '../Layout/LayoutB';

const EAdvertisementScreen = (props) => {

    return (        
        < LayoutB
            title={'E-Advertisement'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/ecommerce.png')}
            boxStyle={{ marginLeft: Layout.window.width / 5}}
        >       
                    <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14 }]}>Browse products on our partners' platforms </Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <Image source={require('../assets/images/mayamall.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                            <Text style={[styles.textSmall, { margin: 5,textAlign:'center' }]}>MayaMall</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Ecommerce')} style={{ margin: 10, }}>
                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                        <Text style={[styles.caption, { color: '#fff' }]}>View</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                            <Text style={[styles.caption, { margin: 5, color: 'lightgrey', }]}>More partners coming soon</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            </View>
                        </View>
                    </View>
              </ LayoutB>
    );

}



export default EAdvertisementScreen