import React from 'react'
import cl from './style.module.sass'
import MessageType from '@/types/message'

const Message = ({mess, myUsername, onDelete}: {mess: MessageType, myUsername: string, onDelete: (mess_id: number) => void}) => {

    return (
        <div className={cl.message}>
            <p className={cl.username} style={{fontWeight: (myUsername == mess.user ? 'bold' : 'normal')}}>@{mess.user}</p>
            <p className={cl.text}>{mess.text}</p>
            {
                myUsername == mess.user && <a className={cl.deleteBtn} onClick={() => onDelete(mess.id)}>Удалить</a>
            }
        </div>
    )
}
export default Message