//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Share

} from 'react-native';
import moment from 'moment'
import HTML from 'react-native-render-html'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'



const InfoNewsScreen = (props) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'https://www.google.com', url: 'https://www.google.com', title: 'what what'
            }, { dialogTitle: 'test', subject: 'test' });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`share berjaya :${JSON.stringify(result.activityType)}` )
                } else {
                    console.log(`share tak berjaya` )
                }
            } else if (result.action === Share.dismissedAction) {
                console.log(`share dismissed` )
            }
        } catch (error) {
            alert(error.message);
        }
    };


    //const item = props.route.params?.test ?? 'NA'
    const { item } = props.route.params;
    const parseItem = JSON.parse(item)
    console.log(`dapat item : ${JSON.stringify(parseItem)}`)
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
                    <Image source={{ uri: parseItem.picture }} style={{ height: Layout.window.height * 0.3, width: Layout.window.width }} resizeMode={'cover'} />
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
                            <Image source={require('../assets/images/news.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                            <Text style={[styles.headText, { alignSelf: 'center', }]} numberOfLines={1} ellipsizeMode={'tail'}>E-News</Text>
                        </View>
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 4 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'flex-start', pading: 20 }}>
                            <View style={{ margin: 20, marginBottom: 0, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                        <Text style={styles.textSmall}>Local</Text>
                                        <Text style={styles.textSmall}> |</Text>
                                        <Text style={styles.textSmall}> Technology</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                        onPress={() => console.log('tag pressed')}>
                                        <Text style={[styles.textSmall, {}]}>TEKUN</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                        onPress={() => console.log('tag pressed')}>
                                        <Text style={[styles.textSmall, {}]}>LIFESTYLE</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{borderWidth:1,borderColor:'lightgrey', height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center',marginRight:5}}>
                                    <Ionicons name="ios-bookmark" color={'lightgrey'} style={{ fontSize: 25, paddingRight: 5, paddingLeft: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onShare()} style={{borderWidth:1,borderColor:'lightgrey', height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                        <Ionicons name="md-share" color={'lightgrey'} style={{ fontSize: 25, paddingRight: 5, paddingLeft: 5 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ margin: 20, marginBottom: 0, alignSelf: 'stretch' }}>
                                <Text style={[styles.textDefault, { textTransform: 'uppercase', marginBottom: 5, textAlign: 'justify' }]}>{parseItem.title}</Text>

                                <Text style={styles.textSmall}>{parseItem.author}, {parseItem.source}</Text>
                                <Text style={styles.textSmall}>Published on {moment(parseItem.date).format("ddd, MMM D, YYYY")}</Text>
                            </View>

                            <HTML html={parseItem.content}
                                imagesMaxWidth={Layout.window.width}
                                style={{ margin: 10 }}
                                baseFontStyle={{color:'grey',fontFamily : 'Montserrat_medium',fontSize:14*0.8}}
                                containerStyle={{ padding: 10, margin: 10 }} />

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>


    );

}



export default InfoNewsScreen