import axios from "axios"

const deletePost = (id: number) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/posts/delete/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default deletePost