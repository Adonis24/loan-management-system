//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,

    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,


} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

//import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class WelcomeScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.logo = new Animated.Value(0)
        this.intro = new Animated.Value(0)
        this.buttons = new Animated.Value(0)
    }

    animate() {

        Animated.stagger(1000, [
            Animated.timing(this.logo, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.intro, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.buttons, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),


        ]).start();

    }

    componentDidMount() {
        this.animate()

    }

    render() {

        const logoOpac = this.logo.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const introOpac = this.intro.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })

        const buttonsOpac = this.buttons.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1,]
        })


        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image source={require('../assets/images/logo.png')} style={{ opacity: logoOpac, height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Animated.Text style={[styles.textDefault, { margin: 20, opacity: introOpac }]}>Welcome to Tent! Sign up now to join us or login to your account</Animated.Text>

                            <Animated.View style={{ opacity: buttonsOpac }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Intro')} style={{ width: Layout.window.width * 0.4, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#4A90E2' }}>
                                    <LinearGradient
                                        colors={['#4DCB3E', '#269B1D']}
                                        style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center', borderRadius: 15, width: Layout.window.width * 0.4, }}>
                                        <Text style={[styles.textDefault, { color: '#fff' }]}>Log In</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)