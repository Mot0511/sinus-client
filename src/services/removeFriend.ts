import axios from "axios"
import Post from '../types/post'

const removeFriend = (ids: {user1: string, user2: string}) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/auth/friends/remove`, ids)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default removeFriend