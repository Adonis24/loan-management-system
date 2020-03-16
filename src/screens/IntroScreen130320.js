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
import Slideshow from 'react-native-image-slider-show';

import Layout from '../constants/Layout'
import ImageSlider from 'react-native-image-slider';
import styles from '../styles/styles'


class IntroScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    title: 'Title 1',
                    caption: 'Caption 1',
                    url: require('../assets/images/intro2.png'),
                }, {
                    title: 'Title 2',
                    caption: 'Caption 2',
                    url: require('../assets/images/intro2.png'),
                }, {
                    title: 'Title 3',
                    caption: 'Caption 3',
                    url: require('../assets/images/intro2.png'),
                },
            ],
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Image source={require('../assets/images/tekunA.png')} style={{ width: Layout.window.width, }} resizeMode={'contain'} />
                </View>
                <View style={{ flex: 10, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <Slideshow
                    containerStyle={{backgroundColor:'transparent'}}
                    style={{backgroundColor:'transparent'}}
                        height={400}
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })} />
                        </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Agreement')} >
                            <LinearGradient
                                colors={['#4DCB3E', '#269B1D']}
                                style={[styles.box, { borderColor: '#4A90E2', borderWidth: 1, borderRadius: 15 }]}>
                                <Text style={[styles.textDefault, { color: 'white' }]}>Next</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>
                
            </View>
        );
    }
}

export default IntroScreen