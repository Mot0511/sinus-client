import axios from "axios"

const removeChat = (chat_id: number) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/messages/removeChat/${chat_id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default removeChat