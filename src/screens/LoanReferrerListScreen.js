import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'


const validationSchema = Yup.object().shape({


    // refName: Yup
    //     .string()
    //     .required()
    //     .min(3)
    //     .label('Nama'),

    // refPhoneNum: Yup
    //     .string()
    //     .required()
    //     .min(3)
    //     .label('No Tel'),

    // refRelationship: Yup
    //     .string()
    //     .required()
    //     .min(3)
    //     .label('Hubungan'),

    // refAlamat: Yup
    //     .string()
    //     .required()
    //     .min(3)
    //     .label('Alamat'),
    // refPoskod: Yup
    //     .string()
    //     .required()
    //     .min(5)
    //     .max(5)
    //     .label('Postcode'),


});

const LoanReferrerListScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { refAlamat, refAlamat_2, refName, refPhoneNum, refRelationship, refCity, refState, refPoskod, ref2Alamat, ref2Alamat_2, ref2Name, ref2PhoneNum, ref2Relationship, ref2City, ref2State, ref2Poskod } = useSelector(state => state.financingReducer, shallowEqual)


    const setReferrer = (value) => dispatch({ type: 'SET_REFERRER', payload: { ...value } })
    props.navigation.navigate('LoanValidation')
    const nextScreen=()=>{
        dispatch(actionCreator.saveLoanData())
        props.navigation.navigate('LoanValidation')
    }

    return (
        <LayoutLoan navigation={props.navigation}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                <Text style={[styles.formTitle]}>Section H</Text>
                <Text style={[styles.formSubtitle]}>Maklumat Perujuk</Text>

                {refName ?
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanReferrer1')} style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch', flex: 1, padding: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Nama</Text>
                                    <Text style={[styles.answer, { flex: 3 }]}>{refName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Hubungan</Text>
                                    <Text style={[styles.answer, { flex: 3 }]}>{refRelationship}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Phone</Text>
                                    <Text style={[styles.answer, { flex: 3 }]}>{refPhoneNum}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Address</Text>
                                    <View style={{ flex: 3 }}>
                                        <Text style={[styles.answer]}>{refAlamat}</Text>
                                        <Text style={[styles.answer]}>{refAlamat_2}</Text>
                                        <Text style={[styles.answer]}>{refPoskod}</Text>
                                        <Text style={[styles.answer]}>{refCity},{refState}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => props.navigation.navigate('LoanReferrer1')} style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch', flex: 1, padding: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Click To Add</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>}

                {ref2Name ? <TouchableOpacity onPress={() => props.navigation.navigate('LoanReferrer2')} style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>

                        <View style={{ borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch', flex: 1, padding: 10, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.label, { flex: 1 }]}>Nama</Text>
                                <Text style={[styles.answer, { flex: 3 }]}>{ref2Name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.label, { flex: 1 }]}>Hubungan</Text>
                                <Text style={[styles.answer, { flex: 3 }]}>{ref2Relationship}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.label, { flex: 1 }]}>Phone</Text>
                                <Text style={[styles.answer, { flex: 3 }]}>{ref2PhoneNum}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.label, { flex: 1 }]}>Address</Text>
                                <View style={{ flex: 3 }}>
                                    <Text style={[styles.answer]}>{ref2Alamat}</Text>
                                    <Text style={[styles.answer]}>{ref2Alamat_2}</Text>
                                    <Text style={[styles.answer]}>{ref2Poskod}</Text>
                                    <Text style={[styles.answer]}>{ref2City},{ref2State}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity> : <TouchableOpacity onPress={() => props.navigation.navigate('LoanReferrer2')} style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>

                            <View style={{ borderWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch', flex: 1, padding: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.label, { flex: 1 }]}>Click To Add</Text>

                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>}

                <CustomFormAction
                label={'Save'}
                    navigation={props.navigation}
                    isValid={true}
                    handleSubmit={() => nextScreen()}
                />

            </View>
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan>
    );
}




export default LoanReferrerListScreen