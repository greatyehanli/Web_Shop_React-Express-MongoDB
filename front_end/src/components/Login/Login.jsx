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
            headers: {
                "Content-Type": "application/json"
            }
        }
        if(localStorage.getItem('accessToken')){
            history.push('/home')
        }

        // console.log("这就是一个login form 的event: ", event.target.isSeller.checked);
        const isSeller = event.target.isSeller.checked

        var response = undefined
        try {
            if(isSeller){
                response = await axios.post('/toBackendServer/seller/login', {password, email}, config)
            }else{
                response = await axios.post('/toBackendServer/to/auth/login', {password, email}, config)
            }
            const {data} = response
            console.log(data);

            if(isSeller){
                localStorage.setItem("accessTokenForSeller", data.token)
                history.push('/sellerPortal/privateInfo')
            }else{
                localStorage.setItem("accessToken", data.accessToken)
                history.push('/userPortal/privateInfo')
            }

            this.props.setAuthStatus(true)

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
                                /> 
                            </li>

                            <li><label>Password: </label> <input 
                                type="password" 
                                name='password' 
                                className="inp"
                                onChange={(event)=>this.setState({password: event.target.value})}
                                /> 
                            </li>

                            <li className="agree"><input type="checkbox" name="isSeller"/> 
                                &nbsp; I am a seller
                            </li>

                            <li>
                                <input type="submit" value="Login" className="btn_login"/>
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