import axios from "axios"
import Post from '../types/post'

const getPosts = (userID: string) => {
    return new Promise((resolve: (posts: Post[]) => void, reject) => {
        axios.get(`http://localhost:8000/posts/get/${userID}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getPosts