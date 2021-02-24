import React, { Component } from 'react'

//redux
import {connect} from 'react-redux'
import {getSpecificProductById} from '../../redux/actions/product'
import {saveToCart} from '../../redux/actions/cart'
import MyNavLink from '../../components/MyNavLink'

import './index.css'

class ProductDetail extends Component {
    
    state = {
        quantity: 1
    }

    componentDidMount(){
        //get product info when the page loads
        this.props.getSpecificProductById(this.props.location.state.id)
        console.log(this.props.productState);
    }

    setQuantity = (event)=>{
        this.setState({
            quantity: event.target.value*1
        })
    }

    render() {

        const {isLoading, productObj, err} = this.props.productDetailState
        const {quantity} = this.state
        const {_id, productName, description, price, imgURL, numberInStock} = productObj || {}

        return (            
            <div className='detail_page'>
                {/* 如果是loading好了再给我render出来, 有err报告err */}
                {isLoading ? <h2>Loading...</h2> : err ? <h2>{err}</h2> : (
                    // (<> html内容</>) 这种形式给了下面html内容一个父级的标签, 然后() 包裹一个expression防止syntax错误
                    <>
                        <div className='left_part_detail'>
                            <div className='item_img_left'>
                                <img src={imgURL} alt="product img"/>
                            </div>

                            <div className='detailed_description'>
                                <p className='product_name'> {productName}</p>
                                <p className='product_desciption'>
                                {description}
                                </p>
                                <p className='product_price'>${price}</p>
                            </div>
                        </div>
                        
                        <div className='detail_right_part'>
                            <div className='info_right'>
                                <p className='rigth_price'>
                                    <strong>Price: </strong> <span>${price*quantity}</span>
                                </p>

                                <p>
                                    <strong>Stock: </strong> 
                                    {numberInStock>0 ? 
                                     <span style={{color: "green"}}>In Stock</span> :
                                     <span style={{color: 'red'}}>Out of Stock</span>}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>
                                    <select name="" id="qty_select" value={quantity} onChange={event => this.setQuantity(event)}>
                                        {[...Array(numberInStock).keys()].map(element => (
                                            <option key={element+1} value={element+1}>{element+1}</option>
                                        ))}
                                    </select>
                                </p>

                                <p>
                                    <MyNavLink to='/cart' id='add_to_cart_btn' type='button' 
                                        onClick={()=>{this.props.saveToCart(_id, quantity)}}>
                                        Save in Cart
                                    </MyNavLink>
                                </p>

                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    }
}

export default connect(state => 
    ({
        productDetailState : state.productState
    }),
    {
        saveToCart,
        getSpecificProductById
    }
)(ProductDetail)