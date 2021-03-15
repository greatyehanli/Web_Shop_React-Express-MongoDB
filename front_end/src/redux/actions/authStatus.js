import * as constants from '../constants/auth'

export const setAuthStatus = (isLoggedIn) =>{
    return {
        type: constants.SET_AUTH_STATUS,
        data: isLoggedIn
    }
}