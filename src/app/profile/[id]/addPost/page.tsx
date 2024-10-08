"use client"

import React, { useRef, useState } from 'react'
import cl from './style.module.sass'
import axios from 'axios'
import Loading from '@/components/loading/loading'
import { useRouter } from 'next/navigation'
import addPost from '@/services/posts/addPost'
import { useCookies } from 'react-cookie'

const Component = ({params}: {params: {id: string}}) => {

    const [cookie, setCookie, removeCookie] = useCookies()

    const userID = params.id
    const TOKEN = cookie.TOKEN
    
    const fileRef = useRef(null)
    const [text, setText] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const loadImg = () => {
        // @ts-ignore
        const file = fileRef.current?.files.item(0)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(String(reader.result))
        } 
    }

    const post = () => {
        setIsLoading(true)
        // @ts-ignore
        addPost(text, TOKEN, fileRef.current?.files.item(0))
            .then(res => {
                router.push(`/profile/${userID}/`)
                setIsLoading(false)
            })
    }

    return (
        <div>
            <div className="block">
                <h2 className="heading">Публикация поста</h2>
                <textarea name="" id="" placeholder='Описание поста' value={text} onChange={e => setText(e.target.value)} required></textarea>
                <img src={image} className={cl.image} /><br />
                <label className="input-file">
                    <input type="file" name="file" onChange={loadImg} ref={fileRef} accept="image/*" hidden />		
                    <span className='blueButton'>Загрузить картинку</span>
 		        </label>
                
                <br />
                <button className='greenButton' onClick={post} style={{marginTop: '40px'}}>{isLoading ? <Loading /> : 'Опубликовать'}</button>
            </div>
        </div>
    )
}
export default Component