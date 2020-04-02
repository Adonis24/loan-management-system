import { AsyncStorage } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);///

import s3 from '../../do/DigitalOcean'
import config from '../../do/config'

import { requestToken, requestPersonalToken, urlToBlob, registerApi, registerOTPApi, verifyPhoneApi, companyInfoAPI, contactPersonAPI, detailConnectAPI, declarationSignAPI, requestTokenLMS, registerLMSApi, requestPersonalTokenLMS } from './apiRegistration'
import { newsApi, eventApi, promotionApi, handbooksApi, einfoApi, applyLoanApi, getUserInfoApi, getCompanyInfoApi, getListWorkersApi, doneForNowApi, sendNotificationApi, bizDirApi, listAgencyApi, addExpoTokenApi, connectionStatusApi, getAssociateApi, getPendingApi, loanInfoApi, getCoursesApi, editUserApi, generateJWTApi, requestConnectApi, applyGrantApi, grantInfoApi, acceptApi, saveLoanDataApi, resetFormApi, saveLocationApi,getLocationApi } from './apiDashboard'
//import {pusherListen} from './pusher'
import moment from 'moment'

import shortid from 'shortid'
import _ from 'lodash'

export const getToken = () => {
    return (dispatch, getState) => {
        dispatch(requestToken())
    }
}

export const getTokenLMS = () => {
    return (dispatch, getState) => {
        dispatch(requestTokenLMS())
    }
}

export const generateJWT = () => {
    return (dispatch, getState) => {
        dispatch(generateJWTApi())
    }
}

export const register = (values) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_REGISTER', payload: { indicator: true } })
        const { token_type, access_token, expo_token } = await getState().registrationReducer
        const { name, email, password, password_confirmation } = values
        console.log(`ada ke tak register info : ${JSON.stringify(getState().registrationReducer)}`)

        await dispatch(registerApi(token_type, access_token, name, email, password, password_confirmation, expo_token))
        //await dispatch(getPersonalToken())

    }
}

export const registerLMS = (values) => {
    return async (dispatch, getState) => {

        const { lms } = await getState().registrationReducer
        const { name, email, password, password_confirmation } = await values
        const { token_type, access_token } = lms
        console.log(`token lms :${JSON.stringify(lms)}`)
        await dispatch(registerLMSApi(token_type, access_token, name, email, password, password_confirmation))
    }
}

export const registerOTP = () => {
    return async (dispatch, getState) => {

        const { countryCode, phone } = getState().registrationReducer

        await dispatch(registerOTPApi('+6', phone))
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

export const getPersonalTokenLMS = () => {
    return async (dispatch, getState) => {
        const username = getState().registrationReducer.email
        const password = getState().registrationReducer.password
        console.log(`action : ${username} dan ${password}`)
        await dispatch(requestPersonalTokenLMS('register', username, password))
    }
}

export const login = (values) => {
    return (dispatch, getState) => {

        const { email, password } = values
        const username = email

        dispatch(requestPersonalToken('login', username, password))

    }
}

export const loginLMS = (values) => {
    return (dispatch, getState) => {


        const { email, password } = getState().loginScreenReducer
        const username = email
        dispatch(requestPersonalTokenLMS('login', username, password))
    }
}


export const contactPerson = () => {
    return (dispatch, getState) => {
        dispatch(companyInfoAPI())
    }
}

export const contactPersonUploadFirst = () => {
    return async (dispatch, getState) => {

        const { type, uri, name, size } = getState().companyInformationReducer
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
                    dispatch(companyInfoAPI())
                    dispatch({ type: 'SET_CONTACT_PERSON', payload: { ic_image: imageUrl, fileName: name } })
                }
            });


    }
}

export const contactPersonMain = () => {
    return (dispatch, getState) => {
        dispatch(contactPersonAPI())
    }
}

export const detailConnect = () => {
    return (dispatch, getState) => {
        const { capacity, nameCP, icNumber, relationship, emailSME } = getState().companyInformationReducer
        dispatch(detailConnectAPI(capacity, nameCP, icNumber, relationship, emailSME))
    }
}

export const declarationSign = () => {
    return (dispatch, getState) => {
        const { declareSign, declareName, declarePosition, declareStamp, declareDate } = getState().companyInformationReducer
        dispatch(declarationSignAPI(declareSign, declareName, declarePosition, declareStamp, declareDate))
    }
}



export const initiateNews = () => {
    return (dispatch, getState) => {
        dispatch(newsApi())
    }
}

export const initiateEvent = () => {
    return (dispatch, getState) => {
        dispatch(eventApi())
    }
}

export const initiatePromotion = () => {
    return (dispatch, getState) => {
        dispatch(promotionApi())
    }
}

export const initiateHandbooks = () => {
    return (dispatch, getState) => {
        dispatch(handbooksApi())
    }
}

export const intitiateEinfo = () => {
    return (dispatch, getState) => {
        dispatch(einfoApi())
    }
}

export const applyLoan = () => {
    return (dispatch, getState) => {
        console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(applyLoanApi())
    }
}

export const applyGrant = () => {
    return (dispatch, getState) => {
        console.log(`kat action : ${JSON.stringify(getState().grantApplicationReducer)}`)
        dispatch(applyGrantApi())
    }
}

export const initiateMyAccount = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(getUserInfoApi())
    }
}

export const initiateCompanyInfo = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(getCompanyInfoApi())
    }
}

export const initiateAssociateDir = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(getAssociateApi())
    }
}

export const initiatePendingDir = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(getPendingApi())
    }
}

export const initiateListWorkers = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(getListWorkersApi())
    }
}

export const doneForNow = () => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(doneForNowApi())
    }
}

export const sendNotification = (expo_token, id) => {
    return (dispatch, getState) => {
        // console.log(`kat action : ${JSON.stringify(getState().loanApplicationReducer)}`)
        dispatch(sendNotificationApi(expo_token, id))
    }
}

export const initiateBizDir = () => {
    return (dispatch, getState) => {
        dispatch(bizDirApi())
    }
}

export const initiateListAgency = () => {
    return (dispatch, getState) => {
        dispatch(listAgencyApi())
    }
}

export const initiateLoanInfo = (page) => {
    return (dispatch, getState) => {
        dispatch(loanInfoApi(page))
    }
}

export const initiateGrantInfo = (page) => {
    return (dispatch, getState) => {
        console.log(`grant kat action`)
        dispatch(grantInfoApi(page))
    }
}

export const enableNotification = () => {
    return (dispatch, getState) => {
        dispatch(addExpoTokenApi())
    }
}

export const addExpoToken = () => {
    return (dispatch, getState) => {
        dispatch(addExpoTokenApi())
    }
}

export const getConnectionStatus = () => {
    return (dispatch, getState) => {
        dispatch(connectionStatusApi())
    }
}


export const initiateTraining = () => {
    return (dispatch, getState) => {
        dispatch(getCoursesApi())
    }
}



export const requestConnect = (val) => {
    return (dispatch, getState) => {
        dispatch(requestConnectApi(val))
    }
}

export const accept = (val) => {
    return (dispatch, getState) => {
        dispatch(acceptApi(val))
    }
}




export const logout = () => {
    return async (dispatch, getState) => {
        //await dispatch({type:'SET_PERSONAL_INFO',payload:{status:'none'}})
        //await AsyncStorage.removeItem('status')
        //await AsyncStorage.removeItem('personalToken')
        console.log(`nak delete`)
        await SecureStore.deleteItemAsync('personalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))
        await SecureStore.deleteItemAsync('lmsPersonalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))

        dispatch({ type: 'REGISTRATION_RESET' })
        dispatch({ type: 'LOGIN_RESET' })
        dispatch({ type: 'COMPANY_INFO_RESET' })
        dispatch({ type: 'USER_PROFILE_RESET' })
        dispatch({ type: 'BIZ_INFO_RESET' })

        await dispatch({ type: 'API_RESET' })

        //dispatch({ type: 'ROOT_LOG_OUT' })
        dispatch({ type: 'SET_LOGIN', payload: { proceed: false } })
    }
}



export const saveDocumentDO = (result) => {

    return async (dispatch, getState) => {
        const { type, uri, name, size } = result
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

export const saveSelfie = (result) => {
    const { uri } = result
    return async (dispatch, getState) => {
        const blob = await urlToBlob(uri)
        const { data } = blob

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
                    console.log(imageUrl);
                    dispatch({ type: 'SET_USER_PROFILE', payload: { profile_pic: imageUrl } })
                    dispatch(editUserApi())
                }
            });

    }
}




export const saveLoanData = () => {
    return async (dispatch, getState) => {
        dispatch(saveLoanDataApi())
    }

}

export const resetForm = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_FORM_DATA' })
        dispatch(resetFormApi())
    }
}

export const getLocation = () => {
    return async (dispatch, getState) => {
        dispatch(getLocationApi())
    }
}

export const saveLocation = (x) => {
    return async (dispatch, getState) => {
        dispatch(saveLocationApi(x))
    }

}



