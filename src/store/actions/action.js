import { AsyncStorage } from 'react-native'
import * as SecureStore from 'expo-secure-store'


import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);///

import s3 from '../../do/DigitalOcean'
import config from '../../do/config'


import { requestToken, kycMobile, kycMobileVerify, kycBasicInformation, requestPersonalToken, urlToBlob, kycBasicInformation2, kycPinNumber, registerApi, registerOTPApi, verifyPhoneApi, companyInfoAPI, contactPersonAPI, detailConnectAPI, declarationSignAPI } from './apiRegistration'
import { userInfo, latestTransaction, depositApi, sendMoney, withdrawApi, requestMoney, analyticSummary, notificationApi, analytic, userList, resetPinApi, editMobileDetail, editMobileDetailVerify, pushNotification, editPersonalDetail, newsApi, eventApi, promotionApi, handbooksApi, einfoApi, applyLoanApi, getUserInfoApi, getCompanyInfoApi, getListWorkersApi, doneForNowApi } from './apiDashboard'
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
        dispatch({ type: 'SET_REGISTER', payload: { indicator: true } })
        const { token_type, access_token, name, email, password, password_confirmation } = await getState().registrationReducer
        console.log(`ada ke tak register info : ${JSON.stringify(getState().registrationReducer)}`)

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errorArray = []
        const errorColor = []

        if (name == undefined || name == '') {
            errorArray.push({ title: "name", desc: "No Name" })
            errorColor.push("Name")
        }
        if (email == undefined || email == '') {
            errorArray.push({ title: "email", desc: "No e-mail" })
            errorColor.push("E-mail")
        } else if (reg.test(email) === false) {
            errorArray.push("Not e-mail format")
            errorColor.push("E-mail")
        }
        if (password == undefined || password == '') {
            errorArray.push({ title: "password", desc: "No password" })
            errorColor.push("Password")
        } else if (password.length < 6) {
            errorArray.push({ title: "password", desc: "Password need 6 character" })
            errorColor.push("Password")
        }
        if (password_confirmation == undefined || password_confirmation == '') {
            errorArray.push({ title: "confirm password", desc: "No Confirm password" })
            errorColor.push("Confirm Password")
        } else if (password_confirmation.length < 6) {
            errorArray.push({ title: "confirm password", desc: "Password need 6 character" })
            errorColor.push("Confirm Password")
        } else if (password_confirmation != password) {
            errorArray.push({ title: "confirm password", desc: "Password not same" })
            errorColor.push("Confirm Password")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_REGISTER', payload: { error: errorArray, errorColor, indicator: false } })
        } else {
            console.log('takde error dalam screen and boleh proceed utk register')
            await dispatch(registerApi(token_type, access_token, name, email, password, password_confirmation))
            //await dispatch(getPersonalToken())
        }
    }
}

export const registerOTP = () => {
    return async (dispatch, getState) => {

        const { token_type, access_token, countryCode, phone } = getState().registrationReducer

        const errorArray = []
        const errorColor = []

        if (phone == undefined || phone == '') {
            errorArray.push({ title: "phone", desc: 'Please enter phone no' })
            errorColor.push('phone')
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_REGISTER', payload: { error: errorArray, errorColor, proceed: false } })
        } else {
            dispatch({ type: 'SET_REGISTER', payload: { proceed: true } })
            console.log('takde error dalam screen and boleh proceed utk register')
            await dispatch(registerOTPApi(token_type, access_token, '+6', phone))
        }
    }
}

export const verifyPhone = () => {
    return async (dispatch, getState) => {
        const { token_type, access_token, country_code, phone, c1, c2, c3, c4 } = getState().registrationReducer
        const code = c1 + '' + c2 + '' + c3 + '' + c4
        await dispatch(verifyPhoneApi(token_type, access_token, '+6', phone, code))
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
        dispatch({ type: 'SET_LOGIN', payload: { indicator: true } })
        const username = getState().loginScreenReducer.email
        //const password = getState().loginScreenReducer.password

        const { email, password } = getState().loginScreenReducer
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errorArray = []
        const errorColor = []

        if (email == undefined || email == '') {

            errorArray.push({ title: "email", desc: "No e-mail" })
            errorColor.push("E-mail")
        } else if (reg.test(email) === false) {
            errorArray.push("Wrong e-mail format")
            errorColor.push("E-mail")
        }
        if (password == undefined || password == '') {

            errorArray.push({ title: "password", desc: "No password" })
            errorColor.push("Password")
        } else if (password.length < 6) {
            errorArray.push({ title: "password", desc: "Wrong password" })
            errorColor.push("Password")
        }

        if (errorArray.length > 0) {
            dispatch({ type: 'SET_LOGIN', payload: { loggedIn: false, error: errorArray, errorColor, indicator: false } })

        } else {
            dispatch(requestPersonalToken('login', username, password))
        }
    }
}

