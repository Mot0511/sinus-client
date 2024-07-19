import React from 'react'
import cl from './loading.module.sass'

const Loading = (props: any) => {
    return (
        <div className={cl.container} {...props}>
            <div className={cl.loading}>
                <div>

                </div>
            </div>
        </div>
        
    )
}

export default Loading