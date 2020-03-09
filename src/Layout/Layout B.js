import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'

const LayoutB = (props) => {
const {boxStyle} = props


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
                        <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }, boxStyle]}>
                            <Image source={props.imageUri} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 7}}>
                    {!(props.screenType === 'form') ? <View style={{padding:20}}>{props.children}</View> : props.children}

                </View>
            </View>
        </View>

    );
}


export default LayoutB;