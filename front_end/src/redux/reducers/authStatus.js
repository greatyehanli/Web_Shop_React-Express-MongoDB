import * as constants from "../constants/auth"

const initState = false

export default function authStatusReducer(prestate=initState, action){
    const {type, data} = action

    switch (type) {
        case constants.SET_AUTH_STATUS:
            return data

        default:
            return prestate;
    }
}