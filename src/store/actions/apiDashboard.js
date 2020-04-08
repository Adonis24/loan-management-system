import { Notifications } from 'expo'
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
    const bizDirArray = await responseJson.data
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

export const applyfinancingApi = (page) => {
  return async (dispatch, getState) => {

    const { negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan, bank, noAkaun, typeBusiness, name, icNumber, agama, tarikhLahir, jantina, alamat, alamat_2, phoneNum, email, poskod, alamatComp, pendapatan, pekerjaan, status, pembiayaan, relationship, cpName, cpIcNumber, cpPekerjaan, cpPendapatan, cpPhoneNum, cpAlamat, cpAlamat_2, cpPoskod, compPendapatan, compPhoneNum, compAlamat, compAlamat_2, compPoskod, refAlamat, refAlamat_2, refName, refPhoneNum, valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, } = getState().financingReducer

    const responseJson = await apiPostCall(`api/loan/addFinancingInformation`, null, negeri, cawanganParlimen, pengundiBerdaftar, statusPerniagaan, bank, noAkaun, typeBusiness, name, icNumber, agama, tarikhLahir, jantina, alamat, alamat_2, phoneNum, email, poskod, alamatComp, phoneNum, pendapatan, pekerjaan, status, pembiayaan, relationship, cpName, cpIcNumber, cpPekerjaan, cpPendapatan, cpPhoneNum, cpAlamat, cpAlamat_2, cpPoskod, compPendapatan, compPhoneNum, compAlamat, compAlamat_2, compPoskod, refAlamat, refAlamat_2, refName, refPhoneNum, valAlamat, valAlamat_2, valName, valPhoneNum, jawatan, getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Financing  ${JSON.stringify(einfosArray)}`)


  }
}

export const applyBusinessPlanApi = (page) => {
  return async (dispatch, getState) => {

    const { } = getState().businessPlanningReducer

    const responseJson = await apiPostCall(`api/loan/addBusinessPlanInformation`, null, getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Business Plan  ${JSON.stringify(einfosArray)}`)


  }
}



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



export const requestConnectApi = (connect_id) => {
  return async (dispatch, getState) => {

    console.log(`connect id ialah : ${connect_id}`)
    const responseJson = await apiPostCall(`api/business_directory/request_connection`, null, connect_id, getState().apiReducer)

    console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)


  }
}




export const acceptApi = (connect_id) => {
  return async (dispatch, getState) => {

    console.log(`connect id ialah : ${connect_id}`)
    const responseJson = await apiPostCall(`api/business_directory/acceptConnection`, null, connect_id, getState().apiReducer)

    console.log(`inilah request connect : ${JSON.stringify(responseJson)}`)
    //const agencyArray = await responseJson.data
    //await console.log(`expo token API  ${JSON.stringify(agencyArray)}`)

    //await dispatch({ type: 'SET_AGENCY_LIST', payload: { agencyArray } })



  }
}





export const connectionStatusApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/business_directory/analyticBusinessDirectory`, null, getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const connectionStatus = await responseJson.data
    await console.log(`connectionstatus API  ${JSON.stringify(connectionStatus)}`)

    await dispatch({ type: 'SET_USER_PROFILE', payload: { ...connectionStatus } })



  }
}



export const applyLoanApi = () => {
  return async (dispatch, getState) => {

    const { proposal, income_tax, loan_amount, estimate_time, payment_method } = getState().loanApplicationReducer

    const responseJson = await apiPostCall(`api/loan/addInformation`, null, proposal, income_tax, loan_amount, estimate_time, payment_method, getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)



  }
}


export const applyGrantApi = () => {
  return async (dispatch, getState) => {

    const { proposal, income_tax, agency_id } = getState().grantApplicationReducer

    console.log(`inilah apply grant : ${JSON.stringify(getState().grantApplicationReducer)}`)
    const responseJson = await apiPostCall(`api/grant/addGrantInformation`, null, proposal, income_tax, agency_id, getState().apiReducer)

    console.log(`inilah grant: ${JSON.stringify(responseJson)}`)
    const einfosArray = await responseJson.data
    await console.log(`Loan Application  ${JSON.stringify(einfosArray)}`)



  }
}




export const getUserInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`api/user/information`, null, getState().apiReducer)

    console.log(`inilah response JSON : ${JSON.stringify(responseJson)}`)
    const userProfile = await responseJson.data
    await console.log(`USER  ${JSON.stringify(userProfile)}`)

    await dispatch({ type: 'SET_USER_PROFILE', payload: { ...userProfile } })



  }
}


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



export const notificationApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/Notification`, getState().apiReducer)
    const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]

    dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })


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
////////////////////////////////////

