//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutB from '../Layout/LayoutB';

const BillScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }

    return (

        < LayoutB
            title={'E-Billing'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/icon/wallet.png')}
            boxStyle = {{marginLeft: Layout.window.width / 10}}
        >

            <ScrollView style={{ padding: 20 }}>

                <View style={[{ flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20, alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                    <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'left', alignSelf: 'flex-start' }]}>Select Services</Text>
                </View>

                <View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'darkgrey', flexDirection: 'row' }]}>
                    <TextInput style={{ flex: 5 }} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Ionicons name='ios-search' color={'darkgrey'} style={{ fontSize: 17 }} />
                    </View>
                </View>


                {/* <View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1,paddingLeft:10 }}>
        <Text>Boost</Text>
    </View>
</View>
<View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1 ,paddingLeft:10}}>
        <Text>Touch n Go</Text>
    </View>
</View>
<View style={[{ flex: 1, alignSelf: 'stretch', marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 10, flexDirection: 'row' }]}>
    <View style={{ flex: 1 }}>
        <Text>Icon</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',borderLeftColor:'darkgrey',borderLeftWidth:1,paddingLeft:10 }}>
        <Text>MCash</Text>
    </View>
</View> */}

            </ScrollView>
              </LayoutB>

        );
    
}



export default BillScreen