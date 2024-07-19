'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Link from 'next/link'
import { useCookies } from 'react-cookie';
import logout from '@/services/logout';
import {useRouter} from 'next/navigation'
import getCurrentUser from '@/services/getCurrentUser';

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const TOKEN = cookies.TOKEN

    const router = useRouter()

    const [isLogined, setIsLogined] = useState<boolean>(false)
    const [id, setId] = useState<string | undefined>()

    useEffect(() => {
        if (TOKEN){
            setIsLogined(true)
            getCurrentUser(TOKEN)
                .then(user => {
                    setId(user.id)
                })
        }
    })

    const logout_handler = () => {
        removeCookie('TOKEN')
        setIsLogined(false)
        router.push('/signin')
    }

    return (
        <div className={cl.header}>
            <h1><Link href={'/'}>Sinus</Link></h1>
            <ul className={cl.menu}>
                <li><Link href={'/'}>Новости</Link></li>
                <li><Link href={'/chats'}>Мои чаты</Link></li>
                <li><Link href={id ? `/profile/${id}` : '/signin'}>Моя страница</Link></li>
            </ul>
            {
                isLogined
                    ? <button className={'blueButton'} onClick={logout_handler} style={{marginRight: '10px'}}>Выйти</button>
                    : <div className={cl.header__buttons}>
                        <Link href="/signin"><button className={'greenButton'} style={{marginRight: '10px'}}>Войти</button></Link>
                        <Link href="/signup"><button className={'blueButton'}>Зарегистрироваться</button></Link>
                    </div>
            }
            
        </div>
    )
}
export default Header