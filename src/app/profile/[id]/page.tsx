'use client'

import React, { useEffect, useState } from 'react'
import cl from './style.module.sass'
import Link from 'next/link'
import Post from '@/components/post/post'
import { useRouter } from 'next/navigation'
import getCurrentUser from '@/services/users/getCurrentUser'
import { useCookies } from 'react-cookie'
import UserRead from '@/types/user'
import PostSchema from '@/types/post'
import getUser from '@/services/users/getUser'
import Loading from '@/components/loading/loading'
import getPosts from '@/services/posts/getPosts'
import updateProfile from '@/services/users/updateProfile'
import deletePost from '@/services/posts/deletePost'
import removeFriend from '@/services/users/removeFriend'
import addFriend from '@/services/users/addFriend'
import addChat from '@/services/messages/addChat'
import { getFileUrl, uploadFile } from '@/services/firebase'

const Profile = ({params}: {params: {id: string}}) => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const id = params.id
    const TOKEN = cookie.TOKEN

    const [user, setUser] = useState<UserRead>()
    const [avatar, setAvatar] = useState<string>()
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
                getFileUrl(`avatars/${user.id}.png`)
                    .then((url: string) => {
                        setAvatar(url)
                    })
                setFriendsCount(JSON.parse(user.friends).length)
                if (TOKEN) {
                    getCurrentUser(TOKEN)
                        .then(current_user => {
                            const friends = JSON.parse(current_user.friends)
                            if (friends.includes(user.id)){
                                setIsFriend(true)
                            }
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
        const file = e.target.files.item(0)
        const storagePath = `avatars/${user?.id}.png`
        uploadFile(file, storagePath)
            .then(res => {
                getFileUrl(storagePath)
                    .then(url => {
                        setAvatar(url)
                    })
            })
    }

    const saveChanges = () => {
        setIsEditing(false)
        updateProfile({
            name: user?.name,
            description: user?.description
        }, TOKEN)
    }

    const deletePost_handler = (id: number) => {
        deletePost(id, TOKEN)
        setPosts(posts?.filter(post => post.id != id))
    }

    const changeFriend = () => {
        if (isFriend){
            removeFriend(id, TOKEN)
                .then(res => {
                    setIsFriend(false)
                })
        } else {
            addFriend(id, TOKEN)
                .then(res => {
                    setIsFriend(true)
                })
        }
    }

    const sendMessage = () => {
        addChat(id, TOKEN)
            .then(chat_id => {
                router.push(`/chats/${chat_id}`)
            })
    }

    return (
        <div className={cl.profile}>
            {
                isLoading
                    ? <Loading />
                    : <>
                        <div className={cl.leftColumn}>
                            <div style={{backgroundImage: `url(${avatar})`}} className={cl.avatar}></div>
                            <div className={cl.btns}>
                                {
                                    TOKEN
                                        ? isOwner
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
                                                    !isLoading 
                                                        ? isFriend
                                                            ? <button className='redButton' onClick={changeFriend}>Удалить из друзей</button>
                                                            : <button className='greenButton' onClick={changeFriend}>Добавить в друзья</button>
                                                        : <></>
                                                }
                                            </>
                                        : <></> 
                                }
                            </div>
                            
                            
                        </div>
                        <div className={cl.rightColumn}>
                            <div className={cl.info}>
                                <p className={cl.username}>@{user?.username}</p>
                                {
                                    isEditing
                                        ? <div className="block" style={{marginTop: '10px'}}>
                                            <h2>Изменение профиля</h2><br />
                                            {/* @ts-ignore */}
                                            <input type="text" placeholder='Имя' onChange={e => setUser({...user, name: e.target.value})} value={user?.name} />
                                            {/* @ts-ignore */}
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
                                    posts?.map(post => <Post post={post} isDeleteAble={isOwner} onDelete={deletePost_handler} key={post.id} />)
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