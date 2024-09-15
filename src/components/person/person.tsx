'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import UserRead from '@/types/user'
import { getFileUrl } from '@/services/firebase'

const Person = ({user, isInOnline, style, onClick}: {user: UserRead | undefined, isInOnline: number, style: any, onClick: () => void}) => {

    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        getFileUrl(`avatars/${user?.id}.png`)
            .then(url => {
                setAvatar(url)
            })
    }, [])

    return (
        <div className={cl.item} style={style} onClick={onClick}>
            <div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div>
            <div className={cl.item__info}>
                <p className={cl.item__name}>
                    {user?.name}
                    {/* {
                        isInOnline == 0
                            ? <span style={{color: 'grey'}}> Не в сети</span>
                            : isInOnline == 1 && <span style={{color: 'green'}}> В сети</span>
                    } */}
                </p>
                <p className={cl.item__username}>@{user?.username}</p>
            </div>
        </div>
    )
}
export default Person