import axios from "axios"
import Post from '../../types/post'

const removeFriend = (friend_id: string, TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/auth/friends/remove/${friend_id}`, {
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

export default removeFriend