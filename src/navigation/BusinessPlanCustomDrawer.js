import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker, Platform, Modal } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
const BusinessPlanCustomDrawer = (props) => {

    const dispatch = useDispatch()
    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }
    console.log(`active ${JSON.stringify(props.state.routes[props.state.index].name)}`)
    const activeScreen = props.state.routes[props.state.index].name
    return (
        <LinearGradient colors={['#fff', '#fff']} style={{ position: 'absolute', top: Constants.statusBarHeight, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'flex-start' }}>
                <Text style={[styles.textDefault, { marginBottom: 20 }]}>Rancangan Perniagaan</Text>
                <NavButton
                    name={'Section A'}
                    link={'BusinessPlanSectionA'}
                    activeScreen={activeScreen}
                    description={'Latar Belakang Pemohon'}
                    nav={nav} />

                <NavButton
                    name={'Section B'}
                    link={'BusinessPlanSectionB'}
                    activeScreen={activeScreen}
                    description={'Butir-Butir Perniagaan'}
                    nav={nav} />

                <NavButton
                    name={'Section C'}
                    link={'BusinessPlanBudgInc'}
                    activeScreen={activeScreen}
                    description={'Anggaran Pendapatan Dan Perbelanjaan'}
                    nav={nav} />

                <NavButton
                    name={'Section D'}
                    link={'BusinessPlanProposal'}
                    activeScreen={activeScreen}
                    description={'Cadangan Keperluan Penggunaan Pembiayaan'}
                    nav={nav} />

                <NavButton
                    name={'Section E'}
                    link={'BusinessPlanSectionE'}
                    activeScreen={activeScreen}
                    description={'Sasaran Pencapaian Perniagaan Tahunan     (3 tahun ke hadapan)'}
                    nav={nav} />

                <NavButton
                    name={'Section F'}
                    link={'BusinessPlanMarketing'}
                    activeScreen={activeScreen}
                    description={'Rancangan Pemasaran'}
                    nav={nav} />

                <NavButton
                    name={'Section G'}
                    link={'BusinessPlanAddDetail'}
                    activeScreen={activeScreen}
                    description={'Maklumat Tambahan'}
                    nav={nav} />

                {/* <NavButton
                    name={'Section H'}
                    link={'BusinessPlanCert'}
                    activeScreen={activeScreen}
                    description={'Akuan Pemohon'}
                    nav={nav} /> */}


                <View style={{ alignItems: 'stretch', flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanCheckList')} style={{ flex: 1, borderColor: 'grey', borderWidth: 1, alignSelf: 'flex-start', padding: 10, borderRadius: 10, margin: 10, alignItems: 'center' }}>
                        <Text style={[styles.textSmall, { color: 'grey' }]}>Checklist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(actionCreator.resetForm('bussPlanData'))} style={{ flex: 1, borderColor: 'red', borderWidth: 1, alignSelf: 'flex-start', padding: 10, borderRadius: 10, margin: 10, alignItems: 'center' }}>
                        <Text style={[styles.textSmall, { color: 'red' }]}>Reset </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </LinearGradient>
    );
}


const NavButton = (props) => {
    const { activeScreen, link, name, nav, description } = props
    const active = (activeScreen === link) ? true : false
    return (
        <TouchableOpacity onPress={() => nav(link)} style={{ flexDirection: 'row', marginBottom: 20, }}>
            <Ionicons name={'ios-arrow-dropright'} size={24} color={active ? '#000' : 'grey'} style={{ paddingRight: 10 }} />
            <View style={{ alignItems: 'flex-start', }} >
                <Text style={[styles.textDefault, { color: active ? '#000' : 'grey' }]}>{name}</Text>
                <Text style={[styles.textSmall, { color: active ? '#000' : 'grey' }]}>{description}</Text>
            </View>

        </TouchableOpacity>
    )
}


export default BusinessPlanCustomDrawer