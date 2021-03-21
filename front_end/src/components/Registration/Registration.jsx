import React, { Component } from 'react'
import axios from "axios"

//components
import MyNavLink from '../MyNavLink/index'

//redux
import {connect} from 'react-redux'

//redux action-creater
import {setAuthStatus} from '../../redux/actions/authStatus'

import "./Registration.css"

class Registration extends Component {

    state = {
        username: '',
        password : '',
        email: '',
        confirmPassword: '',
        error: ''
    }

    submitionHandler = async (event) =>{
        event.preventDefault()
        const isSeller = event.target.isSeller.checked

        const {username, password, confirmPassword, email} = this.state
        const {history} = this.props
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(password !== confirmPassword){
            /*
            这个定时器会产生这个warning, 但是不影响使用
            index.js:1 Warning: Can't perform a React state update on an unmounted component. 
            This is a no-op, but it indicates a memory leak in your application. 
            To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
            */ 
            setTimeout(()=>{
                this.setState({
                    error:''
                })
            }, 3000)

            this.setState({
                password : '',
                confirmPassword: '',
                error: 'Passwords not matching each other'
            }) 
        }

        try {
            if(!isSeller){
                // console.log('Not selle: ', username, password, email);
                console.log("Post Data: ", {username, password, email}, config);
                var {data} = await axios.post('/toBackendServer/to/auth/register', {username, password, email}, config)
            }else{
                // console.log('Not User: ', username, password, email);

                console.log("Post Data: ", {name: username, password, email}, config);
                var {data} = await axios.post('/toBackendServer/seller', {name: username, password, email}, config)
            }

            if(isSeller){
                localStorage.setItem("accessTokenForSeller", data.token)
                history.push('/sellerPortal/privateInfo')
            }else{
                localStorage.setItem("accessToken", data.accessToken)
                history.push('/userPortal/privateInfo')
            }
            this.props.setAuthStatus(true)

            history.push('/')
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
            <div className="registerarea container">
                <h3>Sign Up
                    <div className="login">Already have an account, let's &nbsp;
                        <MyNavLink to="/login">Login</MyNavLink>
                    </div>
                </h3>
                <div className="reg_form">
                    {error && <span>{error}</span> }
                    <form onSubmit={this.submitionHandler}>
                        <ul>
                            <li><label >Username: </label> <input 
                                type="username" 
                                name='username' 
                                className="inp"
                                onChange={(event)=>this.setState({username: event.target.value})}
                                /> </li>

                            <li><label >Password: </label> <input 
                                type="password" 
                                name='password' 
                                className="inp"
                                onChange={(event)=>this.setState({password: event.target.value})}
                                /> </li>

                            <li><label >Confirm Password: </label> <input 
                                type="password" 
                                name='confirmPassword' 
                                className="inp"
                                onChange={(event)=>this.setState({confirmPassword: event.target.value})}
                                /> </li>

                            <li><label >Email: </label> <input 
                                type="email" 
                                name='email' 
                                className="inp"
                                onChange={(event)=>this.setState({email: event.target.value})}
                                /> </li>

                            <li className="agree"><input type="checkbox" name="isSeller"/> 
                                &nbsp; Register as Seller
                            </li>

                            <li>
                                <input type="submit" value="Submit" className="btn"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>({
        authState: state.authState
    }),
    {
        setAuthStatus
    }
)(Registration)