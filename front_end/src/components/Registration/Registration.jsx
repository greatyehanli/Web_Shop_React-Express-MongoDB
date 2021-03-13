import React, { Component } from 'react'
import MyNavLink from '../MyNavLink/index'
import axios from "axios"
import "./Registration.css"

export default class Registration extends Component {

    state = {
        username: '',
        password : '',
        email: '',
        confirmPassword: '',
        error: ''
    }

    submitionHandler = async (event) =>{
        event.preventDefault()
        const {username, password, confirmPassword, email} = this.state
        const {history} = this.props
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
            const {data} = await axios.post('/toBackendServer/to/auth/register', {username, password, email}, config)

            localStorage.setItem("accessToken", data.accessToken)

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

                            <li className="agree"><input type="checkbox" name="agreement"/> 
                                &nbsp; Agree and Register: <a href="#"> &nbsp; Agreements </a>
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
