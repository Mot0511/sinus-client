import axios from "axios"
import { deleteFile } from "../firebase"

const deletePost = (id: number, TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/posts/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => {
                deleteFile(`posts/${id}.png`)
                    .then(res => {
                        resolve(res)
                    })
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default deletePost