import { AsyncStorage } from 'react-native'
import { SecureStore } from 'expo'


// import Amplify, { Auth, Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// Amplify.configure(aws_exports);///


import { requestToken, kycMobile, kycMobileVerify, kycBasicInformation, requestPersonalToken, urlToBlob, kycBasicInformation2, kycPinNumber, registerApi, registerOTPApi, verifyPhoneApi, companyInfoAPI, contactPersonAPI, detailConnectAPI, declarationSignAPI } from './apiRegistration'
import { userInfo, latestTransaction, depositApi, sendMoney, withdrawApi, requestMoney, analyticSummary, notificationApi, analytic, userList, resetPinApi, editMobileDetail, editMobileDetailVerify, pushNotification, editPersonalDetail } from './apiDashboard'
//import {pusherListen} from './pusher'
import moment from 'moment'


import shortid from 'shortid'
import _ from 'lodash'


export const getToken = () => {
    return (dispatch, getState) => {
        dispatch(requestToken())
    }
}

export const register = () => {
    return async (dispatch, getState) => {
        const { token_type, access_token, name, email, password, password_confirmation } = await getState().registrationReducer
        console.log(`ada ke tak register info : ${JSON.stringify(getState().registrationReducer)}`)
        await dispatch(registerApi(token_type, access_token, name, email, password, password_confirmation))
    }
}

export const registerOTP = () => {
    return async (dispatch, getState) => {
        const { token_type, access_token, countryCode, phone } = getState().registrationReducer
        await dispatch(registerOTPApi(token_type, access_token, countryCode, phone))
    }
}

export const verifyPhone = () => {
    return async (dispatch, getState) => {
        const { token_type, access_token, countryCode, phone, c1, c2, c3, c4 } = getState().registrationReducer
        const code = c1 + '' + c2 + '' + c3 + '' + c4
        await dispatch(verifyPhoneApi(token_type, access_token, countryCode, phone, code))
    }
}

export const getPersonalToken = () => {
    return async (dispatch, getState) => {
      
      
        const username = getState().registrationReducer.email
        const password = getState().registrationReducer.password

        console.log(`action : ${username} dan ${password}`)

        await dispatch(requestPersonalToken('register', username, password))
    }
}

export const login = () => {
    return (dispatch, getState) => {
        const username = getState().loginScreenReducer.email
        const password = getState().loginScreenReducer.password
        dispatch(requestPersonalToken('login', username, password))
    }
}

export const companyInfo = () => {
    return (dispatch, getState) => {
        const companyName = getState().companyInformationReducer.companyName
        const regNumber = getState().companyInformationReducer.regNumber
        const compAddress = getState().companyInformationReducer.compAddress
        const businessActivities = getState().companyInformationReducer.businessActivities
        const phoneNumber = getState().companyInformationReducer.phoneNumber
        const emailAddress = getState().companyInformationReducer.emailAddress
        dispatch(companyInfoAPI(companyName, regNumber, compAddress, businessActivities, phoneNumber, emailAddress))
    }
}

export const contactPerson = () => {
    return (dispatch, getState) => {
        const fullName = getState().companyInformationReducer.fullName
        const myKad = getState().companyInformationReducer.myKad
        const phoneNum = getState().companyInformationReducer.phoneNum
        const position = getState().companyInformationReducer.position
        dispatch(contactPersonAPI(fullName, myKad, phoneNum, position))
    }
}

export const detailConnect = () => {
    return (dispatch, getState) => {
        const capacity = getState().companyInformationReducer.capacity
        const nameCP = getState().companyInformationReducer.mynameCPKad
        const icNumber = getState().companyInformationReducer.icNumber
        const relationship = getState().companyInformationReducer.relationship
        const emailSME = getState().companyInformationReducer.emailSME
        dispatch(detailConnectAPI(capacity, nameCP, icNumber, relationship, emailSME))
    }
}

