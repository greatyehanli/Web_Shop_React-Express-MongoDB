import axios from 'axios'
import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

// components
import MyNavLink from '../../../MyNavLink'
import PrivateInfo from '../PrivateInfo/PrivateInfo'
import Store from '../Store/Store'


//redux
import {connect} from 'react-redux'

//redux action-creater
import {setAuthStatus} from '../../../../redux/actions/authStatus'

//css
import './SellerSubNav.css'
import Upload from '../Upload/Upload'

class SellerPortal extends Component {


    logOut = () =>{
        localStorage.removeItem('accessTokenForSeller')
        this.props.setAuthStatus(false)
        this.props.history.push('/login')
    }

    render() {
        return (

            <div className="">
                <div className="sub_nav">
                    <ul>
                        <li><MyNavLink to="/sellerPortal/privateInfo">Private Info</MyNavLink></li>
                        <li><MyNavLink to="/sellerPortal/store">Store</MyNavLink></li>
                        <li><MyNavLink to="/sellerPortal/upload">Upload</MyNavLink></li>
                        <li><MyNavLink onClick={this.logOut} to="/home">Logout</MyNavLink></li>
                    </ul>
                </div>

                <Switch>
                    <Route path='/sellerPortal/privateInfo' component={PrivateInfo}></Route>
                    <Route path='/sellerPortal/store' component={Store}></Route>
                    <Route path='/sellerPortal/upload' component={Upload}></Route>
                    <Redirect to='/sellerPortal/privateInfo'></Redirect>
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
)(SellerPortal)