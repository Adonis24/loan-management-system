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
    const { boxStyle, boxStyle1 } = props


    return (

        <View style={styles.container}>
            {props.screenType === 'NO' ? <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                </View>

            </View> : <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    {!props.elearning && <>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                        </View>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                        </View></>
                    }
                </View>}
            {props.screenType === 'logo' ?
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: Layout.window.width / 6, justifyContent: 'center', paddingLeft: 5 }}>
                            <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 5, height: (Layout.window.width / 5) * 2 / 3, paddingTop: 5 }} resizeMode='cover' />
                        </View>
                        <View style={{ width: Layout.window.width - Layout.window.width / 6, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }, boxStyle]}>
                                <Image source={props.imageUri} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.headText, { alignSelf: 'center' }]} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 8 }}>

                        {!((props.screenType === 'form') || (props.screenType === 'logo')) ?
                            <View style={{ padding: 20 }}>{props.children}</View> :
                            <View style={{ padding: 10 }, boxStyle1}>{props.children}</View>}
                    </View>
                </View> : <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, justifyContent: 'center', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={{ borderWidth: 1, flexDirection: 'row', backgroundColor: '#fff', borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey' }}>
                                    <Image source={props.imageUri} style={{ width: 30, height: 30, margin: 5,marginLeft:10 }} resizeMode={'contain'} />

                                    <Text style={[styles.headText, { paddingRight: 10 }]} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>

                                </View>
                            </View>
                            {/* <View style={[{ backgroundColor: '#fff',  borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }, boxStyle]}>
                                    <Image source={props.imageUri} style={{ flex: 1, width: undefined, height: undefined, margin: 5 }} resizeMode={'contain'} />
                                    <Text style={[styles.headText, { alignSelf: 'center', flex: 3, }]} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                                </View> */}

                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        {!(props.screenType === 'form') ? <View style={{ padding: 20 }}>{props.children}</View> : props.children}

                    </View>
                </View>}
        </View>

    );
}


export default LayoutB;