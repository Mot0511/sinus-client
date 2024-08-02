import axios from "axios"

const deletePost = (id: number) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/posts/delete/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default deletePost