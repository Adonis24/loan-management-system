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
import * as DocumentPicker from 'expo-document-picker';
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



const AttachmentScreen = (props) => {
    const dispatch = useDispatch()

    const getPicture = async () => {
        await dispatch(actionCreator.getAttachment(store))
    }

    const { fileList, } = useSelector(state => state.attachmentReducer, shallowEqual)

    const getUri = (fileName) => {
        if (fileList) {
            const found = fileList.find(f => f.fileName === fileName)
            if (found) {
                console.log(`uri found ${JSON.stringify(found)}`)
                return found.fileUri
            } else { return `NA` }

        } else { return `NA` }
    }

    const getAllAttachment = async () => {
        await dispatch(actionCreator.getAllAttachment())
    }


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            console.log('focussed');
            getAllAttachment()
            getPicture()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        getPicture()
    }, []); // empty-array means don't watch for any updates

    const content = props.route.params?.content ?? 'NA'
    //console.log(`inilah content ${content}`)
    //const contentParsed = JSON.parse(content)
    const { header, atList, store } = JSON.parse(content)

    return (
        < LayoutB
            title={header}
            screenType='form'
            navigation={props.navigation}
            imageUri={require('../assets/images/e-scoring.png')}
        >

            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <View style={{ margin: 7 }} />
                    <FlatList
                        data={atList}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) => (
                            < Placeholder
                                label={item.label}
                                navigation={props.navigation}
                                param={item.param}
                                uri={getUri(item.param.file)}
                                type={item.param.type}
                            />
                        )}

                    />

                    {/* < Placeholder
                        label={'Picture 1'}
                        navigation={props.navigation}
                        param={{ attachment: 'sitePicture', file: 'picture1' }}
                        uri={getUri('picture1')}
                    />
                    <Placeholder
                        label={'Picture 2'}
                        navigation={props.navigation}
                        param={{ attachment: 'sitePicture', file: 'picture2' }}
                        uri={getUri('picture2')}
                    /> */}

                    {/* <TouchableOpacity onPress={() => dispatch(actionCreator.resetAllAttachment())} style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: 'red' }}><Text>RESET</Text></TouchableOpacity> */}

                </View>
            </View>
        </LayoutB >
    );
}

const Placeholder = (props) => {
    const dispatch = useDispatch()
    const docPicker = async () => {
        const { attachment, file } = props.param
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true, multiple: false })
        console.log(`document ialah : ${JSON.stringify(result)}`)
        const { cancelled } = result
        if (!cancelled) {
            await dispatch(actionCreator.savePicture(result, attachment, file))
        }



    }
    return (
        <>
            <Text style={[styles.textDefault, { paddingLeft: 10 }]}>{props.label}</Text>
            {props.type === 'doc' ?
                <TouchableOpacity onPress={() => docPicker()} style={{ margin: 10 }}>
                    {props.uri !== 'NA' ?
                        <Text>Dah isi</Text>
                        : <Text>Sila isi</Text>}
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => props.navigation.navigate('Camera', { ...props.param, label: props.label })} style={{ width: Layout.window.width / 2, height: Layout.window.width / 3, borderWidth: 1, borderColor: 'lightgrey', backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'stretch', borderRadius: 10, margin: 10 }}>
                    {props.uri !== 'NA' ?
                        <Image source={{ uri: props.uri }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'} />
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-folder' size={60} color="grey" />
                        </View>}
                </TouchableOpacity>}

        </>)
}

export default AttachmentScreen