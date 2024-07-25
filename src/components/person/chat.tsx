import React from 'react'
import cl from './style.module.sass'
import UserRead from '@/types/user'

const Person = ({user}: {user: UserRead}) => {
    return (
        <div className={cl.item}>
            <div className={cl.avatar} style={{backgroundImage: `url(http://localhost:8000/auth/getAvatar/${user.id})`}}></div>
            <div className={cl.item__info}>
                <p className={cl.item__name}>{user.name}</p>
                <p className={cl.item__username}>@{user.username}</p>
            </div>
        </div>
    )
}
export default Person