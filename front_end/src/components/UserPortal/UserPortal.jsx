import axios from 'axios'
import React, { Component } from 'react'

//redux
import {connect} from 'react-redux'

//redux action-creater
import {setAuthStatus} from '../../redux/actions/authStatus'


class UserPortal extends Component {
    state = {
        error: '',
        protectedData: ''        
    }

    componentDidMount(){
        this.getProtectedDataFromBackend()
    }

    getProtectedDataFromBackend = async () =>{
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        try {
            const {data} = await axios.get('/toBackendServer/to/protected/', config) 
            this.setState({
                protectedData: data.data
            })
        } catch (error) {
            localStorage.removeItem('accessToken')
            this.setState({
                error: "You don't have access to this page"
            })
        }
    }

    logOut = () =>{
        localStorage.removeItem('accessToken')
        this.props.setAuthStatus(false)
        this.props.history.push('/login')
    }

    render() {
        const {error, protectedData} = this.state
        return (
            error?<span>{error}</span> : <>
                <h1>{protectedData}</h1>
                <a onClick={this.logOut}>Logout</a>
            </>
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