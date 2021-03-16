//cores
import React, { Component } from 'react'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import axios from "axios"

//components
import MyNavLink from '../../components/MyNavLink'

//redux
import {deleteFromCart, resteCart} from '../../redux/actions/cart'
import './index.css'

class Cart extends Component {

    state = {
        error: ''
    }

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

    placeOrder = async ()=>{
        const {itemsInCart} = this.props.cartState
        try {
            const response = await axios.post('/toBackendServer/to/protected/..............', itemsInCart)
        } catch (error) {
            //will use this state attribute to show error message on the page
            this.setState({error})
        }
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
                        <button onClick={this.placeOrder}>CheckOut</button>
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