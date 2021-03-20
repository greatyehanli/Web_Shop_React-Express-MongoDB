import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import socketIoClient from 'socket.io-client'

//compinents
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

//css
import "./Chat.css"


let socket = undefined

//路由链接的location在钩子函数里面可以这样拿, 类似类组件的props里面去拿
export default function Chat({location}) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const backendURI = 'http://localhost:5001'

    useEffect(()=>{
        //query传参在这叫search, 我们parse一下
        const data = queryString.parse(location.search)
        socket = socketIoClient( backendURI, { transports: ['websocket', 'polling', 'flashsocket'] });
        setRoom(data.room);
        setName(data.name)
        console.log(socket);
        console.log({name, room}, data);
        socket.emit('join', data, ()=>{
            //error handling
        })

        // unmount的时候调用return里面的东西
        return () => {
            console.log('!!!!!!!!!!aaaaa')
            socket.emit('disconnect')
            socket.off()
        }
        // useEffect will only get called if any of the attributes in [backendURI, location.search] changes
     }, [backendURI, location.search])


     useEffect(()=>{

         //on永远都是监听, message是后台发的
        socket.on('message', (message) => {
            console.log("第二个UserEffect", message);

            setMessages([...messages, message])
        })
     }, [messages])


     //function to sendMessages
     const sendMessage =(event) =>{
         //阻止在keyPress的时候, 整个页面自动刷新的默认设置
        event.preventDefault()
        socket.emit('sendMessage', message, ()=>{
            setMessage('')
        })
     }

     console.log('!!!!!', message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                {/* <input value={message} onChange={ (event)=> setMessage(event.target.value) }
                        onKeyPress={event => event.key === 'Enter'? sendMessage(event) : null}/> */}
            </div>
            {/* <TextContainer users={users}/> */}
        </div>
  
    )
}
