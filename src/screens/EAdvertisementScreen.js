//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutB from '../Layout/LayoutB';

const advertData = [
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/300/300', endDate: moment().format('MM/DD/YYYY') },
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/350/300', endDate: moment().format('MM/DD/YYYY') },
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/300/350', endDate: moment().format('MM/DD/YYYY') },
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/300/370', endDate: moment().format('MM/DD/YYYY') },
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/307/300', endDate: moment().format('MM/DD/YYYY') },
    { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', uri: 'https://picsum.photos/300/200', endDate: moment().format('MM/DD/YYYY') }
]

const EAdvertisementScreen = (props) => {

    return (
        < LayoutB
            title={'E-Advertisement'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/ecommerce.png')}
            boxStyle={{ marginLeft: Layout.window.width / 5 }}
        >
            {/* <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', }]}>Browse products on our partners' platforms </Text> */}
<View style={{margin:20}} />
            <FlatList
                data={advertData}

                keyExtractor={(item, index) => index.toString()}

                renderItem={({ item }) => <View style={[{ alignSelf: 'stretch', height: Layout.window.height / 8, margin: 10, marginTop: 0, borderRadius: 10 }, styles.shadowNew]}>
                    <Image source={{ uri: item.uri }} style={{ flex: 1, width: undefined, height: undefined, borderRadius: 10 }} resizeMode={'cover'} />
                    <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'flex-start' }}>
                        <View style={{ backgroundColor: '#fff', padding: 5, opacity: 0.5,flexDirection:'row',justifyContent:'space-between' }}><Text style={{ color: '#000' }}>{item.title}</Text>
                            <Text style={{ color: '#000' }}>{item.endDate}</Text>
                        </View>
                    </View>
                </View>} />


        </ LayoutB>
    );

}



export default EAdvertisementScreen