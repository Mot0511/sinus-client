import React from 'react'
import cl from './style.module.sass'

const Post = ({id, text}: {id: number, text: string}) => {
    return (
        <div className={cl.post}>
            <img src={`http://localhost:8000/posts/getImage/${id}`} alt="" />
            <div>
                <p className={cl.caption}>{text}</p>
            </div>
        </div>
    )
}
export default Post