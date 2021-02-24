import {SIDE_MENU_DISPLAY} from '../constants/side_menu'

const initValue = false
export default function sideMenuReducer(preState=initValue, action){
    const {type, data} = action

    switch (type) {
        case SIDE_MENU_DISPLAY:
            return !preState
    
        default:
            return preState ;
    }
}