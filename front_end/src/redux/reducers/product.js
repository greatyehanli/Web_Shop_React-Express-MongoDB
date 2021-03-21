import * as constants from '../constants/product'

const initState = {productObj:{}, quantity:0, isLoading: false, err: ''}
export default function ProductReducer(preState=initState, action){
    const {type, data} = action

    switch (type) {
        case constants.GET_PRODUCT_DETAIL_REQ:
            
            return{
                isLoading: true,
                err: false
            };

        case constants.GET_PRODUCT_DETAIL_SUCCESS:
            // console.log("我在product的reducer报告: ", data);
            return{
                isLoading: false,
                productObj: data
            };

        case constants.GET_PRODUCT_DETAIL_RESET:
            
            return initState;
       
        case constants.GET_PRODUCT_DETAIL_ERROR:
            
            return{
                isLoading: false,
                err: data
            };
    
        default:
            return preState;
    }
}