export const declarationSign = () => {
    return (dispatch, getState) => {
        const declareSign = getState().companyInformationReducer.declareSign
        const declareName = getState().companyInformationReducer.declareName
        const declarePosition = getState().companyInformationReducer.declarePosition
        const declareStamp = getState().companyInformationReducer.declareStamp
        const declareDate = getState().companyInformationReducer.declareDate
        dispatch(declarationSignAPI(declareSign, declareName, declarePosition, declareStamp, declareDate))
    }
}







/////////////////////// LUNAPAY /////////////////////////////////////



export const getSMS = () => {
    return async (dispatch, getState) => {
        await dispatch(kycMobile())
    }
}

export const getSMSEdit = () => {
    return async (dispatch, getState) => {
        await dispatch(editMobileDetail())
    }
}

///////=================================================================================

export const deleteStatus = () => {
    return async (dispatch, getState) => {
        await dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'none' } })
        await AsyncStorage.removeItem('status')
        //await AsyncStorage.removeItem('personalToken')
        await SecureStore.deleteItemAsync('personalToken')
    }
}

export const setKyc = (val, screen) => {
    switch (screen) {
        case 'RegistrationCountryScreen':
            return (dispatch, getState) => {
                dispatch({ type: 'SET_INDICATOR_KYC_1', payload: { displayIndicator: true } })

                const { phone_no } = getState().kyc1ScreenReducer
                const errorArray = []
                const errorColor = []

                if (phone_no == undefined || phone_no == '') {
                    errorArray.push({ title: "phone_no", desc: "Enter phone no" })
                    errorColor.push("phone_no")
                } else if (phone_no.length < 10) {
                    errorArray.push({ title: "phone_no", desc: "Ensure the correct number is entered" })
                    errorColor.push("phone_no")
                }
                if (errorArray.length > 0) {
                    dispatch({ type: 'SET_INDICATOR_KYC_1', payload: { displayIndicator: false, proceed: false } })
                    dispatch({ type: 'SET_KYC_1', payload: { error: errorArray, errorColor } })
                } else {
                    dispatch({ type: 'SET_INDICATOR_KYC_1', payload: { displayIndicator: false, proceed: true } })
                    dispatch({ type: 'SET_KYC', payload: { ...val } })
                }
            }

            break;

        case 'TermsScreen':
            return (dispatch, getState) => {
                dispatch({ type: 'SET_KYC', payload: { termAgree: val } })
            }
            break;

        case 'PdpaScreen':
            return (dispatch, getState) => {
                dispatch({ type: 'SET_KYC', payload: { pdpaAgree: val } })
            }
            break;

        case 'PersonalInformationGetScreen':
            return (dispatch, getState) => {
                dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: true } })

                const { fullName, preferredName, email, password, birth_date, gender, nationality, occupation, industry } = getState().kyc2ScreenReducer
                const errorArray = []
                const errorColor = []

                if (fullName == undefined || fullName == '') {
                    errorArray.push({ title: "fullName", desc: "Enter full name" })
                    errorColor.push("fullName")
                }
                if (preferredName == undefined || preferredName == '') {
                    errorArray.push({ title: "preferredName", desc: "Enter nickname" })
                    errorColor.push("preferredName")
                }
                if (email == undefined || email == '') {
                    errorArray.push({ title: "email", desc: "Enter email" })
                    errorColor.push("email")
                }
                if (password == undefined || password == '') {
                    errorArray.push({ title: "password", desc: "Enter password" })
                    errorColor.push("password")
                }
                if (birth_date == undefined || birth_date == '') {
                    errorArray.push({ title: "birth_date", desc: "Enter date of birth" })
                    errorColor.push("birth_date")
                }
                if (gender == undefined || gender == '') {
                    errorArray.push({ title: "gender", desc: "Enter gender" })
                    errorColor.push("gender")
                }
                if (nationality == undefined || nationality == '') {
                    errorArray.push({ title: "nationality", desc: "Enter nationality" })
                    errorColor.push("nationality")
                }
                if (occupation == undefined || occupation == '') {
                    errorArray.push({ title: "occupation", desc: "Enter occupation" })
                    errorColor.push("occupation")
                }
                if (industry == undefined || industry == '') {
                    errorArray.push({ title: "industry", desc: "Enter industry" })
                    errorColor.push("industry")
                }
                if (errorArray.length > 0) {
                    dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: false, proceed: false } })
                    dispatch({ type: 'SET_KYC_2', payload: { error: errorArray, errorColor } })
                } else {
                    dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: false, proceed: true } })
                    dispatch({ type: 'SET_KYC', payload: { ...val } })
                }
            }
            break;

        case 'PersonalInformationGetAddressScreen':
            return (dispatch, getState) => {
                dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: true } })

                const { street_address, postcode, city, state, country } = getState().kyc2ScreenReducer
                const errorArray = []
                const errorColor = []

                if (street_address == undefined || street_address == '') {
                    errorArray.push({ title: "street_address", desc: "Enter Line 1" })
                    errorColor.push("street_address")
                }
                if (postcode == undefined || postcode == '') {
                    errorArray.push({ title: "postcode", desc: "Enter postcode" })
                    errorColor.push("postcode")
                }
                if (city == undefined || city == '') {
                    errorArray.push({ title: "city", desc: "Enter city" })
                    errorColor.push("city")
                }
                if (state == undefined || state == '') {
                    errorArray.push({ title: "state", desc: "Enter state" })
                    errorColor.push("state")
                }
                if (country == undefined || country == '') {
                    errorArray.push({ title: "country", desc: "Enter country" })
                    errorColor.push("country")
                }

                if (errorArray.length > 0) {
                    dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: false, proceed: false } })
                    dispatch({ type: 'SET_KYC_2', payload: { error: errorArray, errorColor } })
                } else {
                    dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: false, proceed: true } })
                    dispatch({ type: 'SET_KYC', payload: { ...val } })
                }
            }
            break;

        case 'Login':
            return (dispatch, getState) => {
                console.log(`value login adalah ${JSON.stringify(val)}`)
                dispatch({ type: 'SET_KYC', payload: { ...val } })
                dispatch({ type: 'SET_INDICATOR_KYC_2', payload: { displayIndicator: false, proceed: true } })

            }

            break;


    }

}

