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
    FlatList, WebView


} from 'react-native';

import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class TrainingScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    nav = (screen) => {
        this.props.navigation.navigate(screen)
    }

    componentDidMount() {
        this.props.initiateTraining()
    }

    render() {

        const { jwt } = this.props
        console.log(`jwt ialah ${jwt}`)
        const uri = `https://lms.bxcess.my/category/training/courses/?bx-token=${jwt}`

        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <WebView source={{ uri }} style={{ flex: 1, backgroundColor: 'transparent' }} />
                
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0,right:0, flex: 1, flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
                <View style={{ flex: 1,alignSelf:'stretch', justifyContent: 'center', border: 1, borderColor: '#000',alignItems:'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                       <View style={{borderWidth:3,borderColor:'#fff',width:Layout.window.width/5}} />
                        
                    </TouchableOpacity>
                </View>
              
            </View>
            </View>

        );
    }
}


function mapStateToProps(state) {
    return {
        trainingArray: state.trainingReducer.trainingArray,
        jwt: state.myAccountReducer.jwt


    }
}
function mapDispatchToProps(dispatch) {
    return {
        initiateTraining: () => dispatch(actionCreator.initiateTraining()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrainingScreen)