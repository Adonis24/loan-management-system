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

import * as actionCreator from '../store/actions/action'

import malaysiaData from 'malaysia-state-city-postcode'

const validationSchema = Yup.object().shape({

    alamatComp: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    phoneNumComp: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

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
    poskodComp: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanPendapatanScreen = (props) => {


    const ios = Platform.OS === "ios" ? true : false
    const [addressVisible, setAddressVisible] = useState(false)
    const dispatch = useDispatch()

    const { alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp, phoneNumComp, pendapatan, pekerjaan, pendidikan } = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)



    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })





    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp, pendapatan, pekerjaan, pendidikan, phoneNumComp, }}
                validateOnMount
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setMaklumatPeribadi(values)
                    dispatch(actionCreator.saveLoanData())
                    actions.setSubmitting(false)
                    actions.resetForm({})
                    props.navigation.navigate('LoanSectionC')
                }}
                validationSchema={validationSchema}
            >
                {FormikProps => {
                    const { alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp, pendapatan, phoneNumComp, pekerjaan, pendidikan } = FormikProps.values

                    const alamatCompError = FormikProps.errors.alamatComp
                    const alamatCompTouched = FormikProps.touched.alamatComp

                    const poskodCompError = FormikProps.errors.poskodComp
                    const poskodCompTouched = FormikProps.touched.poskodComp


                    const pendapatanError = FormikProps.errors.pendapatan
                    const pendapatanTouched = FormikProps.touched.pendapatan

                    const phoneNumCompError = FormikProps.errors.phoneNumComp
                    const phoneNumCompTouched = FormikProps.touched.phoneNumComp

                    const pekerjaanError = FormikProps.errors.pekerjaan
                    const pekerjaanTouched = FormikProps.touched.pekerjaan


                    const pendidikanError = FormikProps.errors.pendidikan
                    const pendidikanTouched = FormikProps.touched.pendidikan

                    const getCoordinate = (poskod) => {
                        
                        if(poskod){
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)
    
                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('poskodComp', poskod)
                                    FormikProps.setFieldValue(`cityComp`, coordinate.City)
                                    FormikProps.setFieldValue(`stateComp`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('poskodComp', poskod)
                                }
    
                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('poskodComp', poskod)
                            }

                        }
                        
                    }

                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={true} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={alamatComp}
                                            handleChange={FormikProps.handleChange(`alamatComp`)}
                                            handleBlur={FormikProps.handleBlur(`alamatComp`)}
                                            touched={alamatCompTouched}
                                            error={alamatCompError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={alamat_2Comp}
                                            handleChange={FormikProps.handleChange(`alamat_2Comp`)}
                                            handleBlur={FormikProps.handleBlur(`alamat_2Comp`)}

                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={poskodComp}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`poskodComp`)}
                                            touched={poskodCompTouched}
                                            error={poskodCompError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {cityComp && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={cityComp}

                                            placeholder={'City'}

                                        />}

                                        {stateComp && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={stateComp}

                                            placeholder={'State'}

                                        />}
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
                                        <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', margin: 5 }} onPress={() => handleIosPicker('pendidikan')}>
                                                <Text style={{ fontSize: 12 }}>{pendidikan ? pendidikan : `Taraf Pendidikan`}</Text>
                                            </TouchableOpacity>
                                            {pendidikanTouched && pendidikanError && <Text style={styles.error}>{pendidikanError}</Text>}
                                        </View> : <View style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#5a83c2' }}>
                                            <Picker style={{ height: 35 }} selectedValue={pendidikan} onValueChange={(itemValue, itemIndex) => FormikProps.setFieldValue('pendidikan', itemValue)}>
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label={'Taraf Pendidikan'} value={undefined} />
                                                <Picker.Item label="Ijazah" value="ijazah" />
                                                <Picker.Item label="Diploma" value="diploma" />
                                                <Picker.Item label="Sijil" value="sijil" />
                                                <Picker.Item label="STPM/setaraf" value="stpm/setaraf" />
                                                <Picker.Item label="SPM/setaraf" value="spm/setaraf" />
                                                <Picker.Item label="PMR/setaraf" value="pmr/setaraf" />
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



                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}

                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}

                                touched={alamatCompTouched}
                                error={alamatCompError}
                                placeholder={'Alamat Tempat Bekerja'}


                            >
                                <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                    <Text style={[styles.textDefault, { color: '#000' }]}>{alamatComp}</Text>
                                    {alamat_2Comp && <Text style={[styles.textDefault, { color: '#000' }]}>{alamat_2Comp}</Text>}
                                    {poskodComp && <Text style={[styles.textDefault, { color: '#000' }]}>{poskodComp}</Text>}
                                    {cityComp && <Text style={[styles.textDefault, { color: '#000' }]}>{cityComp},{stateComp}</Text>}
                                </View>
                            </CustomTextInput>

                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={phoneNumComp}
                                handleChange={FormikProps.handleChange(`phoneNumComp`)}
                                handleBlur={FormikProps.handleBlur(`phoneNumComp`)}
                                touched={phoneNumCompTouched}
                                error={phoneNumCompError}
                                placeholder={'No Tel Tempat Bekerja'}
                                keyboardType={'decimal-pad'}
                            />




                            <CustomFormAction
                                label={`Next`}
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