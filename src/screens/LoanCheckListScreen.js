//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    Modal

} from 'react-native';

import moment from 'moment'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'

import Layout from '../constants/Layout'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';
import { ScrollView } from 'react-native-gesture-handler';


const gambarPassportContent = {
    header: 'Gambar Passport',
    store: 'gambarPassport',
    atList: [
        { label: 'Gambar Passport', param: { attachment: 'gambarPassport', file: 'gambarPassport' } }
    ]
}


const icCopyContent = {
    header: 'MyKad',
    store: 'icCopy',
    atList: [
        { label: 'Sendiri - Bahagian Hadapan', param: { attachment: 'icCopy', file: 'sendiriDepan' } },
        { label: 'Sendiri - Bahagian Belakang', param: { attachment: 'icCopy', file: 'sendiriBelakang' } },
        { label: 'Pasangan - Bahagian Hadapan', param: { attachment: 'icCopy', file: 'pasanganDepan' } },
        { label: 'Pasangan - Bahagian Belakang', param: { attachment: 'icCopy', file: 'pasanganBelakang' } },
    ]
}

const sitePicContent = {
    header: 'Site Pic',
    store: 'sitePicture',
    //meta:{itemNo:3,},
    atList: [
        { label: 'Picture 1', param: { attachment: 'sitePicture', file: 'picture1' } },
        { label: 'Picture 2', param: { attachment: 'sitePicture', file: 'picture2' } },
        { label: 'Picture 3', param: { attachment: 'sitePicture', file: 'picture3' } }
    ]
}


const simpananContent = {
    header: 'Simpanan',
    store: 'simpanan',
    atList: [
        { label: 'Salinan 3 bulan terkini', param: { type: 'doc', attachment: 'simpanan', file: 'simpanan' } }

    ]
}

const billContent = {
    header: 'Utility Bill',
    store: 'utilityBill',
    atList: [
        { label: 'Salinan Utility Bill', param: { type: 'doc', attachment: 'utilityBill', file: 'utilityBill' } }

    ]
}



const checklist = [
    { item: 'Borang permohonan pembiayaan TEKUN', button: 'LoanDrawer', check: true },
    { item: 'Kertas rancangan perniagaan', button: 'BusinessPlanDrawer', check: true },
    { item: 'Gambar berukuran passport', button: 'Attachment', content: gambarPassportContent, check: true },
    { item: 'Salinan kad pengenalan pemohon dan pasangan', button: 'Attachment', content: icCopyContent, check: true },
    { item: '3 keping gambar premis/tapak perniagaan', button: 'Attachment', check: true, content: sitePicContent },
    { item: 'Salinan buku simpanan/penyata bank ( 3 bulan terakhir)', button: 'Attachment', content: simpananContent, check: true },
    { item: 'Salinan bil utiliti rumah atau premis perniagaan', button: 'Attachment', content: billContent, check: true },
    { item: 'Borang kebenaran penzahiran maklumat kredit individu', button: 'LoanDrawer', check: true },
    { item: 'Peta ringkas lokasi tempat perniagaan ke pejabat cawangan tekun', button: 'Map', check: true },

]


const LoanCheckListScreen = (props) => {


    const dispatch = useDispatch()

    const { attachment } = useSelector(state => state.attachmentReducer, shallowEqual)


    const checkDone = (content) => {
        if (content) {
            const { atList, store } = content
            if (attachment) {
                const jumpa = attachment.find(a => a.attachmentName === store)
                if (jumpa) {
                    console.log(`store ialah : ${store}`)
                    console.log(`jumpa ialah : ${JSON.stringify(jumpa)}`)
                    console.log(`atList ialah : ${atList.length}`)

                    const { files } = jumpa
                    if (files) {
                        const newFiles = []
                        files.map(f => {
                            const { uri } = f.fileDetail
                            newFiles.push({ fileName: f.fileName, uri })
                        })
                        const newNewFiles = newFiles.filter(n => n.uri)
                        console.log(`yg ada isi ${newNewFiles.length}`)

                        if(newNewFiles.length==atList.length){
                            return true
                        }

                    }

                    //return true
                } else { return false }

            } else {
                return false
            }
        }



    }

    const getAllAttachment = async () => {
        await dispatch(actionCreator.getAllAttachment())
    }

    const getAllBusinessPlan = async () => {
        await dispatch(actionCreator.getAllBusinessPlan())
    }

    const getLoanData = async () => {
        await dispatch(actionCreator.getLoanData())
    }

    useEffect(() => {
        getAllAttachment()
        getAllBusinessPlan()
        getLoanData()

    }, []); // empty-array means don't watch for any updates


    return (
        < LayoutB
            title={'Checklist'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        >


            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <View style={{ margin: 7 }} />
                    <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Dokumen-dokument Diperlukan:</Text>

                    <FlatList data={checklist}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (<CustomRow
                            navigation={props.navigation}
                            no={index + 1}
                            item={item.item}
                            button={item.button}
                            content={item.content}
                            //done={checkDone(item.content)}
                            check={checkDone(item.content)}
                        />)} />
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => console.log(`hantar`)}>
                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'flex-start', margin: 10, padding: 5, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 1 }}>
                            <Text style={[styles.textSmall, { color: '#fff' }]}>Hantar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutB >
    );
}

const CustomRow = (props) => {
    return (
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch', borderBottomWidth: 1, borderColor: 'lightgrey' }}>
            <View style={{ padding: 5, flex: 1, }}>
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.no} </Text>
            </View>
            <View style={{ flex: 8, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textSmall, { marginBottom: 5, textAlign: 'left' }]}>{props.item}</Text>
            </View>
            <View style={{ flex: 2, padding: 5, alignItems: 'flex-start' }} >
                <TouchableOpacity onPress={() => props.navigation.navigate(props.button, { content: JSON.stringify(props.content) })} style={{ padding: 3, paddingRight: 6, paddingLeft: 6, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, justifyContent: 'center', borderColor: 'lightblue' }}>
                    <Text style={[styles.textSmall, { textAlign: 'left', color: 'lightblue' }]}>Isi!</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.check && <Ionicons name='md-checkmark' color={'green'} style={{ fontSize: 27 }} />
                }</Text>
            </View>
        </View>
    )
}


export default LoanCheckListScreen