export const checkLogin = () => {
    return async (dispatch, getState) => {

        try {
            const personalToken = await AsyncStorage.getItem('personalToken');
            if (personalToken !== null) {

                console.log(`ada  personalToken ${personalToken}`)
                try {
                    const status = await AsyncStorage.getItem('status');
                    if (status !== null) {

                        console.log(`ada  status ${status}`)

                        if (status == 'to verify' || status == 'introduced') {
                            dispatch({ type: 'SET_INIT_NAV', payload: { initNav: 'PersonalInformation' } })
                        } else if (status == 'wallet created') {
                            dispatch({ type: 'SET_INIT_NAV', payload: { initNav: 'PendingReview' } })
                        } else if (status == 'approved') {
                            dispatch({ type: 'SET_INIT_NAV', payload: { initNav: 'Dashboard' } })
                        }

                    } else {
                        console.log(`whats going on ${status}`)

                    }
                } catch (error) {

                    console.log(`test error ${error}`)

                }
            } else {

            }
        } catch (error) {

            console.log(`test error ${error}`)
        }

    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        //await dispatch({type:'SET_PERSONAL_INFO',payload:{status:'none'}})
        //await AsyncStorage.removeItem('status')
        //await AsyncStorage.removeItem('personalToken')
        console.log(`nak delete`)
        await SecureStore.deleteItemAsync('personalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))
    }
}

// export const login = () => {
//     return (dispatch, getState) => {
//         const username = getState().loginScreenReducer.email
//         const password = getState().loginScreenReducer.password
//         dispatch(requestPersonalToken('login', username, password))
//     }
// }

export const resetPin = () => {
    return async (dispatch, getState) => {

        await dispatch(resetPinApi())
    }
}

export const initiateUser = () => {
    return (dispatch, getState) => {
    }
}

export const save = (val) => {


    return (dispatch, getState) => {
        const { agree, country, phone_country_code, phone_no } = val

        AsyncStorage.setItem('agree', JSON.stringify(val))
    }
}

export const savePersonalInfo = () => {
    return async (dispatch, getState) => {
        //const { fullName, preferredName, email, birth_date, gender, nationality, occupation, industry, street_address, street_address_2, postcode, city, state, country, mailingAddress } = val
        //const birth_date1 = moment(birth_date).format()
        //const { uid } = getState().kycReducer
        console.log(`dah sampai sini 3`)
        await dispatch(kycBasicInformation())
        await dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'introduced' } })
        console.log(`dah sampai sini`)
        try {
            await AsyncStorage.setItem('status', 'introduced')
            console.log(`dah sampai sini 2`)
        } catch (e) { console.log(`Eror nak save status : ${e}`) }
        const username = getState().kycReducer.email
        const password = getState().kycReducer.password
        await dispatch(requestPersonalToken('register', username, password))
    }
}

