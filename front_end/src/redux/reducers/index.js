import {combineReducers} from 'redux'
//reducers
// import NavBarReducer from './navbar'
import SideMenuReducer from './side_menu'
import ProductsReducer from './products'
import ProductReducer from './product'
import CartReducer from './cart'

export default combineReducers({
    display : SideMenuReducer,
    cartState : CartReducer,
    productsState : ProductsReducer,
    productState : ProductReducer
})