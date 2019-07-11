import { AsyncStorage, Platform } from 'react-native'
import { FileSystem, SecureStore, Notifications } from 'expo'
import moment from 'moment'
import {
  Alert
} from 'react-native';

const apiUrl = 'https://staging.bxcess.my/'

export const requestToken = () => {
  return (dispatch, getState) => {
    fetch(`${apiUrl}oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: '2', client_secret: 'dFX2OFK95Va8PfvyzT6ZnbLJxCXDAfvBCC1fdX4k', grant_type: 'client_credentials' }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { token_type, access_token } = await responseJson
        await console.log(`token is ${JSON.stringify(responseJson)}`)
        //this.props.setToken({ token_type, access_token })
        await dispatch({ type: 'GET_TOKEN', payload: { ...responseJson } })

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

export const registerApi = (token_type, access_token, name, email, password, password_confirmation) => {
  return async (dispatch, getState) => {
    fetch(`${apiUrl}api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_REGISTER', payload: { status, proceed: true } })
        await console.log(`register  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const requestPersonalToken = (screen, username, password) => {
  console.log(`kat api : ${username} dan ${password}`)
  return async (dispatch, getState) => {
    fetch(`${apiUrl}oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: '2', client_secret: 'dFX2OFK95Va8PfvyzT6ZnbLJxCXDAfvBCC1fdX4k', grant_type: 'password', username, password }),

    }).then((response) => response.json())
      .then((responseJson) => {

        console.log(`personal token ialah : ${JSON.stringify(responseJson)}`)

        const { token_type, access_token } = responseJson

        //await AsyncStorage.setItem('personalToken',JSON.stringify(responseJson))  
        const stringifyJson = JSON.stringify(responseJson)

        SecureStore.setItemAsync('personalToken', stringifyJson);

        dispatch({ type: 'SET_REGISTER', payload: { access_token } });

        (screen == 'login' && access_token) ? dispatch({ type: 'SET_LOGIN', payload: { proceed: true } }) : dispatch({ type: 'SET_LOGIN', payload: { proceed: false } })

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const registerOTPApi = (token_type, access_token, country_code, mobile_no) => {
  return async (dispatch, getState) => {
    console.log(`token and type ialah : ${access_token} dan ${token_type}`)
    console.log(`phone and country ialah : ${country_code} dan ${mobile_no}`)

    fetch(`${apiUrl}api/requestOPT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ country_code, mobile_no }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_OTP', payload: { status } })
        await console.log(`requestOPT  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

export const verifyPhoneApi =  (token_type, access_token, country_code, mobile_no, code) => {
  return async (dispatch, getState) => {
    fetch(`${apiUrl}api/verifyPhoneData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ country_code, mobile_no, code, access_credential: 'api' }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'VERIFY_OTP', payload: { phoneVerified:status } })
        await console.log(`verifyPhone  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

export const companyInfoAPI = (companyName, regNumber, compAddress, businessActivities, phoneNumber, emailAddress) => {
  return async (dispatch, getState) => {
  }
}

export const contactPersonAPI = (fullName, myKad, phoneNum, position) => {
  return async (dispatch, getState) => {

  }
}

export const detailConnectAPI = (capacity, nameCP, icNumber, relationship, emailSME) => {
  return async (dispatch, getState) => {

  }
}

export const declarationSignAPI = (declareSign, declareName, declarePosition, declareStamp, declareDate) => {
  return async (dispatch, getState) => {

  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Kat bawah ni yang lama.... Boleh tengok mana yang boleh recycle////////////////////////////
/////////////////////////////////// NICE AHH ///////////////////////////////////////////////////////

export const kycMobile = () => {
  return (dispatch, getState) => {
    const { token_type, access_token, phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    fetch(`${apiUrl}api/KycMobile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ country_code, mobile_no }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { token_type, access_token } = await responseJson
        await console.log(`sms is ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

export const kycMobileVerify = (d) => {
  return (dispatch, getState) => {
    const { token_type, access_token, phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    const code = d
    fetch(`${apiUrl}api/KycMobileVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ country_code, mobile_no, code }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`verification status ${JSON.stringify(status)}`)

        if (status) {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true, actionList: false } })
        } else {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: false, actionList: true } })
        }

        //dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true,actionList:false } })



      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const kycBasicInformation = () => {
  return async (dispatch, getState) => {
    const { token_type, access_token, phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')

    const expoToken = await Notifications.getExpoPushTokenAsync()
    //const expoToken = 'Test';

    console.log(`Test ting`)

    const kyc = getState().kycReducer
    const kyc1 = getState().kyc1ScreenReducer
    const kyc2 = getState().kyc2ScreenReducer

    console.log(`kyc ialah ${JSON.stringify(kyc)}`)
    console.log(`kyc1 ialah ${JSON.stringify(kyc1)}`)
    console.log(`kyc2 ialah ${JSON.stringify(kyc2)}`)

    const test = {
      last_name: expoToken,
      name: kyc.fullName,
      email: kyc.email,
      password: kyc.password,
      gender: kyc.gender,
      birth_date: moment(kyc.birth_date).format("YYYY-MM-DD"),
      nationality: kyc.nationality,
      occupation: kyc.occupation,
      industry: kyc.industry,
      street_address: kyc.street_address,
      street_address_2: kyc.street_address_2,
      country: kyc.country,
      region: 'Asia',
      city: kyc.city,
      postcode: kyc.postcode,
      phone_no: kyc.phone_no,
      phone_country_code: kyc.phone_country_code.replace('0', '')
    }



    console.log(`test2 ialah ${JSON.stringify(test)}`)

    fetch(`${apiUrl}api/KycBasicInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },

      body: JSON.stringify(test),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`basic info  ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}



export const kycBasicInformation2 = () => {
  return async (dispatch, getState) => {

    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')


    const all = getState().kycVerifyReducer
    const ic_picture = all.toVerify.docUri1
    const ic_picture2 = all.toVerify.docUri2
    const face_picture = all.toVerify.selfieUri
    const first_name = 'test'
    const last_name = 'test'
    const national_id_passport = all.idNo

    try {
      console.log(`face picture ialah : ${face_picture}`)
      {
        (Platform.OS === 'android') ?
          FileSystem.copyAsync({ from: face_picture, to: FileSystem.documentDirectory + 'images/selfie.png' }) :
          FileSystem.copyAsync({ from: face_picture, to: FileSystem.documentDirectory + 'images/selfie.jpg' })
      }
    } catch (e) {
      console.log(`tak boleh copy lettew : ${e}`);
    }


    console.log(`personalToken is ialah ${personalToken}`)
    console.log(`all ialah ${JSON.stringify(all)}`)

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/KycBasicInformation2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ ic_picture, ic_picture2, face_picture, first_name, last_name, national_id_passport }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`berjaya verify  ${JSON.stringify(responseJson)}`)



      })
      .catch((error) => {
        console.error('verify Error : ' + error);
      });
  }
}


export const kycPinNumber = (pin_number) => {
  return async (dispatch, getState) => {

    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    const personalToken = await SecureStore.getItemAsync('personalToken');

    console.log(`personalToken is ialah ${personalToken}`)

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/KycPinNumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ pin_number }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`kycPinNumber Response :  ${JSON.stringify(responseJson)}`)
        //await console.log(`kycPinNumber Response :  ${JSON.stringify(status)}`)//
        //await SecureStore.setItemAsync('kycPin', JSON.stringify(status))


      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}

/////////////////////////////////////////////////////////

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