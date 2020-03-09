//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect } from 'react';
import {
    Image,
    Text,
    View,
    FlatList

} from 'react-native';
import LayoutB from '../Layout/Layout B';
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'
import { Thumbnail } from 'native-base'
import * as actionCreator from '../store/actions/action'



const InsightScreen = (props) => {


    const { assoDirArray } = useSelector(state => state.assoDirReducer, shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(actionCreator.initiateAssociateDir())
        console.log(`ini kat screen contact sudah : ${JSON.stringify(props.assoDirArray)}`)
    }, []); // empty-array means don't watch for any updates




    return (
        < LayoutB
            title='Contact'
            screenType='logo'
            navigation={props.navigation}
            imageUri={require('../assets/images/profile.png')}
        >
            {/* CONTENT AREA */}


            {assoDirArray && assoDirArray.length > 0 ?
                <FlatList
                    data={assoDirArray}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch' }}>
                            <View style={[{ marginLeft: 10, padding: 2, alignSelf: 'stretch', flexDirection: 'row', flex: 4 }]}>
                                <Thumbnail source={{ uri: item.profile_pic }} circle small style={{ borderWidth: 1, borderColor: 'lightgrey' }} />
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





            {/* <PopupScoreScreen /> */}

            {/* <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('QR')}>
                        <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View> */}
        </ LayoutB>

    );
}




export default InsightScreen