import axios from "axios"
import Post from '../../types/post'

const getPosts = (userID: string) => {
    return new Promise((resolve: (posts: Post[]) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/posts/get/${userID}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getPosts