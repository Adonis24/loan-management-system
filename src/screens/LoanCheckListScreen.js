//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState } from 'react';
import {

    Text,
    TouchableOpacity,
    View,
    FlatList,


} from 'react-native';


import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import LayoutB from '../Layout/LayoutB';


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
    attachment && console.log(`semua attachment ialah ${JSON.stringify(attachment)}`)
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

                        if (newNewFiles.length == atList.length) {
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


    const getData = async () => {
        await dispatch(actionCreator.getLoanData())
        await dispatch(actionCreator.getAllBusinessPlan())
        await dispatch(actionCreator.getAllAttachment())
        await dispatch(actionCreator.getFileList())


    }


    useEffect(() => {
        getData()
    }, []); // empty-array means don't watch for any updates

    //     const { email } = useSelector(state => state.myAccountReducer, shallowEqual)
    // console.log(`email is ${email}`)
    return (
        < LayoutB
            title={'Checklist'}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 8 }}>
                    <View style={{ margin: 7 }} />
                    <View style={{ marginLeft: 10, marginRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'lightgrey' }}>
                        <Text style={[styles.textDefault]}>Dokumen-dokumen Diperlukan:</Text>
                    </View>
                    <FlatList contentContainerStyle={{ padding: 10 }} data={checklist}
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

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', borderTopWidth: 1, marginLeft: 10, marginRight: 10, borderColor: 'lightgrey', paddingTop: 10 }}>
                    {/* <Text style={[styles.textDefault, { paddingLeft: 10 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text> */}
                    <TouchableOpacity
                        style={{ alignSelf: 'stretch' }}
                        onPress={() => dispatch(actionCreator.uploadAllAttachment())}>
                        <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ alignSelf: 'stretch', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>HANTAR</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutB >
    );
}

const CustomRow = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate(props.button, { content: JSON.stringify(props.content) })} style={[styles.shadowNew, { alignSelf: 'stretch', flexDirection: 'row', alignSelf: 'stretch', marginBottom: 10 }]}>
            <View style={{ padding: 10, flex: 1, }}>
                <Text style={[styles.textDefault, { marginBottom: 5, textAlign: 'left' }]}>{props.no} </Text>
            </View>
            <View style={{ flex: 8, padding: 5, alignItems: 'flex-start' }} >
                <Text style={[styles.textSmall, { marginBottom: 5, textAlign: 'left' }]}>{props.item}</Text>
            </View>
            {/* <View style={{ flex: 2, padding: 5, alignItems: 'flex-start' }} >
                <TouchableOpacity onPress={() => props.navigation.navigate(props.button, { content: JSON.stringify(props.content) })} style={{ padding: 3, paddingRight: 6, paddingLeft: 6, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, justifyContent: 'center', borderColor: 'lightblue' }}>
                    <Text style={[styles.textSmall, { textAlign: 'left', color: 'lightblue' }]}>Isi!</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ flex: 1, padding: 5, alignItems: 'flex-start' }} >
                {props.check && <Ionicons name='md-checkmark' color={'green'} style={{ fontSize: 27 }} />}

            </View>
        </TouchableOpacity>
    )
}


export default LoanCheckListScreen