import { Platform } from 'react-native'
import { FileSystem, Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'
import moment from 'moment'


const apiUrl = 'https://staging.bxcess.my/'
const lmsApiUrl = 'https://lms.bxcess.my/'


const apiGetCall = async (uri, apiAccess, lms = false) => {


  const access = !lms ? apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken')) : JSON.parse(await SecureStore.getItemAsync('lmsPersonalToken'))

  const { token_type, access_token } = access
  const method = 'GET'
  const Accept = 'application/json'
  const Authorization = token_type + ' ' + access_token

  const headers = { 'Content-Type': 'application/json', Accept, Authorization }
  let response = await fetch(`${!lms ? apiUrl : lmsApiUrl}${uri}`, { method, headers })
  let responseJson = await response.json()
  return responseJson


}

const apiPostCall = async (uri, values, apiAccess, lms = false, isPublicToken = false) => {

  const body = JSON.stringify({ ...values, access_credential: !isPublicToken && 'api' })
  const access = apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken'))

  const { token_type, access_token } = access
  const method = 'POST'
  const Accept = 'application/json'
  const Authorization = token_type + ' ' + access_token

  const headers = { 'Content-Type': 'application/json', Accept, Authorization: !isPublicToken && Authorization }

  console.log(`body ialah : ${JSON.stringify({ ...values, access_credential: !isPublicToken && 'api' })}`)
  let response = await fetch(`${!lms ? apiUrl : lmsApiUrl}${uri}`, { method, headers, body })

  let responseJson = await response.json()
  return responseJson
}

export const requestToken = () => {
  return async (dispatch, getState) => {

    const value = { client_id: '2', client_secret: 'dFX2OFK95Va8PfvyzT6ZnbLJxCXDAfvBCC1fdX4k', grant_type: 'client_credentials' }
    const responseJson = await apiPostCall(`oauth/token`, value, getState().apiReducer, false, true)
    dispatch({ type: 'GET_TOKEN', payload: { ...responseJson } })
  }
}

export const requestTokenLMS = () => {
  return async (dispatch, getState) => {

    const value = { client_id: '1', client_secret: 'Hri7puJsjOSMp3SxH4Gds6XtMxSJJwe8jUay80TC', grant_type: 'client_credentials' }
    const responseJson = await apiPostCall(`oauth/token`, value, getState().apiReducer, true, true)
    await dispatch({ type: 'GET_TOKEN', payload: { lms: { ...responseJson } } })

  }
}

export const registerApi = (token_type, access_token, name, email, password, password_confirmation, expo_token) => {
  return async (dispatch, getState) => {

    const reg = getState().registrationReducer

    console.log(` ada api reducer ke kat sini : ${JSON.stringify(getState().registrationReducer)}`)
    const value = { name, email, password, password_confirmation, expo_token }
    const responseJson = await apiPostCall(`api/register`, value, reg)
    const { status, errors, message } = await responseJson
    const error = errors

    error && dispatch({ type: 'SET_API_AUTH', payload: { error, message, token: false } })
    await console.log(`register  ${JSON.stringify(responseJson)}`)

  }
}

export const registerLMSApi = (token_type, access_token, name, email, password, password_confirmation) => {
  return async (dispatch, getState) => {
    const first_name = name
    const last_name = name

    const lmsreg = getState().registrationReducer.lms
    const value = { first_name, last_name, email, password, password_confirmation }
    const responseJson = await apiPostCall(`api/register`, value, getState().apiReducer, lmsreg)
    const { status } = await responseJson
    //await dispatch({ type: 'SET_REGISTER', payload: { status, proceed: true, indicator: false } })
    await console.log(`register LMS  ${JSON.stringify(responseJson)}`)

  }
}


export const requestPersonalToken = (screen, username, password) => {
  return async (dispatch, getState) => {

    const value = { client_id: '2', client_secret: 'dFX2OFK95Va8PfvyzT6ZnbLJxCXDAfvBCC1fdX4k', grant_type: 'password', username, password }
    const responseJson = await apiPostCall(`oauth/token`, value, getState().apiReducer)
    console.log(`personal token ialah : ${JSON.stringify(responseJson)}`)
    const { token_type, access_token, error, message } = responseJson

    if (!error) {

      //await AsyncStorage.setItem('personalToken',JSON.stringify(responseJson))  
      const stringifyJson = JSON.stringify(responseJson)
      console.log(`ada apa ni : ${JSON.stringify(responseJson)}`)

      SecureStore.setItemAsync('personalToken', stringifyJson);

      dispatch({ type: 'SET_REGISTER', payload: { access_token } });
      dispatch({ type: 'SET_API_AUTH', payload: { token_type, access_token, token: true } })

      if (screen == 'login' && access_token) {
        dispatch({ type: 'SET_LOGIN', payload: { proceed: true, indicator: false } })
        dispatch({ type: 'SET_API_AUTH', payload: { token_type, access_token, token: true } })
      } else {

        dispatch({ type: 'SET_LOGIN', payload: { proceed: false, indicator: false, ...responseJson } })
        dispatch({ type: 'SET_API_AUTH', payload: { token_type, access_token, token: true } })
      }

    } else {
      dispatch({ type: 'SET_LOGIN', payload: { proceed: false, indicator: false, ...responseJson, token: false, error } })
      dispatch({ type: 'SET_API_AUTH', payload: { error, token: false } })

    }



  }
}

export const requestPersonalTokenLMS = (screen, username, password) => {
  return async (dispatch, getState) => {

    const value = { client_id: '2', client_secret: 'b21IuZWBmOiyKjLNgFA4jvgGHDM5HSFKXx5A5ZB0', grant_type: 'password', username, password }
    const responseJson = await apiPostCall(`api/register`, value, getState().apiReducer, true)

    console.log(`personal token lms ialah : ${JSON.stringify(responseJson)}`)

    const { token_type, access_token } = responseJson

    //await AsyncStorage.setItem('personalToken',JSON.stringify(responseJson))  
    const stringifyJson = JSON.stringify(responseJson)

    SecureStore.setItemAsync('lmsPersonalToken', stringifyJson);

    dispatch({ type: 'SET_REGISTER', payload: { access_token } });

    (screen == 'login' && access_token) ? dispatch({ type: 'SET_LOGIN', payload: { proceed: true, indicator: false } }) :
      dispatch({ type: 'SET_LOGIN', payload: { proceed: false, indicator: false } })



  }
}


export const registerOTPApi = (country_code, mobile_no) => {
  return async (dispatch, getState) => {


    console.log(`api reducer kat registerOTPApi : ${JSON.stringify(getState().apiReducer)}`)


    const value = { country_code, mobile_no }
    const responseJson = await apiPostCall(`api/requestOPT`, value, getState().apiReducer)
    const { status } = await responseJson
    await dispatch({ type: 'SET_OTP', payload: { status } })
    await console.log(`requestOPT  ${JSON.stringify(responseJson)}`)

  }
}

export const verifyPhoneApi = (token_type, access_token, country_code, mobile_no, code) => {
  return async (dispatch, getState) => {

    const value = { country_code, mobile_no, code, access_credential: 'api' }
    const responseJson = await apiPostCall(`api/verifyPhoneData`, value, getState().apiReducer)

    const { status } = await responseJson
    await dispatch({ type: 'VERIFY_OTP', payload: { phoneVerified: status, proceedOTP: true, status } })
    await console.log(`verifyPhone  ${JSON.stringify(responseJson)}`)


  }
}

export const companyInfoAPI = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    console.log(`Company Registration : ${JSON.stringify(getState().companyInformationReducer)}`)
    const companyInfo = getState().companyInformationReducer
    const comp_regdate = companyInfo.reg_date

    console.log(`company info ialah :${JSON.stringify(companyInfo)}`)

    const value = { ...companyInfo, comp_regdate, access_credential: 'api' }
    const responseJson = await apiPostCall(`api/registerCompany/basic`, value, getState().apiReducer)
    const companyRegistrationStatus = await responseJson
    const { status, code } = await responseJson
    await dispatch({ type: 'SET_COMPANY_INFO', payload: { companyRegistrationStatus, code, status, proceedSubmit: true } })
    await console.log(`companyInfo  ${JSON.stringify(responseJson)}`)

  }
}

export const contactPersonAPI = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    console.log(`Company Registration : ${JSON.stringify(getState().companyInformationReducer)}`)
    const { full_name, ic_no, phone, ic_image, position } = getState().companyInformationReducer
    //const comp_regdate=moment(companyInfo.comp_regdate).format("YYYY-MM-DD HH:mm:ss")
    const value = { full_name, ic_no, phone, ic_image, position, access_credential: 'api' }
    const responseJson = await apiPostCall(`api/company/addWorker`, value, getState().apiReducer, true)
    const { status } = await responseJson
    await dispatch({ type: 'SET_COMPANY_INFO', payload: { status, proceedMain: true } })
    await console.log(`companyInfo  ${JSON.stringify(responseJson)}`)

  }
}

export const detailConnectAPI = (capacity, nameCP, icNumber, relationship, emailSME) => {
  return async (dispatch, getState) => {
    console.log(`detail connect api ialah : ${JSON.stringify({ capacity, nameCP, icNumber, relationship, emailSME })}`)
  }
}

export const declarationSignAPI = (declareSign, declareName, declarePosition, declareStamp, declareDate) => {
  return async (dispatch, getState) => {

  }
}


export const urlToBlob = (url) => {

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  })
}