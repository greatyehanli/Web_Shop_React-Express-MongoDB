import * as constants from '../constants/order'
import axios from 'axios'

export const toggleOrderReload = () =>{
    return{
        type: constants.RELOAD_ORDER
    }
}