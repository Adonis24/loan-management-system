import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Constants from 'expo-constants'

const fontSize = 14
const fontFamily = 'Montserrat_medium'

const elevationShadowStyle = (elevation) => {
    return {
        elevation,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation
    }
}

export default StyleSheet.create({
    container: { flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: '#fff' },
    textDefault: {
        fontSize,
        fontFamily,
        color: 'grey'
    },
    formTitle: {
        fontSize,
        fontFamily,
        color: '#000',
        margin:5
    },
    formSubtitle: {
        fontSize,
        fontFamily,
        color: 'darkblue',
        margin:5
    },
    headText: {
        fontSize: fontSize * 1.25,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily,
      
        paddingLeft: 5,
        color: '#000'
    },
    textBold: {
        fontSize: fontSize * 1.2,
        fontFamily: 'Montserrat_bold',
        color: '#000'
    },
    subTitle: {
        fontSize,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily,
        color: '#2C4690'
    },
    caption: {
        fontSize: fontSize * 0.8,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily,
        color: '#2C4690'
    },
    textSmall: {
        fontSize: fontSize * 0.8,
        fontFamily,
        color:'grey'
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
    shadowNew: {
        ...elevationShadowStyle(5),
        backgroundColor: 'white'

    },
    error: {
        fontFamily,
        color: 'red',
        fontSize: fontSize * 0.8
    },
    label: {
        fontFamily,
        color: 'darkblue',
        fontSize: fontSize * 0.9
    },
    answer: {
        fontSize: fontSize * 0.95,
        fontFamily,
        color: '#000'
    },
    image: {
        width: undefined,
        height: Layout.window.height / 15,
        justifyContent: 'flex-start'
    },
    banner: {
        width: Layout.window.width - 20,
        height: Layout.window.height / 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    logo: {
        width: undefined,
        height: undefined,
        flex: 1
    },
    box: {
        width: Layout.window.width * 0.3,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },featureIconStyle:{ flex: 3, width: undefined, justifyContent: 'flex-start' }

});

