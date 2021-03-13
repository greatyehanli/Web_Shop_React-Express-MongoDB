import * as constants from '../constants/cart'

const initState = {itemsInCart: []}

//这个函数必须是纯函数, 参数值不能改, 返回值要是一个最新的引用地址, 由参数计算/拼凑得到
export default function CartReducer(preState=initState, action){
    const {type, data} = action

    switch (type) {
        case constants.SAVE_TO_CART:

            const doesItemExists = preState.itemsInCart.find(item => item.id === data.id)

            if(doesItemExists){
                return{
                    // 目前只有一个itemsInCart在里面, 我们以后可能加更多的properties,在这里先展开
                    ...preState,
                    //cartItem里面存了当前item的Qauntity, 这里更新到数组里面的最新data包含了最新当前item的选择数量, overwrite preState里面的itemsInCart
                    itemsInCart: preState.itemsInCart.map(currentItem => {
                        //对匹配上的cartItem进行数据更新, 老的不变, 原路返回
                        return currentItem.id === data.id ? data : currentItem
                    })
                }
            }

            return {
                ...preState,
                // 如果是新加的item, 把它直接push到数组最后
                //返回值是一个新的内存引用地址
                itemsInCart: [...preState.itemsInCart, data]
            };

        case constants.DELETE_FROM_CART:
            
            return {
                ...preState,
                itemsInCart: preState.itemsInCart.filter(currentItem => currentItem.id !== data)
            };

        case constants.RESET_CART:
            
            return initState;
    
        default:
            return preState;
    }
}