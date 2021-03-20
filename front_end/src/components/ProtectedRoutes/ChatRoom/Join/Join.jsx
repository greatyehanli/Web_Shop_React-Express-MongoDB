import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './Join.css'

export default function Join() {

    //first time to use hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className='heading'>
                    Let's Chat
                </h1>
                <div><input placeholder='Name' className='joinInput' type="text" onChange={(event)=> setName(event.target.value)}/></div>
                <div><input placeholder='Room' className='joinInput mt-20' type="text" onChange={(event)=>setRoom(event.target.value)}/></div>
                {/* if no name or no room, prevent this btn click event, otherwise, do nothing */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chatRoom/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type='submit'> Join in </button>
                </Link>
            </div>
        </div>
    )
}

