import React, { Component } from 'react';
import MyNavLink from '../../../../MyNavLink'

class OrderedItem extends Component {
    render() {
        const {id, productName, description, price, numberInStock, imgURL, quantity} = this.props
        return (
            <div className='ordered_item'>
                <div className='item_img'>
                    <img src={imgURL} alt="product_img"/>
                </div>
                
                <MyNavLink to={{pathname:'/product', state:{id:id}}} className='ordered_item_name'>{productName}</MyNavLink>

                <p className='ordered_item_price'>${price}</p>

                <select name="" value={quantity} onChange={event => this.props.saveToordered(id, 1*event.target.value)} id="ordered_item_qty">
                        {[...Array(numberInStock).keys()].map(element => (
                            <option key={element+1} value={element+1}>{element+1}</option>
                        ))}
                </select>

                <button className='delete_item_in_ordered_btn' onClick={()=>this.props.deleteFromordered(id)}><i className='fas fa-trash'></i></button>

            </div> 
        );
    }
}

export default OrderedItem;