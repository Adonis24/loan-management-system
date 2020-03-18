import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Constants from 'expo-constants'

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
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#000'
    },
    headText: {
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        fontWeight: 'bold',
        paddingLeft: 5,
        color: '#000'
    },
    textBold: {
        fontSize: 17,

        fontFamily: 'Montserrat_bold',
        color: '#000'
    },
    subTitle: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#2C4690'
    },
    caption: {
        fontSize: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_medium',
        color: '#2C4690'
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
        fontFamily: 'Montserrat_medium',
        color: 'red',
        fontSize: 10
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
        width: Layout.window.width / 3,
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
    },


});

