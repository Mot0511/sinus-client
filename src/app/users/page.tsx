'use client'

import Loading from '@/components/loading/loading'
import Person from '@/components/person/chat'
import getUsers from '@/services/getUsers'
import UserRead from '@/types/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Users = () => {

    const [users, setUsers] = useState<UserRead[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        getUsers()
            .then(users => {
                setUsers(users)
                setIsLoading(false)
            })
    }, [])
    
    return (
        <>
            <h1 className='heading'>Все пользователи</h1>
            {
                isLoading
                    ? <Loading />
                    : users?.map(user => <Link href={`/profile/${user.id}`}><Person user={user} /></Link>)
                
            }
        </>
    )
}

export default Users