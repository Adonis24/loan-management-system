import { Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'

// import Amplify, { Auth,Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// Amplify.configure(aws_exports);///

import moment from 'moment'


// import Amplify, { Auth, Storage } from 'aws-amplify';
// import aws_exports from '../../aws-exports';
// import { sendNotification } from './action';
// Amplify.configure(aws_exports);///

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

const apiPostCall = async (uri, values, apiAccess) => {

  const body = JSON.stringify({ ...values, access_credential: 'api' })

  const access = apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken'))

  const { token_type, access_token } = access
  const method = 'POST'
  const Accept = 'application/json'
  const Authorization = token_type + ' ' + access_token

  const headers = { 'Content-Type': 'application/json', Accept, Authorization }
  let response = await fetch(`${apiUrl}${uri}`, { method, headers, body })
  let responseJson = await response.json()
  return responseJson

}



export const newsApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/news/view`, null, getState().apiReducer)
    const newsArray = await responseJson.data
    // await console.log(`NEWS API  ${JSON.stringify(newsArray)}`)

    await dispatch({ type: 'SET_NEWS', payload: { newsArray } })


  }
}

export const eventApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/events/view`, null, getState().apiReducer)
    const eventArray = await responseJson.data
    //await console.log(`EVENT API  ${JSON.stringify(eventArray)}`)

    await dispatch({ type: 'SET_EVENT', payload: { eventArray } })


  }
}


export const promotionApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/promotions/view`, null, getState().apiReducer)

    const promotionArray = await responseJson.data

    await dispatch({ type: 'SET_PROMOTION', payload: { promotionArray } })


  }
}

export const handbooksApi = () => {
  return async (dispatch, getState) => {
   
    const responseJson = await apiPostCall(`api/handbooks/view`, null, getState().apiReducer)
    
 
    const handbooksArray = await responseJson.data
    await console.log(`HANDBOOKS API  ${JSON.stringify(handbooksArray)}`)

    await dispatch({ type: 'SET_HANDBOOKS', payload: { handbooksArray } })
    
    
  }
}


{/*export const einfoApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/einfos/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`EINFO API  ${JSON.stringify(einfosArray)}`)

        await dispatch({ type: 'SET_EINFO', payload: { einfosArray } })
      })
      .catch((error) => {
        console.log('Error E-info Api : ' + error);
      });
  }
} */}

export const einfoApi = () => {
  return async (dispatch, getState) => {


    const responseJson = await apiPostCall(`api/einfos/view`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`EINFO API  ${JSON.stringify(einfosArray)}`)

    await dispatch({ type: 'SET_EINFO', payload: { einfosArray } })


    
  }
}


export const bizDirApi = () => {
  return async (dispatch, getState) => {
    
    const responseJson = await apiPostCall(`api/business_directory/listAllDirectory`, null, getState().apiReducer)
    
    //console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const bizDirArray = await responseJson.data
    //await console.log(`BIZDIR API  ${JSON.stringify(bizDirArray)}`)

    await dispatch({ type: 'SET_BIZ_DIR', payload: { bizDirArray } })

    
  }
}

export const getAssociateApi = () => {
  return async (dispatch, getState) => {
   
    const responseJson = await apiPostCall(`api/business_directory/listAssociateDirectory`, null, getState().apiReducer)
    //console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const assoDirArray = await responseJson.data
    //await console.log(`assoc API  ${JSON.stringify(assoDirArray)}`)

    await dispatch({ type: 'SET_ASSO_DIR', payload: { assoDirArray } })

    
  }
}


export const getPendingApi = () => {
  return async (dispatch, getState) => {
    
    const responseJson = await apiPostCall(`api/business_directory/listRequestDirectory`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const pendingDirArray = await responseJson.data
    await console.log(`assoc API  ${JSON.stringify(pendingDirArray)}`)

    await dispatch({ type: 'SET_PENDING_DIR', payload: { pendingDirArray } })
    
  }
}


export const listAgencyApi = () => {
  return async (dispatch, getState) => {
    
    const responseJson = await apiPostCall(`api/agency/listAgencies`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const agencyArray = await responseJson.data
    await console.log(`agency list API  ${JSON.stringify(agencyArray)}`)

    await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
    

  }
}

export const loanInfoApi = (page) => {
  return async (dispatch, getState) => {
   
    
    const responseJson = await apiPostCall(`api/loan/viewLoanInformation?page=${page}`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const loanInfo = await responseJson.data
    await console.log(`loan info API  ${JSON.stringify(loanInfo)}`)

    await dispatch({ type: 'SET_LOAN_INFO', payload: { ...loanInfo } })
    
  }
}

export const grantInfoApi = (page) => {
  return async (dispatch, getState) => {


    const responseJson = await apiPostCall(`api/grant/listGrantInformation?page=${page}`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const grantInfo = await responseJson.data
    await console.log(`grant info list API  ${JSON.stringify(grantInfo)}`)

    await dispatch({ type: 'SET_GRANT_INFO', payload: { ...grantInfo } })


    
  }
}

{/*export const addExpoTokenApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    console.log(`expo registrationReducer ${expo_token}`)
    const access_credential = 'api'
    fetch(`${apiUrl}api/user/expo_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, expo_token }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const agencyArray = await responseJson.data
        await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
} */}


