//core modules
import { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

//redux action-creater
import {toggleDisplay} from '../../redux/actions/side_menu'

//redux
import {connect} from 'react-redux'

//navbar
import MyNavLink from '../../components/MyNavLink/index'
//page components
import Home from '../Home'
import Cart from '../Cart'
import ProductDetail from '../ProductDetail'
import Registration from '../../components/Registration/Registration'
import Login from '../../components/Login/Login'
import ResetPassword from '../../components/ResetPassword/ResetPassword'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import UserPortal from '../../components/UserPortal/UserPortal'
//css
import './index.css'

class NavBar extends Component {

    toggleSideMenuDisplay = () => {
        this.props.toggleDisplay()
    }

    getCount = ()=>{
        const {itemsInCart} = this.props.cartState
        var total = 0
        itemsInCart.forEach(item => {
            console.log("item.quantity: ",typeof (total+item.quantity), item.quantity, (total+item.quantity));
           return total+=item.quantity
        })
        return total < 100 ? total : '...'
    }

    render() {
        return (
            <div>
                <nav className='navbar'>
                    <div className='logo'>
                        <h2>Treasure Shop</h2>
                    </div>

                    {/* Frontend router Links(自封装的component) */}
                    <ul className='nav_link_wrapper'>
                        <li>
                            <MyNavLink to='/home' className='' state={{}}>Home</MyNavLink>
                        </li>

                        <li>
                            <MyNavLink to='/login' className='' state={{}}>Login</MyNavLink>
                        </li>

                        <li>
                            <MyNavLink to='/signUp' className='' state={{}}>Sign Up</MyNavLink>
                        </li>
                
                        <li>
                            <MyNavLink to='/userPortal' className='' state={{}}>Profile</MyNavLink>
                        </li>


                        {/* <li>
                            <MyNavLink to='' state={{}}>Product</MyNavLink>
                        </li> */}
                        <li>
                            <MyNavLink to='/cart' className='link_outline' state={{}}>
                                <i className="fas fa-shopping-cart"></i>
                                {/* 假如外层span没用flex布局, 里面的flex布局了就会导致里面的0换行 */}
                                <span >Cart <span className='item_number_in_cart'>{this.getCount()}</span> </span>
                                
                            </MyNavLink>
                        </li>
                    </ul>


                    {/* navbar里面全部flex, div是在navbar class的管辖下 */}
                    <div className='side_menu_icon' onClick={this.toggleSideMenuDisplay}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>        

                </nav>
                {/* mapping to state in child componet's props.location */}
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/signUp' component={Registration}></Route>
                    <Route path='/forgotPassword' component={ForgotPassword}></Route>
                    <Route path='/resetPassword/:resetToken' component={ResetPassword}></Route>
                    <Route path='/userPortal' component={UserPortal}></Route>
                    <Route path='/product' component={ProductDetail}></Route>
                    <Route path='/cart' component={Cart}></Route>
                    {/* <Route path='/' component={Home}></Route> */}
                    <Redirect to='/' ></Redirect>
                </Switch>
            </div>

        )
    }
}

//connnect 自动检测 store.subscribe 然后re-render
export default connect(
    state => ({
        display: state.display,
        cartState: state.cartState
    }),
    {
        toggleDisplay
    }
)(NavBar)

