'use client'

import React, { useEffect } from 'react'
import cl from './style.module.sass'
import Person from '@/components/person/chat'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

const Chats = () => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const TOKEN = cookie.TOKEN


    useEffect(() => {
        if (!TOKEN){
            router.push('/signin')
        }
    }, [])

    return (
        <div>
            <h2 className='heading'>Чаты</h2>
            <div className={cl.list}>
                <Person />
            </div>
        </div>
    )
}
export default Chats