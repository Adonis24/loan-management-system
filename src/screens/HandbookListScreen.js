//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    FlatList
    
} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const HandbookListScreen = (props) => {

    const nav = (screen, item) => {
        props.navigation.navigate(screen, { item })
    }
    const dispatch = useDispatch()
    const { handbooksArray } = useSelector(state => handbookScreenReducer, shallowEqual)
    useEffect(() => {

        dispatch(actionCreator.initiateHandbooks())
    }, []); // empty-array means don't watch for any updates


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
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/handbook.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Handbook</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>This feature is currently undergoing enhancement and will be ready soon. In the meantime, feel free to use other amazing features available only on Bxcess </Text>
                        <Image source={require('../assets/images/bizlicensing.png')} style={{ width: Layout.window.width / 1.5, height: Layout.window.width / 1.5, opacity: 0.3 }} resizeMode={'contain'} />
                    </View>
                </View>
            </View>
        </View>

    );

}


    const Latest = (props) => {
    
        return (
            <ScrollView style={{ padding: 20 }}>
                {handbooksArray &&
                    <FlatList
                        data={handbooksArray}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => props.nav('Handbook', item)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                                <Image source={{ uri: item.picture }} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                    <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>{item.title}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', fontWeight: 'bold', fontStyle: 'italic' }]}>{item.author}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                    <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                                        <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                }
                {/* <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                            <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                            <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity> */}
            </ScrollView>
        )
    }



const Popular = (props) => {
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                    <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                    <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                        <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                    <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                    <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                        <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.nav('Handbook')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                    <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                    <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                        <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => props.nav(Handbook)}><Text>Buy</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}




export default HandbookListScreen