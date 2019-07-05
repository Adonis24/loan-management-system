import { AsyncStorage } from 'react-native'
import { SecureStore, Notifications } from 'expo'
import moment from 'moment'


// import Amplify, { Auth, Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// import { sendNotification } from './action';
// Amplify.configure(aws_exports);///

const apiUrl = 'https://staging.bizxcess.my/'

export const newsApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/news/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const newsArray = await responseJson.data
        await console.log(`NEWS API  ${JSON.stringify(newsArray)}`)

        await dispatch({ type: 'SET_NEWS', payload: { newsArray } })
      })
      .catch((error) => {
        console.log('Error News Api : ' + error);
      });
  }
}

export const eventApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/events/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const eventArray = await responseJson.data
        await console.log(`EVENT API  ${JSON.stringify(eventArray)}`)

        await dispatch({ type: 'SET_EVENT', payload: { eventArray } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
}


export const promotionApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/promotions/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const promotionArray = await responseJson.data
        await console.log(`PROMOTION API  ${JSON.stringify(promotionArray)}`)

        await dispatch({ type: 'SET_PROMOTION', payload: { promotionArray } })
      })
      .catch((error) => {
        console.log('Error Promotion Api : ' + error);
      });
  }
}

export const handbooksApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/handbooks/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const handbooksArray = await responseJson.data
        await console.log(`HANDBOOKS API  ${JSON.stringify(handbooksArray)}`)

        await dispatch({ type: 'SET_HANDBOOKS', payload: { handbooksArray } })
      })
      .catch((error) => {
        console.log('Error Handbooks Api : ' + error);
      });
  }
}



//////////////////////////////////LUNAWALLET/////////////////////////////////////////

export const getUrl = (pic) => {
  var kucing = ''
  Storage.get(pic)
    .then(result => kucing = result)
    .catch(err => console.log('error : ' + err))
  return kucing
}

export const userInfo = () => {
  return async (dispatch, getState) => {
    //const personalToken = await AsyncStorage.getItem('personalToken');    
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/userInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const selfieKey = await responseJson.data.filename_2
        var selfieUri = ''

        await Storage.get(selfieKey)
          .then(async result => {
            await dispatch({ type: 'SET_DASHBOARD', payload: { userInfo: { ...responseJson.data, ...{ selfieUri: result } } } })
          })
          .catch(err => console.log('error : ' + err))
      })
      .catch((error) => {
        console.log('Error initiating dashboard : ' + error);
      });
  }
}



export const latestTransaction = () => {
  return async (dispatch, getState) => {
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/LatestTransaction`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {


        await console.log(`latest transaction info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_DASHBOARD', payload: { latestTransaction: responseJson.data } })


      })
      .catch((error) => {
        console.log('Error latest transaction : ' + error);
      });
  }
}

export const analyticSummary = () => {
  return async (dispatch, getState) => {



    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/AnalyticSummary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`analytic summary info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary: responseJson.data } })
      })
      .catch((error) => {
        console.log('Error analytic summary : ' + error);
      });
  }
}

export const analytic = () => {
  return async (dispatch, getState) => {
    const type = 'Deposit'
    const credit_debit = 'Credit'

    //const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Analytic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ type, credit_debit }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`analytic  info  ${JSON.stringify(responseJson)}`)
        dispatch({ type: 'SET_ANALYTIC', payload: { analyticSummary: responseJson.data } })
      })
      .catch((error) => {
        console.log('Error analytic : ' + error);
      });
  }
}

export const notificationApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Notification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]

        dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })


      })
      .catch((error) => {
        console.log('Error initiating notification : ' + error);
      });
  }
}


export const depositApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().depositScreenReducer
    const type = 'Deposit'
    const tag = ''
    const channel = 'Deposit Channel'
    const pin = '' + d1 + d2 + d3 + d4

    const access_credential = 'api'
    const remarks = 'Deposit from ' + bank
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)


    fetch(`${apiUrl}api/Deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, tag, channel, pin, access_credential, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`deposit ${JSON.stringify(responseJson)}`)
        await dispatch({ type: 'SET_DEPOSIT', payload: { status } })



      })
      .catch((error) => {
        console.log('Error deposit : ' + error);
      });
  }
}

export const userList = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/userList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`list of recipient  ${JSON.stringify(responseJson)}`)
        const recipientList = await responseJson.data
        const phoneNoList = await []
        const phoneNoList6 = await []

        await recipientList.map(rL => {

          phoneNoList.push(rL.phone_no)
          phoneNoList6.push((rL.phone_no ? rL.phone_no.replace(/[^A-Z0-9]+/ig, "").substr(rL.phone_no.length - 6) : 'NA'))
        })


        await dispatch({ type: 'SET_RECIPIENT_LIST', payload: { recipientList, phoneNoList, phoneNoList6, memberFilter: true } })
        await dispatch({ type: 'SET_PAYER_LIST', payload: { payerList: recipientList, phoneNoList, phoneNoList6, memberFilter: true } })

      })
      .catch((error) => {
        console.log('Error userList: ' + error);
      });
  }
}


