import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import Constants from 'expo-constants'
//import { Constants, LinearGradient, FileSystem } from 'expo'
import Layout from '../constants/Layout'

const LayoutMap = (props) => {
    const { boxStyle, boxStyle1 } = props


    return (

        <View style={styles.container}>

          <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
                    
                    <View style={{ flex: 7 }}>
                        {props.children}
                    </View>
                </View>
        </View>

    );
}


export default LayoutMap;