import React, { Component } from 'react'

//components
import SellerSubNav from './SellerSubNav/SellerSubNav'

import "./SellerPortal.css"

export default class UserPortal extends Component {
    render() {
        return (
            <div>
                <SellerSubNav history = {this.props.history}/>
            </div>
        )
    }
}
