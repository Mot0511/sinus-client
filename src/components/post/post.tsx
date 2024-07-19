import React from 'react'
import cl from './style.module.sass'

const Post = () => {
    return (
        <div className={cl.post}>
            <img src="https://gas-kvas.com/uploads/posts/2023-02/1675484237_gas-kvas-com-p-kartinki-dlya-fonovogo-risunka-raboch-stol-15.jpg" alt="" />
            <div>
                <p className={cl.caption}>Описание поста</p>
            </div>
        </div>
    )
}
export default Post