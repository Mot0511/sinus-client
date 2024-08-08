import axios from "axios"

const removeChat = (chat_id: number, TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/messages/removeChat/${chat_id}`, {}, {
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

export default removeChat