export const initiatePersonalInformationScreen = () => {
    return async (dispatch, getState) => {
        try {
            const status = await AsyncStorage.getItem('status');
            if (status !== null) {
                // We have data!!
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'introduced' } })
                console.log(`test ${status}`)
            } else {
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'none' } })
            }
        } catch (error) {
            // Error retrieving data
            console.log(`test error ${error}`)
            dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'none' } })
            //dispatch({type:'SET_PERSONAL_INFO',payload:{status:'wallet created'}})
        }

    }
}

export const saveDocument = () => {


    return async (dispatch, getState) => {
        const { email } = await getState().kycReducer || 'email'
        const uri1 = await getState().kycVerifyReducer.doc1.uri
        const uri2 = await getState().kycVerifyReducer.doc2.uri || uri1


        //const docName = await fbs.child(uid+'_doc.jpg');
        const blob1 = await urlToBlob(uri1)
        //const uploadTask=docName.put(file)  
        const fileName1 = 'document/' + email + '1.jpg';

        await Storage.put(fileName1, blob1, {
            contentType: 'image/jpeg'
        }).then(data => {
            //this.props.savePicture(data.key,kidId)
            //dispatch({type:'SET_KYC_VERIFY',payload:{toVerify:{docUri1:data.key},proceed:false}})
            console.log('save')
        })
            .catch(err => console.log(err))


        //const docName = await fbs.child(uid+'_doc.jpg');
        const blob2 = await urlToBlob(uri2)
        //const uploadTask=docName.put(file)  
        const fileName2 = 'document/' + email + '+2.jpg';

        await Storage.put(fileName2, blob2, {
            contentType: 'image/jpeg'
        }).then(data => {
            //this.props.savePicture(data.key,kidId)
            dispatch({ type: 'SET_KYC_VERIFY', payload: { toVerify: { docUri1: fileName1, docUri2: fileName2 }, proceed: true } })
            console.log('save')
        })
            .catch(err => console.log(err))


    }
}

export const saveSelfie = () => {


    return async (dispatch, getState) => {
        const { email } = await getState().kycReducer
        const { uri } = await getState().kycVerifyReducer.selfie
        const { idNo } = await getState().kycVerifyReducer.selfie
        const { toVerify } = await getState().kycVerifyReducer



        const blob = await urlToBlob(uri)

        const fileName = 'selfie/' + 'email' + '.jpg';

        await Storage.put(fileName, blob, {
            contentType: 'image/jpeg'
        }).then(async data => {
            //this.props.savePicture(data.key,kidId)
            await console.log(`data gambar ialah ${JSON.stringify(data)}`)
            await dispatch({ type: 'SET_KYC_VERIFY', payload: { toVerify: { ...toVerify, selfieUri: data.key }, proceed: true } })
            await dispatch(kycBasicInformation2())
            await dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'to verify' } })
            await AsyncStorage.setItem('status', 'to verify')
            console.log('save')

        })
            .catch(err => console.log(err))


    }
}

// export const verifyPhone = () => {
//     return (dispatch, getState) => {
//         dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: true } })
//         const { d1, d2, d3, d4 } = getState().phoneVerificationReducer
//         const d = d1 + '' + d2 + '' + d3 + '' + d4

//         dispatch(kycMobileVerify(d))
//         // dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true,actionList:false } })

//     }
// }


