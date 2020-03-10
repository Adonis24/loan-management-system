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
//import { Constants, LinearGradient, FileSystem } from 'expo'
import LayoutB from '../Layout/Layout B';
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import {  Left, Right,Radio, ListItem } from 'native-base'


const QuizAnswerScreen = (props) => {

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
                    <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'flex-start', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 5 }]}>
                        <Text style={[styles.textDefault, { margin: 5, textAlign: 'left', fontWeight: 'bold' }]}>Quiz 1: Lorem ipsum dolor sit amet</Text>
                    </View>
                    <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, marginBottom: 20 }]}>
                        <Text style={[styles.textDefault, { margin: 5, fontSize: 12, textAlign: 'justify' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                    </View>
                    <View style={[styles.shadow, { backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', borderRadius: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: '#ddd', paddingTop: 10, marginBottom: 20 }]}>
                        <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                            <Text style={[styles.textDefault, { margin: 5, textAlign: 'left', color: 'darkblue', alignSelf: 'flex-start' }]}>Question 1</Text>
                            <Text style={[styles.textDefault, { margin: 10, textAlign: 'left', fontSize: 13, alignSelf: 'flex-start', fontWeight: 'bold' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                            <ListItem>
                                <Left style={{ flex: 1 }}>
                                    <Radio selected={false} />
                                </Left>
                                <Right style={{ flex: 4 }}>
                                    <Text>Lorem Ipsum is simply dummy text</Text>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left style={{ flex: 1 }}>
                                    <Radio selected={true} />
                                </Left>
                                <Right style={{ flex: 4 }}>
                                    <Text>Lorem Ipsum is simply dummy text</Text>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left style={{ flex: 1 }}>
                                    <Radio selected={false} />
                                </Left>
                                <Right style={{ flex: 4 }}>
                                    <Text>Lorem Ipsum is simply dummy text</Text>
                                </Right>
                            </ListItem>
                        </View>
                    </View>
                </ScrollView>
           </ LayoutB>
    );

}



export default QuizAnswerScreen