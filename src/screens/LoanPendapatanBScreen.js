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

   
    poskodComp: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanPendapatanBScreen = (props) => {


    const ios = Platform.OS === "ios" ? true : false
    const [addressVisible, setAddressVisible] = useState(false)
    const dispatch = useDispatch()

    const { alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp, phoneNumComp,} = useSelector(state => state.financingReducer, shallowEqual)
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)

 


    const setMaklumatPeribadi = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })


   

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                initialValues={{ alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp,  phoneNumComp, }}
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
                    const { alamatComp, alamat_2Comp, poskodComp, cityComp, stateComp,  phoneNumComp, } = FormikProps.values

                    const alamatCompError = FormikProps.errors.alamatComp
                    const alamatCompTouched = FormikProps.touched.alamatComp

                    const poskodCompError = FormikProps.errors.poskodComp
                    const poskodCompTouched = FormikProps.touched.poskodComp



                    const phoneNumCompError = FormikProps.errors.phoneNumComp
                    const phoneNumCompTouched = FormikProps.touched.phoneNumComp

           

                    const getCoordinate = (poskod) => {

                        if (poskod) {
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

                        }else{ FormikProps.setFieldValue('poskodComp', null)}

                    }

                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            
                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={!ios ? true : false} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
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
                           



                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}

                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}
                                touched={alamatCompTouched}
                                error={alamatCompError}
                                placeholder={'Alamat Tempat Bekerja'}


                            >
                                {alamatComp ? <View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                    <Text style={[styles.textDefault, { color: '#000' }]}>{alamatComp}</Text>
                                    {alamat_2Comp && <Text style={[styles.textDefault, { color: '#000' }]}>{alamat_2Comp}</Text>}
                                    {poskodComp && <Text style={[styles.textDefault, { color: '#000' }]}>{poskodComp}</Text>}
                                    {cityComp && <Text style={[styles.textDefault, { color: '#000' }]}>{cityComp},{stateComp}</Text>}
                                </View> : <View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                        <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>

                                    </View>}
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
                                label={`Save`}
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



export default LoanPendapatanBScreen