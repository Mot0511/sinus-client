'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Message from '@/components/message/message'
import Person from '@/components/person/person'
import getCurrentUser from '@/services/getCurrentUser'
import { useCookies } from 'react-cookie'
import UserRead from '@/types/user'
import Link from 'next/link'
import MessageType from '@/types/message'
import getMessages from '@/services/messages/getMessages'


const Chat = ({params}: {params: {id: string}}) => {

    const [cookies, setCookies, removeCookies] = useCookies()
    const TOKEN = cookies.TOKEN
    const chat_id = params.id

    const [user, setUser] = useState<UserRead>()
    const [messages, setMessages] = useState<MessageType[]>([])

    const [isInOnline, setIsInOnline] = useState<boolean>(false)

    const connect = (username: string) => {
        const ws = new WebSocket(`ws://localhost:8000/messages/connect/${username}/${chat_id}`)
        ws.onmessage = (e) => {
            const message = JSON.parse(e.data)
            switch (message.type){
                case 'new_message':
                    setMessages([...messages, message.content])
                    break

                case 'remove_message':
                    setMessages(messages.filter(mess => mess.id != message.id))
                
                case 'in_online':
                    setIsInOnline(true)

                case 'in_offline':
                    setIsInOnline(false)
            }
        }
    }

    useEffect(() => {
        getCurrentUser(TOKEN)
            .then(user => {
                connect(user.username)
                setUser(user)
                
            })
    
        getMessages(chat_id)
            .then(messages => {
                setMessages(messages)
            })
    
        scrollBottom()
    }, [])

    const scrollBottom = () => {
        const messageBody = document.querySelector('#messages');
        // @ts-ignore
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }   

    return (
        <>
            {
                user
                    ? <Link href={`/profile/${user.id}`}><Person user={user} isInOnline={isInOnline} /></Link>
                    : <></>
            }
            <div className={cl.chat + ' block'}>
                <div className={cl.messages} id={'messages'}>
                    <Message mess={{username: 'Mot0511', text: 'Привет, как дела?'}} />
                </div>
                <div className={cl.controls}>
                    <input type="text" placeholder='Сообщение' />
                    <button className='greenButton'>Отправить</button>
                </div>
            </div>
        </>
        
    )
}
export default Chat