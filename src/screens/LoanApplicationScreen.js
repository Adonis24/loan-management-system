//console.ignoredYellowBox = ['Setting a timer']
import React, { useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput, Picker, Platform, Modal

} from 'react-native';

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import styles from '../styles/styles'
import * as DocumentPicker from 'expo-document-picker';
import * as actionCreator from '../store/actions/action'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const ios = Platform.OS === 'ios'

const LoanApplicationScreen = (props) => {
    const dispatch = useDispatch()
    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = useSelector(state => state.loanApplicationReducer, shallowEqual)
    const setLoanInfo = (value) => dispatch({ type: 'SET_LOAN_INFO', payload: { ...value } })

    const [selected, setSelected] = useState(null)
    const [iosPicker, setIosPicker] = useState(false)
    const [pickerType, setPickerType] = useState(null)

    const openIosPicker = (type) => {
        setPickerType(type)
        setIosPicker(true)
    }

    const applyLoan = () => {
        dispatch(actionCreator.applyLoan())
    }



    const pickEstimate = (estimate_time) => {
        setLoanInfo({ estimate_time })
    }
    const pickMethod = (payment_method) => {
        setLoanInfo({ payment_method })
    }

    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))

                const { uri, name } = result

                setLoanInfo({ proposal: name })
                //saveDocument(result)
            })
    }


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={iosPicker}
                onRequestClose={() => {
                    console.log(`test`)
                    setIosPicker(!iosPicker)
                }}>

                <View style={styles.container}>
                    <View style={[styles.titleMargin, { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#9ADAF4', marginBottom: 25 }]}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0 }}>
                            <TouchableOpacity onPress={() => setIosPicker(!iosPicker)} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                                <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.title, { color: '#055E7C' }]}>Select Date</Text>
                        </View>
                    </View>
                    <View style={{ flex: 9, justifyContent: 'flex-start' }}>
                        {pickerType === 'freq' ? <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}
                            selectedValue={estimate_time}
                            onValueChange={(value) => pickEstimate(value)}
                        >
                            <Picker.Item label="Select" value="0" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="9" value="9" />
                            <Picker.Item label="12" value="12" />
                        </Picker> :
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={payment_method}
                                onValueChange={(value) => pickMethod(value)}
                            >
                                <Picker.Item label="Select" value="0" />
                                <Picker.Item label="Check" value="Check" />
                            </Picker>}

                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'flex-start' }}><Image source={require('../assets/images/topLeft.png')} style={{ width: 79, height: 120 }} /></View>
                <View style={{ alignItems: 'flex-end' }}><Image source={require('../assets/images/bottomRight.png')} style={{ width: 106, height: 92 }} /></View>

            </View>
            <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>LOAN APPLICATION</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 14 }]}>Please fill up this form to continue the process for contact person.</Text>
                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'darkblue', fontSize: 12, fontWeight: 'bold' }]}>Upload Business Proposal/Plan:</Text>

                            <View style={{ width: Layout.window.width * 0.7, height: Layout.window.height * 0.06, borderWidth: 1, alignSelf: 'center', borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                {proposal && <Text>{proposal}</Text>}
                                <TouchableOpacity onPress={() => pickDoc()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', margin: 10, backgroundColor: 'gainsboro' }}>
                                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Upload documents</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/user.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={income_tax} onChangeText={(income_tax) => setLoanInfo({ income_tax })} placeholder={'Income Tax Number (LHDN)'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#4A90E2', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65 }}>
                                <Image source={require('../assets/images/email.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <TextInput value={loan_amount} onChangeText={(loan_amount) => setLoanInfo({ loan_amount })} placeholder={'Loan Amount Required (RM)'} style={{ marginLeft: 5 }} />
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <Text>Estimated time to payback</Text>
                                {!ios ?
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 120 }}
                                        selectedValue={estimate_time}
                                        onValueChange={(value) => pickEstimate(value)}
                                    >
                                        <Picker.Item label="Select" value="0" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="9" value="9" />
                                        <Picker.Item label="12" value="12" />
                                    </Picker> :
                                    <TouchableOpacity onPress={() => openIosPicker('freq')}><Text style={{ padding: 5, borderWidth: 1 }}>Select</Text></TouchableOpacity>}
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../assets/images/password.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <Text>Payment method</Text>
                                {!ios ? <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 120 }}
                                    selectedValue={payment_method}
                                    onValueChange={(value) => pickMethod(value)}
                                >
                                    <Picker.Item label="Select" value="0" />
                                    <Picker.Item label="Check" value="Check" />
                                </Picker> :
                                    <TouchableOpacity onPress={() => openIosPicker('freq')}><Text style={{ padding: 5, borderWidth: 1 }}>Select</Text></TouchableOpacity>}

                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => applyLoan()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Apply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.25, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#4A90E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                    <Text style={[styles.textDefault, { color: '#4A90E2' }]}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}




export default LoanApplicationScreen