export const addExpoTokenApi = () => {
  return async (dispatch, getState) => {

    
    const { expo_token } = getState().registrationReducer

    console.log(`expo registrationReducer ${expo_token}`)
    const responseJson = await apiPostCall(`api/user/expo_token`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const agencyArray = await responseJson.data
    await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

    //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })


    
  }
}

{ /*export const requestConnectApi = (connect_id) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'

    console.log(`connect id ialah : ${connect_id}`)
    fetch(`${apiUrl}api/business_directory/request_connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, connect_id }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
        //const agencyArray = await responseJson.data
        //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
} */}

export const requestConnectApi = (connect_id) => {
  return async (dispatch, getState) => {

    console.log(`connect id ialah : ${connect_id}`)
    const responseJson = await apiPostCall(`api/business_directory/request_connection`, null,connect_id, getState().apiReducer)
   
    console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
    //const agencyArray = await responseJson.data
   //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

  //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })


    
  }
}



{/*export const acceptApi = (connect_id) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'

    console.log(`connect id ialah : ${connect_id}`)
    fetch(`${apiUrl}api/business_directory/acceptConnection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, connect_id }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
        //const agencyArray = await responseJson.data
        //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
}*/ } 


export const acceptApi = (connect_id) => {
  return async (dispatch, getState) => {

    console.log(`connect id ialah : ${connect_id}`)
    const responseJson = await apiPostCall(`api/business_directory/acceptConnection`, null,connect_id, getState().apiReducer)
   
    console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
    //const agencyArray = await responseJson.data
   //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

  //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })


    
  }
}



{/*export const connectionStatusApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'
    fetch(`${apiUrl}api/business_directory/analyticBusinessDirectory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential, expo_token }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const connectionStatus = await responseJson.data
        await console.log(`connectionstatus API  ${JSON.stringify(connectionStatus)}`)

        //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })
        await dispatch({ type: 'SET_USER_PROFILE', payload: { ...connectionStatus } })
      })
      .catch((error) => {
        console.log('Error expo token Api : ' + error);
      });
  }
} */}


export const connectionStatusApi = () => {
  return async (dispatch, getState) => {
    
    const responseJson = await apiPostCall(`api/business_directory/analyticBusinessDirectory`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const connectionStatus = await responseJson.data
    await console.log(`connectionstatus API  ${JSON.stringify(connectionStatus)}`)

    await dispatch({ type: 'SET_USER_PROFILE', payload: { ...connectionStatus } })


    
  }
}


{/*export const applyLoanApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer
    fetch(`${apiUrl}api/loan/addInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ proposal, income_tax, loan_amount, estimate_time, payment_method, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)


      })
      .catch((error) => {
        console.log('Error Loan Application : ' + error);
      });
  }
} */}

export const applyLoanApi = () => {
  return async (dispatch, getState) => {

    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer

    const responseJson = await apiPostCall(`api/loan/addInformation`, null,proposal, income_tax, loan_amount, estimate_time, payment_method , getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)

    

  }
}



{/*export const applyGrantApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, agency_id } = getState().grantApplicationReducer
    console.log(`inilah apply grant : ${JSON.stringify(getState().grantApplicationReducer)}`)
    fetch(`${apiUrl}api/grant/addGrantInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ proposal, income_tax, agency_id, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah grant: ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)


      })
      .catch((error) => {
        console.log('Error Loan Application : ' + error);
      });
  }
} */}

export const applyGrantApi = () => {
  return async (dispatch, getState) => {

    const { proposal, income_tax, agency_id } = getState().grantApplicationReducer

    console.log(`inilah apply grant : ${JSON.stringify(getState().grantApplicationReducer)}`)
    const responseJson = await apiPostCall(`api/grant/addGrantInformation`, null,proposal, income_tax, agency_id , getState().apiReducer)

    console.log(`inilah grant: ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)

    

  }
}


{/*export const uploadDocApi = (blob) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer
    // const {document,document_name,}

    const document = blob
    const document_name = 'testing'
    fetch(`${apiUrl}api/uploadDocument`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ document, document_name, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const einfosArray = await responseJson.data
        await console.log(`upload success  ${JSON.stringify(einfosArray)}`)


      })
      .catch((error) => {
        console.log('Error Upload : ' + error);
      });
  }
} */}

export const uploadDocApi = (blob) => {
  return async (dispatch, getState) => {

    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer
    const document = blob
    const document_name = 'testing'

    console.log(`inilah apply grant : ${JSON.stringify(getState().grantApplicationReducer)}`)
    const responseJson = await apiPostCall(`api/grant/addGrantInformation`, null,document, document_name , getState().apiReducer)

    console.log(`inilah grant: ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)

    

  }
}



{/*export const getUserInfoApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/user/information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const userProfile = await responseJson.data
        await console.log(`USER  ${JSON.stringify(userProfile)}`)

        await dispatch({ type: 'SET_USER_PROFILE', payload: { ...userProfile } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
} */}

export const getUserInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/user/information`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const userProfile = await responseJson.data
    await console.log(`USER  ${JSON.stringify(userProfile)}`)

    await dispatch({ type: 'SET_USER_PROFILE', payload: { ...userProfile } })


    
  }
}

{/*export const editUserApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    const { name, full_name, profile_pic } = getState().myAccountReducer
    fetch(`${apiUrl}api/user/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ name, full_name, profile_pic, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {

        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const userProfile = await responseJson.data

        await console.log(`USER  ${JSON.stringify(userProfile)}`)

        //await dispatch({ type: 'EDIT_USER_PROFILE', payload: { ...userProfile } })
      })
      .catch((error) => {
        console.log('Error Event Api : ' + error);
      });
  }
} */}