export const sendMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no, recipientRemark, d1, d2, d3, d4, expoToken } = getState().transferOutScreenReducer
    const pin = '' + d1 + d2 + d3 + d4
    const phone = phone_no
    const access_credential = 'api'
    const remarks = recipientRemark

    //0 const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`expo token ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken'); 
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const { token_type, access_token } = JSON.parse(personalToken)
    fetch(`${apiUrl}api/SendMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ phone, amount, pin, access_credential, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        status ? await dispatch(pushNotification(expoToken)) : null
        await console.log(`send money : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error send money : ' + error);
      });
  }
}


export const withdrawApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().withdrawScreenReducer
    //const type='Deposit'
    const tag = ''
    const channel = 'Withdraw Channel'
    const pin = '' + d1 + d2 + d3 + d4
    const withdraw_currency = 'MYR'
    const access_credential = 'api'
    const remarks = 'Withdraw from ' + bank
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')



    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/Withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, channel, withdraw_currency, tag, access_credential, pin, remarks }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`withdraw ${JSON.stringify(responseJson)}`)
        await dispatch({ type: 'SET_WITHDRAW', payload: { status } })


      })
      .catch((error) => {
        console.log('Error withdraw : ' + error);
      });
  }
}


export const requestMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no } = getState().requestScreenReducer

    // const pin='1111'
    const payer_phone = phone_no
    const access_credential = 'api'
    //const payer='59707060'
    const remark = 'NA'


    console.log(`amount ialah ${amount}`)
    // const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')


    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/RequestMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ amount, payer_phone, access_credential, remark }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`request money : ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const payRequestMoney = () => {
  return async (dispatch, getState) => {

    const { amount } = getState().requestScreenReducer

    const pin = '1111'
    const references = '004458557598369'

    const payer = '59707060'
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    //const personalToken = await AsyncStorage.getItem('personalToken');    
    const personalToken = await SecureStore.getItemAsync('personalToken')


    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/payRequestMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ references, payer }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { status } = await responseJson
        await console.log(`pay request money : ${JSON.stringify(responseJson)}`)



      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}


export const resetPinApi = () => {
  return async (dispatch, getState) => {

    const { d1, d2, d3, d4, n1, n2, n3, n4 } = await getState().resetPinReducer
    const old_pin = '' + d1 + d2 + d3 + d4
    const new_pin = '' + n1 + n2 + n3 + n4

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')


    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/resetPin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      },
      body: JSON.stringify({ old_pin, new_pin }),

    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`reset pin ${JSON.stringify(responseJson)}`)
        //dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary:responseJson.data } })           
      })
      .catch((error) => {
        console.log('reset pin error : ' + error);
      });
  }
}

export const editMobileDetail = () => {
  return async (dispatch, getState) => {
    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')

    //const personalToken = await AsyncStorage.getItem('personalToken');   
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/EditMobileDetail`, {
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

export const editMobileDetailVerify = (d) => {
  return async (dispatch, getState) => {
    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    const code = d
    // const personalToken = await AsyncStorage.getItem('personalToken'); 
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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



/////////////////////////////

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

export const uploadImage = async (fileName, blob, contentType) => {
  await Storage.put(fileName, blob, contentType).then(data => {
    //this.props.savePicture(data.key, kidId)
    console.log('save success')
    //this.props.navigation.goBack()
  })
    .catch(err => console.log(err))
}

export const pushNotification = (expoToken) => {
  return async (dispatch, getState) => {
    const data = { nama: 'Syahrizan' }
    const to = expoToken//android
    //const to = 'ExponentPushToken[XXMeNqKO_IQNthjQU8uxgO]'//iphone
    const title = 'test'
    const body = 'body'

    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
      },
      body: JSON.stringify({ data, to, title, body }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`pay request money : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const editPersonalDetail = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    const expoToken = await Notifications.getExpoPushTokenAsync();
    const dashboard = getState().dashboardScreenReducer.userInfo
    //const password = getState().editInfoScreenReducer.password

    const test = {
      first_name: dashboard.name,
      last_name: expoToken,
      name: dashboard.name,
      email: dashboard.email,
      password: getState().editInfoScreenReducer.password,
      gender: dashboard.gender,
      birth_date: moment(dashboard.birth_date).format("YYYY-MM-DD"),
      nationality: dashboard.nationality,
      occupation: dashboard.occupation,
      industry: dashboard.industry,
      street_address: dashboard.street_address,
      street_address_2: dashboard.street_address_2,
      country: dashboard.country,
      region: 'Asia',
      city: dashboard.city,
      postcode: dashboard.postcode,
      national_id_passport: dashboard.national_id_passport
    }




    console.log(`dashboard ialah ${JSON.stringify(dashboard)}`)
    console.log(`expo token ialah ${JSON.stringify(expoToken)}`)


    fetch(`${apiUrl}api/EditPersonalDetail`, {
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
        await console.log(`edit info  ${JSON.stringify(responseJson)}`)

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}