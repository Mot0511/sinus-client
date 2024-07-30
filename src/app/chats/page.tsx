'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Person from '@/components/person/person'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import getChats from '@/services/messages/getChats'
import getCurrentUser from '@/services/getCurrentUser'
import Chat from '@/types/chat'

const Chats = () => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const TOKEN = cookie.TOKEN

    const [chats, setChats] = useState<Chat[]>()


    useEffect(() => {
        if (!TOKEN){
            router.push('/signin')
        } else {
            getCurrentUser(TOKEN)
                .then(user => {
                    getChats(user.id)
                        .then(chats => {
                            setChats(chats)
                        })
                })
        }
    }, [])

    return (
        <div>
            <h2 className='heading'>Чаты</h2>
            <div className={cl.list}>
                <Person  />
            </div>
        </div>
    )
}
export default Chats