export const verifyPhoneEdit = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: true } })
        const { d1, d2, d3, d4 } = getState().phoneVerificationReducer
        const d = d1 + '' + d2 + '' + d3 + '' + d4

        dispatch(editMobileDetailVerify(d))


    }
}

export const unlock = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_INDICATOR_UNLOCK', payload: { displayIndicator: true } })

        const { d1, d2, d3, d4 } = getState().unlockReducer
        const d = d1 + '' + d2 + '' + d3 + '' + d4

        const secure_code = '1111'

        //await dispatch(kycPinNumber(d))

        if (d == secure_code) {
            dispatch({ type: 'SET_INDICATOR_UNLOCK', payload: { displayIndicator: false, proceed: true } })
        } else {
            dispatch({ type: 'SET_INDICATOR_UNLOCK', payload: { displayIndicator: false, proceed: false } })
        }

    }
}

export const setTerms = () => {
    return (dispatch, getState) => {
        const { checked, agree } = getState().termsReducer
        const newChecked = !checked
        const newAgree = (agree == 'no') ? 'yes' : 'no'
        //console.log(JSON.stringify(agree))
        dispatch({ type: 'SET_TERMS', payload: { checked: newChecked, agree: newAgree } })
    }
}

export const setPdpa = () => {
    return (dispatch, getState) => {
        const { checked, agree } = getState().pdpaReducer
        const newChecked = !checked
        const newAgree = (agree == 'no') ? 'yes' : 'no'
        //console.log(JSON.stringify(agree))
        dispatch({ type: 'SET_PDPA', payload: { checked: newChecked, agree: newAgree } })
    }
}


export const setKycVerifyAgain = (val, screen) => {

    switch (screen) {
        case 'Document':

            return (dispatch, getState) => {
                dispatch({ type: 'SET_INDICATOR_KYC_VERIFY', payload: { displayIndicator: true } })

                const { fullName, national_id_passport, idNo } = getState().kycVerifyReducer
                const errorArray = []
                const errorColor = []

                if (fullName == undefined || fullName == '') {
                    errorArray.push({ title: "fullName", desc: "Enter full name" })
                    errorColor.push("fullName")
                }

                if (national_id_passport == undefined || national_id_passport == '') {
                    errorArray.push({ title: "national_id_passport", desc: "Enter DocumentType" })
                    errorColor.push("national_id_passport")
                }

                if (idNo == undefined || idNo == '') {
                    errorArray.push({ title: "idNo", desc: "Enter Id No" })
                    errorColor.push("idNo")
                }

                if (errorArray.length > 0) {
                    dispatch({ type: 'SET_INDICATOR_KYC_VERIFY', payload: { displayIndicator: false, proceed: false } })
                    dispatch({ type: 'SET_KYC_VERIFY', payload: { error: errorArray, errorColor } })
                } else {
                    dispatch({ type: 'SET_INDICATOR_KYC_VERIFY', payload: { displayIndicator: false, proceed: true } })

                    const doc = getState().kycVerifyReducer.doc
                    dispatch({ type: 'SET_KYC_VERIFY', payload: { error: null, errorColor: null, doc: { ...doc, fullName, national_id_passport, idNo } } })
                }
            }

            break;

        case 'Selfie':

            return (dispatch, getState) => {
                dispatch({ type: 'SET_INDICATOR_KYC_DOCUMENT', payload: { displayIndicator: true } })

                const { fullName, national_id_passport, idNo } = getState().kycVerifyReducer
                const errorArray = []
                const errorColor = []

                if (fullName == undefined || fullName == '') {
                    errorArray.push({ title: "fullName", desc: "Enter full name" })
                    errorColor.push("fullName")
                }

                if (national_id_passport == undefined || national_id_passport == '') {
                    errorArray.push({ title: "national_id_passport", desc: "Enter DocumentType" })
                    errorColor.push("national_id_passport")
                }

                if (idNo == undefined || idNo == '') {
                    errorArray.push({ title: "idNo", desc: "Enter Id No" })
                    errorColor.push("idNo")
                }

                if (errorArray.length > 0) {
                    dispatch({ type: 'SET_INDICATOR_KYC_VERIFY', payload: { displayIndicator: false, proceed: false } })
                    dispatch({ type: 'SET_KYC_VERIFY', payload: { error: errorArray, errorColor } })
                } else {
                    dispatch({ type: 'SET_INDICATOR_KYC_VERIFY', payload: { displayIndicator: false, proceed: true } })

                    const selfie = getState().kycVerifyReducer.selfie
                    dispatch({ type: 'SET_KYC_VERIFY', payload: { error: null, errorColor: null, selfie: { ...selfie, fullName, national_id_passport, idNo } } })

                }
            }

            break;
    }

}

