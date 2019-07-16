//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class NotificationsScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Image source={require('../assets/images/topRight.png')} style={{ width: 120, height: 133 }} />
                </View>
                {/* <View style={{ alignItems: 'flex-start' }}>
                    <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                </View> */}
            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                {/* HEADER */}
                <View style={{ flex: 1 }}>
                    <View style={{  flex: 1, marginLeft: 5 }}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />
                    
                    </View>
                    <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                        <View style={{  flex: 5, flexDirection: 'row' }}>
                            
                        </View>
                        <View style={[{  backgroundColor: '#fff', flex: 4, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', paddingLeft:5, flexDirection: 'row', elevation: 2 }]}>
                            
                                <Image source={require('../assets/images/profile.png')} style={{  width: Layout.window.width / 10, height: undefined, }} resizeMode={'contain'} />
                                <Text style={[styles.textDefault,{fontSize: 18, fontWeight: "bold", paddingLeft:5, }]} numberOfLines={1} ellipsizeMode={'tail'}>Notifications</Text>
                             
                        </View>
                    </View>
                </View>
                {/* CONTENT AREA */}
                <View style={{ flex: 4 }}>
                    <ScrollView  contentStyle={{ padding: 10 }} >
                        {/*Financial Hub */}
                        <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)' }}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Financial Hub</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BizHub')}>
                                        <Text style={styles.caption}>More ></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Financing')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/images/e-scoring.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Financing</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Grant')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/images/grant.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Grant</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        <Image source={require('../assets/images/loan.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Loan Calculator</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        {/* <Image source={require('../assets/images/EDA.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>My Account</Text> */}
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoanApplication')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        {/* <Image source={require('../assets/icon/crm.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Loan</Text> */}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </ScrollView>
                </View>
            </View>
            {/* <PopupScoreScreen /> */}

            <View style={{ position: 'absolute', top: Constants.statusBarHeight, right: 0 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanQR')}>
                    <Image source={require('../assets/images/qr.png')} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>
        </View>

        );
    }
}


function mapStateToProps(state) {
    return {



    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)