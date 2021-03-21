//cores
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

//components
import OrderedItem from './OrderedItem/OrderedItem'

//css
import './Orders.css'

export default class Orders extends Component {

    state ={
        arrayOfOrders:[]
    }

    async componentDidMount(){
        //get the order list for this specifc user, id is stored in the token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const {data} = await axios.get('/toBackendServer/order', config)
        this.setState({arrayOfOrders: data})
        console.log("state: ", this.state.arrayOfOrders);

    }


    render() {
        const {arrayOfOrders} = this.state
        const {reloadOrderState} = this.props
        console.log("1234567890", arrayOfOrders);
        return (
            <div className='order_box'>
                {reloadOrderState?null:null}
                    <div className="box_hd">
                        <h3>Placed Orders</h3>
                    </div>
                    {/* 参考下下面的代码, 需要先获从DB取user的信息,然后逐个渲染OrderedItem 组件 */}
                    {
                        arrayOfOrders.length < 1 ? <Link to='/home'>Order page is empty, to to homepage? </Link> : 
                        arrayOfOrders.map(eachItem => 
                            
                            <OrderedItem key={eachItem._id} {...eachItem}/>
                        
                            )       
                    }

            </div>
        )
    }
}

// eachItem.orderItems.map(eachOrderItemInOrderArray => {
//     {console.log("eachOrderItemInOrderArray", eachOrderItemInOrderArray)}
//     <OrderedItem key={eachOrderItemInOrderArray.id} {...eachOrderItemInOrderArray}/>
// })
