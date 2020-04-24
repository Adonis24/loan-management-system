//console.ignoredYellowBox = ['Setting a timer']
import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,

} from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

import moment from 'moment'
import LayoutLoan from '../Layout/LayoutLoan';
import { CustomFormAction } from '../components/Custom';


const SignupOtpEnterScreen = (props) => {

    const dispatch = useDispatch()
    const { isConnected, isInternetReachable, type } = useSelector(state => state.netInfoReducer, shallowEqual)
    const { c1, c2, c3, c4, phoneVerified, proceedOTP, status } = useSelector(state => state.registrationReducer, shallowEqual)

    const verifyOTP = (value) => dispatch({ type: 'VERIFY_OTP', payload: { ...value } })
    const reset = () => dispatch({ type: 'RESET_OTP', })



    const [button, setButton] = useState(true)

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const secondsPassed = useRef(90);




    const verifyPhone = async () => {
        await dispatch(actionCreator.verifyPhone())
        //await phoneVerified == true ? props.navigation.navigate('MyAccount') : null
        if (phoneVerified == true) {
            await dispatch(actionCreator.initiateMyAccount())
            await dispatch(actionCreator.initiateCompanyInfo())
            await props.navigation.navigate('MyAccount')
        }
    }

    const verifyOTPSubmit = async (c) => {

        await verifyOTP(c)
        verifyPhone()

        console.log(c1, c2, c3, c4)

    }



    useEffect(() => {
        const timeout = setTimeout(() => {
            const date = new Date()
            secondsPassed.current = secondsPassed.current - 1;
            setTime(date.toLocaleTimeString());
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [time]);


    const getBoxes = () => {
        //var d1Focus,d2Focus,d3Focus,d4Focus=false

        if (c1 && c2 && c3) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c3} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} onChange={() => setButton(!button)} autoFocus={true} maxLength={1} value={c4} onChangeText={c4 => verifyOTPSubmit({ c4 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
            </View>)

        } else if (c1 && c2) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c2} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c3} onChangeText={c3 => verifyOTP({ c3 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
            </View>)

        } else if (c1) {
            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} value={c1} style={[styles.textInput, { textAlign: 'center', alignSelf: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c2} onChangeText={c2 => verifyOTP({ c2 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>

            </View>)

        } else

            return (<View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.pinBox]}>
                    <TextInput keyboardType={'number-pad'} autoFocus={true} maxLength={1} value={c1} onChangeText={c1 => verifyOTP({ c1 })} placeholder={''} style={[styles.textInput, { textAlign: 'center' }]} />
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={[styles.pinBox]}>
                    <Text style={[styles.textInput, { textAlign: 'center' }]}></Text>
                </View>
                <View style={{ position: 'absolute' }}><Text></Text></View>
            </View>)

    }


    return (
        <LayoutLoan title={'Enter OTP'} back={() => props.navigation.goBack()}>

            <Text style={[styles.textDefault, { margin: 5, color: 'darkblue', fontWeight: 'bold' }]}>Enter OTP code</Text>
            <Text style={[styles.textDefault, { margin: 5 }]}>We have sent an OTP code to your number</Text>
            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5 }}>
                {getBoxes()}
            </View>
            {c1 && <TouchableOpacity onPress={() => reset()} style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                <Text style={[styles.caption, { margin: 5 }]}>Reset</Text>
            </TouchableOpacity>}
            <View style={{ alignSelf: 'center', flexDirection: 'row', margin: 5, marginBottom: 20 }}>
                <Text style={[styles.textDefault, { margin: 5 }]}>Resend OTP code : </Text>
                {secondsPassed.current > 0 ?
                    <Text style={[styles.textDefault, { margin: 5, color: 'orange' }]}>{secondsPassed.current} s</Text> :
                    <TouchableOpacity onPress={() => dispatch(actionCreator.registerOTP())} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'orange', borderRadius: 5, padding: 5 }}><Text style={[styles.caption, { color: 'orange' }]}>Resend</Text></TouchableOpacity>}
            </View>


            <CustomFormAction
                label={'Verify'}
                navigation={props.navigation}
                isValid={!button && isInternetReachable}
                handleSubmit={() => verifyPhone()}
            />
        </LayoutLoan>
    );
}

export default SignupOtpEnterScreen