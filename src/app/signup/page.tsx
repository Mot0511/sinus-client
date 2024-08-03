'use client'

import React, { useState } from 'react'
import cl from './style.module.sass'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Loading from '@/components/loading/loading'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import login from '@/services/login'
import getCurrentUser from '@/services/getCurrentUser'

const Component = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [username, setUsername] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [password, setPasword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const router = useRouter()

    const submit = () => {
        setIsLoading(true)
        if (password == repeatPassword){
            axios.post('http://localhost:8000/auth/register', {
                "email": email,
                "password": password,
                "is_active": true,
                "is_superuser": false,
                "is_verified": false,
                "username": username,
                "name": `${name} ${surname}`,
                "description": description,
                "friends": "[]"
            }).then(res => {
                login(email, password)
                    .then(TOKEN => {
                        getCurrentUser(TOKEN)
                            .then(user => {
                                setCookie('TOKEN', TOKEN)
                                router.push(`/profile/${user.id}`);
                                setIsLoading(false) 
                            })
                    })
                    .catch(e => {
                        console.log(e)
                    })

            }).catch(e => {
                console.log(e)
                if (e.response.status == 400){
                    setError('Такой пользователь уже существует')
                }
                setIsLoading(false)  
            })
        }
    }

    return (
        <div className={cl.main}>
            <div className={cl.win}>
                <h2>Регистрация</h2>
                <input type="text" placeholder='Имя пользователя' value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" placeholder='Имя' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Фамилия' value={surname} onChange={e => setSurname(e.target.value)} />
                <input type="email" placeholder='Почта' value={email} onChange={e => setEmail(e.target.value)} />
                <textarea placeholder='Описание себя' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <input type="password" placeholder='Пароль' value={password} onChange={e => setPasword(e.target.value)} />
                <input type="password" placeholder='Повторите пароль' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />

                <button className={'blueButton'} style={{marginTop: '10px', width: '100%', height: '35px'}} onClick={submit}>{!isLoading ? 'Зарегистрироваться' : <Loading />}</button>
                {
                    error && <p className={'error'}>{error}</p>
                }
            </div>
        </div>
    )
}
export default Component