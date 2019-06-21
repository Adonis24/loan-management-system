import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { Constants } from 'expo'
export default StyleSheet.create({

    textDefault: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#000'
    },
    subTitle: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#4A90E2'
    },
    caption: {
        fontSize: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#000'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

});

