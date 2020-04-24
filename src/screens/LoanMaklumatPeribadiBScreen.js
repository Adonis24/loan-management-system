import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Picker,
    View,
    TextInput,
    KeyboardAvoidingView,
    CheckBox
} from 'react-native';
import CheckBox2 from 'react-native-check-box'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';


const validationSchema = Yup.object().shape({
    agama: Yup
        .string()
        .required(),
    jantina: Yup
        .string()
        .required(),
    bangsa: Yup
        .string()
        .required()
        .min(3)
        .label('Bangsa'),
});

const LoanMaklumatPeribadiBScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { agama, bangsa, jantina, } = useSelector(state => state.financingReducer, shallowEqual)

    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ agama, bangsa, jantina, }}
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
             
                    setMaklumatPeribadi({ ...values })
                 
                    actions.resetForm({})
                    actions.setSubmitting(false)
                    props.navigation.navigate('LoanPersonalStatus')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {



                    const { jantina, agama, bangsa } = FormikProps.values

                    const bangsaError = FormikProps.errors.bangsa
                    const bangsaTouched = FormikProps.touched.bangsa



                    const jantinaError = FormikProps.errors.jantina
                    const jantinaTouched = FormikProps.touched.jantina

                    const agamaError = FormikProps.errors.agama
                    const agamaTouched = FormikProps.touched.agama

                    const handleCheckBoxLelaki = () => {
                        FormikProps.setFieldValue('jantina', 'Lelaki')
                    }
                    const handleCheckBoxPerempuan = () => {
                        FormikProps.setFieldValue('jantina', 'Perempuan')
                    }


                    const handleCheckBoxIslam = () => {
                        FormikProps.setFieldValue('agama', 'Islam')
                    }
                    const handleCheckBoxBukanIslam = () => {
                        FormikProps.setFieldValue('agama', 'Bukan Islam')
                    }

                    const handleCheckBoxMelayu = () => {
                        FormikProps.setFieldValue('bangsa', 'Melayu')
                    }
                    const handleCheckBoxLain = () => {
                        FormikProps.setFieldValue('bangsa', 'Lain-lain')
                    }

                    return (

                        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                            <Text style={[styles.formTitle]}>Section B</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>

                           

                            <View style={{ marginBottom: 20, justifyContent: 'center', alignSelf: 'stretch' }}>
                                <Text style={[styles.textDefault, { marginBottom: 5, color: 'darkblue' }]}>Jantina :</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxLelaki()} isChecked={jantina == 'Lelaki' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Lelaki</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxPerempuan()} isChecked={jantina == 'Perempuan' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Perempuan</Text>
                                </View>
                                {jantinaTouched && jantinaError && <Text style={styles.error}>{jantinaError}</Text>}
                            </View>


                            <View style={{ marginBottom: 20, justifyContent: 'center', alignSelf: 'stretch' }}>
                                <Text style={[styles.textDefault, { marginBottom: 5, color: 'darkblue' }]}>Agama :</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxIslam()} isChecked={agama == 'Islam' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Islam</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxBukanIslam()} isChecked={agama == 'Bukan Islam' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Bukan Islam</Text>
                                </View>
                                {agamaTouched && agamaError && <Text style={styles.error}>{agamaError}</Text>}
                            </View>



                            <View style={{ marginBottom: 20, justifyContent: 'center', alignSelf: 'stretch' }}>
                                <Text style={[styles.textDefault, { marginBottom: 5, color: 'darkblue' }]}>Bangsa :</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxMelayu()} isChecked={bangsa == 'Melayu' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>
                                        Melayu/Bumiputra</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox2 onClick={() => handleCheckBoxLain()} isChecked={bangsa == 'Lain-lain' ? true : false} checkBoxColor={'#5a83c2'} />
                                    <Text style={[styles.answer, { margin: 5, marginBottom: 10 }]}>Lain-lain</Text>
                                </View>
                                {bangsaTouched && bangsaError && <Text style={styles.error}>{bangsaError}</Text>}
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
        </LayoutLoan>
    );
}




export default LoanMaklumatPeribadiBScreen