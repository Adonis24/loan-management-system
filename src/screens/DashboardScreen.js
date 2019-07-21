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
    ImageBackground,
    Animated,
    Easing,
    Modal

} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import * as Animatable from 'react-native-animatable';

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import PopupScoreScreen from './PopupScoreScreen';

class DashboardScreen extends React.PureComponent {
    static navigationOptions = {
        header: null, tabBarVisible: false
    };

    constructor(props) {
        super(props)
        this.profilePic = new Animated.Value(0)
        this.topBar = new Animated.Value(0)
        this.scrollBar = new Animated.Value(0)
        this.logo = new Animated.Value(0)

        this.state = { popUp: false }
    }

    toggleShow = () => {
        this.setState({ popUp: !this.state.popUp })
    }


    animate() {


        Animated.stagger(1000, [
            Animated.timing(this.logo, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.profilePic, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.topBar, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.scrollBar, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),

        ]).start();

    }

    capitalizeString = (text = 'NA') => text.length > 0 && `${text[0].toUpperCase()}${text.slice(1)}`


    async componentDidMount() {
        this.props.initiateDashboardScreen()
        this.props.initiateMyAccount()
        this.props.initiateCompanyInfo()

        await this.animate()
        //setTimeout(() => this.setState({ popUp: !this.state.popUp }), 3000);

        //this.props.navigation.navigate('PopupScore')
    }
    render() {

        const profilePicOpac = this.profilePic.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const topBarOpac = this.topBar.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const scrollBarOpac = this.scrollBar.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const logoOpac = this.logo.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        if (!(this.props.email_verified_at == null || this.props.phone_no == null)) {
            return (
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUp}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <PopupScoreScreen name={this.props.name} toggleShow={this.toggleShow} />
                    </Modal>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                        </View>
                        {/* <View style={{ alignItems: 'flex-start' }}>
                            <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                        </View> */}
                    </View>
                    <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                        {/* HEADER */}
                        <View style={{ flex: 1 }}>
                            <Animated.View style={{ opacity: logoOpac, flex: 1, marginLeft: 5 }}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />
                            </Animated.View>
                            <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                                <Animated.View style={{ opacity: profilePicOpac, flex: 5, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')} style={[{ marginLeft: 10, flexDirection: 'row' }]}>
                                        <Image source={{ uri: this.props.profile_pic }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />

                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                            <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', color: '#2C4690' }]}>{this.capitalizeString(this.props.name)}</Text>
                                            <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.member_id}</Text>
                                            <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.companyName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View style={[{ opacity: topBarOpac, backgroundColor: '#fff', flex: 4, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }} >
                                        <Image source={require('../assets/images/profile.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyScore')} style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/images/my-score.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </View>
                        {/* CONTENT AREA */}
                        <View style={{ flex: 4 }}>
                            <Animated.ScrollView style={{ opacity: scrollBarOpac, }} contentStyle={{ padding: 10 }} >
                                {/* <TouchableOpacity onPress={()=>this.props.sendNotification()}>
                                    <Text>Tekan</Text>
                                </TouchableOpacity> */}
                                {/**Highlight */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Highlight</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoEventEdt')}  >
                                        <Image source={require('../assets/images/edt.png')} style={{ width: Layout.window.width - 10, height: Layout.window.height / 6, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('UnderConstruction')} style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', margin: 10, marginBottom: 5, borderRadius: 10 }} >
                                            <Image source={{ uri: 'https://picsum.photos/600' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 10, }} />
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, paddingTop: 10, paddingLeft: 10 }}>
                                                <Text style={[styles.textDefault, { color: '#fff', alignSelf: 'flex-start', textAlign: 'left' }]}>Find Out More ></Text>
                                            </View>
                                        </TouchableOpacity> */}

                                </View>
                                {/*Financial Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Financial Hub</Text>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BizHub')}>
                                                <Ionicons name={'md-more'} size={24} />
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
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Loan')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/loan.png')} style={{ width: undefined, height: Layout.window.height / 15, }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Loan Calculator</Text>
                                            </TouchableOpacity>
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
                                {/*Knowledge Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Knowledge Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Info')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/e-info.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-info</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoNewsList')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/news.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>News</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PromotionList')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/promotion.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Promotion</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoEventList')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/event.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Event</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('HandbookList')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/handbook.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Handbook</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                {/*Development Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Development Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Elearning')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/e-learning.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Learning</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Training')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/training.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Training</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Certification')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/certification.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Certification</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/quiz.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Quiz</Text>
                                            </TouchableOpacity>
                                            <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/*Biz Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Biz Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EcommerceDetail')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/ecommerce.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Commerce</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BizApp')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/marketplace.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz App Marketplace</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BizLicensing')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start', opacity: 0.3 }}>
                                                <Image source={require('../assets/images/licensing.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Licensing</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BizDirectory')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                                <Image source={require('../assets/images/directory.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                                <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Directory</Text>
                                            </TouchableOpacity>
                                            <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Animated.ScrollView>
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
        } else {
            return (
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUp}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <PopupScoreScreen name={this.props.name} toggleShow={this.toggleShow} />
                    </Modal>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
                        </View>
                        {/* <View style={{ alignItems: 'flex-start' }}>
                            <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                        </View> */}
                    </View>
                    <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                        {/* HEADER */}
                        <View style={{ flex: 1 }}>
                            <Animated.View style={{ opacity: logoOpac, flex: 1, marginLeft: 5 }}>
                                <Image source={require('../assets/images/logo.png')} style={{ width: Layout.window.width / 3, height: undefined, flex: 1 }} resizeMode='contain' />
                            </Animated.View>
                            <View style={{ flex: 1, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, flexDirection: 'row' }}>
                                <Animated.View style={{ opacity: profilePicOpac, flex: 5, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')} style={[{ marginLeft: 10, flexDirection: 'row' }]}>
                                        <Image source={{ uri: this.props.profile_pic }} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />

                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                            <Text style={[styles.textDefault, { textAlign: 'left', alignSelf: 'flex-start', color: '#2C4690' }]}>{this.capitalizeString(this.props.name)}</Text>
                                            <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.member_id}</Text>
                                            <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.companyName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                                {/*  <Animated.View style={[{ opacity: topBarOpac, backgroundColor: '#fff', flex: 4, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2 }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }} >
                                        <Image source={require('../assets/images/profile.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyScore')} style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/images/my-score.png')} style={{ flex: 1, width: Layout.window.width / 8, height: undefined, }} resizeMode={'contain'} />
                                        <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>My Score</Text>
                                    </TouchableOpacity>
                                </Animated.View> */}
                            </View>
                        </View>
                        {/* CONTENT AREA */}
                        <View style={{ flex: 4 }}>
                            <Animated.ScrollView style={{ opacity: scrollBarOpac, }} contentStyle={{ padding: 10 }} >
                                {/* <TouchableOpacity onPress={()=>this.props.sendNotification()}>
                                    <Text>Tekan</Text>
                                </TouchableOpacity> */}
                                {/**Highlight */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Highlight</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>


                                    <View style={{ width: Layout.window.width - 10, height: Layout.window.height / 6, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', padding: 10,justifyContent:'center',alignItems:'center', backgroundColor:'rgba(128, 128, 128, 0.2)' }}>
                                        <Text>Thank you for registering with us. To ensure that you get the best of what BXcess offers, please have your phone number and/or email address verified !</Text>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} style={{ width: Layout.window.width * 0.3, padding:5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                                            <Text style={[styles.caption, { color: '#fff' }]}>Go To Settings</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('UnderConstruction')} style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', margin: 10, marginBottom: 5, borderRadius: 10 }} >
                                            <Image source={{ uri: 'https://picsum.photos/600' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 10, }} />
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, paddingTop: 10, paddingLeft: 10 }}>
                                                <Text style={[styles.textDefault, { color: '#fff', alignSelf: 'flex-start', textAlign: 'left' }]}>Find Out More ></Text>
                                            </View>
                                        </TouchableOpacity> */}

                                </View>
                                {/*Financial Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Financial Hub</Text>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BizHub')}>
                                                <Ionicons name={'md-more'} size={24} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                                {/*Knowledge Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Knowledge Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>

                                    </View>
                                </View>

                                {/*Development Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Development Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>

                                </View>
                                {/*Biz Hub */}
                                <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Biz Hub</Text>
                                            <Ionicons name={'md-more'} size={24} />
                                        </View>
                                    </View>

                                </View>
                            </Animated.ScrollView>
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
}


function mapStateToProps(state) {
    return {
        member_id: state.myAccountReducer.member_id,
        name: state.myAccountReducer.name,
        email: state.myAccountReducer.email,
        phone_no: state.myAccountReducer.phone_no,
        profile_pic: state.myAccountReducer.profile_pic,
        email_verified_at: state.myAccountReducer.email_verified_at,

        companyName: state.bizInfoReducer.name,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateDashboardScreen: () => dispatch(actionCreator.initiateDashboardScreen()),
        initiateMyAccount: () => dispatch(actionCreator.initiateMyAccount()),
        initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)