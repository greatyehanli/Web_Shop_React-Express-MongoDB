import * as constants from '../constants/product'
import axios from 'axios'

// 这就是为什么要用async 函数 和thunk
export const getHotProducts = ()=>{ 
    return async (dispatch)=>{
        //ajax req, await promise, awaitpromise的try-catch block
        try{ 
            //通知我们的store去该products的isLoading状态为true
            dispatch({
                type: constants.GET_PRODUCTS_REQ
            })
            console.log('开始req');

            const response = await axios({
                method: 'GET',
                // http://localhost:3000 这个放在前面可以省略
                url: '/toBackendServer/to/product'
            })
            console.log('结束req', response);

            //如果没跳错就是success, 传data到state
            dispatch({
                type: constants.GET_PRODUCTS_SUCCESS,
                data: response.data
            })
            
            console.log("GET_PRODUCTS_SUCCESS过去了");
        }catch(err){
            dispatch({
                type: constants.GET_PRODUCTS_ERROR,
                // check if the err obj has response and response.data.message
                // if yes, send err message back, err is an object by default and can not be display directly to DOM
                data: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }
}