export const companyInfo = () => {
    return (dispatch, getState) => {
        const { comp_name, comp_regno, comp_regdate, comp_main_biz_act } = getState().companyInformationReducer

        const errorArray = []
        const errorColor = []

        if (comp_name == undefined || comp_name == '') {
            errorArray.push({ title: "name", desc: "No Company Name" })
            errorColor.push("Name")
        }
        if (comp_regno == undefined || comp_regno == '') {
            errorArray.push({ title: "reg number", desc: "No Registration Number" })
            errorColor.push("Reg Number")
        }
        if (comp_regdate == undefined || comp_regdate == '') {
            errorArray.push({ title: "date", desc: "Please Select Date" })
            errorColor.push("Date")
        }
        if (comp_main_biz_act == undefined || comp_main_biz_act == '') {
            errorArray.push({ title: "business", desc: "No Registration Number" })
            errorColor.push("Business")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_COMPANY_INFO', payload: { loggedIn: false, error: errorArray, errorColor } })
        } else {
            // dispatch(companyInfoAPI())
            dispatch({ type: 'SET_COMPANY_INFO', payload: { proceed: true } })
        }
    }
}

export const companyContactInfo = () => {
    return (dispatch, getState) => {
        const { comp_phone, comp_email, comp_addr } = getState().companyInformationReducer
        const errorArray = []
        const errorColor = []

        if (comp_phone == undefined || comp_phone == '') {
            errorArray.push({ title: "phone", desc: "No Phone Number" })
            errorColor.push("Phone")
        }
        if (comp_email == undefined || comp_email == '') {
            errorArray.push({ title: "email", desc: "No Email" })
            errorColor.push("Email")
        }
        if (comp_addr == undefined || comp_addr == '') {
            errorArray.push({ title: "address", desc: "No Address" })
            errorColor.push("Address")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_COMPANY_INFO', payload: { loggedIn: false, error: errorArray, errorColor } })
        } else {
            // dispatch(companyInfoAPI())
            dispatch({ type: 'SET_COMPANY_INFO', payload: { proceedCompany: true } })
        }
    }
}

export const companyContactAddress = () => {
    return (dispatch, getState) => {
        const { comp_addr, comp_city, comp_state, comp_postcode } = getState().companyInformationReducer
        const errorArray = []
        const errorColor = []

        if (comp_addr == undefined || comp_addr == '') {
            errorArray.push({ title: "address", desc: "No Address" })
            errorColor.push("Address")
        }
        if (comp_city == undefined || comp_city == '') {
            errorArray.push({ title: "city", desc: "No City" })
            errorColor.push("City")
        }
        if (comp_state == undefined || comp_state == '') {
            errorArray.push({ title: "state", desc: "No State" })
            errorColor.push("State")
        }
        if (comp_postcode == undefined || comp_postcode == '') {
            errorArray.push({ title: "postcode", desc: "No PostCode" })
            errorColor.push("Postcode")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_COMPANY_INFO', payload: { loggedIn: false, error: errorArray, errorColor } })
        } else {
            // dispatch(companyInfoAPI())
            dispatch({ type: 'SET_COMPANY_INFO', payload: { proceedContact: true } })
        }
    }
}

export const contactPerson = () => {
    return (dispatch, getState) => {
        const { full_name, ic_no, phone, position, ic_image } = getState().companyInformationReducer
        const errorArray = []
        const errorColor = []

        if (full_name == undefined || full_name == '') {
            errorArray.push({ title: "name", desc: "No Name" })
            errorColor.push("Name")
        }
        if (ic_no == undefined || ic_no == '') {
            errorArray.push({ title: "mykad", desc: "No MyKad" })
            errorColor.push("MyKad")
        }
        if (position == undefined || position == '') {
            errorArray.push({ title: "position", desc: "No Address" })
            errorColor.push("Position")
        }
        if (phone == undefined || phone == '') {
            errorArray.push({ title: "phone", desc: "No Phone Number" })
            errorColor.push("Phone")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_COMPANY_INFO', payload: { loggedIn: false, error: errorArray, errorColor } })
        } else {
            // dispatch(contactPersonAPI())
            dispatch(companyInfoAPI())
            // dispatch({ type: 'SET_COMPANY_INFO', payload: { proceedCompany: true } })
        }
    }
}