export const saveLoanDataApi = () => {
  return async (dispatch, getState) => {
    const loanDataReducer = getState().financingReducer

    const loanData = JSON.parse(await SecureStore.getItemAsync('loanData'))
    console.log(`bakal di save : ${JSON.stringify(loanDataReducer)}`)
    console.log(`dalam storage: ${JSON.stringify(loanData)}`)

    if (loanData) {
      console.log(`something in memory`)
      console.log(JSON.stringify(loanData))
      const newLoanData = { ...loanData, ...loanDataReducer }
      await SecureStore.setItemAsync('loanData', JSON.stringify(newLoanData))
    } else {
      await SecureStore.setItemAsync('loanData', JSON.stringify(loanDataReducer))

    }


    // const responseJson = await apiGetCall(`api/Notification`, getState().apiReducer)
    // const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]

    // dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })


  }
}

export const resetFormApi = () => {
  return async (dispatch, getState) => {
    await SecureStore.deleteItemAsync('loanData')
    console.log(`delete form dalam storage`)
  }
}


export const saveLocationApi = (x) => {
  return async (dispatch, getState) => {

    const location = JSON.parse(await SecureStore.getItemAsync('location'))

    console.log(`bakal di save : ${JSON.stringify(x)}`)
    console.log(`dalam storage: ${JSON.stringify(location)}`)

    if (location) {
      console.log(`something in memory`)
      console.log(JSON.stringify(location))
      //const newLocation = { ...loanData, ...loanDataReducer }
      await SecureStore.setItemAsync('location', JSON.stringify(x))
    } else {
      await SecureStore.setItemAsync('location', JSON.stringify(x))
    }


  }
}


export const getLocationApi = (x) => {
  return async (dispatch, getState) => {

    const location = JSON.parse(await SecureStore.getItemAsync('location'))

    if (location) {
      dispatch({ type: 'SET_LOCATION', payload: { ...location } })
    } else {

    }

  }
}



export const savePictureApi = (photo, attachment, file) => {
  return async (dispatch, getState) => {

    const a = JSON.parse(await SecureStore.getItemAsync(`attachment`))


    if (a) {


      const aToModify = a.find(b => b.attachmentName == attachment)

      if (aToModify) {
        //const aToModifyFiles = aToModify.files.find(c => c.fileName == file)
        const { files } = aToModify
        console.log(`files ialah ${JSON.stringify(files)}`)
        if (files) {

          const newFiles = files.filter(f => f.fileName !== file)
          newFiles.push({ fileName: file, fileDetail: photo })

          const newA = { ...aToModify, files: newFiles }

          const aFilter = a.filter(b => b.attachmentName !== attachment)
          aFilter.push(newA)

          await SecureStore.setItemAsync('attachment', JSON.stringify(aFilter))
          await dispatch({ type: 'SET_ATTACHMENT', payload: { attachment: aFilter } })

        }
      } else {

        a.push({ attachmentName: attachment, files: [{ fileName: file, fileDetail: photo }] })
        await SecureStore.setItemAsync('attachment', JSON.stringify(a))
        await dispatch({ type: 'SET_ATTACHMENT', payload: { attachment: a } })

      }
    } else {
      const newA = [{ attachmentName: attachment, files: [{ fileName: file, fileDetail: photo }] }]
      await SecureStore.setItemAsync('attachment', JSON.stringify(newA))
      await dispatch({ type: 'SET_ATTACHMENT', payload: { attachment: newA } })
    }

  }
}

export const getAllAttachmentApi = () => {
  return async (dispatch, getState) => {

    const attachment = JSON.parse(await SecureStore.getItemAsync('attachment'))

    if (attachment) {
      console.log(`attachment ialah ${JSON.stringify(attachment)}`)
      dispatch({ type: 'SET_ATTACHMENT', payload: { attachment } })
    } else {

    }

  }
}

export const getAttachmentApi = (title) => {
  return async (dispatch, getState) => {

    const { attachment } = getState().attachmentReducer
    console.log(`title is ${JSON.stringify(title)}`)
    console.log(`attachmentReducer is ${JSON.stringify(attachment)}`)
    if (attachment) {
      const jumpa = attachment.find(a => a.attachmentName == title)
      if (jumpa) {
        const { files } = jumpa
        const atNew = []
        if (files) {
          files.map(a => {
            atNew.push({ fileName: a.fileName, fileUri: a.fileDetail.uri })
          })
          console.log(`atnew ialah ${JSON.stringify(atNew)}`)
          dispatch({ type: 'SET_ATTACHMENT', payload: { fileList: atNew } })
        }
      }

    } else {
      dispatch({ type: 'SET_ATTACHMENT', payload: { fileList: [] } })
    }

  }
}

export const resetAllAttachmentApi = () => {
  return async (dispatch, getState) => {
    await SecureStore.deleteItemAsync('attachment')
    console.log(`delete attachment dalam storage`)
  }
}