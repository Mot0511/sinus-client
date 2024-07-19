import React from 'react'
import cl from './style.module.sass'

const Person = () => {
    return (
        <div className={cl.item}>
            <div className={cl.avatar}></div>
            <div className={cl.item__info}>
                <p className={cl.item__name}>Суворов Матвей</p>
                <p className={cl.item__username}>@Mot0511</p>
            </div>
        </div>
    )
}
export default Person