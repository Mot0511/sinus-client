import React from 'react'
import cl from './style.module.sass'

const Message = ({mess}: {mess: {username: string, text: string}}) => {
    return (
        <div className={cl.message}>
            <p className={cl.username}>@{mess.username}</p>
            <p className={cl.text}>{mess.text}</p>
        </div>
    )
}
export default Message