import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker, Platform, Modal } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const FilterBarInfoNews = (props) => {

    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }

    const [status, setStatus] = useState(null)
    const [modalContent, setModalContent] = useState(null)
    const [type, setType] = useState(null)

    const filterWithdrawalList = async () => {
        console.log(`status : ${status} and type : ${type} `)
        const values = { status, type }
        await dispatch(actionCreator.filterWithdrawalList(values))

    }

    const ios = Platform.OS === "ios" ? true : false
    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const dispatch = useDispatch()
    const openIosModal = (val) => {
        setModalContent(val)
        setIosPickerVisible(!iosPickerVisible)
    }

    return (
        <View style={{ position: 'absolute', top: Constants.statusBarHeight, bottom: 0, right: 0, left: 0 }}>
            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => console.log('modal closed')}                      >
                <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
                    <TouchableOpacity onPress={() => openIosModal('status')} hitslop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <Ionicons name="ios-arrow-back" color={'#3EC2D9'} style={{ fontSize: 30, paddingLeft: 20 }} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'stretch', }}>
                        {modalContent === 'status' ? <Picker style={{ height: 35 }} selectedValue={status} onValueChange={(val) => setStatus(val)} >
                            <Picker.Item label={'Please Select'} value={undefined} />
                            <Picker.Item label={'Approved'} value={'Approved'} />
                            <Picker.Item label={'Reject'} value={'Reject'} />
                            <Picker.Item label={'New'} value={'New'} />
                            <Picker.Item label={'Disbursed'} value={'Disbursed'} />
                        </Picker> : <Picker style={{ height: 35 }} selectedValue={type} onValueChange={(val) => setType(val)} >
                                <Picker.Item label={'Please Select'} value={undefined} />
                                <Picker.Item label={'Business'} value={'Business'} />
                            </Picker>}

                    </View>
                </View>
            </Modal>
            <View style={{ padding: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 9, margin: 10 }}>
                    {ios ? <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => openIosModal('status')}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Status</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between',alignItems:'center' }}>
                                <Text style={[styles.value, { marginBottom: 5 }]}>{status||'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12,  }} />
                            </View>
                        </TouchableOpacity>
                    </View> : <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Category</Text>
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                <Picker style={{ height: 35 }} selectedValue={status} onValueChange={(val) => setStatus(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Approved'} value={'Approved'} />
                                    <Picker.Item label={'Reject'} value={'Reject'} />
                                    <Picker.Item label={'New'} value={'New'} />
                                    <Picker.Item label={'Disbursed'} value={'Disbursed'} />
                                </Picker>
                            </View>
                        </View>}
                    {ios ?
                        <View style={{ margin: 10 }}>
                            <TouchableOpacity onPress={() => openIosModal('type')}>
                                <Text style={[styles.h3, { marginBottom: 5 }]}>Type</Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', padding: 5, justifyContent: 'space-between',alignItems:'center' }}>

                                <Text style={[styles.value, { marginBottom: 5 }]}>{type||'Please Select'}</Text>
                                <Ionicons name="ios-arrow-down" style={{ fontSize: 12,  }} />
                            </View>
                            </TouchableOpacity>
                            
                        </View> :
                        <View style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                            <Text style={[styles.h3, { marginBottom: 5 }]}>Subcategory</Text>
                            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                <Picker style={{ height: 35 }} selectedValue={type} onValueChange={(val) => setType(val)} >
                                    <Picker.Item label={'Please Select'} value={undefined} />
                                    <Picker.Item label={'Business'} value={'Business'} />
                                </Picker>
                            </View>
                        </View>}
                </View>

            </View>
            <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setStatus(null); setType(null); nav('Withdraw') }} style={{padding:10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderWidth: 1 }}>
                    <Text style={[styles.textDefault, { color: 'black' }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { filterWithdrawalList(); nav('Withdraw') }} style={{ padding:10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#09A4BF' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default FilterBarInfoNews