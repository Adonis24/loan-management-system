import { combineReducers } from "redux";

const registrationReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, ...action.payload }
        case 'SET_REGISTER':
            return { ...state, ...action.payload }
        case 'SET_OTP':
            return { ...state, ...action.payload }
        case 'RESET_OTP':
            return { ...state, c1: undefined, c2: undefined, c3: undefined, c4: undefined, }
        case 'VERIFY_OTP':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const companyInformationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMPANY_INFO':
            return { ...state, ...action.payload }
        case 'SET_CONTACT_PERSON':
            return { ...state, ...action.payload }
        case 'SET_DETAIL_CONNECT':
            return { ...state, ...action.payload }
        case 'SET_DECLARE_SIGN':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const loginScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, ...action.payload }
        default:
            return state
    }
}


const dashboardScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DASHBOARD':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const newsScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NEWS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const eventScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const promotionScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROMOTION':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const handbookScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HANDBOOKS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const einfosScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EINFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const bizDirReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BIZ_DIR':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const assoDirReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ASSO_DIR':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const pendingDirReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PENDING_DIR':
            return { ...state, ...action.payload }
        default:
            return state
    }
}


const loanApplicationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOAN_INFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const myAccountReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return { ...state, ...action.payload }
        default:
            return state
    }
}


const trainingReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_COURSES':
            return { ...state, ...action.payload }
        default:
            return state
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const settingReducer = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_DEVICE_INFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const homeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INIT_NAV':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const kycReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_KYC':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const kyc1ScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_KYC_1':
            return { ...state, ...action.payload }
        case 'SET_INDICATOR_KYC_1':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const kyc2ScreenReducer = (state = { mailingAddress: false }, action) => {
    switch (action.type) {
        case 'SET_KYC_2':
            return { ...state, ...action.payload }
        case 'SET_INDICATOR_KYC_2':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const phoneVerificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DIGIT':
            return { ...state, ...action.payload }

        case 'SET_INDICATOR_PHONE_VERIFICATION':
            return { ...state, ...action.payload }

        case 'SET_BOX':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const passcodeCreationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PASSCODE_DIGIT':
            return { ...state, ...action.payload }

        case 'SET_INDICATOR_PASSCODE_CREATION':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const unlockReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_UNLOCK_DIGIT':
            return { ...state, ...action.payload }

        case 'SET_INDICATOR_UNLOCK':
            return { ...state, ...action.payload }
        default:
            return state
    }
}


const termsReducer = (state = { checked: false, agree: 'no' }, action) => {
    switch (action.type) {
        case 'SET_TERMS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const pdpaReducer = (state = { checked: true, agree: 'yes' }, action) => {
    switch (action.type) {
        case 'SET_PDPA':
            return { ...state, ...action.payload }

        case 'GET_DOC':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const kycVerifyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_KYC_VERIFY':
            return { ...state, ...action.payload }
        case 'SET_INDICATOR_KYC_VERIFY':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const personalInformationScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PERSONAL_INFO':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

///////////////////////////////////////////////////

// const dashboardScreenReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_DASHBOARD':
//             return { ...state, ...action.payload }

//         default:
//             return state
//     }
// }

const notificationScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const analyticScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANALYTIC':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const depositScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DEPOSIT':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const withdrawScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WITHDRAW':
            return { ...state, ...action.payload }

        default:
            return state
    }
}


const personalInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INFO':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const transferOutScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECIPIENT_LIST':
            return { ...state, ...action.payload }

        case 'SET_RECIPIENT':
            return { ...state, ...action.payload }

        case 'RESET_RECIPIENT':
            return { memberFilter: true }

        default:
            return state
    }
}

const transferOutScanScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SCAN':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const scanBillReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BILL':
            return { ...state, ...action.payload }
        case 'SET_BILL_DETAIL':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const requestScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PAYER_LIST':
            return { ...state, ...action.payload }

        case 'SET_PAYER':
            return { ...state, ...action.payload }

        case 'RESET_PAYER':
            return { memberFilter: true }

        default:
            return state
    }
}

const fulfillRequestScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FULFILL_REQUEST':
            return { ...state, ...action.payload }
        case 'RESET_FULFILL_REQUEST':
            return { success: null }

        default:
            return state
    }
}

const notificationfulfillRequestScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION_FULFILL_REQUEST':
            return { ...state, ...action.payload }
        case 'RESET_NOTIFICATION_FULFILL_REQUEST':
            return { success: null }

        default:
            return state
    }
}

const contactListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTACT_LIST':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const resetPinReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PIN_DIGIT':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const themeReducer = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const editInfoScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PASSWORD':
            return { ...state, ...action.payload }

        default:
            return state
    }
}

const bizInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BIZ_INFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const agencyListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_AGENCY_LIST':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const listWorkersReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_LIST_WORKERS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const  appReducer = combineReducers({ settingReducer, homeReducer, kycReducer, kyc1ScreenReducer, kyc2ScreenReducer, phoneVerificationReducer, termsReducer, pdpaReducer, kycVerifyReducer, passcodeCreationReducer, unlockReducer, dashboardScreenReducer, notificationScreenReducer, depositScreenReducer, personalInformationScreenReducer, transferOutScreenReducer, transferOutScanScreenReducer, scanBillReducer, personalInfoReducer, contactListReducer, requestScreenReducer, fulfillRequestScreenReducer, notificationfulfillRequestScreenReducer, withdrawScreenReducer, analyticScreenReducer, resetPinReducer, themeReducer, editInfoScreenReducer, loginScreenReducer, registrationReducer, companyInformationReducer, newsScreenReducer, eventScreenReducer, promotionScreenReducer, handbookScreenReducer, einfosScreenReducer,loanApplicationReducer,bizInfoReducer,listWorkersReducer,myAccountReducer,bizDirReducer,agencyListReducer,assoDirReducer,pendingDirReducer,trainingReducer });

const rootReducer = (state, action) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer