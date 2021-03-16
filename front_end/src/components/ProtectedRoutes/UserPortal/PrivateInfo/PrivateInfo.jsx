//cores
import React, { Component } from 'react'
import axios from 'axios'

import './PrivateInfo.css'

export default class PrivateInfo extends Component {

    state = {
        error: '',
        userName: '',
        email: ''        
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
            const {data} = await axios.get('/toBackendServer/to/protected/user/me', config) 
            console.log(data.data);
            //要是后端直接send(data)话这里直接一个data就可以拿到信息了, 用json发送的话, 我们是自定义返回一个{sucess, data}的对象
            this.setState({
                userName: data.data.username,
                email: data.data.email
            })
        } catch (error) {
            localStorage.removeItem('accessToken')
            this.setState({
                error: "You don't have access to this page"
            })
        }
    }

    render() {
          
        const {error, userName, email} = this.state
        return (
            <div>
                {error?<span>{error}</span> : 

                    <section className="private_info_bd">
                        <div className="private_hd">
                            <h3>User Attributes</h3>
                        </div>
                        
                        <table className="user_data_table">
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
                }
            </div>
        )
    }
}
