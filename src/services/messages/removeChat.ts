import axios from "axios"

const removeChat = (chat_id: number) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.SERVER}/messages/removeChat/${chat_id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default removeChat