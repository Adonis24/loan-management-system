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
import Layout from '../constants/Layout'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import { LinearGradient } from 'expo-linear-gradient'
import * as actionCreator from '../store/actions/action'
import CheckBox2 from 'react-native-check-box'


const validationSchema = Yup.object().shape({


    negeri: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Negeri'),

    cawangan_parlimen: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Cawangan Parlimen'),


});

const SektorPerniagaanScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { bank,no_akaun,pertanian, peruncitan, perkhidmatan, pembuatan, kontraktorKecil } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    useEffect(() => {
        const open = () => setshowLogo(false)
        const off = () => setshowLogo(true)

        keyboardBeingDisplay(open)
        keyboardBeingClose(off)
    }, []); // empty-array means don't watch for any updates

    const [showLogo, setshowLogo] = useState(true)

    //proceedContact && props.navigation.goBack()


    return (
        <LayoutA>
            <Formik
                initialValues={{ bank,no_akaun,pertanian: false, peruncitan: false, perkhidmatan: false, pembuatan: false, kontraktorKecil: false,}}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { bank,no_akaun,pertanian, peruncitan, perkhidmatan, pembuatan, kontraktorKecil } = FormikProps.values


                    const bankError = FormikProps.errors.bank
                    const bankTouched = FormikProps.touched.bank
                    const no_akaunError = FormikProps.errors.no_akaun
                    const no_akaunTouched = FormikProps.touched.no_akaun


                    
                    const handleCheckBox = (field) => {
                        console.log(`field ialah ${field}`)
    
                        switch (field) {
    
                            case 'pertanian':
                                FormikProps.setFieldValue('pertanian', !pertanian)
                                break;
    
                            case 'peruncitan':
                                FormikProps.setFieldValue('peruncitan', !peruncitan)
                                break;
    
                            case 'perkhidmatan':
                                FormikProps.setFieldValue('perkhidmatan', !perkhidmatan)
                                break;
    
                            case 'pembuatan':
                                FormikProps.setFieldValue('pembuatan', !pembuatan)
                                break;
    
                            case 'kontraktorKecil':
                                FormikProps.setFieldValue('kontraktorKecil', !kontraktorKecil)
                                break;
                            
    
                        }
                    }
                    return (
                        
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
                            <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Asas</Text>


                            <CustomTextInput
                                imageUri={require('../assets/images/city.png')}
                                value={bank}
                                handleChange={FormikProps.handleChange(`bank`)}
                                handleBlur={FormikProps.handleBlur(`bank`)}
                                touched={bankTouched}
                                error={bankError}
                                placeholder={'Bank Islam/Maybank/Bank Rakyat/BSN/Agrobank'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/state.png')}
                                value={no_akaun}
                                handleChange={FormikProps.handleChange(`no_akaun`)}
                                handleBlur={FormikProps.handleBlur(`no_akaun`)}
                                touched={no_akaunTouched}
                                error={no_akaunError}
                                placeholder={'No.Akaun'}
                                keyboardType={'phone-pad'}
                            />
                            <View style={{ justifyContent: 'center',alignItems:'flex-start',justifyContent:'center',marginLeft:10 }}>
                                <Text style={[styles.textDefault, { margin: 5, color: 'darkblue',fontSize:12 }]}>Sektor Perniagaan</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10,justifyContent:'center',alignItems:'center', }}>
                                            <CheckBox onClick={() => handleCheckBox('pertanian')} isChecked={pertanian} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 10,flexWrap: 'wrap' }]}>PERTANIAN DAN PERUSAHAAN ASAS TANI</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10,justifyContent:'center',alignItems:'center'}}>
                                            <CheckBox onClick={() => handleCheckBox('peruncitan')} isChecked={peruncitan} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 10 }]}> PERUNCITAN</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10,justifyContent:'center',alignItems:'center' }}>
                                            <CheckBox onClick={() => handleCheckBox('perkhidmatan')} isChecked={perkhidmatan} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />

                                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 10 }]}>PERKHIDMATAN</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10,justifyContent:'center',alignItems:'center' }}>
                                            <CheckBox onClick={() => handleCheckBox('pembuatan')} isChecked={pembuatan} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 10 }]}>PEMBUATAN</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10,justifyContent:'center',alignItems:'center' }}>
                                            <CheckBox onClick={() => handleCheckBox('kontraktorKecil')} isChecked={kontraktorKecil} checkBoxColor={'rgba(62,194,217,1)'} style={{ borderColor: 'rgba(0,0,0,0.3)' }} />
                                            <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 10 }]}>KONTRAKTOR KECIL</Text>
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


        </LayoutA>
    );
}



export default SektorPerniagaanScreen