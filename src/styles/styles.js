import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { Constants } from 'expo'
export default StyleSheet.create({

    textDefault: { fontSize: 16, alignSelf: 'center', textAlign: 'center', fontFamily: 'Montserrat_medium', color: '#000' },
    
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }


});

