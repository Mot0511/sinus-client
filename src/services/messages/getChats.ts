import axios from "axios"
import Chat from '@/types/chat'

const getChats = (user_id: string) => {
    return new Promise((resolve: (chats: Chat[]) => void, reject) => {
<<<<<<< HEAD
        axios.get(`http://localhost:8000/messages/getChats/${user_id}`)
=======
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/messages/getChats/${user_id}`)
>>>>>>> env-tests
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getChats