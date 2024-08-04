'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Link from 'next/link'
import { useCookies } from 'react-cookie';
import logout from '@/services/users/logout';
import {useRouter} from 'next/navigation'
import getCurrentUser from '@/services/users/getCurrentUser';
import CommonHeader from './commonHeader/header';
import MobileHeader from './mobileHeader/mobileHeader';

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const TOKEN = cookies.TOKEN

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLogined, setIsLogined] = useState<boolean>(false)
    const [id, setId] = useState<string | undefined>()
    const [isModile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (TOKEN){
            setIsLogined(true)
            getCurrentUser(TOKEN)
                .then(user => {
                    setId(user.id)
                })
        }

        if (window.innerWidth <= 930){
            setIsMobile(true)
        }
    })

    const logoutHandler = () => {
        removeCookie('TOKEN')
        setIsLogined(false)
        router.push('/signin')
    }

    return (
        isModile
            ? <MobileHeader isLogined={isLogined} id={id} logoutHandler={logoutHandler} />
            : <CommonHeader isLogined={isLogined} id={id} logoutHandler={logoutHandler}  />
    )
}
export default Header