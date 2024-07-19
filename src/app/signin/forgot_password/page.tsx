'use client'

import forgotPassword from '@/services/forgotPassword'
import React, { useState } from 'react'

const ResetPassword = () => {

    const [email, setEmail] = useState<string>('suvorov.matvej9@gmail.com')
    const [confirmForm, setConfirmForm] = useState<boolean>(false)
    const [newPasswordForm, setNewPasswordForm] = useState<boolean>(false)


    const [code, setCode] = useState<number>()
    const [inputCode, setInputCode] = useState<string>()

    const [password, setPasword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const [error, setError] = useState<string>('')


    const reset = () => {

        // const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

        forgotPassword(email)
            .then(res => {
                if (res == 202){
                    setConfirmForm(true)
                    // setCode(code)
                }
            })
    }

    // const confirm = () => {
    //     if (code == inputCode){
    //         setNewPasswordForm(true)
    //     } else {
    //         setError('Введен неверный код')
    //     }
    // }


    return (
        <div>
            <div className="block">
                <h1 className="heading">Восстановление пароля</h1>
                <input type="email" placeholder='Ваша почта' value={email} onChange={e => setEmail(e.target.value)} />
                <button className='greenButton' onClick={reset}>Отправить письмо с ссылкой для восстановления</button>
                {/* {
                    confirmForm && <>
                        <input type="text" placeholder='Введите код из письма' value={inputCode} onChange={e => setInputCode(e.target.value)} />
                        <button className='greenButton' onClick={confirm}>Подтвердить</button>
                    </>
                }
                {
                    newPasswordForm && <>
                        <input type="text" placeholder='Новый пароль' value={password} onChange={e => setPasword(e.target.value)} />
                        <input type="text" placeholder='Подтвердите новый пароль' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                        <button className='greenButton' onClick={changePassword}>Подтвердить</button>
                    </>
                }
                <p className='error'>{error}</p> */}

            </div>
        </div>
    )
}
export default ResetPassword