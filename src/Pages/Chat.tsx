import React, { useEffect, useState, KeyboardEvent, useRef } from 'react'
import socket from 'socket.io-client'
import axios from 'axios'
import { useLocation, useHistory } from "react-router-dom";
import '../Styles/Pages/Chat.css'

import PomboIcon from '../images/pigeon.svg'





interface Message  {
    id?: string,
    text: string,
    user: string,
}
interface ChatProps {
    user: string
}
interface Users {
    user: string,
    id: string
}
const api = axios.create({baseURL: 'http://localhost:3333/'})

const socketConnection = socket('http://localhost:3333')
export default function Chat() {
    const fistUpdate = useRef(true)
    const divMessage = React.useRef<HTMLDivElement>(null)    
    const history = useHistory()
    const location = useLocation()
    const { user } = location.state as ChatProps
    const [users, setUsers] = useState<Users[]>([])
    const [message, setMessage] = useState<Message>({ text: '', user: '' })
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if(fistUpdate.current) {
            api.get('messages').then(response => {
                setMessages(response.data)
            })

            fistUpdate.current = false

        }
        api.get('users').then(response => {
            setUsers(response.data)
        })
       socketConnection.on('message', (receivedMessage: Message) => {
            setMessages([])
            setMessages([...messages, receivedMessage])
            if(divMessage.current !== null) {
                const scrollHeight =  divMessage.current.scrollHeight
                divMessage.current.scrollTop = scrollHeight
            }
        })

    }, [messages])

    function handleEmitMessage(e: KeyboardEvent ) {    
        if(e.key === 'Enter') {
            socketConnection.emit('message', message)
            setMessage({ text: '', user: user })
        }
    }   

    if(!user) {
        history.push('/')
    }
    return (
        <div id="chat">
            <nav className="chat__navigation">
                <img src={PomboIcon} alt="Pombo"/>
                <h2>Chat Pombo</h2>
            </nav>

            <main className="chat__content">

                <div className="chat__content__container">
                <section className="chat__content_container__messages__content">

                <div className="chat__content__messages" ref={divMessage}>
                            {messages.map(message => (
                                <div key={message.id} className="chat__content__messages__message">
                                    <h3>{message.user}</h3>
                                    <span>{message.text}</span>
                                </div>

                            ))}
                </div>

                <input type="text" placeholder="Escreva sua mensagem aqui" 
                value={message.text} 
                onChange={e => setMessage({ text: e.target.value, user: user })} 
                onKeyDown={e => handleEmitMessage(e)}/>

                </section>

                <section className="chat__content__user_list user--online">
                    <div>
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>{user.user}</li>
                            ))}
                        </ul>
                    </div>
                </section>
                </div>
            </main>
        </div>
    )
}