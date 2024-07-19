'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Link from 'next/link'
import Post from '@/components/post/post'
import { useRouter } from 'next/navigation'
import getCurrentUser from '@/services/getCurrentUser'
import { useCookies } from 'react-cookie'
import UserRead from '@/types/user'
import login from '@/services/login'
import getUser from '@/services/getUser'
import Loading from '@/components/loading/loading'

const Profile = ({params}: {params: {id: string}}) => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const id = params.id
    const TOKEN = cookie.TOKEN

    const [user, setUser] = useState<UserRead>()
    const [isOwner, setIsOwner] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        login('suvorov.matvej9@gmail.com', 'motik0511')
            .then(superuser_token => {
                getUser(superuser_token, id)
                    .then(user => {
                        setUser(user)

                        if (TOKEN) {
                            getCurrentUser(TOKEN)
                                .then(current_user => {
                                    if (user.id == current_user.id){
                                        setIsOwner(true)
                                    }
                                })
                        }
                        setIsLoading(false)
                    })
            })
    }, [])

    return (
        <div className={cl.profile}>
            {
                isLoading
                    ? <Loading />
                    : <>
                        <div className={cl.leftColumn}>
                            <div style={{backgroundImage: 'url(https://justvision.org/sites/default/files/2019-11/ofer-shinar.png)'}} className={cl.avatar}></div>
                        </div>
                        <div className={cl.rightColumn}>
                            <div className={cl.info}>
                                <p className={cl.username}>{user?.username}</p>
                                <h2 className={cl.name}>{user?.name}</h2>
                                <p className={cl.description}>
                                    {user?.description}
                                </p>
                            </div>
                            <div className={cl.posts}>
                                <h2 className='heading'>Посты</h2>
                                {
                                    isOwner && <Link href={`/profile/${id}/addPost`}><button className={'greenButton'}>Добавить пост</button></Link>
                                }
                                <div className={'flex'}>
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                </div>
                            </div>
                        </div>
                    </>
            }
            
        </div>
    )
}
export default Profile