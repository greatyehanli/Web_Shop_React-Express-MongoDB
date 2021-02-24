import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import MyNavLink from '../../../MyNavLink'
import './index.css'

export default class Item extends Component {
    render() {
        const {productName, description, price, imgURL, _id} = this.props
        console.log(_id);
        return (
            <div className='itemCard'>
                <img src={imgURL} alt="product_img"/>
                <div className='item_info'>
                    <p className='item_name'> <strong>{productName}</strong></p>
                    <p className='item_desciption'>
                        {description}
                    </p>
                    <p className='item_price'>${price}</p>
                    
                </div>
                <div className='btn_wrapper'>
                        <MyNavLink to={{pathname: '/product', state : {id:_id}}} className='item_view_btn'>Detail</MyNavLink>
                    </div>
            </div>
        )
    }
}
