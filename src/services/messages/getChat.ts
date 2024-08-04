import axios from "axios"
import Chat from '@/types/chat'

const getChat = (chat_id: string) => {
    return new Promise((resolve: (chats: Chat) => void, reject) => {
        axios.get(`${process.env.SERVER}/messages/getChat/${chat_id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getChat