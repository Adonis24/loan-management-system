//console.ignoredYellowBox = ['Setting a timer']
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
  

} from 'react-native';

import Constants from 'expo-constants'
import LayoutB from '../Layout/LayoutB';
import Layout from '../constants/Layout'

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'


const LoanCalculatorScreen = (props) => {

    const nav = (screen) => {
        props.navigation.navigate(screen)
    }

    return (
        < LayoutB
        title={'Loan Calculator'}
        screenType='form'
        navigation={props.navigation}
        imageUri={require('../assets/images/loan.png')}
    >
        
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textDefault, { textAlign: 'left', margin: 10, alignSelf: 'flex-start', fontSize: 14, color: 'lightgrey' }]}>This feature is currently undergoing enhancement and will be ready soon. In the meantime, feel free to use other amazing features available only on Bxcess </Text>
                            <Image source={require('../assets/images/bizlicensing.png')} style={{ width: Layout.window.width / 1.5, height: Layout.window.width / 1.5, opacity: 0.3 }} resizeMode={'contain'} />
                        </View>
                    </View>
                
                {/* END CONTENT */}
           </ LayoutB>

    );

}



export default LoanCalculatorScreen