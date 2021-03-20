import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Join from './Join/Join'
import Chat from './Chat/Chat'

export default class ChatRoom extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/chatRoom/join' component={Join}></Route>
                    <Route path='/chatRoom/chat' component={Chat}></Route>
                    <Redirect to='/chatRoom/join'></Redirect>
                </Switch>
            </div>
        )
    }
}
