import React, { Component } from 'react'
import MyNavLink from '../../../../../MyNavLink'

import './OrderDetail.css'

export default class OrderDetail extends Component {
    render() {
        const {id, productName, description, price, numberInStock, image, qty} = this.props
        return (
            <div className='order_cart clearfix'>
                <div className='item_img_in_order_page'>
                    <img src={image} alt="product_img"/>
                </div>
                
                <MyNavLink to={{pathname:'/product', state:{id:id}}} className='cart_item_name'>{productName}</MyNavLink>
                
                <p className='order_text'>${price}</p>
                <p className='order_text'>Ordered Qty: <span className='redText'>{qty}</span></p>

            </div>
        )
    }
}
