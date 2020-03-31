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
import { Ionicons } from '@expo/vector-icons';

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

    cawanganParlimen: Yup
        .string('Please enter')
        .required('Please enter')
        .min(3)
        .label('Cawangan Parlimen'),


});

const LoanMaklumatAsasScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatAsas = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

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
                initialValues={{ negeri, cawanganParlimen, pengundiBerdaftar: true, statusPerniagaan: true }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanSektorPerniagaan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan } = FormikProps.values
                    const negeriError = FormikProps.errors.negeri
                    const negeriTouched = FormikProps.touched.negeri
                    const cawanganParlimenError = FormikProps.errors.cawanganParlimen
                    const cawanganParlimenTouched = FormikProps.touched.cawanganParlimen

                    const handleCheckBox = () => { console.log(`apa ni ${pengundiBerdaftar}`); FormikProps.setFieldValue('pengundiBerdaftar', !pengundiBerdaftar) }
                    const handleCheckBox1 = () => { console.log(`apa ni ${statusPerniagaan}`); FormikProps.setFieldValue('statusPerniagaan', !statusPerniagaan) }

                    return (
                        <View style={{ flex: 1, justifyContent: 'center' }}>

                            <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>

                                <Text style={[styles.textDefault, { margin: 5, fontWeight: 'bold' }]}>PEMBIAYAAN TEKUN</Text>
                                <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Maklumat Asas</Text>


                                <CustomTextInput
                                    imageUri={require('../assets/images/city.png')}
                                    value={negeri}
                                    handleChange={FormikProps.handleChange(`negeri`)}
                                    handleBlur={FormikProps.handleBlur(`negeri`)}
                                    touched={negeriTouched}
                                    error={negeriError}
                                    placeholder={'Negeri'}
                                    keyboardType={'default'}
                                />
                                <CustomTextInput
                                    imageUri={require('../assets/images/state.png')}
                                    value={cawanganParlimen}
                                    handleChange={FormikProps.handleChange(`cawanganParlimen`)}
                                    handleBlur={FormikProps.handleBlur(`cawanganParlimen`)}
                                    touched={cawanganParlimenTouched}
                                    error={cawanganParlimenError}
                                    placeholder={'Cawangan Parlimen'}
                                    keyboardType={'default'}
                                />
                                <View style={{ marginBottom: 10, justifyContent: 'center', marginLeft: 20 }}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Pengundi berdaftar cawangan parlimen</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox()} isChecked={pengundiBerdaftar} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox} value={pengundiBerdaftar} />
                                        }
                                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                            YA
                                </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox()} isChecked={!pengundiBerdaftar} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox} value={!pengundiBerdaftar} />
                                        }
                                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                            TIDAK
                                </Text>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', marginRight: 40 }}>
                                    <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Status perniagaan</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox1()} isChecked={statusPerniagaan} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox1} value={statusPerniagaan} />
                                        }
                                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                            SEDANG BERNIAGA
                                </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {(Platform.OS == 'ios') ?

                                            <CheckBox2 onClick={() => handleCheckBox1()} isChecked={!statusPerniagaan} />
                                            :
                                            <CheckBox onValueChange={handleCheckBox1} value={!statusPerniagaan} />
                                        }
                                        <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                            MEMULAKAN PERNIAGAAN
                                </Text>
                                    </View>
                                </View>

                                <CustomFormAction
                                    navigation={props.navigation}
                                    isValid={FormikProps.isValid}
                                    handleSubmit={FormikProps.handleSubmit}
                                />
                            </View>
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



export default LoanMaklumatAsasScreen