export const setPasscode = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().kycReducer
        dispatch({ type: 'SET_INDICATOR_PASSCODE_CREATION', payload: { displayIndicator: true } })
        const { d1, d2, d3, d4 } = getState().passcodeCreationReducer
        const d = d1 + '' + d2 + '' + d3 + '' + d4
        console.log('d =' + d.length)

        if (d.length == 4) {
            await dispatch(kycPinNumber(d))
            await dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'wallet created' } })
            await AsyncStorage.setItem('status', 'wallet created')
            await dispatch({ type: 'SET_INDICATOR_PASSCODE_CREATION', payload: { displayIndicator: false, proceed: true } })
        } else {
            await dispatch({ type: 'SET_INDICATOR_PASSCODE_CREATION', payload: { displayIndicator: false, proceed: false } })
        }
    }
}

export const approve = () => {
    return async (dispatch, getState) => {

        await dispatch({ type: 'SET_PERSONAL_INFO', payload: { status: 'approved' } })
        await AsyncStorage.setItem('status', 'approved')


    }
}



///////////////////////////////////////////////////////
//////////////////////////////////////////////////////


export const initiateDashboardScreen = () => {

    return async (dispatch, getState) => {
        await dispatch(userInfo())

    }
}

export const initiateLatestTransaction = () => {
    return (dispatch, getState) => {
        dispatch(latestTransaction())

    }
}


export const getAnalyticSummary = () => {
    return (dispatch, getState) => {

        dispatch(analyticSummary())
    }
}



export const initiateNotification = () => {
    return (dispatch, getState) => {
        dispatch(notificationApi())
    }
}

export const initiateAnalytic = () => {
    return (dispatch, getState) => {
        dispatch(analytic())
    }
}

export const deposit = () => {
    return (dispatch, getState) => {
        dispatch(depositApi())
    }
}

export const withdraw = () => {
    return (dispatch, getState) => {
        dispatch(withdrawApi())
    }
}


export const initiateTransferOut = () => {
    return (dispatch, getState) => {
        dispatch(userList())

    }
}


export const processRecipientId = (val) => {
    return (dispatch, getState) => {

        const { recipientId, recipientIdScan } = val
        console.log(`val ialah : ${JSON.stringify(val)}`)
        console.log(`recipient id ialah : ${recipientId}`)

        if (recipientIdScan) {

            dispatch({ type: 'SET_RECIPIENT', payload: { recipientId: recipientIdScan, recipientRemark: '', key: 'id', id: recipientIdScan } })
            console.log('recipient success recipientIdScan')
        } else {
            const recipientList = getState().transferOutScreenReducer.recipientList
            const recipientExists = recipientList.find(r => r.email === recipientId || r.phone_no === recipientId || r.national_id_passport === recipientId)

            if (recipientExists === undefined) {
                console.log('recipient undefined')
                dispatch({ type: 'SET_RECIPIENT', payload: { recipientId, recipientRemark: 'User Not Found' } })
            } else {
                bb
                console.log('recipient wujud : ' + JSON.stringify(recipientExists))
                const key = Object.keys(recipientExists).find(key => recipientExists[key] === recipientId)
                dispatch({ type: 'SET_RECIPIENT', payload: { recipientId, recipientRemark: '', key, id: recipientExists.id } })
            }
        }
    }

}

