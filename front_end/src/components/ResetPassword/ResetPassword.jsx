import React, { Component } from 'react'
import MyNavLink from '../MyNavLink/index'
import axios from "axios"
import "./ResetPassword.css"

export default class ResetPassword extends Component {

    state = {
        password : '',
        confirmPassword: '',
        success: '',
        error: ''
    }

    submitionHandler = async (event) =>{
        event.preventDefault()
        const {username, password, confirmPassword, email} = this.state
        const {history} = this.props
        const {match} = this.props
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if(password !== confirmPassword){
            setTimeout(()=>{
                this.setState({
                    error:''
                })
            }, 6000)

            this.setState({
                password : '',
                confirmPassword: '',
                error: 'Passwords not matching each other'
            })
        }

        try {
            console.log("match.params.resetToken", match.params.resetToken);
            const {data} = await axios.put(`/toBackendServer/to/auth/resetPassword/${match.params.resetToken}`, {password}, config)
            this.setState({
                success: data.data
            })

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
        const {error, success} = this.state
        return (
            <div className="registerarea container">
                <h3>Sign Up
                    <div className="login">Already have an account, let's &nbsp;
                        <MyNavLink to="/login">Login</MyNavLink>
                    </div>
                </h3>
                <div className="reg_form">
                    {error && <span>{error}</span> }
                    {success &&
                        (<MyNavLink to="/login">Login</MyNavLink>)
                    }
                    <form onSubmit={this.submitionHandler}>
                        <ul>

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
