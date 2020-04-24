import React, { useEffect, useState } from 'react';
import {

    Text,
    TouchableOpacity,
    View,

    ScrollView,
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
import moment from 'moment'
import * as actionCreator from '../store/actions/action'
const ios = Platform.OS === "ios" ? true : false

const validationSchema = Yup.object().shape({

})
const BusinessPlanGoalsScreen = (props) => {


    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { projectionPlan } = useSelector(state => state.businessPlanningReducer, shallowEqual)

    const setLatarBelakang = (value) => dispatch({ type: 'SET_LATAR_BELAKANG', payload: { ...value } })

    //const nextYear= moment().add(1, 'Y').format('Y')

    const initialProjection = [
        { tahun: moment().add(1, 'Y').format('Y'), pembelian: '0', income: '0', kosOperasi: '0', totalExpenditure: '0', untungKasar: '0', perbelanjaanLain: '0', untungBersih: '0', totalIncome: '0' },
        { tahun: moment().add(2, 'Y').format('Y'), pembelian: '0', income: '0', kosOperasi: '0', totalExpenditure: '0', untungKasar: '0', perbelanjaanLain: '0', untungBersih: '0', totalIncome: '0' },
        { tahun: moment().add(3, 'Y').format('Y'), pembelian: '0', income: '0', kosOperasi: '0', totalExpenditure: '0', untungKasar: '0', perbelanjaanLain: '0', untungBersih: '0', totalIncome: '0' }]

    const editProjection = (val) => {
        setProjectionView(!projectionView)
        setSelectedItem(projection[val])
        setSelectedIndex(val)
    }

    const nextSection = () => {
        setLatarBelakang({ projectionPlan: projection })
        dispatch(actionCreator.saveBussPlanData())
        props.navigation.navigate('BusinessPlanMarketing')
    }

    const [projectionView, setProjectionView] = useState(false)
    const [projection, setProjection] = useState(projectionPlan || initialProjection)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [selectedItem, setSelectedItem] = useState(null)
    return (
        <LayoutLoan navigation={props.navigation}>
            <Modal visible={projectionView} onRequestClose={() => setProjectionView(!projectionView)}>
                <LayoutLoan title={'Add Amount'} nopaddingTop={!ios ? true : false} back={() => setProjectionView(!projectionView)} navigation={props.navigation}>

                    <Formik
                        validateOnMount
                        initialValues={{
                            ...selectedItem
                        }}

                        onSubmit={async (values, actions) => {
                            console.log(`values formik ialah ${JSON.stringify(values)}`)
                            const newValue = { ...selectedItem, ...values }
                            const newProjection = projection
                            newProjection[selectedIndex] = newValue

                            setProjection([...newProjection])

                            actions.resetForm({})

                            actions.setSubmitting(false)
                            setProjectionView(!projectionView)
                        }}
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {

                            const { income, pembelian, kosOperasi, totalExpenditure, untungKasar, perbelanjaanLain, untungBersih, totalIncome } = FormikProps.values

                            const incomeError = FormikProps.errors.income
                            const incomeTouched = FormikProps.touched.income

                            const pembelianError = FormikProps.errors.pembelian
                            const pembelianTouched = FormikProps.touched.pembelian

                            const perbelanjaanLainError = FormikProps.errors.perbelanjaanLain
                            const perbelanjaanLainTouched = FormikProps.touched.perbelanjaanLain

                            const kosOperasiError = FormikProps.errors.kosOperasi
                            const kosOperasiTouched = FormikProps.touched.kosOperasi


                            const autoCalculateIncome = (val) => {

                                const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values
                                const untungKasar1 = parseFloat(val) - (parseFloat(pembelian) + parseFloat(kosOperasi))
                                const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)

                                FormikProps.setFieldValue('income', val)
                                FormikProps.setFieldValue('totalIncome', val)
                                FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                                FormikProps.setFieldValue('untungBersih', untungBersih1.toString())

                            }

                            const autoCalculatePembelian = (val) => {
                                const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values
                                const untungKasar1 = parseFloat(income) - (parseFloat(val) + parseFloat(kosOperasi))
                                const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)
                                const totalExpenditure1 = parseFloat(val) + parseFloat(kosOperasi)

                                FormikProps.setFieldValue('pembelian', parseFloat(val))
                                FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                                FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                                FormikProps.setFieldValue('totalExpenditure', totalExpenditure1.toString())
                            }

                            const autoCalculateKosOperasi = (val) => {
                                const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values

                                const untungKasar1 = parseFloat(income) - (parseFloat(pembelian) + parseFloat(val))
                                const untungBersih1 = untungKasar1 - parseFloat(perbelanjaanLain)

                                const totalExpenditure1 = parseFloat(pembelian) + parseFloat(val)

                                FormikProps.setFieldValue('kosOperasi', val)
                                FormikProps.setFieldValue('untungKasar', untungKasar1.toString())
                                FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                                FormikProps.setFieldValue('totalExpenditure', totalExpenditure1.toString())

                            }

                            const autoCalculatePerbelanjaanLain = (val) => {

                                const { income, pembelian, kosOperasi, perbelanjaanLain, } = FormikProps.values

                                const untungKasar1 = parseFloat(income) - (parseFloat(pembelian) + parseFloat(kosOperasi))
                                const untungBersih1 = untungKasar1 - parseFloat(val)

                                FormikProps.setFieldValue('perbelanjaanLain', val)
                                FormikProps.setFieldValue('untungBersih', untungBersih1.toString())
                            }

                            return (
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                                    <Text style={[styles.formTitle]}>Sasaran Pencapaian {selectedItem.tahun}</Text>
                                    <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>

                                        <CustomTextInput
                                            imageUri={require('../assets/images/payment.png')}
                                            value={income}
                                            handleChange={(val) => autoCalculateIncome(val)}
                                            handleBlur={FormikProps.handleBlur(`income`)}
                                            touched={incomeTouched}
                                            error={incomeError}
                                            placeholder={'Pendapatan Jualan/Bayaran Perkidmatan'}
                                            keyboardType={'phone-pad'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/payment.png')}
                                            value={income}
                                            placeholder={'Jumlah Pendapatan'}
                                            editable={false}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/bizAct.png')}
                                            value={pembelian}
                                            handleChange={(val) => autoCalculatePembelian(val)}
                                            handleBlur={FormikProps.handleBlur(`pembelian`)}
                                            touched={pembelianTouched}
                                            error={pembelianError}
                                            placeholder={'Pembelian'}
                                            keyboardType={'phone-pad'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/compRegNum.png')}
                                            value={kosOperasi}
                                            handleChange={(val) => autoCalculateKosOperasi(val)}
                                            handleBlur={FormikProps.handleBlur(`kosOperasi`)}
                                            touched={kosOperasiTouched}
                                            error={kosOperasiError}
                                            placeholder={'Kos Operasi'}
                                            keyboardType={'phone-pad'}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/payment.png')}
                                            value={totalExpenditure}
                                            placeholder={'Jumlah Pebelanjaan'}
                                            editable={false}
                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/user.png')}
                                            value={untungKasar}
                                            placeholder={'Untung Kasar'}
                                            editable={false}

                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/user.png')}
                                            value={perbelanjaanLain}
                                            handleChange={(val) => autoCalculatePerbelanjaanLain(val)}
                                            handleBlur={FormikProps.handleBlur(`perbelanjaanLain`)}
                                            touched={perbelanjaanLainTouched}
                                            error={perbelanjaanLainError}
                                            placeholder={'Perbelanjaan Lain'}
                                            keyboardType={'phone-pad'}


                                        />
                                        <CustomTextInput
                                            imageUri={require('../assets/images/user.png')}
                                            value={untungBersih}
                                            placeholder={'Untung Bersih'}
                                            editable={false}

                                        />
                                    </ScrollView>
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
            <Text style={[styles.formTitle]}>Section E</Text>
            <Text style={[styles.formSubtitle]}>Sasaran Pencapaian Perniagaan Tahunan</Text>

            <View style={{ margin: 10 }} />
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ flex: 2 }}>
                    {/* {projection.map((p, index) => <Text key={index.toString()}>Test</Text>)} */}
                    <View style={{ padding: 5, marginBottom: 5 }}>
                        <View style={{ margin: 10 }} />
                        <Text style={styles.label}>Pendapatan</Text>
                        <Text style={styles.label}>Perbelanjaan</Text>
                        <Text style={styles.label}>Untung Kasar</Text>
                        <Text style={styles.label}>Perbelanjaan Lain</Text>
                        <Text style={styles.label}>Untung Bersih</Text>
                    </View>
                    {/* income, pembelian, kosOperasi, totalExpenditure, untungKasar, perbelanjaanLain, untungBersih, totalIncome */}
                </View>
                <View style={{ flex: 3 }}>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{}}
                        data={projection}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => editProjection(index)} style={[styles.shadowNew, { padding: 5, marginBottom: 5, marginRight: 10, alignItems: 'flex-end' }]}>
                                <Text style={[styles.textDefault, { alignSelf: 'center' }]}>{item.tahun}</Text>
                                <Text style={[styles.answer,]}>{item.totalIncome}</Text>
                                <Text style={styles.answer}>{item.totalExpenditure}</Text>
                                <Text style={styles.answer}>{item.untungKasar}</Text>
                                <Text style={styles.answer}>{item.perbelanjaanLain}</Text>
                                <Text style={styles.answer}>{item.untungBersih}</Text>
                            </TouchableOpacity>} />
                </View>
            </View>
            <View style={{ margin: 10 }} />
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


export default BusinessPlanGoalsScreen