import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Modal,Platform

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';

import * as actionCreator from '../store/actions/action'
import malaysiaData from 'malaysia-state-city-postcode'

const validationSchema = Yup.object().shape({


    ref2Name: Yup
        .string()
        .required()
        .min(3)
        .label('Nama'),

    ref2PhoneNum: Yup
        .string()
        .required()
        .min(3)
        .label('No Tel'),

    ref2Relationship: Yup
        .string()
        .required()
        .min(3)
        .label('Hubungan'),

    ref2Alamat: Yup
        .string()
        .required()
        .min(3)
        .label('Alamat'),
    ref2Poskod: Yup
        .string()
        .required()
        .min(5)
        .max(5)
        .label('Postcode'),


});

const LoanReferrer2Screen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { ref2Alamat, ref2Alamat_2, ref2Name, ref2PhoneNum, ref2Relationship, ref2City, ref2State, ref2Poskod } = useSelector(state => state.financingReducer, shallowEqual)
    const [addressVisible, setAddressVisible] = useState(false)
    const ios = Platform.OS === "ios" ? true : false
    const setReferrer = (value) => dispatch({ type: 'SET_MAKLUMAT_ASAS', payload: { ...value } })

    return (
        <LayoutLoan navigation={props.navigation}>
            <Formik
                validateOnMount
                initialValues={{ ref2Alamat, ref2Alamat_2, ref2Name, ref2PhoneNum, ref2Relationship, ref2City, ref2State, ref2Poskod }}
                onSubmit={(values, actions) => {
                    console.log(`values formik ialah ${JSON.stringify(values)}`)
                    setReferrer(values)
                    dispatch(actionCreator.saveLoanData())
                    actions.resetForm({})

                    actions.setSubmitting(false)
                    props.navigation.goBack()
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {




                    const { ref2Alamat, ref2Alamat_2, ref2Name, ref2PhoneNum, ref2Relationship, ref2City, ref2State, ref2Poskod } = FormikProps.values

                    const ref2PoskodError = FormikProps.errors.ref2Poskod
                    const ref2PoskodTouched = FormikProps.touched.ref2Poskod

                    const ref2AlamatError = FormikProps.errors.ref2Alamat
                    const ref2AlamatTouched = FormikProps.touched.ref2Alamat

                    const ref2Alamat_2Error = FormikProps.errors.ref2Alamat_2
                    const ref2Alamat_2Touched = FormikProps.touched.ref2Alamat_2

                    const ref2NameError = FormikProps.errors.ref2Name
                    const ref2NameTouched = FormikProps.touched.ref2Name

                    const ref2PhoneNumError = FormikProps.errors.ref2PhoneNum
                    const ref2PhoneNumTouched = FormikProps.touched.ref2PhoneNum

                    const ref2RelationshipError = FormikProps.errors.ref2Relationship
                    const ref2RelationshipTouched = FormikProps.touched.ref2Relationship


                    const getCoordinate = (poskod) => {
                        FormikProps.setFieldValue('ref2Poskod', poskod)
                        if (poskod) {
                            if (poskod.length === 5) {
                                const coordinate = malaysiaData.find(x => x.Postcode == poskod)

                                if (coordinate) {
                                    console.log(`result coor : ${JSON.stringify(coordinate)}`)
                                    FormikProps.setFieldValue('ref2Poskod', poskod)
                                    FormikProps.setFieldValue(`ref2City`, coordinate.City)
                                    FormikProps.setFieldValue(`ref2State`, coordinate.State)
                                } else {
                                    console.log(`no result found`)
                                    FormikProps.setFieldValue('ref2Poskod', poskod)
                                }

                            } else {
                                console.log(`do nothing`)
                                FormikProps.setFieldValue('ref2Poskod', poskod)
                            }


                        }
                       

                    }

                    return (

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                            <Modal animationType={'slide'}
                                visible={addressVisible} onRequestClose={() => setAddressVisible(!addressVisible)}
                            >
                                <LayoutLoan title={'Address'} nopaddingTop={!ios?true:false} back={() => setAddressVisible(!addressVisible)} navigation={props.navigation}>
                                    <View style={{ margin: 10 }} />
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={ref2Alamat}
                                            handleChange={FormikProps.handleChange(`ref2Alamat`)}
                                            handleBlur={FormikProps.handleBlur(`ref2Alamat`)}
                                            touched={ref2AlamatTouched}
                                            error={ref2AlamatError}
                                            placeholder={'Alamat Line 1'}

                                        />

                                        <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={ref2Alamat_2}
                                            handleChange={FormikProps.handleChange(`ref2Alamat_2`)}
                                            handleBlur={FormikProps.handleBlur(`ref2Alamat_2`)}

                                            placeholder={'Alamat Line 2'}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={ref2Poskod}
                                            handleChange={value => getCoordinate(value)}
                                            handleBlur={FormikProps.handleBlur(`ref2Poskod`)}
                                            touched={ref2PoskodTouched}
                                            error={ref2PoskodError}
                                            placeholder={'Poskod'}
                                            keyboardType={'decimal-pad'}
                                        />

                                        {ref2City && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={ref2City}

                                            placeholder={'City'}

                                        />}

                                        {ref2State && <CustomTextInput
                                            imageUri={require('../assets/images/address.png')}
                                            value={ref2State}

                                            placeholder={'State'}

                                        />}
                                    </View>

                                </LayoutLoan>
                            </Modal>

                            <Text style={[styles.formTitle]}>Section H</Text>
                            <Text style={[styles.formSubtitle]}>Maklumat Perujuk (b)</Text>



                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={ref2Name}
                                handleChange={FormikProps.handleChange(`ref2Name`)}
                                handleBlur={FormikProps.handleBlur(`ref2Name`)}
                                touched={ref2NameTouched}
                                error={ref2NameError}
                                placeholder={'Nama'}
                                keyboardType={'default'}
                            />


                            <CustomTextInput
                                imageUri={require('../assets/images/user.png')}
                                value={ref2Relationship}
                                handleChange={FormikProps.handleChange(`ref2Relationship`)}
                                handleBlur={FormikProps.handleBlur(`ref2Relationship`)}
                                touched={ref2RelationshipTouched}
                                error={ref2RelationshipError}
                                placeholder={'Hubungan'}
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/phoneNum.png')}
                                value={ref2PhoneNum}
                                handleChange={FormikProps.handleChange(`ref2PhoneNum`)}
                                handleBlur={FormikProps.handleBlur(`ref2PhoneNum`)}
                                touched={ref2PhoneNumTouched}
                                error={ref2PhoneNumError}
                                placeholder={'No Telefon'}
                                keyboardType={'decimal-pad'}
                            />
                            <CustomTextInput
                                imageUri={require('../assets/images/address.png')}
                                handleClick={() => setAddressVisible(!addressVisible)}
                                multiLine={true}
                                touched={ref2AlamatTouched}
                                error={ref2AlamatError}
                                placeholder={'Alamat'}
                            >
                                {ref2Alamat?<View style={{ paddingLeft: 5, paddingTop: 5 }}>
                                    <Text style={[styles.textDefault, { color: '#000' }]}>{ref2Alamat}</Text>
                                    {ref2Alamat_2 && <Text style={[styles.textDefault, { color: '#000' }]}>{ref2Alamat_2}</Text>}
                                    {ref2Poskod && <Text style={[styles.textDefault, { color: '#000' }]}>{ref2Poskod}</Text>}
                                    {ref2City && <Text style={[styles.textDefault, { color: '#000' }]}>{ref2City},{ref2State}</Text>}
                                </View>:<View style={{ paddingLeft: 5, paddingTop: 15 }}>
                                    <Text style={[styles.textDefault, { color: 'lightgrey' }]}>Alamat</Text>
                                 
                                </View>} 
                            </CustomTextInput>

                            <CustomFormAction
                                label={'Save'}
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

export default LoanReferrer2Screen