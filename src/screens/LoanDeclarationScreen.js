import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from 'expo-constants'
import { keyboardBeingDisplay, keyboardBeingClose } from '../components/handleKeyboard'

import LayoutA from '../Layout/LayoutA';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'


const validationSchema = Yup.object().shape({
    


});

const LoanDeclarationScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { benar, menolak, membayar, salahGuna, bankrap, ahliKelab, sak } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setDeclaration = (value) => dispatch({ type: 'SET_DECLARATUON', payload: { ...value } })

    // useEffect(() => {
    //     const open = () => setshowLogo(false)
    //     const off = () => setshowLogo(true)

    //     keyboardBeingDisplay(open)
    //     keyboardBeingClose(off)
    // }, []); // empty-array means don't watch for any updates

    // const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()


    return (
        <LayoutA>
            <Formik
                initialValues={{ benar, menolak, membayar, salahGuna, bankrap, ahliKelab, sak }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setDeclaration(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('Dashboard')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { benar, menolak, membayar, salahGuna, bankrap, ahliKelab, sak } = FormikProps.values

                    

                    const handleCheckBox = (field) => {
                        console.log(`field ialah ${field}`)

                        switch (field) {

                            case 'benar':
                                FormikProps.setFieldValue('benar', !benar)
                                break;

                            case 'menolak':
                                FormikProps.setFieldValue('menolak', !menolak)
                                break;

                            case 'membayar':
                                FormikProps.setFieldValue('membayar', !membayar)
                                break;

                            case 'salahGuna':
                                FormikProps.setFieldValue('salahGuna', !salahGuna)
                                break;

                            case 'bankrap':
                                FormikProps.setFieldValue('bankrap', !bankrap)
                                break;
                            case 'ahliKelab':
                                FormikProps.setFieldValue('ahliKelab', !ahliKelab)
                                break;
                            case 'sak':
                                FormikProps.setFieldValue('sak', !sak)
                                break;

                        }
                    }

                    return (

                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Akuan Pemohon</Text>

                            <View style={{ marginBottom: 10, marginTop: 20 }}>
                                <View>
                                    <Text style={[styles.caption, { marginBottom: 20, color: '#055E7C', fontSize: 10 }]}>ADALAH DENGAN INI SAYA MENGAKU BAHAWA :</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('benar')} isChecked={benar} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',  textAlign: 'left',marginLeft:10, fontSize: 10 }]}>Segala maklumat dan keterangan yang diberikan adalah benar.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('menolak')} isChecked={menolak} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',textAlign: 'left',marginLeft:10, fontSize: 10 }]}>Pihak TEKUN berhak menolak permohonan ini jika didapati butir yang diberikan tidak benar.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('membayar')} isChecked={membayar} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />

                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',textAlign: 'left',marginLeft:10,  fontSize: 10 }]}>Saya berikrar untuk membayar jumlah terhutang sepertimana yang dijanjikan.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('salahGuna')} isChecked={salahGuna} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',textAlign: 'left',marginLeft:10, fontSize: 10 }]}>Saya memperakukan bahawa kemudahan pembiayaan ini tidak akan disalahgunakan.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('bankrap')} isChecked={bankrap} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap', textAlign: 'left',marginLeft:10, fontSize: 10 }]}>Saya bukan seorang yang bankrap.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <CheckBox onClick={() => handleCheckBox('ahliKelab')} isChecked={ahliKelab} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',textAlign: 'left',marginLeft:10,  fontSize: 10 }]}>Saya bersetuju untuk menjadi ahli Kelab Komuniti Usahawan TEKUN.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <CheckBox onClick={() => handleCheckBox('sak')} isChecked={sak} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                    <Text style={[styles.caption, { flex: 1, flexWrap: 'wrap',textAlign: 'left',marginLeft:10, fontSize: 10 }]}>Saya bersetuju untuk mengikuti Seminar Asas Keusahawanan (SAK) TEKUN Nasional yang diwajibkan ke atas saya.</Text>
                                </View>
                            </View>
                            <CustomFormAction
                                navigation={props.navigation}
                                isValid={FormikProps.isValid}
                                handleSubmit={FormikProps.handleSubmit}
                            />
                        </View>


                    )
                }}
            </Formik >
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </LayoutA>
    );
}



export default LoanDeclarationScreen