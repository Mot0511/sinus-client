'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import cl from './style.module.sass'
import { IoMenu } from "react-icons/io5";

const MobileHeader = ({isLogined, id, logoutHandler}: {isLogined: boolean, id: string | undefined, logoutHandler: () => void}) => {
    
    const headerRef = useRef(null)
    const [isDropped, setIsDropped] = useState<boolean>(false)

    const drop = () => {
        if (!isDropped){
            // @ts-ignore
            headerRef.current.style = 'height: 320px;'
            setIsDropped(true)
        } else {
            // @ts-ignore
            headerRef.current.style = 'height: 50px;'
            setIsDropped(false)
        }
    }

    return (
        <div className={cl.header} ref={headerRef}>
            <div className={cl.top}>
                <h1><Link href={'/'}>Pipeup</Link></h1>
                <button className={cl.menu} onClick={drop}><IoMenu color='white' size={'35'} /></button>
            </div>
            <div className={cl.dropdown}>
                <ul className={cl.menu}>
                    <li><Link href={'/'} onClick={drop}>Новости</Link></li>
                    <li><Link href={'/users'} onClick={drop}>Все пользователи</Link></li>
                    <li><Link href={'/chats'} onClick={drop}>Мои чаты</Link></li>
                    <li><Link href={id ? `/profile/${id}` : '/signin'} onClick={drop}>Моя страница</Link></li>
                </ul>
                {
                    isLogined
                        ? <button className={'blueButton'} onClick={logoutHandler}>Выйти</button>
                        : <div className={cl.header__buttons}>
                            <Link href="/signin"><button className={'greenButton'} style={{marginBottom: '10px'}}>Войти</button></Link>
                            <Link href="/signup"><button className={'blueButton'} style={{marginBottom: '10px'}}>Зарегистрироваться</button></Link>
                        </div>
                }
            </div>
        </div>
    )
}
export default MobileHeader