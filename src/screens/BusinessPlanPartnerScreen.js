import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Picker,
    TextInput,
    KeyboardAvoidingView, FlatList

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'
//import { FlatList } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({

    partJawatan: Yup
        .string()
        .required()
        .min(3)
        .label('Jawatan'),

    partName: Yup
        .string()
        .required()
        .min(3)
        .label('Nama Rakan Kongsi'),

    partIcNum: Yup
        .string()
        .required()
        .min(12)
        .max(12)
        .label('MyKad No'),

    saham: Yup
        .string()
        .required()
        .max(2)
        .label('Jumlah Saham'),




});



const BusinessPlanPartnerScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    //const { partName, partIcNum, partJawatan, saham, } = useSelector(state => state.businessPlanningReducer, shallowEqual)
    const { partners, pemilikan } = useSelector(state => state.businessPlanningReducer)
    console.log(`partners ialah ${JSON.stringify(partners)}`)
    //const { partName, partIcNum, partJawatan, saham, } = partners || { partName: null, partIcNum: null, partJawatan: null, saham: null, }

    const [addPartnerVisible, setAddPartnerVisible] = useState(false)

    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    const goToNext = () => {
        dispatch(actionCreator.saveBussPlanData())
        props.navigation.navigate('BusinessPlanSectionB')
    }

    return (
        <LayoutLoan navigation={props.navigation}>
            <Modal visible={addPartnerVisible} onRequestClose={() => setAddPartnerVisible(!addPartnerVisible)}>
                <Formik
                    validateOnMount
                    initialValues={{ partName: undefined, partIcNum: undefined, partJawatan: undefined, saham: undefined, }}

                    onSubmit={async (values, actions) => {
                        const newPartners = partners || []
                        newPartners.push(values)
                        console.log(`values formik ialah ${JSON.stringify(values)}`)
                        setLatarBelakang({ partners: newPartners })

                        setAddPartnerVisible(!addPartnerVisible)
                        //dispatch(actionCreator.saveBussPlanData())
                        actions.resetForm({})
                        actions.setSubmitting(false)
                    }
                    }
                    validationSchema={validationSchema}
                >
                    {FormikProps => {




                        const { partJawatan, partName, partIcNum, saham, } = FormikProps.values

                        const partJawatanError = FormikProps.errors.partJawatan
                        const partJawatanTouched = FormikProps.touched.partJawatan

                        const partNameError = FormikProps.errors.partName
                        const partNameTouched = FormikProps.touched.partName

                        const partIcNumError = FormikProps.errors.partIcNum
                        const partIcNumTouched = FormikProps.touched.partIcNum

                        const sahamError = FormikProps.errors.saham
                        const sahamTouched = FormikProps.touched.saham

                        return (
                            <LayoutLoan title={'Add Partner'} nopaddingTop={true} back={() => setAddPartnerVisible(!addPartnerVisible)} navigation={props.navigation}>
                                <View style={{ alignSelf: 'stretch', padding: 10 }}>
                                    <CustomTextInput
                                        imageUri={require('../assets/images/user.png')}
                                        value={partName}
                                        handleChange={FormikProps.handleChange(`partName`)}
                                        handleBlur={FormikProps.handleBlur(`partName`)}
                                        touched={partNameTouched}
                                        error={partNameError}
                                        placeholder={'Nama Rakan Kongsi'}
                                        keyboardType={'default'}
                                    />

                                    <CustomTextInput
                                        imageUri={require('../assets/images/mykad.png')}
                                        value={partIcNum}
                                        handleChange={FormikProps.handleChange(`partIcNum`)}
                                        handleBlur={FormikProps.handleBlur(`partIcNum`)}
                                        touched={partIcNumTouched}
                                        error={partIcNumError}
                                        placeholder={'No Kad Pengenalan'}
                                        keyboardType={'phone-pad'}
                                    />
                                    <CustomTextInput
                                        imageUri={require('../assets/images/position.png')}
                                        value={partJawatan}
                                        handleChange={FormikProps.handleChange(`partJawatan`)}
                                        handleBlur={FormikProps.handleBlur(`partJawatan`)}
                                        touched={partJawatanTouched}
                                        error={partJawatanError}
                                        placeholder={'Jawatan'}

                                    />
                                    <CustomTextInput
                                        imageUri={require('../assets/images/compRegNum.png')}
                                        value={saham}
                                        handleChange={FormikProps.handleChange(`saham`)}
                                        handleBlur={FormikProps.handleBlur(`saham`)}
                                        touched={sahamTouched}
                                        error={sahamError}
                                        placeholder={'Jumlah Pegangan Saham (%)'}
                                        keyboardType={'phone-pad'}
                                    />

                                    <CustomFormAction
                                        label={`Save`}
                                        navigation={props.navigation}
                                        isValid={FormikProps.isValid}
                                        handleSubmit={FormikProps.handleSubmit}
                                    />
                                </View>




                            </LayoutLoan>)
                    }}
                </Formik>
            </Modal>
            <Text style={[styles.formTitle]}>Section A</Text>
            <Text style={[styles.formSubtitle]}>Latar Belakang Pemohon</Text>

            <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', alignSelf: 'stretch', margin: 10, }}>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.textDefault]}>Rakan Kongsi</Text>
                    <TouchableOpacity onPress={() => setAddPartnerVisible(!addPartnerVisible)}>
                        <Ionicons name='ios-add' color={'blue'} style={{ fontSize: 30 }} />
                    </TouchableOpacity>

                </View>

            </View>

            <View style={{ borderColor: 'lightgrey', alignSelf: 'stretch', margin: 10, }}>
                {partners && <FlatList
                    data={partners}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{  flexDirection: 'row', alignSelf: 'stretch', borderColor: 'lightgrey', borderWidth: 1,marginBottom:5 }}>
                            <View style={{ flex: 3, padding: 5, borderRightWidth: 1, borderColor: 'lightgrey',alignItems:'center' }}>
                                <Text style={styles.formTitle,{fontSize:40}}>{item.saham}%</Text></View>
                            <View style={{ flex: 7, padding: 5 }}>
                                <Text style={styles.answer}>{item.partName}</Text>
                                <Text style={styles.answer}>{item.partIcNum}</Text>
                                <Text style={styles.answer}>{item.partJawatan}</Text>
                                </View>


                        </View>} />}
            </View>


            <CustomFormAction
                label={`Save`}
                navigation={props.navigation}
                isValid={true}
                handleSubmit={() => goToNext()}
            />
        </LayoutLoan>)
}

export default BusinessPlanPartnerScreen