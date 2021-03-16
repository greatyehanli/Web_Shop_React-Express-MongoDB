import axios from 'axios'
import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

// components
import MyNavLink from '../../../MyNavLink'
import PrivateInfo from '../PrivateInfo/PrivateInfo'
import Orders from '../Orders/Orders'

//redux
import {connect} from 'react-redux'

//redux action-creater
import {setAuthStatus} from '../../../../redux/actions/authStatus'

//css
import './UserSubNav.css'

class UserPortal extends Component {


    logOut = () =>{
        localStorage.removeItem('accessToken')
        this.props.setAuthStatus(false)
        this.props.history.push('/login')
    }

    render() {
        return (

            <div className="">
                <div className="sub_nav">
                    <ul>
                        <li><MyNavLink to="/userPortal/privateInfo">Private Info</MyNavLink></li>
                        <li><MyNavLink to="/userPortal/orders">Orders</MyNavLink></li>
                        <li><MyNavLink onClick={this.logOut} to="/home">Logout</MyNavLink></li>
                    </ul>
                </div>

                <Switch>
                    <Route path='/userPortal/privateInfo' component={PrivateInfo}></Route>
                    <Route path='/userPortal/orders' component={Orders}></Route>
                    <Redirect to='/userPortal/privateInfo'></Redirect>
                </Switch>
                
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
)(UserPortal)