import React, { Component } from 'react'
import MyNavLink from '../MyNavLink/index'
import axios from "axios"
import "./ForgotPassword.css"

export default class ForgotPassword extends Component {

    state = {
        success : '',
        email: '',
        error: ''
    }

    submitionHandler = async (event) =>{
        event.preventDefault()
        const {email} = this.state
        const {history} = this.props

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }

        try {
            const {data} = await axios.post('/toBackendServer/to/auth/forgotPassword', {email}, config)

            this.setState({
                success: data.data
            })
        } catch (error) {
            this.setState({
                // 这个是axios返回的error, 最后点到的那个error才是我们后端返回的真正自定义的错误
                error: error.response.data.error,
                email: ''
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
                <h3>Sign in
                    <div className="login">Don't have an account, let's &nbsp;
                        <MyNavLink to="/signup">Sign Up</MyNavLink>
                    </div>
                </h3>
                <div className="reg_form">
                    {error && <span>{error}</span> }
                    <form onSubmit={this.submitionHandler}>
                        <h3>Please type your email below to receive an email to reset password.</h3>
                        <ul>
                            <li><label >Email: </label> <input 
                                type="email" 
                                name='email' 
                                className="inp"
                                onChange={(event)=>this.setState({email: event.target.value})}
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
