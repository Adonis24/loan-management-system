//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
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

const WelcomeScreen = (props) => {

    const [logo, setLogo] = useState(new Animated.Value(0))
    const [intro, setIntro] = useState(new Animated.Value(0))
    const [buttons, setButtons] = useState(new Animated.Value(0))

    const animate = () => {

        Animated.stagger(1000, [
            Animated.timing(logo, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(intro, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(buttons, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),


        ]).start();

    }



    useEffect(() => {
        animate()
    }, []);



    const logoOpac = logo.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const introOpac = intro.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })

    const buttonsOpac = buttons.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1,]
    })


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image source={require('../assets/images/tekunE.png')} style={{ width: Layout.window.width, height: Layout.window.height / 3.5 }} resizeMode={'cover'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.Image source={require('../assets/images/logo.png')} style={{ opacity: logoOpac, height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                        <Animated.Text style={[styles.textDefault, { margin: 20, opacity: introOpac }]}>Welcome to Tent! Sign up now to join us or login to your account</Animated.Text>

                        <Animated.View style={{ opacity: buttonsOpac }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Registration')} style={[styles.box,{ width: Layout.window.width * 0.4, borderWidth: 1, borderColor: '#4A90E2' }]}>
                                <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Login')} >
                                <LinearGradient
                                    colors={['#4DCB3E', '#269B1D']}
                                    style={[styles.box,{width: Layout.window.width * 0.4,borderColor:'#4A90E2',borderWidth:1,borderRadius:15 }]}>
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


export default WelcomeScreen