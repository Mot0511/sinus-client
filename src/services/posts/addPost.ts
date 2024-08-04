import axios from "axios"

const addPost = (text: string, userID: string, file: any) => {
    return new Promise((resolve, reject) => {
        const formdata = new FormData()
        formdata.append('image', file)
        formdata.append('text', text)
        formdata.append('user', userID)

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/posts/add`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default addPost