import Message from "@/types/message"
import axios from "axios"

const getMessages = (chat_id: string) => {
    return new Promise((resolve: (messages: Message[]) => void, reject) => {
        axios.get(`http://localhost:8000/messages/get/${chat_id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getMessages