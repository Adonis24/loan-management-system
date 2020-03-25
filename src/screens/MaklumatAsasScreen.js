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

const MaklumatAsasScreen = (props) => {

    const dispatch = useDispatch()

    //const { comp_phone, comp_email, comp_addr, comp_addr_2, comp_state, comp_city, comp_postcode, proceedContact, error, errorColor } = useSelector(state => state.companyInformationReducer, shallowEqual)
    const { negeri, cawangan_parlimen,pengundi_berdaftar,status_perniagaan } = useSelector(state => state.financingReducer, shallowEqual)
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
                initialValues={{ negeri, cawangan_parlimen, pengundi_berdaftar: true,status_perniagaan:true }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatAsas(values)
                    actions.setSubmitting(false)
                    props.navigation.navigate('SektorPerniagaan')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { negeri, cawangan_parlimen, pengundi_berdaftar,status_perniagaan } = FormikProps.values


                    const negeriError = FormikProps.errors.negeri
                    const negeriTouched = FormikProps.touched.negeri
                    const cawangan_parlimenError = FormikProps.errors.cawangan_parlimen
                    const cawangan_parlimenTouched = FormikProps.touched.cawangan_parlimen


                    const handleCheckBox = () => { console.log(`apa ni ${pengundi_berdaftar}`); FormikProps.setFieldValue('pengundi_berdaftar', !pengundi_berdaftar) }
                    const handleCheckBox1 = () => { console.log(`apa ni ${status_perniagaan}`); FormikProps.setFieldValue('status_perniagaan', !status_perniagaan) }
                   
                    return (
                        
                        <View style={{ width: Layout.window.width * 0.8, justifyContent: 'center', alignItems: 'center', }}>
                            {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />}
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
                                value={cawangan_parlimen}
                                handleChange={FormikProps.handleChange(`cawangan_parlimen`)}
                                handleBlur={FormikProps.handleBlur(`cawangan_parlimen`)}
                                touched={cawangan_parlimenTouched}
                                error={cawangan_parlimenError}
                                placeholder={'Cawangan Parlimen'}
                                keyboardType={'default'}
                            />
                            <View style={{ marginBottom: 10, justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Pengundi berdaftar cawangan parlimen</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox()} isChecked={pengundi_berdaftar} />
                                        :
                                        <CheckBox onValueChange={handleCheckBox} value={pengundi_berdaftar} />
                                    }
                                    <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                        YA
                                </Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox()} isChecked={!pengundi_berdaftar} />
                                        :
                                        <CheckBox onValueChange={handleCheckBox} value={!pengundi_berdaftar} />
                                    }
                                    <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                        TIDAK
                                </Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: 10, justifyContent: 'center',marginRight:40}}>
                                <Text style={[styles.textDefault, { margin: 5, color: 'darkblue' }]}>Status perniagaan</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox1()} isChecked={status_perniagaan} />
                                        :
                                        <CheckBox onValueChange={handleCheckBox1} value={status_perniagaan} />
                                    }
                                    <Text style={[styles.textDefault, { margin: 5, marginBottom: 10, color: 'black', fontSize: 12 }]}>
                                       SEDANG BERNIAGA
                                </Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {(Platform.OS == 'ios') ?

                                        <CheckBox2 onClick={() => handleCheckBox1()} isChecked={!status_perniagaan} />
                                        :
                                        <CheckBox onValueChange={handleCheckBox1} value={!status_perniagaan} />
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
                        

                    )
                }}
            </Formik >


        </LayoutA>
    );
}



export default MaklumatAsasScreen