import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Modal, Platform

} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { CustomTextInput, CustomFormAction } from '../components/Custom'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import LayoutLoan from '../Layout/LayoutLoan';
import * as actionCreator from '../store/actions/action'

const ios = Platform.OS === "ios" ? true : false

const validationSchema = Yup.object().shape({

    amount: Yup
        .number()
        .required()
        .min(0)
        .label('Amount'),


});


const BusinessPlanProposalScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { cadanganPenggunaanPlan } = useSelector(state => state.businessPlanningReducer)


    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    const nextSection = () => {
        setLatarBelakang({ cadanganPenggunaanPlan: cadanganPenggunaan })
        dispatch(actionCreator.saveBussPlanData())
        props.navigation.navigate('BusinessPlanSectionE')
    }

    const initialCadanganPenggunaan = [
        { desc: 'Ruang Niaga / Premis / Tapak Projek', amount: 0, button: 'add' },
        { desc: 'Perkakas, Mesin Dan Peralatan', amount: 0, button: 'add' },
        { desc: 'Pembelian Stok / Bahan Mentah', amount: 0, button: 'add' },
        { desc: 'Membeli / Mengambil Alih Perniagaan', amount: 0, button: 'add' },
        { desc: 'Pembelian Kenderaan', amount: 0, button: 'add' },
        { desc: 'Modal Pusingan', amount: 0, button: 'add' },
        { desc: 'Perbelanjaan Lain', amount: 0, button: 'add' },
        { desc: 'Total', amount: 0, button: 'total' }
    ]
    const [addAmountView, setAddAmountView] = useState(false)
    const [cadanganPenggunaan, setCadanganPenggunaan] = useState(cadanganPenggunaanPlan || initialCadanganPenggunaan)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [selectedItem, setSelectedItem] = useState(null)
    const addAmount = (val) => {
        if (cadanganPenggunaan[val].button !== 'total') {
            console.log(cadanganPenggunaan[val].button)
            setAddAmountView(!addAmountView)
            setSelectedItem(cadanganPenggunaan[val])
            setSelectedIndex(val)
        }

    }



    return (
        <LayoutLoan navigation={props.navigation}>
            <Modal visible={addAmountView} onRequestClose={() => setAddAmountView(!addAmountView)}>
                <LayoutLoan title={'Add Amount'} nopaddingTop={!ios ? true : false} back={() => setAddAmountView(!addAmountView)} navigation={props.navigation}>

                    <Formik
                        validateOnMount
                        initialValues={{ amount: selectedItem ? selectedItem.amount : 0 }}

                        onSubmit={async (values, actions) => {
                            console.log(`values formik ialah ${JSON.stringify(values)}`)
                            const newValue = { ...selectedItem, ...values }
                            const newCadanganPenggunaan = cadanganPenggunaan
                            newCadanganPenggunaan[selectedIndex] = newValue

                            const test = newCadanganPenggunaan.slice(0, -1).reduce((total, it) => total + parseFloat(it.amount), 0)
                            console.log(test)
                            newCadanganPenggunaan[newCadanganPenggunaan.length - 1].amount = test
                            setCadanganPenggunaan([...newCadanganPenggunaan])

                            actions.resetForm({})

                            actions.setSubmitting(false)
                            setAddAmountView(!addAmountView)
                        }
                        }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {
                            const { amount } = FormikProps.values

                            const amountError = FormikProps.errors.amount
                            const amountTouched = FormikProps.touched.amount


                            return (
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                                    <Text style={[styles.formTitle]}>Section D</Text>
                                    {/* <Text style={[styles.formSubtitle]}>Cadangan Keperluan Penggunaan Pembiayaan</Text> */}
                                    <CustomTextInput
                                        imageUri={require('../assets/images/company.png')}
                                        value={amount}
                                        handleChange={FormikProps.handleChange(`amount`)}
                                        handleBlur={FormikProps.handleBlur(`amount`)}
                                        touched={amountTouched}
                                        error={amountError}
                                        placeholder={selectedItem.desc}
                                        keyboardType={'phone-pad'}
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
                </LayoutLoan>
            </Modal>

            <Text style={[styles.formTitle]}>Section D</Text>
            <Text style={[styles.formSubtitle]}>Cadangan Keperluan Penggunaan Pembiayaan</Text>

            <FlatList style={{ alignSelf: 'stretch' }} contentContainerStyle={{ paddingTop: 10 }} data={cadanganPenggunaan}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => addAmount(index)} style={[styles.shadowNew, { padding: 5, paddingBottom: 10, flexDirection: 'row', marginBottom: 10, marginRight: 10, marginLeft: 10 }]}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.textDefault}>{index + 1}</Text>
                        </View>
                        <View style={{ flex: 6, alignItems: 'flex-start' }}>
                            <Text style={styles.textDefault}>{item.desc}</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-start' }}>
                            <Text style={[styles.textDefault, { color: 'darkblue' }]}>RM {item.amount}</Text>
                        </View>
                    </TouchableOpacity>} />


            <CustomFormAction
                label={`Save`}
                navigation={props.navigation}
                isValid={true}
                handleSubmit={() => nextSection()}
            />



            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name={'md-menu'} size={24} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </LayoutLoan>
    );
}




export default BusinessPlanProposalScreen