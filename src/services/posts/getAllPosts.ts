import axios from "axios"
import Post from '../../types/post'

const getAllPosts = () => {
    return new Promise((resolve: (posts: Post[]) => void, reject) => {
        axios.get(`${process.env.SERVER}/posts/get/`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getAllPosts