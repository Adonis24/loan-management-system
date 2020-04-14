import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { CustomTextInput, CustomFormAction } from '../components/Custom'

import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles'

import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'
import malaysiaData from 'malaysia-state-city-postcode'
const validationSchema = Yup.object().shape({


    cpPhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    cpAlamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),

    cpPoskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),

});

const LoanConnectedPartiesAddrScreeen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { cpPhoneNum, cpAlamat, cpAlamat_2, cpCity, cpState, cpPoskod } = useSelector(state => state.financingReducer, shallowEqual)
    const [addressVisible, setAddressVisible] = useState(false)
    const setConnectParties = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ cpPhoneNum, cpAlamat_2, cpAlamat, cpPoskod, cpCity, cpState, }}

                onSubmit={async (values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setConnectParties(values)
                    dispatch(actionCreator.saveLoanData())
                    props.navigation.navigate('LoanSectionD')
                    actions.setSubmitting(false)
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { cpPhoneNum, cpAlamat, cpAlamat_2, cpPoskod, cpCity, cpState, } = FormikProps.values



                    const cpPhoneNumError = FormikProps.errors.cpPhoneNum
                    const cpPhoneNumTouched = FormikProps.touched.cpPhoneNum

                    const cpAlamatError = FormikProps.errors.cpAlamat
                    const cpAlamatTouched = FormikProps.touched.cpAlamat

                    const cpAlamat_2Error = FormikProps.errors.cpAlamat_2
                    const cpAlamat_2Touched = FormikProps.touched.cpAlamat_2

                    const cpPoskodError = FormikProps.errors.cpPoskod
                    const cpPoskodTouched = FormikProps.touched.cpPoskod

                    const getCoordinate = (poskod) => {
                        
                        if(poskod){
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)
    
                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('cpPoskod', poskod)
                                    FormikProps.setFieldValue(`cpCity`, coordinate.City)
                                    FormikProps.setFieldValue(`cpState`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('cpPoskod', poskod)
                                }
    
                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('cpPoskod', poskod)
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
                                            value={cpAlamat}
                                            handleChange={FormikProps.handleChange(`cpAlamat`)}
                                            handleBlur={FormikProps.handleBlur(`cpAlamat`)}
                                            touched={cpAlamatTouched}
                                            error={cpAlamatError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={cpAlamat_2}
                                            handleChange={FormikProps.handleChange(`cpAlamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`cpAlamat_2`)}

                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={cpPoskod}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`cpPoskod`)}
                                            touched={cpPoskodTouched}
                                            error={cpPoskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {cpCity && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={cpCity}

                                            placeholder={'City'}

                                        />}

                                        {cpState && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={cpState}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>
                            <Text style={[styles.formTitle]}>Section C</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Pasangan</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={cpPhoneNum}
                                handleChange={FormikProps.handleChange(`cpPhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`cpPhoneNum`)}
                                touched={cpPhoneNumTouched}
                                error={cpPhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'phone-pad'}
                            />

                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}

                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}

                                touched={cpAlamatTouched}
                                error={cpAlamatError}
                                placeholder={'Alamat'}


                            >
                                {cpAlamat?<View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                    <Text style={[styles.textDefault, { color: '#000' }]}>{cpAlamat}</Text>
                                    {cpAlamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{cpAlamat_2}</Text>}
                                    {cpPoskod && <Text style={[styles.textDefault, { color: '#000' }]}>{cpPoskod}</Text>}
                                    {cpCity && <Text style={[styles.textDefault, { color: '#000' }]}>{cpCity},{cpState}</Text>}
                                </View>:<View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                    <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>
                                 
                                </View>} 
                            </CustomTextInput>




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




export default LoanConnectedPartiesAddrScreeen