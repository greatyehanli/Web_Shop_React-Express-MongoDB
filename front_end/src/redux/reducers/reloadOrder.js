import {RELOAD_ORDER} from '../constants/order'

const initValue = false
export default function reloadOrderReducer(preState=initValue, action){
    const {type} = action

    switch (type) {
        case RELOAD_ORDER:
            return !preState
    
        default:
            return preState ;
    }
}