export const editUserApi = () => {
  return async (dispatch, getState) => {

    const { name, full_name, profile_pic } = getState().myAccountReducer

    const responseJson = await apiPostCall(`api/user/edit`, null, name, full_name, profile_pic, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const userProfile = await responseJson.data
    await console.log(`USER  ${JSON.stringify(userProfile)}`)

    //await dispatch({ type: 'SET_USER_PROFILE', payload: { ...userProfile } })


    
  }
}

export const generateJWTApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/jwt/generate`, getState().apiReducer)

    const jwt = await responseJson.data
    // await console.log(`Company Info  ${JSON.stringify(bizInfo)}`)

    await dispatch({ type: 'SET_USER_PROFILE', payload: { jwt } })


  }
}




export const getCompanyInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/companyInfo`, getState().apiReducer)
    const bizInfo = await responseJson.data
    await console.log(`Company Info  ${JSON.stringify(bizInfo)}`)

    await dispatch({ type: 'GET_BIZ_INFO', payload: { ...bizInfo } })


  }
}



{/*export const getListWorkersApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/company/listWorkers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const listWorkers = await responseJson.data
        // await console.log(`Company Info  ${JSON.stringify(eventArray)}`)

        await dispatch({ type: 'GET_LIST_WORKERS', payload: { listWorkers } })
      })
      .catch((error) => {
        console.log('Error WORKER Api : ' + error);
      });
  }
} */}

export const getListWorkersApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/company/listWorkers`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const listWorkers = await responseJson.data
   // await console.log(`Company Info  ${JSON.stringify(eventArray)}`)

   await dispatch({ type: 'GET_LIST_WORKERS', payload: { listWorkers } })


    
  }
}





export const sendNotificationApi = (expo_token, id) => {
  return async (dispatch, getState) => {

    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate',
        'content-type': 'application/json',
      }, body: JSON.stringify({ to: expo_token, title: 'BXcess Notification', body: 'None', data: { id } }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON sendNotification : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error sendNotification : ' + error);
      });
  }
}



{/* export const doneForNowApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const access_credential = 'api'
    fetch(`${apiUrl}api/registerCompany/additional`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }, body: JSON.stringify({ access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
        const done = await responseJson.data
        await console.log(`Company Info  ${JSON.stringify(done)}`)
        //await dispatch({ type: 'GET_LIST_WORKERS', payload: { ...listWorkers } })
      })
      .catch((error) => {
        console.log('Error WORKER Api : ' + error);
      });
  }
} */}

export const doneForNowApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/registerCompany/additional`, null, getState().apiReducer)
   
    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const done = await responseJson.data
    await console.log(`Company Info  ${JSON.stringify(done)}`)

   //await dispatch({ type: 'GET_LIST_WORKERS', payload: { ...listWorkers } })


    
  }
}





