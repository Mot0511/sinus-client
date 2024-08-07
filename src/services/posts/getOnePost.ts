import axios from "axios"
import Post from '../../types/post'

const getOnePost = (id: number) => {
    return new Promise((resolve: (post: Post) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/posts/getOne/${id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getOnePost