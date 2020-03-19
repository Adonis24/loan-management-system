import { combineReducers } from "redux";

const apiReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_API_AUTH':
            return { ...state, ...action.payload }
        case 'API_RESET':
            return state = []
        default:
            return state
    }
}

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
        case 'REGISTRATION_RESET':
            return state = []
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
        case 'COMPANY_INFO_RESET':
            return state = []
        default:
            return state
    }
}

const loginScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, ...action.payload }
        case 'LOGIN_RESET':
            return state = []
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
        case 'BIZ_DIR_RESET':
            return state = []
        default:
            return state
    }
}

const assoDirReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ASSO_DIR':
            return { ...state, ...action.payload }
        case 'ASSO_DIR_RESET':
            return state = []
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

const netInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NET_INFO_STATUS':
            return { ...state, ...action.payload }
     
        default:
            return state
    }
}

const grantApplicationReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GRANT_INFO':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const myAccountReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return { ...state, ...action.payload }
        case 'USER_PROFILE_RESET':
            return state = []
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


const personalInformationScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PERSONAL_INFO':
            return { ...state, ...action.payload }

        default:
            return state
    }
}



const notificationScreenReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { ...state, ...action.payload }

        default:
            return state
    }
}


const bizInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BIZ_INFO':
            return { ...state, ...action.payload }
            case 'BIZ_INFO_RESET':
            return state = []
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

const appReducer = combineReducers({  notificationScreenReducer,  personalInformationScreenReducer,  loginScreenReducer, registrationReducer, companyInformationReducer, newsScreenReducer, eventScreenReducer, promotionScreenReducer, handbookScreenReducer, einfosScreenReducer, loanApplicationReducer, bizInfoReducer, listWorkersReducer, myAccountReducer, bizDirReducer, agencyListReducer, assoDirReducer, pendingDirReducer, trainingReducer,grantApplicationReducer,apiReducer,netInfoReducer });

const rootReducer = (state, action) => {
    switch (action.type) {
        case 'ROOT_LOG_OUT':
            return { state: undefined }
        default:
            return appReducer(state, action)
    }
}

export default rootReducer