export const getCoursesApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/courses`, getState().apiReducer, true)

    const trainingArray = await responseJson.data


    await dispatch({ type: 'GET_COURSES', payload: { trainingArray } })


    fetch(`${lmsApiUrl}api/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON  training: ${JSON.stringify(responseJson)}`)
        const trainingArray = await responseJson.data
        await console.log(`Training Info  ${JSON.stringify(trainingArray)}`)

        await dispatch({ type: 'GET_COURSES', payload: { trainingArray } })
      })
      .catch((error) => {
        console.log('Error TRAINING Api : ' + error);
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

    const responseJson = await apiGetCall(`api/userInfo`, getState().apiReducer)

    const selfieKey = await responseJson.data.filename_2
    var selfieUri = ''

    await Storage.get(selfieKey)
      .then(async result => {
        await dispatch({ type: 'SET_DASHBOARD', payload: { userInfo: { ...responseJson.data, ...{ selfieUri: result } } } })
      })
      .catch(err => console.log('error : ' + err))


  }
}



export const latestTransaction = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/LatestTransaction`, getState().apiReducer)

    dispatch({ type: 'SET_DASHBOARD', payload: { latestTransaction: responseJson.data } })

  }
}

export const analyticSummary = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/AnalyticSummary`, getState().apiReducer)
    dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary: responseJson.data } })


  }
}

{/*export const analytic = () => {
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
} */}

export const analytic = () => {
  return async (dispatch, getState) => {

    const type = 'Deposit'
    const credit_debit = 'Credit'

    const responseJson = await apiPostCall(`api/Analytic`, null,type, credit_debit, getState().apiReducer)
   
    await console.log(`analytic  info  ${JSON.stringify(responseJson)}`)
    dispatch({ type: 'SET_ANALYTIC', payload: { analyticSummary: responseJson.data } })


    
  }
}

export const notificationApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/Notification`, getState().apiReducer)
    const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]

    dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })


  }
}


{/*export const depositApi = () => {
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
} */}

export const depositApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().depositScreenReducer
    const type = 'Deposit'
    const tag = ''
    const channel = 'Deposit Channel'
    const pin = '' + d1 + d2 + d3 + d4
    const remarks = 'Deposit from ' + bank

    console.log(`amount ialah ${amount}`)

    const responseJson = await apiPostCall(`api/Deposit`, null, amount, tag, channel, pin, access_credential, remarks , getState().apiReducer)
   
        const { status } = await responseJson
        await console.log(`deposit ${JSON.stringify(responseJson)}`)
        await dispatch({ type: 'SET_DEPOSIT', payload: { status } })


   


    
  }
}



