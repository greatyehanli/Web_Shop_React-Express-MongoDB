//cores
import React, { Component } from 'react'
import axios from 'axios'

import './PrivateInfo.css'

export default class PrivateInfo extends Component {

    state = {
        error: '',
        userName: '',
        email : ''        
    }

    componentDidMount(){
        this.getProtectedDataFromBackend()
    }

    getProtectedDataFromBackend = async () =>{
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessTokenForSeller')}`
            }
        }

        try {
            const {data} = await axios.get('/toBackendServer/seller/me', config) 
            console.log("wowowowowowoowow: ", data);
            this.setState({
                userName: data.name,
                email: data.email
            })
        } catch (error) {
            localStorage.removeItem('accessTokenForSeller')
            this.setState({
                error: "You don't have access to this page"
            })
        }
    }

    render() {
          
        const {error, userName, email} = this.state
        return (
            <div>

                <section className="private_info_bd">
                    <div className="private_hd">
                        <h3>Seller Attributes</h3>
                    </div>
                    
                    <table className="seller_data_table">
                        <tbody>
                            <tr>
                                <td><u>Username:</u></td>
                                <td>{userName}</td>
                            </tr>
                
                            <tr>
                                <td><u>Email:</u></td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* {error?<span>{error}</span> : <>
                    <h1>{protectedData}</h1>
                </>
                } */}
            </div>
        )
    }
}