export const contactPersonMain = () => {
    return (dispatch, getState) => {
        const { full_name, ic_no, phone, position, ic_image } = getState().companyInformationReducer
        const errorArray = []
        const errorColor = []

        if (full_name == undefined || full_name == '') {
            errorArray.push({ title: "name", desc: "No Name" })
            errorColor.push("Name")
        }
        if (ic_no == undefined || ic_no == '') {
            errorArray.push({ title: "mykad", desc: "No MyKad" })
            errorColor.push("MyKad")
        }
        if (position == undefined || position == '') {
            errorArray.push({ title: "position", desc: "No Address" })
            errorColor.push("Position")
        }
        if (phone == undefined || phone == '') {
            errorArray.push({ title: "phone", desc: "No Phone Number" })
            errorColor.push("Phone")
        }
        if (errorArray.length > 0) {
            dispatch({ type: 'SET_COMPANY_INFO', payload: { loggedIn: false, error: errorArray, errorColor } })
        } else {
            dispatch(contactPersonAPI())
            // dispatch(companyInfoAPI())
            // dispatch({ type: 'SET_COMPANY_INFO', payload: { proceedCompany: true } })
        }
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

export const initiateDashboardScreen = () => {
    return async (dispatch, getState) => {
        // await dispatch(knowledgeHubApi())
    }
}

export const initiateNews = () => {
    return async (dispatch, getState) => {
        await dispatch(newsApi())
    }
}

export const initiateEvent = () => {
    return async (dispatch, getState) => {
        await dispatch(eventApi())
    }
}

export const initiatePromotion = () => {
    return async (dispatch, getState) => {
        await dispatch(promotionApi())
    }
}

export const initiateHandbooks = () => {
    return async (dispatch, getState) => {
        await dispatch(handbooksApi())
    }
}

export const intitiateEinfo = () => {
    return async (dispatch, getState) => {
        await dispatch(einfoApi())
    }
}

export const applyLoan = () => {
    return async (dispatch, getState) => {
        console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        await dispatch(applyLoanApi())
    }
}

export const initiateMyAccount = () => {
    return async (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        await dispatch(getUserInfoApi())
    }
}

export const initiateCompanyInfo = () => {
    return async (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        await dispatch(getCompanyInfoApi())
    }
}


export const initiateListWorkers = () => {
    return async (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        await dispatch(getListWorkersApi())
    }
}

export const doneForNow = () => {
    return async (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        await dispatch(doneForNowApi())
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
        dispatch({ type: 'SET_LOGIN', payload: { proceed: false } })
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

export const saveDocument = (result) => {
    const { type, uri, name, size } = result
    return async (dispatch, getState) => {
        const blob1 = await urlToBlob(uri)
        const fileName1 = 'test';
        await Storage.put(name, blob1, {
            contentType: 'application/pdf'
        }).then(data => {
            console.log('save')
            console.log(JSON.stringify(data))
        })
            .catch(err => console.log(err))
    }
}

export const saveDocumentDO = (result) => {
    const { type, uri, name, size } = result
    return async (dispatch, getState) => {
        const blob = await urlToBlob(uri)
        const { data } = blob

        console.log(`blob ialah ${JSON.stringify(blob)}`)
        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        const params = {
            Body: blob,
            Bucket: `${config.bucketName}`,
            Key: fileName
        };
        // Sending the file to the Spaces
        s3.putObject(params)
            .on('build', request => {
                request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`;
                request.httpRequest.headers['Content-Length'] = data.size;
                request.httpRequest.headers['Content-Type'] = data.type;
                request.httpRequest.headers['x-amz-acl'] = 'public-read';
            })
            .send((err) => {
                if (err) console.log(err);
                else {
                    // If there is no error updating the editor with the imageUrl
                    const imageUrl = `${config.digitalOceanSpaces}/` + fileName
                    console.log(imageUrl, name);
                    dispatch({ type: 'SET_CONTACT_PERSON', payload: { ic_image: imageUrl, fileName: name } })
                }
            });

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


// export const initiateDashboardScreen = () => {

//     return async (dispatch, getState) => {
//         await dispatch(userInfo())

//     }
// }

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
