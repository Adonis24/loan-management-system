//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutB from '../Layout/LayoutB';


const QuizScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }

    return (
        < LayoutB
            title={'Quiz'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/quiz.png')}
        >

            <ScrollView style={{ padding: 20 }}>
                <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar interdum urna eget dignissim. </Text>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                        <Text style={[styles.textDefault, { margin: 5 }]}>Business Strategy Training Quiz</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Start</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                        <Text style={[styles.textDefault, { margin: 5 }]}>Online Business Training Quiz</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Start</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                        <Text style={[styles.textDefault, { margin: 5 }]}>Brand Awareness Training</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Start</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20, justifyContent: 'space-between' }]}>
                        <Image source={require('../assets/images/logo.png')} style={{ width: undefined, height: Layout.window.height / 8, }} resizeMode='contain' />
                        <Text style={[styles.textDefault, { margin: 5 }]}>Marketing Strategy Training Quiz</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('QuizAnswer')} style={{ margin: 10, }}>
                                <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ borderRadius: 10, padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                                    <Text style={[styles.caption, { color: '#fff' }]}>Start</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* END CONTENT */}

        </ LayoutB>
    );

}



export default QuizScreen