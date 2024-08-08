import axios from "axios"

const addChat = (user_id: string, TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/messages/addChat/${user_id}`, {}, {
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

export default addChat