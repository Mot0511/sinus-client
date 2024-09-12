import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import login from '@/services/users/login'
import getUser from '@/services/users/getUser'
import getOnePost from '@/services/posts/getOnePost'
import PostModel from '@/types/post'
import { getFileUrl } from '@/services/firebase'

const Post = ({post, isDeleteAble, onDelete}: {post: PostModel, isDeleteAble: boolean, onDelete: (id: number) => void | null}) => {

    const [username, setUserName] = useState<string>('')
    const [image, setImage] = useState<string>('');
    
    useEffect(() => {
        getOnePost(post.id)
            .then(res => {
                getUser(res.user)
                    .then(res => {
                        setUserName(res.username)
                        getFileUrl(`posts/${post.id}.png`)
                            .then((url: string) => {
                                setImage(url)
                            })
                    })
            })
    }, [])

    return (
        <div className={cl.post}>
            <img src={image} alt="" />
            <div>
                <p className={cl.username}>@{username}</p>
                <p className={cl.caption}>{post.text}</p>
                {
                    isDeleteAble && <button className="redButton" onClick={() => onDelete(post.id)} style={{fontSize: '15px', marginTop: '10px'}}>Удалить</button>
                }
                
            </div>
        </div>
    )
}
export default Post