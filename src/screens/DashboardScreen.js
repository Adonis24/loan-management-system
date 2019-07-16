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
        //this.topBar.setValue(0)
        // start the sequence
        // Animated.sequence([
        // Animated.timing(this.logo, {
        //     toValue: 1,
        //     duration: 2000,
        //     easing: Easing.linear
        // }),
        //     Animated.timing(this.profilePic, {
        //         toValue: 1,
        //         duration: 1000,
        //         easing: Easing.linear
        //     }),
        //     Animated.timing(this.topBar, {
        //         toValue: 1,
        //         duration: 1000,
        //         easing: Easing.linear
        //     }),
        //     Animated.timing(this.scrollBar, {
        //         toValue: 1,
        //         duration: 1000,
        //         easing: Easing.linear
        //     }),

        // ]).start();

        Animated.stagger(500, [
            Animated.timing(this.logo, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.profilePic, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.topBar, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.scrollBar, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),

        ]).start();

    }

    async componentDidMount() {
        this.props.initiateDashboardScreen()
        this.props.initiateMyAccount()
        this.props.initiateCompanyInfo()

        await this.animate()
        setTimeout(() => this.setState({ popUp: !this.state.popUp }), 3000);

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
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')} style={[{ marginLeft: 10 }]}>
                                    <Image source={{uri:this.props.profile_pic}} style={{  height: 50, width: 50,borderRadius: 25, borderWidth: 1, borderColor: 'lightgrey' }} resizeMode='cover' />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.name}</Text>
                                    <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>{this.props.companyName}</Text>
                                </View>
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


                            {/*Knowledge Hub */}
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Knowledge Hub</Text>
                                        <Text style={styles.caption}>More ></Text>
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
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PromotionList')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
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
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Elearning')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/e-learning.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Learning</Text>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/training.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Training</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Certification')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/certification.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Certification</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
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
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Ecommerce')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/ecommerce.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Commerce</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BizApp')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/marketplace.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Biz App Marketplace</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BizLicensing')} style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
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

                            {/*Others */}
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.subTitle}>Others</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ width: Layout.window.width, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                            <Image source={require('../assets/images/social.png')} style={{ width: undefined, height: Layout.window.height / 15, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>e-Donation</Text>
                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>

                                        </View>
                                        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/*Contact Request */}
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ border: 1, borderColor: 'lightgrey', shadowColor: "#000", marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Notification</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', alignSelf: 'stretch' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.width / 2.5, padding: 5, justifyContent: 'flex-start', alignItems: 'center', elevation: 2 }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.height / 13, height: Layout.window.height / 13, borderRadius: Layout.window.height / 26, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Social Charity</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
                                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 5, padding: 5, margin: 5 }}>
                                                        <Text style={[styles.caption, { color: '#fff' }]}>Accept</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#5A647F' }}>
                                                    <Text style={[styles.caption, { color: '#fff' }]}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.width / 2.5, padding: 5, justifyContent: 'flex-start', alignItems: 'center', elevation: 2 }}>
                                            <Image source={require('../assets/icon/socialCharity.png')} style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.height / 13, height: Layout.window.height / 13, borderRadius: Layout.window.height / 26, justifyContent: 'flex-start' }} resizeMode={'contain'} />
                                            <Text style={[styles.caption]} numberOfLines={1} ellipsizeMode={'tail'}>Little Adli</Text>
                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
                                                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 5, padding: 5, margin: 5 }}>
                                                        <Text style={[styles.caption, { color: '#fff' }]}>Accept</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#5A647F' }}>
                                                    <Text style={[styles.caption, { color: '#fff' }]}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* *Newest RFQ
                            <View style={{ margin: 5, borderBottomWidth: 1, borderColor: 'lightgrey', borderStyle: 'dashed' }}>
                                <View style={{ border: 1, borderColor: 'lightgrey', shadowColor: "#000", marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle}>Newest RFQ</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.width / 2.5, padding: 5, justifyContent: 'flex-start', alignItems: 'center', elevation: 2 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../assets/icon/socialCharity.png')} style={{ borderColor: 'lightgrey', borderWidth: 1, width: Layout.window.height / 13, height: Layout.window.height / 13, borderRadius: Layout.window.height / 26, justifyContent: 'flex-start' }} resizeMode={'center'} />
                                                <Text style={[styles.caption]}>Social Charity</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Accept</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { }} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: 'lightgrey' }}>
                                                    <Text style={[styles.caption]}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View> */}

                            {/**Highlight */}
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Hightlight</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UnderConstruction')} style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', margin: 10, marginBottom: 5, borderRadius: 10 }} >
                                        <Image source={{ uri: 'https://picsum.photos/600' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 10, }} />
                                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, paddingTop: 10, paddingLeft: 10 }}>
                                            <Text style={[styles.textDefault, { color: '#fff', alignSelf: 'flex-start', textAlign: 'left' }]}>Find Out More ></Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UnderConstruction')} style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', margin: 10, marginBottom: 5, borderRadius: 10 }} >
                                        <Image source={{ uri: 'https://picsum.photos/600' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 10, }} />
                                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, paddingTop: 10, paddingLeft: 10 }}>
                                            <Text style={[styles.textDefault, { color: '#fff', alignSelf: 'flex-start', textAlign: 'left' }]}>Find Out More ></Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**Training */}
                            <View style={{ margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Training</Text>
                                        <Text style={styles.caption}>More ></Text>
                                    </View>
                                </View>
                                <View style={[{ padding: 5, margin: 5, alignSelf: 'stretch', borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10 }]}>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', marginBottom: 0, flexDirection: 'row' }} >
                                            <Image source={{ uri: 'https://picsum.photos/600' }} style={{ flex: 1, margin: 5 }} />
                                            <View style={{ flex: 3, padding: 5 }} >
                                                <Text>Online Business Training</Text>
                                                <Text numberOfLines={4} ellipsizeMode={'tail'} style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', }]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate volutpat mi. Etiam malesuada aliquam neque a cursus. Curabitur sed fringilla tortor, condimentum gravida est.</Text>
                                                <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, padding: 2, backgroundColor: '#4364B0', }} />
                                                    <View style={{ flex: 1 }} />
                                                </View>
                                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>7 participants</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
                                            <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                                <Text style={[styles.caption, { color: '#fff' }]}>Join</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[{ padding: 5, margin: 5, alignSelf: 'stretch', borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10 }]}>
                                    <View style={{ justifyContent: 'flex-start', alignSelf: 'stretch' }}>
                                        <View style={{ width: undefined, height: Layout.window.height / 8, justifyContent: 'flex-start', marginBottom: 0, flexDirection: 'row' }} >
                                            <Image source={{ uri: 'https://picsum.photos/600' }} style={{ flex: 1, margin: 5 }} />
                                            <View style={{ flex: 3, padding: 5 }} >
                                                <Text>Online Business Training</Text>
                                                <Text numberOfLines={4} ellipsizeMode={'tail'} style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start', }]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate volutpat mi. Etiam malesuada aliquam neque a cursus. Curabitur sed fringilla tortor, condimentum gravida est.</Text>
                                                <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, padding: 2, backgroundColor: '#4364B0', }} />
                                                    <View style={{ flex: 1 }} />
                                                </View>
                                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>7 participants</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
                                            <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                                <Text style={[styles.caption, { color: '#fff' }]}>Join</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Animated.ScrollView>
                    </View>
                </View>
                {/* <PopupScoreScreen /> */}

                <View style={{position:'absolute',top:Constants.statusBarHeight,right:0}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ScanQR')}>
                        <Text>QR Code</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
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
        initiateCompanyInfo: () => dispatch(actionCreator.initiateCompanyInfo())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)