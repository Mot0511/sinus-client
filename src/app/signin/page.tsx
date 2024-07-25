'use client'
import querystring  from 'querystring'
import React, { useState } from 'react'
import cl from './style.module.sass'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading/loading'
import login from '@/services/login'
import getCurrentUser from '@/services/getCurrentUser'
import { useCookies } from 'react-cookie'
import Link from 'next/link'

const Component = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [email, setEmail] = useState<string>('')
    const [password, setPasword] = useState<string>('')

    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const router = useRouter()

    const submit = () => {
        setIsLoading(true)

        const params = new URLSearchParams()
        params.append('username', email)
        params.append('password', password)

        login(email, password)
            .then(TOKEN => {
                getCurrentUser(TOKEN)
                    .then((user) =>  {
                        setCookie('TOKEN', TOKEN, {
                            maxAge: 31536000
                        })
                        router.push(`/profile/${user.id}`);
                        setIsLoading(false) 
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
            .catch(e => {
                console.log(e)
                if (e.response.status == 400){
                    setError('Неверная почта или пароль')
                }
                setIsLoading(false)  
            })
    }

    return (
        <div className={cl.main}>
            <div className={cl.win}>
                <h2>Авторизация</h2>
                <input type="email" placeholder='Почта' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Пароль' value={password} onChange={e => setPasword(e.target.value)} />

                <button className={'greenButton'} onClick={submit} style={{marginTop: '10px', width: '100%', height: '35px'}} >{!isLoading ? 'Войти' : <Loading />}</button>
                <br />
                <Link href='/signin/forgot_password'>Восстановление пароля</Link>
                {
                    error && <p className={'error'}>{error}</p>
                }
            </div>
        </div>
    )
}
export default Component