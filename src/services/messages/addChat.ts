import axios from "axios"

const addChat = (user1: string, user2: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/messages/addChat/`, {
            user1: user1,
            user2: user2
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default addChat