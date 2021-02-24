//核心模块
import React, { Component } from 'react'
import {connect} from 'react-redux'

//组件
import BackDrop from './BackDrop'
import MyNavLink from '../../components/MyNavLink'

//action
import {toggleDisplay} from '../../redux/actions/side_menu.js'

//css
import "./index.css"

class SideMenu extends Component {
    
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
        const {display} = this.props
        const classNameArr = ['side_menu']

        // 如果true就加两个class, 如果false就渲染一个side_menu还-100%移出屏幕
        if(display){
            classNameArr.push('slideIn')
        }

        return (
            <div>
                {/* 必须是同个container下, z-index才有用 */}
                {/* join 的items之间需要有一个 ' ' 隔开 */}
                <div className = {classNameArr.join(' ')}>
                    <ul className='side_menu_links'>
                        <li>
                            <MyNavLink to='/home' className='' state={{}} onClick={this.toggleSideMenuDisplay}>Home</MyNavLink>
                        </li>
                        {/* <li>
                            <MyNavLink to='' state={{}}>Product</MyNavLink>
                        </li> */}
                        <li>
                            <MyNavLink to='/cart' className='cart_link' state={{}} onClick={this.toggleSideMenuDisplay}>
                                    <i className="fas fa-shopping-cart"></i>
                                    {/* 假如外层span没用flex布局, 里面的flex布局了就会导致里面的0换行 */}
                                    <span>Cart<span className='item_number'>{this.getCount()}</span> </span>
                            </MyNavLink>
                        </li>
                    </ul>
                </div>
                {/* side_menu需要事先在DOM上面才能animation, 无论如果side_menu都要事先mount 
                    backdrop就不用animation了, 不用的时候就不挂载
                */}
                {display && <BackDrop/>}

            </div>
         
        )
    }
}

//pass state and action functions to props of SideMenu
export default connect(state => ({
    display : state.display,
    cartState: state.cartState
}),
{
    toggleDisplay
}
)(SideMenu)