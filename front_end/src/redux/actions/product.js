import * as constants from '../constants/product'
import axios from 'axios'

// 这就是为什么要用async 函数 和thunk
export const getSpecificProductById = (id)=>{
    return async (dispatch)=>{
        //ajax req, await promise, awaitpromise的try-catch block
        try{
            //通知我们的store去该products的isLoading状态为true
            dispatch({
                type: constants.GET_PRODUCT_DETAIL_REQ
            })

            const response = await axios({
                method: 'GET',
                url: `/toBackendServer/to/product/${id}`
            })

            console.log('', response);

            //如果没跳错就是success, 传data到state
            dispatch({
                type: constants.GET_PRODUCT_DETAIL_SUCCESS,
                data: response.data
            })
        }catch(err){
            dispatch({
                type: constants.GET_PRODUCT_DETAIL_ERROR,
                // check if the err obj has response and response.data.message
                // if yes, send err message back, err is an object by default and can not be display directly to DOM
                data: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }
}

export const resetProductDetailState =()=>{
    return{
        type: constants.GET_PRODUCT_DETAIL_RESET
    }
}