//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput, ActivityIndicator

} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import styles from '../styles/styles'
import { Linking } from 'expo';

import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';

const tags = ['daging', 'cuka', 'sabun', 'roti', 'covid-19', 'panadol']



const InsightScreen = (props) => {
    const { assoDirArray } = useSelector(state => state.assoDirReducer, shallowEqual)
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(actionCreator.initiateAssociateDir())

    }, []); // empty-array means don't watch for any updates

    const [tagMode, setTagMode] = useState(true)
    assoDirArray && console.log(`ini kat screen contact sudah : ${JSON.stringify(assoDirArray)}`)

    return (
        < LayoutB
            title={'Directory'}
            screenType='logo'
            navigation={props.navigation}
            imageUri={require('../assets/images/profile.png')}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                {tagMode ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, }}>
                        <FlatList
                            contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
                            horizontal
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                    onPress={() => console.log('tag pressed')}>
                                    <Text style={styles.textSmall}>{item}</Text>
                                </TouchableOpacity>} />
                        <TouchableOpacity onPress={() => setTagMode(false)}>
                            <Ionicons name="ios-search" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5, paddingLeft: 5 }} />
                        </TouchableOpacity>

                    </View> :
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, padding: 10 }}>

                        <TextInput placeholder='Please Enter Keyword' style={[styles.searchBar, { flex: 4 }]} onChangeText={(val) => console.log(val)} />

                        <TouchableOpacity onPress={props.navigation.openDrawer} >
                            <Ionicons name="ios-options" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTagMode(true)}>
                            <Ionicons name="ios-pricetags" color={'#055E7C'} style={{ fontSize: 27, paddingRight: 5, paddingLeft: 5 }} />
                        </TouchableOpacity>
                    </View>}

            </View>

            {/* CONTENT AREA */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {assoDirArray ? assoDirArray.length > 0 ?
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        data={assoDirArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => hafiz(item)}
                                style={{ width: Layout.window.width, marginBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch' }}>
                                <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch' }}>
                                    <View style={{ padding: 5, flex: 2, paddingTop: 0 }}>
                                        {/* <Image source={{ uri: item.profile_pic }} style={{ flex: 1, height: undefined, width: undefined }} /> */}
                                        <Entypo name="shop" color={'lightblue'} style={{ fontSize: 80, paddingRight: 5, paddingLeft: 5 }} />
                                    </View>
                                    <View style={{ flex: 5, padding: 5 }} >
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={[styles.textDefault, { textTransform: 'uppercase', textAlign: 'justify' }]}>Kedai {item.name}</Text>
                                            {/* <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.textSmall, { flex: 1, textAlign: 'right' }]}>{moment(item.date).format("ddd, MMM D, YYYY")}</Text> */}
                                        </View>
                                        <Text style={[styles.textDefault, { marginBottom: 5 }]}>Pembekal Barangan Runcit dan Basah</Text>
                                        <Text style={[styles.textSmall, { marginBottom: 5 }]}>Seri Kembangan, Selangor</Text>
                                        <View style={{ marginBottom: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <View style={{ padding: 3, borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey', margin: 3,marginLeft:0 }}>
                                                <Text style={styles.textSmall}>kicap</Text>
                                            </View>
                                            <View style={{ padding: 3, borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey', margin: 3 }}>
                                                <Text style={styles.textSmall}>maggi</Text>
                                            </View>
                                            <View style={{ padding: 3, borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey', margin: 3 }}>
                                                <Text style={styles.textSmall}>topeng muka</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                            {/* <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                                    onPress={() => console.log('tag pressed')}>
                                                    <Text style={[styles.textSmall, {}]}>TEKUN</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ margin: 3, padding: 3, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}
                                                    onPress={() => console.log('tag pressed')}>
                                                    <Text style={[styles.textSmall, {}]}>MALAS</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around' }}>
                                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                                                    <Ionicons name="ios-mail" color={'lightgrey'} style={{ fontSize: 27, paddingRight: 10, }} />
                                                </TouchableOpacity>
                                                <Ionicons name="ios-call" color={'lightgrey'} style={{ fontSize: 27, paddingRight: 10, paddingLeft: 5 }} />
                                                <Ionicons name="ios-bookmark" color={'lightgrey'} style={{ fontSize: 27, paddingRight: 10, paddingLeft: 5 }} />
                                                <TouchableOpacity onPress={() => Linking.openURL(`waze://ul?ll=45.6906304,-120.810983&z=10`)}>
                                                    <Ionicons name="md-map" color={'lightgrey'} style={{ fontSize: 27, paddingRight: 10, paddingLeft: 5 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        } />
                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                    </View>
                    : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <ActivityIndicator color={'lightgrey'} />
                    </View>
                }
            </View>




            {/* <View style={{ flex: 4 }}>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, paddingBottom: 10, marginBottom: 20 }]}>

                        {assoDirArray && assoDirArray.length > 0 ?
                            <FlatList
                                data={assoDirArray}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch' }}>
                                        <View style={[{ marginLeft: 10, padding: 2, alignSelf: 'stretch', flexDirection: 'row', flex: 4 }]}>
                                        <Image source={{ uri: item.profile_pic }} style={{ borderWidth: 1, borderColor: 'lightgrey',width:36,height:36,borderRadius:18 }} />
                                            <View>
                                                <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>{item.name}</Text>
                                                <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>{item.phone_no}</Text>
                                                <Text style={[styles.textDefault, { margin: 5, alignSelf: 'flex-start', textAlign: 'left' }]}>{item.email}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5, flex: 1 }}>
                                            <View style={{ backgroundColor: '#6949EF', borderRadius: 10 }}>
                                                <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: '#fff' }]}>Friend</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                            :

                            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch' }}>
                                <View style={[{ marginLeft: 10, padding: 2, alignSelf: 'stretch', flexDirection: 'row' }]}>
                                    <Text style={[styles.caption, { margin: 5, alignSelf: 'flex-start', textAlign: 'left', color: 'lightgrey' }]}>No members yet</Text>
                                </View>

                            </View>
                        }
                    </View>
                </View>    */}


        </LayoutB>

    );
}




export default InsightScreen