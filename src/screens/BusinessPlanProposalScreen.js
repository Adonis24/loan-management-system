import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
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
        { desc: 'Ruang Niaga / Premis / Tapak Projek(RM)', amount: 0, button: 'add' },
        { desc: 'Perkakas, Mesin Dan Peralatan(RM)', amount: 0, button: 'add' },
        { desc: 'Pembelian Stok / Bahan Mentah(RM)', amount: 0, button: 'add' },
        { desc: 'Membeli / Mengambil Alih Perniagaan(RM)', amount: 0, button: 'add' },
        { desc: 'Pembelian Kenderaan(RM)', amount: 0, button: 'add' },
        { desc: 'Modal Pusingan(RM)', amount: 0, button: 'add' },
        { desc: 'Perbelanjaan Lain(RM)', amount: 0, button: 'add' },
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
                <LayoutLoan title={'Add Amount'} nopaddingTop={true} back={() => setAddAmountView(!addAmountView)} navigation={props.navigation}>

                    <Formik
                        validateOnMount
                        initialValues={{ amount: selectedItem.amount || 0 }}

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
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                                    <Text style={[styles.formTitle]}>Section D</Text>
                                    <Text style={[styles.formSubtitle]}>Cadangan Keperluan Penggunaan Pembiayaan</Text>
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
            <View style={{ alignSelf: 'stretch' }}><FlatList contentContainerStyle={{}} data={cadanganPenggunaan}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => addAmount(index)} style={{ padding: 5, flexDirection: 'row', marginBottom: 5 }}>
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
            </View>

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