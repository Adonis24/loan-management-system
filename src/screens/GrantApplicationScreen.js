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
    CheckBox

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { Picker } from 'native-base'
import * as DocumentPicker from 'expo-document-picker';
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Button } from 'native-base';

class GrantApplicationScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { selected: null }
    }

    componentDidMount() {
        const agency_id = this.props.navigation.getParam('agency_id', 'NA')
        this.props.setGrantInfo({ agency_id })
    }

    async ContactPerson() {
        this.props.contactPerson()
        this.props.navigation.navigate('DetailsConnectedParties')
    }

    applyGrant() {
        this.props.applyGrant()
        this.props.navigation.goBack()
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    pickEstimate(estimate_time) {
        this.props.setGrantInfo({ estimate_time })
    }
    pickMethod(payment_method) {
        this.props.setGrantInfo({ payment_method })
    }

    pickDoc() {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))

                const { uri, name } = result

                this.props.setGrantInfo({ proposal: name })
                //this.props.saveDocument(result)
            })
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                    <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>LOAN APPLICATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12, fontWeight: 'bold' }]}>Upload Business Proposal/Plan:</Text>

                            <View style={{ width: Layout.window.width * 0.7, height: Layout.window.height * 0.06, borderWidth: 1, alignSelf: 'center', borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                {this.props.proposal && <Text>{this.props.proposal}</Text>}
                                <TouchableOpacity onPress={() => this.pickDoc()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: 'gainsboro' }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Upload documents</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={this.props.income_tax} onChangeText={(income_tax) => this.props.setGrantInfo({ income_tax })} placeholder={'Income Tax Number (LHDN)'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.applyGrant()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Apply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}


function mapStateToProps(state) {
    return {
        proposal: state.grantApplicationReducer.proposal,
        income_tax: state.grantApplicationReducer.income_tax,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setGrantInfo: (value) => dispatch({ type: 'SET_GRANT_INFO', payload: { ...value } }),
        applyGrant: () => dispatch(actionCreator.applyGrant())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GrantApplicationScreen)