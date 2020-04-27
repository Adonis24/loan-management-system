import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    Picker,
    TouchableOpacity,
    View,


} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Ionicons } from '@expo/vector-icons';

import LayoutLoan from '../Layout/LayoutLoan';

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'



const validationSchema = Yup.object().shape({

 

    pendapatan: Yup
        .string()
        .required()
        .min(3)
        .label('Pendapatan'),

    pekerjaan: Yup
        .string()
        .required()
        .min(3)
        .label('Pekerjaan'),


    pendidikan: Yup
        .string()
        .required(),
 


});

const LoanPendapatanScreen = (props) => {


    const ios = Platform.OS === "ios" ? true : false
    const dispatch = useDispatch()

    const {  pendapatan, pekerjaan, pendidikan } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })


    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }


    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ pendapatan, pekerjaan, pendidikan,  }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    //dispatch(actionCreator.saveLoanData())
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanPendapatanB')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const {  pendapatan,  pekerjaan, pendidikan } = FormikProps.values

                 


                    const pendapatanError = FormikProps.errors.pendapatan
                    const pendapatanTouched = FormikProps.touched.pendapatan

                

                    const pekerjaanError = FormikProps.errors.pekerjaan
                    const pekerjaanTouched = FormikProps.touched.pekerjaan


                    const pendidikanError = FormikProps.errors.pendidikan
                    const pendidikanTouched = FormikProps.touched.pendidikan

                   

                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Taraf Pendidikan'} nopaddingTop={!ios?true:false} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        <Picker style={{ height: 35 }} selectedValue={pendidikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pendidikan', itemValue)}>
                                            <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                            <Picker.Item label="Ijazah" value="Ijazah" />
                                            <Picker.Item label="Diploma" value="Diploma" />
                                            <Picker.Item label="Sijil" value="Sijil" />
                                            <Picker.Item label="STPM/setaraf" value="STPM/setaraf" />
                                            <Picker.Item label="SPM/setaraf" value="SPM/setaraf" />
                                            <Picker.Item label="PMR/setaraf" value="PMR/setaraf" />
                                        </Picker>
                                    </View>
                                </LayoutLoan>
                            </Modal>
                            
                            <Text style={[styles.formTitle]}>Section B</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Taraf Pendidikan :</Text>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pendidikan')}>
                                                <Text style={{ fontSize: 12 }}>{pendidikan ? pendidikan : `Taraf Pendidikan`}</Text>
                                            </TouchableOpacity>
                                            {pendidikanTouched && pendidikanError && <Text style={styles.error}>{pendidikanError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={pendidikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pendidikan', itemValue)}>
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label="Ijazah" value="Ijazah" />
                                                <Picker.Item label="Diploma" value="Diploma" />
                                                <Picker.Item label="Sijil" value="Sijil" />
                                                <Picker.Item label="STPM/setaraf" value="STPM/setaraf" />
                                                <Picker.Item label="SPM/setaraf" value="SPM/setaraf" />
                                                <Picker.Item label="PMR/setaraf" value="PMR/setaraf" />
                                            </Picker>
                                            {pendidikanTouched && pendidikanError && <Text style={styles.error}>{pendidikanError}</Text>}
                                        </View>}
                                </View>
                            </View>


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={pekerjaan}
                                handleChange={FormikProps.handleChange(`pekerjaan`)}
                                handleBlur={FormikProps.handleBlur(`pekerjaan`)}
                                touched={pekerjaanTouched}
                                error={pekerjaanError}
                                placeholder={'Pekerjaan Sekarang'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={pendapatan}
                                handleChange={FormikProps.handleChange(`pendapatan`)}
                                handleBlur={FormikProps.handleBlur(`pendapatan`)}
                                touched={pendapatanTouched}
                                error={pendapatanError}
                                placeholder={'Pendapatan'}
                                keyboardType={'decimal-pad'}
                            />



                            
                            <CustomFormAction
                                //label={`Save`}
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



export default LoanPendapatanScreen