export const userList = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/userList`, getState().apiReducer)
    const recipientList = await responseJson.data
    const phoneNoList = await []
    const phoneNoList6 = await []

    await recipientList.map(rL => {

      phoneNoList.push(rL.phone_no)
      phoneNoList6.push((rL.phone_no ? rL.phone_no.replace(/[^A-Z0-9]+/ig, "").substr(rL.phone_no.length - 6) : 'NA'))
    })


    await dispatch({ type: 'SET_RECIPIENT_LIST', payload: { recipientList, phoneNoList, phoneNoList6, memberFilter: true } })
    await dispatch({ type: 'SET_PAYER_LIST', payload: { payerList: recipientList, phoneNoList, phoneNoList6, memberFilter: true } })

  }
}


{/*export const sendMoney = () => {
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
} */}

export const sendMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no, recipientRemark, d1, d2, d3, d4, expoToken } = getState().transferOutScreenReducer
    const pin = '' + d1 + d2 + d3 + d4
    const phone = phone_no
    const access_credential = 'api'
    const remarks = recipientRemark

    console.log(`expo token ialah ${amount}`)

    const responseJson = await apiPostCall(`api/SendMoney`, null, phone, amount, pin, access_credential, remarks, getState().apiReducer)
   
    const { status } = await responseJson
    status ? await dispatch(pushNotification(expoToken)) : null
    await console.log(`send money : ${JSON.stringify(responseJson)}`)


    


    
  }
}

{/*export const withdrawApi = () => {
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
} */}

export const withdrawApi = () => {
  return async (dispatch, getState) => {

    const { amount, bank, d1, d2, d3, d4 } = getState().withdrawScreenReducer
    const tag = ''
    const channel = 'Withdraw Channel'
    const pin = '' + d1 + d2 + d3 + d4
    const withdraw_currency = 'MYR'
    const access_credential = 'api'
    const remarks = 'Withdraw from ' + bank

    console.log(`amount ialah ${amount}`)

    const responseJson = await apiPostCall(`api/Withdraw`, null, amount, channel, withdraw_currency, tag, access_credential, pin, remarks, getState().apiReducer)
   
    const { status } = await responseJson
    await console.log(`withdraw ${JSON.stringify(responseJson)}`)
    await dispatch({ type: 'SET_WITHDRAW', payload: { status } })

    


    
  }
}


{/*export const requestMoney = () => {
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
} */}

export const requestMoney = () => {
  return async (dispatch, getState) => {

    const { amount, phone_no } = getState().requestScreenReducer

    // const pin='1111'
    const payer_phone = phone_no
    //const payer='59707060'
    const remark = 'NA'


    console.log(`amount ialah ${amount}`)
    const responseJson = await apiPostCall(`api/RequestMoney`, null, amount, payer_phone, access_credential, remark, getState().apiReducer)
   
    const { status } = await responseJson
        await console.log(`request money : ${JSON.stringify(responseJson)}`)
    
  }
}

{/*export const payRequestMoney = () => {
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
} */}

export const payRequestMoney = () => {
  return async (dispatch, getState) => {

    const { amount } = getState().requestScreenReducer

    const pin = '1111'
    const references = '004458557598369'

    const payer = '59707060'
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    console.log(`amount ialah ${amount}`)
    const responseJson = await apiPostCall(`api/RequestMoney`, null, references, payer , getState().apiReducer)
   
    const { status } = await responseJson
    await console.log(`pay request money : ${JSON.stringify(responseJson)}`)

  }
}


{/*export const resetPinApi = () => {
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
} */}

export const resetPinApi = () => {
  return async (dispatch, getState) => {

    const { d1, d2, d3, d4, n1, n2, n3, n4 } = await getState().resetPinReducer
    const old_pin = '' + d1 + d2 + d3 + d4
    const new_pin = '' + n1 + n2 + n3 + n4
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    const responseJson = await apiPostCall(`api/resetPin`, null,old_pin, new_pin, getState().apiReducer)
   
    await console.log(`reset pin ${JSON.stringify(responseJson)}`)
    //dispatch({ type: 'SET_DASHBOARD', payload: { analyticSummary:responseJson.data } })      

  }
}

{/*export const editMobileDetail = () => {
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
} */}

export const editMobileDetail = () => {
  return async (dispatch, getState) => {

    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    // const personalToken=JSON.parse(AsyncStorage.getItem('personalToken'))

    const responseJson = await apiPostCall(`api/EditMobileDetail`, null,country_code, mobile_no , getState().apiReducer)
   
    const { token_type, access_token } = await responseJson
    await console.log(`sms is ${JSON.stringify(responseJson)}`)  

  }
}

{/*export const editMobileDetailVerify = (d) => {
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
} */}
 
export const editMobileDetailVerify = (d) => {
  return async (dispatch, getState) => {

    const { phone_country_code, phone_no } = getState().kycReducer
    const mobile_no = phone_no
    const country_code = phone_country_code.replace('0', '')
    const code = d

    const responseJson = await apiPostCall(`api/KycMobileVerify`, null,country_code, mobile_no, code, getState().apiReducer)
   
    const { status } = await responseJson
        await console.log(`verification status ${JSON.stringify(status)}`)

        if (status) {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true, actionList: false } })
        } else {
          await dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: false, actionList: true } })
        }

        //dispatch({ type: 'SET_INDICATOR_PHONE_VERIFICATION', payload: { displayIndicator: false, proceed: true,actionList:false } })



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

{/*export const editPersonalDetail = () => {
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
} */}

export const editPersonalDetail = () => {
  return async (dispatch, getState) => {

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

    const responseJson = await apiPostCall(`api/EditPersonalDetail`, null,test, getState().apiReducer)
   
    const { status } = await responseJson
    await console.log(`edit info  ${JSON.stringify(responseJson)}`)


  }
}