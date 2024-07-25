import axios from "axios"
import Post from '../types/post'

const addFriend = (ids: {user1: string, user2: string}) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/auth/friends/add`, ids)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default addFriend