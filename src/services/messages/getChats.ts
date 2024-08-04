import axios from "axios"
import Chat from '@/types/chat'

const getChats = (user_id: string) => {
    return new Promise((resolve: (chats: Chat[]) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/messages/getChats/${user_id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getChats