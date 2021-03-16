//cores
import React, { Component } from 'react'

//components
import OrderedItem from './OrderedItem/OrderedItem'

//css
import './Orders.css'
export default class Orders extends Component {

    componentDidMount(){
        //get the order list for this specifc user, id is stored in the token
    }

    render() {
        return (
            <div className='order_box'>
                    <div className="box_hd">
                        <h3>Placed Orders</h3>
                    </div>
                    {/* 参考下下面的代码, 需要先获从DB取user的信息,然后逐个渲染OrderedItem 组件 */}
                    {/* <h2>Cart:</h2>
                    {
                        itemsInCart.length < 1 ? <MyNavLink to='/home'>Cart is empty, to to homepage? </MyNavLink> : 
                        itemsInCart.map(eachItem => 
                            //这个加了{}就得return, 要不不生效根本就不render
                            <CartItem key={eachItem.id} {...eachItem}/>
                        )
                    } */}

            </div>
        )
    }
}
