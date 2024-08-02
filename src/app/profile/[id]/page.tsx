'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Link from 'next/link'
import Post from '@/components/post/post'
import { useRouter } from 'next/navigation'
import getCurrentUser from '@/services/getCurrentUser'
import { useCookies } from 'react-cookie'
import UserRead from '@/types/user'
import PostSchema from '@/types/post'
import login from '@/services/login'
import getUser from '@/services/getUser'
import Loading from '@/components/loading/loading'
import getPosts from '@/services/getPosts'
import setAvatar from '@/services/setAvatar'
import updateProfile from '@/services/updateProfile'
import deletePost from '@/services/deletePost'
import removeFriend from '@/services/removeFriend'
import addFriend from '@/services/addFriend'
import addChat from '@/services/messages/addChat'

const Profile = ({params}: {params: {id: string}}) => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const id = params.id
    const TOKEN = cookie.TOKEN

    const [user, setUser] = useState<UserRead>()
    const [posts, setPosts] = useState<PostSchema[]>()
    const [friendsCount, setFriendsCount] = useState<number>()

    const [isOwner, setIsOwner] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFriend, setIsFriend] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getUser(id)
            .then(user => {
                setUser(user)
                setFriendsCount(JSON.parse(user.friends).length)

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
        
        getPosts(id)
            .then(posts => {
                setPosts(posts)
            })
    }, [])

    const updateAvatar = (e: any) => {
        setAvatar(id, e.target.files.item(0))
    }

    const saveChanges = () => {
        setIsEditing(false)
        updateProfile({
            name: user?.name,
            description: user?.description
        }, TOKEN)
    }

    const deletePost_handler = (id: number) => {
        deletePost(id)
        setPosts(posts?.filter(post => post.id != id))
    }

    const changeFriend = () => {
        getCurrentUser(TOKEN)
            .then(user => {
                if (isFriend){
                    removeFriend({user1: user.id, user2: id})
                        .then(res => {
                            setIsFriend(false)
                        })
                } else {
                    addFriend({user1: user.id, user2: id})
                        .then(res => {
                            setIsFriend(true)
                        })
                }
            })
    }

    const sendMessage = () => {
        getCurrentUser(TOKEN)
            .then(user => {
                addChat(user.id, id)
                    .then(chat_id => {
                        router.push(`/chats/${chat_id}`)
                    })
            })
    }

    return (
        <div className={cl.profile}>
            {
                isLoading
                    ? <Loading />
                    : <>
                        <div className={cl.leftColumn}>
                            <div style={{backgroundImage: `url(http://localhost:8000/auth/getAvatar/${id})`}} className={cl.avatar}></div>
                            
                            {
                                isOwner
                                    ? <>
                                        <label className="input-file">
                                            <input type="file" name="file" onChange={updateAvatar} accept="image/*" hidden />		
                                            <span className="blueButton" style={{width: '100%'}}>Обновить аватар</span>
                                        </label>
                                        {
                                            isEditing
                                                ? <button className="greenButton" onClick={saveChanges} style={{marginTop: '10px'}}>Сохранить</button>
                                                : <button className="blueButton" onClick={() => setIsEditing(true)} style={{marginTop: '10px'}}>Изменить профиль</button>
                                        }
                                    </>
                                    : <>
                                        <button className='greenButton' onClick={sendMessage} style={{marginBottom: '5px'}}>Написать сообщение</button>
                                        {
                                            isFriend
                                                ? <button className='redButton' onClick={changeFriend}>Удалить из друзей</button>
                                                : <button className='greenButton' onClick={changeFriend}>Добавить в друзья</button>
                                        }
                                    </>
                                         
                            }
                            
                        </div>
                        <div className={cl.rightColumn}>
                            <div className={cl.info}>
                                <p className={cl.username}>@{user?.username}</p>
                                {
                                    isEditing
                                        ? <div className="block" style={{marginTop: '10px'}}>
                                            <h2>Изменение профиля</h2><br />
                                            <input type="text" placeholder='Имя' onChange={e => setUser({...user, name: e.target.value})} value={user?.name} />
                                            <textarea name="" id="" placeholder='Описание' onChange={e => setUser({...user, description: e.target.value})} value={user?.description}></textarea>
                                        </div>
                                        : <>
                                            <h2 className={cl.name}>{user?.name}</h2>
                                            <Link href={`/friends/${id}`} style={{textDecoration: 'underline'}}>{friendsCount} друзей</Link>
                                            <p className={cl.description}>
                                                {user?.description}
                                            </p>
                                        </>
                                }
                                
                            </div>
                            <div className={cl.posts}>
                                <h2 className='heading'>Посты</h2>
                                {
                                    isOwner && <Link href={`/profile/${id}/addPost`}><button className={'greenButton'}>Добавить пост</button></Link>
                                }
                                <div className={'flex'}>
                                {
                                    posts?.map(post => <Post id={post.id} text={post.text} isDeleteAble={isOwner} onDelete={deletePost_handler} />)
                                }
                                </div>
                            </div>
                        </div>
                    </>
            }
            
        </div>
    )
}
export default Profile