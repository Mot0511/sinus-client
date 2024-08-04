import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import login from '@/services/users/login'
import getUser from '@/services/users/getUser'
import getOnePost from '@/services/posts/getOnePost'

const Post = ({id, text, isDeleteAble, onDelete}: {id: number, text: string, isDeleteAble: boolean, onDelete: (id: number) => void | null}) => {

    const [username, setUserName] = useState<string>('')
    
    useEffect(() => {
        getOnePost(id)
            .then(res => {
                getUser(res.user)
                    .then(res => {
                        setUserName(res.username)
                    })
            })
    }, [])

    return (
        <div className={cl.post}>
            <img src={`http://localhost:8000/posts/getImage/${id}`} alt="" />
            <div>
                <p className={cl.username}>@{username}</p>
                <p className={cl.caption}>{text}</p>
                {
                    isDeleteAble && <button className="redButton" onClick={() => onDelete(id)} style={{fontSize: '15px', marginTop: '10px'}}>Удалить</button>
                }
                
            </div>
        </div>
    )
}
export default Post