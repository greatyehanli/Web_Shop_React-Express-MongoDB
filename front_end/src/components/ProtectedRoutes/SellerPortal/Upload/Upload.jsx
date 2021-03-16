//cores
import React, { Component } from 'react'
import axios from "axios"

//css
import "./Upload.css"

export default class Upload extends Component {

    state = {
        productName : '',
        description: '',
        price: 0,
        numberInStock: 0,
        imgURL: '',
        error : ''
    }

    submitionHandler = async (event) =>{

        event.preventDefault()
        const {productName, description, price, numberInStock, imgURL} = this.state
        const {history} = this.props
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem('accessTokenForSeller')}`
            }
        }

        var response = undefined
        const productObj = {productName, description, price: price*1, numberInStock: numberInStock*1, imgURL}
        console.log("config", config, {productName, description, price: price*1, numberInStock: numberInStock*1, imgURL});
        try {
            if(localStorage.getItem('accessTokenForSeller')){
                response = await axios.post('/toBackendServer/to/product/product', productObj, config)
            }

            console.log(response);

            history.push('/sellerPortal/store')

        } catch (error) {
            this.setState({
                // 这个是axios返回的error, 最后点到的那个error才是我们后端返回的真正自定义的错误
                error: error.response.data.error
            })
            setTimeout(()=>{
                this.setState({
                    error:''
                })
            }, 6000)
        }
    }

    render() {
        const {error} = this.state
        return (

            <div>
                {!localStorage.getItem('accessTokenForSeller')?<span>{error}</span> : 

                    <section className="private_info_bd">
                        <div className="private_hd">
                            <h3>Upload a New Product to Your Store</h3>
                        </div>
                        <div className="reg_form_seller">
                            <form onSubmit={this.submitionHandler}>
                                <ul>
                                    <li><label>Product Name: </label> <input 
                                        type="text" 
                                        name='productName' 
                                        className="inp"
                                        onChange={(event)=>this.setState({productName: event.target.value})}
                                        /> 
                                    </li>

                                    <li><label>Description: </label> <input 
                                        type="text" 
                                        name='description' 
                                        className="inp"
                                        onChange={(event)=>this.setState({description: event.target.value})}
                                        /> 
                                    </li>

                                    <li><label>Price: </label> <input 
                                        type="number" 
                                        name='price' 
                                        className="inp"
                                        onChange={(event)=>this.setState({price: event.target.value})}
                                        /> 
                                    </li>

                                    <li><label>Number in Stock: </label> <input 
                                        type="number" 
                                        name='numberInStock' 
                                        className="inp"
                                        onChange={(event)=>this.setState({numberInStock: event.target.value})}
                                        /> 
                                    </li>

                                    <li><label>Image URL: </label> <input 
                                        type="url" 
                                        name='imgURL' 
                                        className="inp"
                                        onChange={(event)=>this.setState({imgURL: event.target.value})}
                                        /> 
                                    </li>

                                    <li>
                                        <input type="submit" value="Submit" className="btn"/>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </section>    
                }
            </div>
        )
    }
}
