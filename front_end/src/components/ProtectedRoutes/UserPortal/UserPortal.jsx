import React, { Component } from 'react'

//components
import UserSubNav from './UserSubNav/UserSubNav'

import "./UserPortal.css"

export default class UserPortal extends Component {
    render() {
        return (
            <div>
                <UserSubNav history = {this.props.history}/>
            </div>
        )
    }
}
