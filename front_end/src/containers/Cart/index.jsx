import React, { Component } from 'react'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import MyNavLink from '../../components/MyNavLink'
import {deleteFromCart, resteCart} from '../../redux/actions/cart'
import './index.css'

class Cart extends Component {

    getCount = ()=>{
        const {itemsInCart} = this.props.cartState
        var total = 0
        itemsInCart.forEach(item => {
            console.log("item.quantity: ",typeof (total+item.quantity), item.quantity, (total+item.quantity));
           return total+=item.quantity
        })
        return total
    }

    getTotalPrice = ()=>{
        const {itemsInCart} = this.props.cartState
        var total = 0
        itemsInCart.forEach(item => {
            console.log("item.quantity: ",typeof (total+item.quantity), item.quantity, (total+item.quantity));
           return total += item.price * item.quantity
        })
        return total
    }

    render() {
        const {itemsInCart} = this.props.cartState

        return (
            <div className='cart_page'>

                <div className='cart_left_part'>
                    <h2>Cart:</h2>
                    {
                        itemsInCart.length < 1 ? <MyNavLink to='/home'>Cart is empty, to to homepage? </MyNavLink> : 
                        itemsInCart.map(eachItem => 
                            //这个加了{}就得return, 要不不生效根本就不render
                            <CartItem key={eachItem.id} {...eachItem}/>
                        )
                    }
                </div>
               
                <div className='cart_right_part'>
                    <div className='cart_summary'>
                        <p> <strong>Total:</strong> <span style={{color : 'orangered'}}>{this.getCount()}</span> items</p>
                        <p> <strong>Price:</strong> <span style={{color : 'red'}}>${this.getTotalPrice()} </span></p>
                    </div>

                    <div className='checkout_btn_div'>
                        <button>CheckOut</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state=>
    ({
        cartState: state.cartState
    }),
    {
        deleteFromCart,
        resteCart
    }
    
)(Cart)