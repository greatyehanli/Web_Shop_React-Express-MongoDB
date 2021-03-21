import React, { Component } from 'react';
import axios from 'axios'

//redux
import {connect} from 'react-redux'
import {toggleOrderReload} from '../../../../../redux/actions/reloadOrderComponent'

//components
import MyNavLink from '../../../../MyNavLink'
import OrderDetail from './OrderDetail/OrderDetail'

import './OrderedItem.css'


export default class OrderedItem extends Component {
  
    state = {
        reloadOrderComponent: false
    }

    deleteFromOrders= async () => {
        const {_id} = this.props
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        try {
            const response = await axios.delete(`/toBackendServer/order/${_id}`, config)
            window.location.reload();            
            console.log("这里是response呀", response);
        } catch (error) {
            console.log("cuocuocuo< ", error);
        }   
    }

    render() {
        const {orderItems, totalPrice, _id} = this.props
        // console.log("pppppropsss: ", this.props);
   
        return (
            <div className='ordered_item'>
                <h3>Total Price: {totalPrice}</h3>
                    {
                        orderItems.length < 1 ? <MyNavLink to='/home'>Order page is empty, to to homepage? </MyNavLink> : 
                        orderItems.map(eachItem => 
                            <OrderDetail key = {eachItem._id} {...eachItem}/>
                            )       
                    }
                <button className='delete_item_in_cart_btn delete_order_btn' onClick={()=>this.deleteFromOrders(_id)}><i className='fas fa-trash'></i></button>

            </div> 
        );
    }
}
