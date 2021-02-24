import React, { Component } from 'react'
import Item from '../../components/pages/Product/Item'

//redux 配置
import {connect} from 'react-redux'
import {getHotProducts} from '../../redux/actions/products'

import './index.css'

class Home extends Component {

    componentDidMount(){
        //不能再render里getProducts, 因为这个action里面又发送了其他的actions, 
        //必须得在didMount里面发这个请求, 不然一旦触发state改变, react-redux创建的容器组件就会自动触发render,
        //然后render又会再call一下getHotProducts() 导致无限递归死循环
        this.props.getHotProducts()
    }

    render() {
        // this.props.getHotProducts()
        const {isLoading, err, productsArr} = this.props.productsState
        console.log("productsArr : ",productsArr);
        return (
            <div className='home_page'>
                <h2 className='home_page_title' onClick={this.props.getHotProducts}>Hot Sales:</h2>
                <div className='hot_products'>
                    {
                        // 不可以在productsArr还是空的时候来call map, 不然会报错没有这个method
                        //每个遍历出来产生的新组件数组里的每一项都要有个key
                        //原因: 这是由于在进行组件遍历的时候没有加一个key来进行区分每个组件,因为dom需要diff进行对比解决方案
                        isLoading? <h2>Loading......</h2>: 
                             err ? <h2>err</h2> : productsArr.map(eachItem => <Item {...eachItem} key={eachItem._id} />)
                                                                                //...eachItem直接展开对象传props
                    }
                </div>

            </div>
        )
    }
}
export default connect(
    state=>({
        productsState: state.productsState
    }),
    {
        getHotProducts
    }
)(Home)