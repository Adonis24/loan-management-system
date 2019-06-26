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
    ImageBackground


} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Tabs, Tab, ScrollableTab, Drawer, Container, Header, Content, Footer, Left, Right, Body, Title, Subtitle, Button, Icon, Card, CardItem, H2, FooterTab } from 'native-base'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

class HandbookScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Image source={require('../assets/images/topRight.png')} style={{ width: 80, height: 93 }} />
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 46, height: 332 }} />
                    </View>
                </View>
                <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={32} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5 }}>
                            <View style={[{ backgroundColor: '#fff', marginLeft: Layout.window.width / 3, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderRightWidth: 0, borderColor: 'lightgrey', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start' }]}>
                                <Image source={require('../assets/images/handbook.png')} style={{ width: Layout.window.height / 15, height: Layout.window.height / 15, margin: 5 }} resizeMode={'contain'} />
                                <Text style={[styles.default, { alignSelf: 'center', fontSize: 18, fontWeight: "bold" }]} numberOfLines={1} ellipsizeMode={'tail'}>Handbook</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <View onPress={() => this.props.nav('Handbook')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, }}>
                            <Image source={require('../assets/images/business.png')} style={{ flex: 1, height: Layout.window.height * 0.25, width: undefined, }} resizeMode={'cover'} />
                            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5 }}>
                                <Text style={[styles.textDefault, { fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }]}>Range : Why Generalists Triumph in a Specialized World</Text>
                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>David Epstein</Text>
                                <Text style={[styles.caption, { textAlign: 'left', alignSelf: 'flex-start' }]}>Good news to our beloved members. Join our talk with 15% discount</Text>
                                <View style={{ flexDirection: 'row', }}><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} /><Ionicons name='ios-star' color={'yellow'} size={24} />
                                    <Text style={[styles.caption, { color: 'blue', alignSelf: 'flex-start', margin: 5, textAlign: 'left' }]}>50 review</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>View</Text></TouchableOpacity>
                                    <TouchableOpacity style={{ margin: 5, padding: 5, borderWidth: 1, borderColor: 'blue', borderRadius: 5 }} onPress={() => this.props.nav(Handbook)}><Text>+ Add to Favorite</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.textDefault,{alignSelf:'flex-start',textAlign:'left'}]}>Summary</Text>
                        <Text style={[styles.textDefault,{alignSelf:'flex-start',textAlign:'left'}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis neque nisl, eget varius augue pellentesque sit amet. Morbi volutpat massa pretium turpis luctus, ut feugiat ante finibus. Proin hendrerit tellus nulla, sit amet posuere odio sagittis pharetra. Cras metus massa, mattis id lorem ut, ultricies blandit risus. Nunc placerat nunc enim. Pellentesque justo nisl, rutrum et fringilla blandit, blandit eu quam. Nam dignissim feugiat ipsum vel dignissim. Aliquam ultricies libero nec elit dictum, ac varius arcu faucibus. Duis sagittis lacus in turpis interdum, in sagittis mi fermentum.</Text>
                    </View>
                </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(HandbookScreen)