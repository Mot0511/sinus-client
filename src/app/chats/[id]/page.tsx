'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Message from '@/components/message/message'
import Person from '@/components/person/person'
import getCurrentUser from '@/services/users/getCurrentUser'
import { useCookies } from 'react-cookie'
import UserRead from '@/types/user'
import Link from 'next/link'
import MessageType from '@/types/message'
import getMessages from '@/services/messages/getMessages'
import getChat from '@/services/messages/getChat'
import getUser from '@/services/users/getUser'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import useWebSocket, { ReadyState } from 'react-use-websocket';


const Chat = ({params}: {params: {id: string}}) => {

    const [cookies, setCookies, removeCookies] = useCookies()
    const TOKEN = cookies.TOKEN
    const chat_id = params.id

    const [wsUrl, setWsUrl] = useState<string>('')
    const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

    const [companion, setCompanion] = useState<UserRead>()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [message, setMessage] = useState<string>('')
    const [currentUserId, setCurrentUserId] = useState<string>()
    const [myUsername, setMyUsername] = useState<string>('')

    const [isInOnline, setIsInOnline] = useState<boolean>(false)

    useEffect(() => {
        if (lastMessage !== null) {
            const message = JSON.parse(lastMessage.data)
            switch (message.type){
                case 'new_message':
                    const content = JSON.parse(message.content)
                    setMessages(prev => [...prev, content])
                    scrollBottom()
                    break

                case 'remove_message':
                    setMessages(messages.filter(mess => mess.id != message.content))
                    scrollBottom()
                    break
                
                case 'in_online':
                    setIsInOnline(true)
                    break

                case 'in_offline':
                    setIsInOnline(false)
                    break
            }
        }
      }, [lastMessage]);

    useEffect(() => scrollBottom(), [messages.length])

    useEffect(() => {
        getCurrentUser(TOKEN)
            .then(user => {
                setWsUrl(`${process.env.NEXT_PUBLIC_WS}/messages/connect/${user.username}/${chat_id}`)
                setMyUsername(user.username)
                getChat(chat_id, TOKEN)    
                    .then(chat => {
                        if (chat.user1 == user.id){
                            getUser(chat.user2)
                                .then(user => setCompanion(user))
                        } else {
                            getUser(chat.user1)
                                .then(user => setCompanion(user))
                        }
                    })

                setCurrentUserId(user.id)
            })

        getMessages(chat_id)
            .then(messages => {
                setMessages(messages)
                scrollBottom()
            })
    }, [])

    const send_message = () => {
        if (message) {
            sendMessage(JSON.stringify({
                type: 'send',
                message: {
                    chat: Number(chat_id),
                    user: currentUserId,
                    text: message,
                }
            }))
            setMessage('')
        }
    }

    const delete_message = (mess_id: number) => {
        sendMessage(JSON.stringify({
            type: 'remove',
            message: {
                id: mess_id
            }
        }))
    }

    const scrollBottom = () => {
        const messageBody = document.querySelector('#messages');
        // @ts-ignore
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }   

    return (
        <>
            {
                companion
                    // @ts-ignore
                    ? <Link href={`/profile/${companion.id}`}><Person user={companion} isInOnline={isInOnline ? 1 : 0} /></Link>
                    : <></>
            }
            <div className={cl.chat + ' block'}>
                <div className={cl.messages} id={'messages'}>
                    {
                        messages.map(message => <Message mess={message} myUsername={myUsername} onDelete={delete_message} key={message.id} />)
                    }
                </div>
                <div className={cl.controls}>
                    <input type="text" placeholder='Сообщение' value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.keyCode == 13 && send_message()} />
                    <button className='greenButton' onClick={send_message}>Отправить</button>
                </div>
            </div>
        </>
        
    )
}
export default Chat