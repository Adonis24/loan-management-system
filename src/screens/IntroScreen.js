//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
    TextInput,
    AsyncStorage,
    ImageBackground


} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
//import { Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, Text, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class IntroScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    render() {
        const images = [
            { id: 1, title: 'Welcome to Bizxcess! Sign up now to join us or login to your account', screenshotUri: require('../assets/images/intro.png') },
        ]
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
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
                                <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 10 }}>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpPersonal')} style={{ flex: 1, justifyContent: 'center' }}><Text style={{ color: 'darkblue', textAlign: 'center' }}>Next</Text></TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen)