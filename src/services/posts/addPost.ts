import axios from "axios"
import { uploadFile } from "../firebase"

const addPost = (text: string, TOKEN: string, file: any) => {
    return new Promise((resolve, reject) => {
        const id = Math.floor(Math.random() * (1000000 - 1) + 1)

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/posts/add`, {
            id: id,
            text: text,
        }, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => {
                uploadFile(file, `posts/${id}.png`)
                    .then(res => {
                        resolve(res)
                    })
            })
            .catch(e => {
                reject(e)
            })
            
    })
}

export default addPost