export const initiateTransferOutConfirm = () => {
    return (dispatch, getState) => {
        const { id, recipientList } = getState().transferOutScreenReducer
        console.log(`apa yg ada kat reducer ini : ${JSON.stringify(getState().transferOutScreenReducer)}`)
        const recipientId = id
        const recipientExists = recipientList.find(r => r.email === recipientId || r.phone_no === recipientId || r.national_id_passport === recipientId || r.account_no === recipientId)

        console.log(`recipientexists adalah ${JSON.stringify(recipientExists)}`)
        const { name, email, account_no, phone_no, filename_3, last_name } = recipientExists

        dispatch({ type: 'SET_RECIPIENT', payload: { id, fullName: name, email, account_no, phone_no, profile_pic: filename_3, expoToken: last_name } })


    }
}


export const processTransferOut = () => {
    return (dispatch, getState) => {
        dispatch(sendMoney())
        dispatch({ type: 'SET_RECIPIENT', payload: { success: true } })
    }
}





export const processScannedBill = (val) => {
    getBillDetail(val)
}

export const getBillDetail = (val) => {
    return (dispatch, getState) => {

        const { billId, access_token, token_type } = val

        fetch(`http://uat.lunapay.co/api/QrScanInfo/${billId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token_type + ' ' + access_token
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                const { token_type, access_token } = responseJson
                dispatch({ type: 'SET_BILL', payload: { cacing: 'cacing' } })
                //dispatch({type:'SET_BILL',payload:{...val}})

            })
            .catch((error) => {
                console.error('Error : ' + error);
            });

    }
}

export const payBill = () => {
    return (dispatch, getState) => {

    }
}



export const initiateRequest = () => {
    return (dispatch, getState) => {

        dispatch(userList())

    }
}

export const generateQR = () => {
    return (dispatch, getState) => {


        const requestor = getState().dashboardScreenReducer
        console.log(`sender info ialah ${JSON.stringify(requestor)}`)
        const { uid } = requestor
        const requestorCurrency = requestor.currency
        const requestorBalance = requestor.balance
        const requestor_account_no = requestor.account_no
        const requestorExisting = requestor.existing
        const requestorExistingKey = requestor.existingKey

        const created_at = moment().format()
        const amount = getState().requestScreenReducer.amount || 0
        const references = getState().requestScreenReducer.reference
        const fee = 0
        const final_amount = amount - amount * fee

        dispatch({ type: 'SET_PAYER', payload: { transfer_id } })

    }
}

export const processPayerId = (val) => {
    return (dispatch, getState) => {

        const { payerId, payerIdScan } = val

        console.log(`val adalah ${JSON.stringify(val)}`)

        if (payerIdScan) {
            dispatch({ type: 'SET_PAYER', payload: { payerId: payerIdScan, payerRemark: '', key: 'id', id: payerIdScan } })
            console.log('payer payerIdScan')
        } else {
            const payerList = getState().requestScreenReducer.payerList
            const payerExists = payerList.find(r => r.email === payerId || r.phone_no === payerId || r.national_id_passport === payerId)

            if (payerExists === undefined) {
                console.log('payer undefined')
                dispatch({ type: 'SET_PAYER', payload: { payerId, payerRemark: 'User Not Found' } })
            } else {
                console.log('payer wujud')
                const key = Object.keys(payerExists).find(key => payerExists[key] === payerId)
                dispatch({ type: 'SET_PAYER', payload: { payerId, payerRemark: '', key, id: payerExists.id } })
            }
        }
    }
}

export const initiateRequestConfirm = () => {
    return (dispatch, getState) => {
        console.log(`ape cite request confirm ini `)
        const { id, payerList } = getState().requestScreenReducer

        console.log(`apa yg ada kat reducer ini : ${JSON.stringify(getState().requestScreenReducer)}`)
        const payerId = id
        const payerExists = payerList.find(r => r.email === payerId || r.phone_no === payerId || r.national_id_passport === payerId || r.account_no === payerId)
        console.log(`payerExists adalah ${JSON.stringify(payerExists)}`)


        const { name, email, account_no, phone_no, filename_3 } = payerExists

        dispatch({ type: 'SET_PAYER', payload: { id, fullName: name, email, account_no, phone_no, profile_pic: filename_3 } })

    }
}


export const processRequest = () => {
    console.log(`is being processed`)
    return (dispatch, getState) => {
        dispatch(requestMoney())


        dispatch({ type: 'SET_PAYER', payload: { success: true } })
    }
}

export const initiateFullfilRequest = () => {
    return async (dispatch, getState) => {

        const { transfer_id } = await getState().fulfillRequestScreenReducer


        const { receiver } = await getState().fulfillRequestScreenReducer




    }
}


export const initiateNotificationFulfillRequest = () => {
    return async (dispatch, getState) => { }
}

export const processFulfillRequest = () => {
    console.log(`is being processed`)
    return (dispatch, getState) => {
        const { transfer_id, receiver } = getState().fulfillRequestScreenReducer
        const all = getState().fulfillRequestScreenReducer

        console.log(`is being processed all ${JSON.stringify(all)}`)


        const receiverCurrency = all.receiver_currency
        //const receiverBalance=all.balance
        const receiver_account_no = all.receiver

        //const receiverExisting=all.existing
        //const receiverExistingKey=all.existingKey

        const amount = all.final_amount
        const references = all.references



        const sender = getState().dashboardScreenReducer

        const { uid } = sender
        const senderCurrency = sender.currency
        const senderBalance = sender.balance
        const sender_account_no = sender.account_no
        const senderExisting = sender.existing
        const senderExistingKey = sender.existingKey

        const status = 'success'
        const fee = 0
        const updated_at = moment().format()
        const created_at = moment().format()
        const final_amount = amount - amount * fee
        const transaction_id = shortid.generate()


        //sender
        //receiver        


        const newBalanceSender = senderBalance - final_amount

        console.log(`receiver_account_no ${receiver_account_no}`)




        dispatch({ type: 'SET_FULFILL_REQUEST', payload: { success: true } })
    }
}

export const processNotificationFulfillRequest = () => {

    return (dispatch, getState) => {
        const { transfer_id, receiver } = getState().notificationfulfillRequestScreenReducer
        const all = getState().notificationfulfillRequestScreenReducer

        console.log(`is being processed all ${JSON.stringify(all)}`)


        const receiverCurrency = all.receiver_currency
        //const receiverBalance=all.balance
        const receiver_account_no = all.receiver

        //const receiverExisting=all.existing
        //const receiverExistingKey=all.existingKey

        const amount = all.final_amount
        const references = all.references



        const sender = getState().dashboardScreenReducer

        const { uid } = sender
        const senderCurrency = sender.currency
        const senderBalance = sender.balance
        const sender_account_no = sender.account_no
        const senderExisting = sender.existing
        const senderExistingKey = sender.existingKey

        const status = 'success'
        const fee = 0
        const updated_at = moment().format()
        const created_at = moment().format()
        const final_amount = amount - amount * fee
        const transaction_id = shortid.generate()


        //sender
        //receiver        


        const newBalanceSender = senderBalance - final_amount

        console.log(`receiver_account_no ${receiver_account_no}`)



        dispatch({ type: 'SET_NOTIFICATION_FULFILL_REQUEST', payload: { success: true } })
    }
}


///////////// testing pusher 


export const listen = () => {

    return (dispatch, getState) => {
        dispatch(pusherListen())
    }
}

/////////////////////////////////////

export const setTheme = (val) => {

    return async (dispatch, getState) => {
        console.log(`setTheme ialah ${JSON.stringify(val)}`)
        try {
            await AsyncStorage.setItem('theme', val);
            await dispatch({ type: 'CHANGE_THEME', payload: { theme: val } })
        } catch (error) {
            console.log(`tak berjaya menyimpan ${error}`)
        }

    }
}

export const getTheme = () => {

    return async (dispatch, getState) => {

        try {
            const theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                // We have data!!              
                await dispatch({ type: 'CHANGE_THEME', payload: { theme } })
            }
        } catch (error) {
            console.log(`tak berjaya meretrieve ${error}`)
        }

    }
}

export const sendNotification = () => {
    return async (dispatch, getState) => {
        dispatch(pushNotification())
    }
}

export const editInfo = () => {
    return async (dispatch, getState) => {
        dispatch(editPersonalDetail())
    }
}
