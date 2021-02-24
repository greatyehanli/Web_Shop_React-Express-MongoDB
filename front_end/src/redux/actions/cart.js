import * as constants from '../constants/cart'
import axios from 'axios'

export const saveToCart= (id, quantity)=>{

    console.log("Save_toCart id: ", id);

    //await axios promise response
    // 发request给后端来根据id请求当前产品的信息
    return async (dispatch) => {

        const response = await axios({
            method: "GET",
            url: `/toBackendServer/to/product/${id}`
        })

        // console.log("Save_toCart response: ", response);


        const actionData = {
            type: constants.SAVE_TO_CART,
            data: {
                id: response.data._id,
                productName: response.data.productName,
                description: response.data.description,
                price: response.data.price,
                numberInStock: response.data.numberInStock,
                imgURL: response.data.imgURL,
                // 这个quantity不是db里的, 是我们存在页面的
                quantity
            }
        }

        // console.log("Save_toCart state: ", actionData);

        //store dispacth给reducers
        dispatch(actionData)
    }

}

export const deleteFromCart= (id)=>{
    console.log(id);
    return{
        type: constants.DELETE_FROM_CART,
        data: id
    }
}

export const resteCart= ()=>{
    return{
        type: constants.RESET_CART,
    }
}