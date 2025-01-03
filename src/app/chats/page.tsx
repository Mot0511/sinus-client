'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Person from '@/components/person/person'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import getChats from '@/services/messages/getChats'
import getCurrentUser from '@/services/users/getCurrentUser'
import Chat from '@/types/chat'
import Link from 'next/link'
import Loading from '@/components/loading/loading'
import { MdDelete } from 'react-icons/md'
import removeChat from '@/services/messages/removeChat'
import ChatsType from '@/types/chats'

const Chats = () => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const TOKEN = cookie.TOKEN

    const [chats, setChats] = useState<ChatsType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        if (!TOKEN){
            router.push('/signin')
        } else {
            setIsLoading(true)
            getChats(TOKEN)
                .then(chats => {
                    console.log(chats)
                    setChats(chats)
                    setIsLoading(false)
                })
        }
    }, [])

    const deleteChat = (chat_id: number) => {
        setChats(chats?.filter(chat => chat[0] != chat_id))
        removeChat(chat_id, TOKEN)
    }

    return (
        <div>
            <h2 className='heading'>Чаты</h2>
            <div className={cl.list}>
                {
                    isLoading
                        ? <Loading />
                        : chats?.map(chat => <div className={cl.chat} key={chat[0]}>
                            <Person onClick={() => {router.push(`chats/${chat[0]}`)}} style={{width: '100%'}} user={chat[1]} isInOnline={2} />
                            <button onClick={() => deleteChat(chat[0])} className='blueButton'><MdDelete /></button>
                        </div>)
                }
            </div>
        </div>
    )
}
export default Chats