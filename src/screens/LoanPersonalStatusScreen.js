import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Picker,
    View,


} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

const validationSchema = Yup.object().shape({

    taraf: Yup
        .string()
        .required(),

    tanggungan: Yup
        .string()
        .required()
        .min(1)
        .label('Bilangan Tanggungan'),

});

const LoanPersonalStatusScreen = (props) => {

    const [iosPickerVisible, setIosPickerVisible] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const ios = Platform.OS === "ios" ? true : false


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { taraf, tanggungan } = useSelector(state => state.financingReducer, shallowEqual)


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_PERIBADI', payload: { ...value } })


    const handleIosPicker = (modalContent) => {
        setModalContent(modalContent)
        setIosPickerVisible(!iosPickerVisible)
    }

    return (
        <LayoutLoan navigation={props.navigation}>


            <Formik
                validateOnMount
                initialValues={{ taraf, tanggungan }}

                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    props.navigation.navigate('LoanContactAddressInfo')
                    actions.setSubmitting(false)
                    actions.resetForm({})
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { taraf, tanggungan } = FormikProps.values

                    const tanggunganError = FormikProps.errors.tanggungan
                    const tanggunganTouched = FormikProps.touched.tanggungan

                    const tarafError = FormikProps.errors.taraf
                    const tarafTouched = FormikProps.touched.taraf


                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'} visible={iosPickerVisible} presentationStyle={'pageSheet'} onRequestClose={() => setIosPickerVisible(!iosPickerVisible)}                   >
                                <LayoutLoan title={'Taraf Perkahwinan'} nopaddingTop={true} back={() => setIosPickerVisible(!iosPickerVisible)} navigation={props.navigation}>
                                    <View style={{ alignSelf: 'stretch', margin: 10 }}>
                                        {(modalContent !== "taraf") ?
                                            <View /> : <Picker style={{ flex: 1, height: 35 }} selectedValue={taraf} onValueChange={(itemValue, itemIndex) =>
                                                FormikProps.setFieldValue('taraf', itemValue)}>
                                                <Picker.Item label={'Taraf Perkahwinan'} value={undefined} />
                                                <Picker.Item label="Bujang" value="Bujang" />
                                                <Picker.Item label="Berkahwin" value="Berkahwin" />
                                                <Picker.Item label="Duda" value="Duda" />
                                                <Picker.Item label="Ibu Tunggal" value="Ibu Tunggal" />
                                            </Picker>
                                        }
                                    </View>
                                </LayoutLoan>
                            </Modal>

                            {/* {showLogo && <Image source={require('../assets/images/logo.png')} style={{ height: Layout.window.height * 0.2, width: Layout.window.width * 0.7 }} resizeMode={'contain'} />} */}
                            <Text style={[styles.formTitle]}>Section B</Text>
                            {/* <Image source={require('../assets/images/1.png')} style={{ height: 50, width: 200, margin: 5 }} resizeMode={'stretch'} /> */}
                            <Text style={[styles.formSubtitle]}>Maklumat Peribadi</Text>
                            <Text style={[styles.label, { margin: 5, alignSelf: 'flex-start' }]}>Taraf Perkahwinan :</Text>

                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={require('../assets/images/mykad.png')} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                                <View style={{ alignSelf: 'center', margin: 5, flex: 1 }}>
                                    {ios ?
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('taraf')}>
                                                <Text style={{ fontSize: 12 }}>{taraf ? taraf : `Taraf Perkahwinan`}</Text>
                                            </TouchableOpacity>
                                            {tarafTouched && tarafError && <Text style={styles.error}>{tarafError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={taraf} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('taraf', itemValue)}>
                                                <Picker.Item label={'Taraf Perkahwinan'} value={undefined} />
                                                <Picker.Item label="Bujang" value="Bujang" />
                                                <Picker.Item label="Berkahwin" value="Berkahwin" />
                                                <Picker.Item label="Duda" value="Duda" />
                                                <Picker.Item label="Ibu Tunggal" value="Ibu Tunggal" />
                                            </Picker>
                                            {tarafTouched && tarafError && <Text style={styles.error}>{tarafError}</Text>}
                                        </View>}
                                </View>
                            </View>
                            <CustomTextInput
                                imageUri={require('../assets/images/mykad.png')}
                                value={tanggungan}
                                handleChange={FormikProps.handleChange(`tanggungan`)}
                                handleBlur={FormikProps.handleBlur(`tanggungan`)}
                                touched={tanggunganTouched}
                                error={tanggunganError}
                                placeholder={'Bilangan Tanggungan'}
                                keyboardType={'decimal-pad'}
                            />



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




export default LoanPersonalStatusScreen