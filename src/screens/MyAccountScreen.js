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
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class MyAccountScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.initiateMyAccount()
        //this.props.navigation.navigate('PopupScore')
    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View> */}
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    {/* HEADER */}
                    <View style={{ flex: 2, backgroundColor: 'blue' }}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center', padding: 5 }}>
                                <Image source={require('../assets/images/girl.png')} style={[{ height: Layout.window.height * 0.1, width: Layout.window.height * 0.1, borderRadius: Layout.window.height * 0.1 / 2, borderWidth: 1, borderColor: '#fff' }]} resizeMode={'cover'} />
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Nama</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>Nama Company</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 5 }}>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>43 Connections</Text>
                                <Text style={[styles.textDefault, { color: '#fff' }]}>5 Projects</Text>
                            </View>
                        </LinearGradient>
                    </View>
                    {/* CONTENT AREA */}
                    <View style={{ flex: 5 }}>
                        <ScrollView contentStyle={{ padding: 10 }} >

                            <View style={{ width: Layout.window.width, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={styles.subTitle}>Profile</Text>
                                <Ionicons name="md-checkmark-circle" size={24} color="lightgrey" />
                            </View>
                            <View style={{ width: Layout.window.width, }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {}]}>Name :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={styles.textDefault}>Mardhiah</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {}]}>Gender :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={styles.textDefault}>Female</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {}]}>Address :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={styles.textDefault}>69-4, Taman Equine</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {}]}>Postcode :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={styles.textDefault}>43300</Text></View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}><Text style={[styles.textDefault, {}]}>Country :</Text></View>
                                    <View style={{ flex: 3 }}><Text style={styles.textDefault}>Malaysia</Text></View>
                                </View>
                            </View>
                            
                        </ScrollView>
                    </View>
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
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen)