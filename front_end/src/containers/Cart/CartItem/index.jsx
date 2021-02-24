import React, { Component } from 'react'
import MyNavLink from '../../../components/MyNavLink'
import {connect} from 'react-redux'
import {saveToCart ,deleteFromCart, resteCart} from '../../../redux/actions/cart'
import './index.css'

class CartItem extends Component {
    render() {
        const {id, productName, description, price, numberInStock, imgURL, quantity} = this.props
        return (
            <div className='cart_item'>
                <div className='item_img'>
                    <img src={imgURL} alt="product_img"/>
                </div>
                
                <MyNavLink to='/product' state={{}} className='cart_item_name'>{productName}</MyNavLink>

                <p className='cart_item_price'>${price}</p>

                <select name="" value={quantity} onChange={event => this.props.saveToCart(id, 1*event.target.value)} id="cart_item_qty">
                        {[...Array(numberInStock).keys()].map(element => (
                            <option key={element+1} value={element+1}>{element+1}</option>
                        ))}
                </select>

                <button className='delete_item_in_cart_btn' onClick={()=>this.props.deleteFromCart(id)}><i className='fas fa-trash'></i></button>

            </div>
        )
    }
}

export default connect(state=>
    ({
        cartState: state.cartState
    }),
    {
        saveToCart,
        deleteFromCart,
        resteCart
    }
    
)(CartItem)