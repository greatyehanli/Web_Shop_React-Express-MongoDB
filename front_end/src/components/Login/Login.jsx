//cores
import React, { Component } from 'react'
import MyNavLink from '../MyNavLink/index'
import axios from "axios"

//redux
import {connect} from 'react-redux'

//redux action-creater
import {setAuthStatus} from '../../redux/actions/authStatus'


//css
import "./Login.css"

class Login extends Component {

    state = {
        password : '',
        email: '',
        error: ''
    }

    submitionHandler = async (event) =>{
        event.preventDefault()
        const {password, email} = this.state
        const {history} = this.props
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(localStorage.getItem('authToken')){
            history.push('/')
        }

        try {
            const {data} = await axios.post('/toBackendServer/to/auth/login', {password, email}, config)
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken)

            this.props.setAuthStatus(true)

            history.push('/home')
        } catch (error) {
            this.setState({
                // 这个是axios返回的error, 最后点到的那个error才是我们后端返回的真正自定义的错误
                error: error.response.data.error
            })
            // 这里会导致下面的错误, 但是先不管了, 它等6秒页面都没了, 之后再改
            //index.js:1 Warning: Can't perform a React state update on an unmounted component.
            // This is a no-op, but it indicates a memory leak in your application. 
            //To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
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
                <h3>Sign in
                    <div className="login">Don't have an account(<MyNavLink to="/signup">Sign Up</MyNavLink>) 
                    or <MyNavLink to="/forgotPassword">forgot</MyNavLink> password
            
                    </div>
                </h3>
                <div className="reg_form">
                    {error && <span>{error}</span> }
                    <form onSubmit={this.submitionHandler}>
                        <ul>
                            <li><label>Email: </label> <input 
                                type="email" 
                                name='email' 
                                className="inp"
                                onChange={(event)=>this.setState({email: event.target.value})}
                                /> </li>

                            <li><label>Password: </label> <input 
                                type="password" 
                                name='password' 
                                className="inp"
                                onChange={(event)=>this.setState({password: event.target.value})}
                                /> </li>
                            <li>
                                <input type="submit" value="Login" className="btn"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        authState: state.authState
    }),
    {
        setAuthStatus
    }
)(Login)