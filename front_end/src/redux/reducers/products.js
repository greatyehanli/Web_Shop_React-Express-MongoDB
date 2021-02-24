import * as constants from '../constants/product'

const initState = {productsArr: [], isLoading: false, err: false}
export default function ProductsReducer(preState=initState, action){
    const {type, data} = action

    switch (type) {
        case constants.GET_PRODUCTS_REQ:
            console.log("GetReq Reducer拿到了");

            return{
                isLoading: true,
                err: false
            };

        case constants.GET_PRODUCTS_SUCCESS:
            console.log("Reducer里面的data", data);
            return{
                isLoading: false,
                productsArr: data
            };

        case constants.GET_PRODUCTS_ERROR:
            console.log("Error Reducer拿到了");

            return{
                isLoading: false,
                err: data
            };
    
        default:
            return preState;
    }
}