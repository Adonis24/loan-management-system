//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';
import styles from '../styles/styles'

const IntroScreen = (props) => {

    const images = [
        { id: 1, title: 'Welcome to Tent! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/intro2.png') },
    ]
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Image source={require('../assets/images/tekunE.png')} style={{ width: Layout.window.width, height: Layout.window.height / 3.2 }} resizeMode={'cover'} />
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                <ImageSlider
                    style={{ flex: 10, alignSelf: 'stretch', backgroundColor: 'transparent' }}
                    loopBothSides
                    autoPlayWithInterval={5000}
                    images={images}
                    customSlide={({ index, item, style }) => (
                        item &&
                        <View key={index} style={[style, { backgroundColor: 'transparent' }]}>
                            <Image source={item.screenshotUri} resizeMode={'contain'} style={{
                                height: undefined,
                                width: undefined,
                                flex: 1,
                            }} />
                            <Text style={[styles.textDefault,{  alignSelf: 'center', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 10 }]}>
                                {item.title}
                            </Text>
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={[styles.buttons, { paddingTop: 50 }]}>
                            {images.map((image, index) => (
                                <TouchableHighlight
                                    key={index}
                                    underlayColor="#ccc"
                                    onPress={() => this._move(index)}
                                    style={[
                                        styles.button,
                                        position === index && styles.buttonSelected,
                                    ]} >
                                    <View />
                                </TouchableHighlight>
                            ))}
                        </View>
                    )}
                />
                <View style={{flex:1,flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Agreement')} >
                        <LinearGradient
                            colors={['#4DCB3E', '#269B1D']}
                            style={[styles.box, { borderRadius: 15 }]}>
                            <Text style={[styles.textDefault, { color: 'white' }]}>Next</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );

}
<LinearGradient
    colors={['#4DCB3E', '#269B1D']}
    style={[styles.box, { borderColor: '#4A90E2', borderWidth: 1, borderRadius: 15 }]}>
    <Text style={[styles.textDefault, { color: 'white' }]}>Next</Text>
</LinearGradient>

export default IntroScreen