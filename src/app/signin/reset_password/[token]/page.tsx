'use client'

import forgotPassword from '@/services/forgotPassword'
import resetPassword from '@/services/resetPassword'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const ResetPassword = ({params}: {params: {token: string}}) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const TOKEN = params.token

    const [password, setPasword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const [error, setError] = useState<string>('')

    const router = useRouter()

    const reset = () => {
        if (password == repeatPassword){
            resetPassword(TOKEN, password)
                .then(res => {
                    if (res == 200){
                        router.push(`/signin`);
                    }
                })
        } else {
            setError('Пароли не совпадают')
        }
        
    }

    return (
        <div>
            <div className="block">
                <h1 className="heading">Восстановление пароля</h1>
                <input type="password" placeholder='Пароль' value={password} onChange={e => setPasword(e.target.value)} />
                <input type="password" placeholder='Повторите пароль' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                <button className='greenButton' onClick={reset}>Сменить пароль</button>
                <p className='error'>{error}</p>
            </div>
        </div>
    )
}
export default ResetPassword