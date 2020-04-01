import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Picker, Platform, Modal } from 'react-native';
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
const LoanCustomDrawer = (props) => {

    const dispatch=useDispatch()
    const nav = (screen) => {
        props.close()
        props.nav(screen)
    }
    console.log(`active ${JSON.stringify(props.state.routes[props.state.index].name)}`)
    const activeScreen = props.state.routes[props.state.index].name
    return (
        <LinearGradient colors={['#fff', '#fff']} style={{ position: 'absolute', top: Constants.statusBarHeight, bottom: 0, right: 0, left: 0 }}>
            <View style={{ padding: 10, flex: 1, justifyContent: 'flex-start' }}>
                <Text style={[styles.textDefault, { marginBottom: 20 }]}>Borang Permohonan Pembiayaan</Text>
                <NavButton
                    name={'Section A'}
                    link={'LoanSectionA'}
                    activeScreen={activeScreen}
                    description={'Maklumat Asas'}
                    nav={nav} />
                <NavButton
                    name={'Section B'}
                    link={'LoanSectionB'}
                    activeScreen={activeScreen}
                    description={'Maklumat Peribadi'}
                    nav={nav} />

                <NavButton
                    name={'Section C'}
                    link={'LoanSectionC'}
                    activeScreen={activeScreen}
                    description={'Maklumat Pasangan'}
                    nav={nav} />

                <NavButton
                    name={'Section D'}
                    link={'LoanSectionD'}
                    activeScreen={activeScreen}
                    description={'Maklumat Perniagaan'}
                    nav={nav} />

                <NavButton
                    name={'Section E'}
                    link={'LoanBusinessInfoCont'}
                    activeScreen={activeScreen}
                    description={'Maklumat Perniagaan'}
                    nav={nav} />

                <NavButton
                    name={'Section F'}
                    link={'LoanSectionF'}
                    activeScreen={activeScreen}
                    description={'Maklumat Pembiayaan Perniagaan'}
                    nav={nav} />

                <NavButton
                    name={'Section G'}
                    link={'LoanDetail'}
                    activeScreen={activeScreen}
                    description={'Maklumat Pembiayaan'}
                    nav={nav} />

                <NavButton
                    name={'Section H'}
                    link={'LoanSectionH'}
                    activeScreen={activeScreen}
                    description={'Perujuk'}
                    nav={nav} />

                <NavButton
                    name={'Section I'}
                    link={'LoanValidation'}
                    activeScreen={activeScreen}
                    description={'Pengesahan & Perakuan Perniagaan'}
                    nav={nav} />

                <NavButton
                    name={'Section J'}
                    link={'LoanDeclaration'}
                    activeScreen={activeScreen}
                    description={'Akuan Pemohon'}
                    nav={nav} />

                <TouchableOpacity onPress={() => dispatch(actionCreator.resetForm())} style={{ borderColor: 'red', borderWidth:1, alignSelf: 'flex-start', padding: 10, borderRadius: 10 }}><Text style={[styles.textSmall, { color: 'red' }]}>Reset Form</Text></TouchableOpacity>

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


export default LoanCustomDrawer