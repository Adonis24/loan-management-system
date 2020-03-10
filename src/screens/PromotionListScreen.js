//console.ignoredYellowBox = ['Setting a timer']
import React,{useEffect} from 'react';
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
import { Tabs, Tab, ScrollableTab} from 'native-base'
import LayoutB from '../Layout/Layout B';

import * as actionCreator from '../store/actions/action'


const PromotionListScreen = (props) => {

    const nav = (screen, item) => {
        props.navigation.navigate(screen, { item })
    }

    const {promotionArray} = useSelector(state => state.promotionScreenReducer, shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(actionCreator.initiatePromotion())

    }, []); // empty-array means don't watch for any updates


    

    return (
        < LayoutB
        title={'Promotion'}
        screenType='form'
        navigation={props.navigation}
        imageUri={require('../assets/images/promotion.png')}
    >


                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        {promotionArray && promotionArray.length > 0 ? <Tabs tabBarBackgroundColor={'transparent'} tabContainerStyle={{ backgroundColor: 'transparent' }} tabBarTextStyle={[styles.textDefault, { color: '#000' }]} tabBarUnderlineStyle={{ backgroundColor: 'lightgrey' }} renderTabBar={() => <ScrollableTab />}>
                            <Tab heading="Latest">
                                <Latest nav={nav} promotionArray={promotionArray} />
                            </Tab>
                            <Tab heading="Popular">
                                <Popular nav={nav} />
                            </Tab>
                        </Tabs> : <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>Please check back for latest info soon</Text>
                                {/*                             
                                <Image source={require('../assets/images/bizlicensing.png')} style={{ flex:1,width: undefined, height: Layout.window.height / 1.5, alignSelf: 'center',opacity:0.3, borderWidth:1,borderColor:'#000' }} resizeMode={'contain'} /> */}

                            </View>
                        }
                    </View>
                </View>
            </ LayoutB>

    );

}


const Latest = (props) => {
    return (
        <ScrollView style={{ padding: 20 }}>
            {promotionArray &&
                <FlatList
                    data={promotionArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => props.nav('Promotion', item)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                            <Image source={{ uri: item.picture }} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>{item.title}</Text>
                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                            </View>
                        </TouchableOpacity>
                    )} />
            }
            {/* <TouchableOpacity onPress={() => this.props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity> */}
        </ScrollView>
    )

}


    const Popular = (props) => {
    
        return (
            <ScrollView style={{ padding: 20 }}>
                <TouchableOpacity onPress={() => props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.nav('InfoNews')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                    <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.1, width: undefined, }} resizeMode={'cover'} />
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Business Writing Talk</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>10 Jun 2019</Text>
                        <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                        <Text style={[styles.caption, { color: 'orange', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>Join now !</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    
}




export default PromotionListScreen