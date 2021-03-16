//cores
import React, { Component } from 'react'
import axios from 'axios'

import './PrivateInfo.css'

export default class PrivateInfo extends Component {

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

    render() {
          
        const {error, protectedData} = this.state
        return (
            <div>

                <section className="private_info_bd">
                    <div className="private_hd">
                        <h3>User Attributes</h3>
                    </div>
                    
                    <table className="user_data_table">
                        <tbody>
                            <tr>
                                <td><u>Username:</u></td>
                                <td>sample</td>
                            </tr>
                
                            <tr>
                                <td><u>Email:</u></td>
                                <td>sample</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {error?<span>{error}</span> : <>
                    <h1>{protectedData}</h1>
                </>
                }
            </div>
        )
    }
}
