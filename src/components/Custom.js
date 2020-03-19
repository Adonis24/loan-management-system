import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'
import { boolean } from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Layout from '../constants/Layout'

export const CustomTextInput = (props) => {
    const { value, editable, handleChange, handleBlur, touched, error, label, keyboardType, placeholder, handleClick, message, secureText, } = props
    return (
        !handleClick ?
            <View >
                <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: touched && error ? '#d94498' : '#5a83c2' }}>
                    <Image source={props.imageUri} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                    <TextInput editable={editable} secureTextEntry={secureText} keyboardType={keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ marginLeft: 5, flex: 1 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />

                </View>
                <View style={{ width: Layout.window.width * 0.65 }}>
                    {touched && error && <Text style={styles.error}>{error}</Text>}
                </View>
            </View> : <View>
                <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', margin: 5, width: Layout.window.width * 0.65, borderColor: Touched && Error ? '#d94498' : '#5a83c2' }}>
                    <TouchableOpacity onPress={handleClick}>
                        <Image source={props.imageUri} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                        <TextInput editable={false} secureTextEntry={secureText} keyboardType={keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ marginLeft: 5, flex: 1 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: Layout.window.width * 0.65 }}>
                    {touched && error && <Text style={styles.error}>{error}</Text>}
                </View>
            </View>
    )
}

export const CustomFormAction = (props) => {
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { navigation, isValid, handleSubmit, boxStyle } = props
    return (

        <View style={{ flexDirection: 'row', margin: 5 }}>
        <TouchableOpacity disabled={!isValid || !isInternetReachable} onPress={handleSubmit} style={styles.box}>
            <LinearGradient colors={(isValid && isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                <Text style={[styles.textDefault, { color: '#fff' }]}>Next</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' },boxStyle]} >
            <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
        </TouchableOpacity>
    </View>
    )
}