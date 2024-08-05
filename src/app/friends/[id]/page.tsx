'use client'

import Loading from '@/components/loading/loading'
import Person from '@/components/person/person'
import getFriends from '@/services/users/getFriends'
import UserRead from '@/types/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Users = ({params}: {params: {id: string}}) => {

    const id = params.id

    const [users, setUsers] = useState<UserRead[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        getFriends(id)
            .then(friends => {
                console.log(friends)
                setUsers(friends)
                setIsLoading(false)
            })
    }, [])  
    
    return (
        <>
            <h1 className='heading'>Друзья</h1>
            {
                isLoading
                    ? <Loading />
                    : users?.length
                        // @ts-ignore
                        ? users?.map(user => <Link href={`/profile/${user.id}`} key={user.id}><Person user={user} /></Link>)
                        : <h2>Друзья отсутствуют</h2>
                
            }
        </>
    )
}

export default Users