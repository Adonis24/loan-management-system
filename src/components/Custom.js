import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

const ios = Platform.OS === "ios" ? true : false

export const CustomTextInput = (props) => {
    const { multiLine, value, editable, handleChange, handleBlur, touched, error, label, keyboardType, placeholder, handleClick, message, secureText, } = props
    if (!handleClick) {
        return (
            <View style={{ marginBottom: 10 }} >
                <View style={{}}>
                    <Text style={styles.label}>{placeholder} :</Text>
                </View>
                <View style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 5, borderColor: touched && error ? '#d94498' : '#5a83c2' }}>
                    <Image source={props.imageUri} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                    <TextInput editable={editable} secureTextEntry={secureText} keyboardType={keyboardType === 'phone-pad' ? ios ? 'numbers-and-punctuation' : keyboardType : keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ marginLeft: 5, flex: 1 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                </View>
                <View style={{}}>
                    {touched && error && <Text style={styles.error}>{error}</Text>}
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ marginBottom: 10 }} >
                <View style={{}}>
                    <Text style={styles.label}>{placeholder} :</Text>
                </View>
                <TouchableOpacity onPress={() => handleClick()} style={{ alignSelf: 'center', borderBottomWidth: 1, flexDirection: 'row', marginBottom: 5, borderColor: touched && error ? '#d94498' : '#5a83c2' }}>

                    <Image source={props.imageUri} style={{ height: 30, width: 30, margin: 5 }} resizeMode={'contain'} />
                    {!multiLine ? <TextInput editable={false} secureTextEntry={secureText} keyboardType={keyboardType} value={value} onChangeText={handleChange} onBlur={handleBlur} style={{ marginLeft: 5, flex: 1 }} placeholder={touched && error ? '' : placeholder} placeholderTextColor={touched && error ? 'rgba(255,0,0,0.3)' : 'lightgrey'} />
                        : <View style={{ flex: 1 }}>
                            {props.children}
                        </View>
                    }
                </TouchableOpacity>
                <View style={{}}>
                    {touched && error && <Text style={styles.error}>{error}</Text>}
                </View>
            </View>
        )
    }

}

export const CustomFormAction = (props) => {
    const { isConnected, isInternetReachable, type, } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { navigation, isValid, handleSubmit, boxStyle, label } = props
    return (

        <View style={{ flexDirection: 'row', margin: 5 }}>
            <TouchableOpacity disabled={!isValid || !isInternetReachable} onPress={handleSubmit} style={styles.box}>
                <LinearGradient colors={(isValid && isInternetReachable) ? ['#4DCB3E', '#269B1D',] : ['rgba(77,203,62,0.5)', 'rgba(38,155,29,0.5)',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textDefault, { color: '#fff' }]}>{label ? label : `Next`}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.box, { backgroundColor: '#5A647F' }, boxStyle]} >
                <Text style={[styles.textDefault, { color: '#fff' }]}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}