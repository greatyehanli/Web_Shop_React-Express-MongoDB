import {combineReducers} from 'redux'
//reducers
// import NavBarReducer from './navbar'
import SideMenuReducer from './side_menu'
import ProductsReducer from './products'
import ProductReducer from './product'
import CartReducer from './cart'
import authStatusReducer from './authStatus'

export default combineReducers({
    display : SideMenuReducer,
    cartState : CartReducer,
    productsState : ProductsReducer,
    productState : ProductReducer,
    authState : authStatusReducer
})