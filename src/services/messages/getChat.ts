import axios from "axios"
import Chat from '@/types/chat'

const getChat = (chat_id: string, TOKEN: string) => {
    return new Promise((resolve: (chats: Chat) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/messages/getChat/${chat_id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getChat