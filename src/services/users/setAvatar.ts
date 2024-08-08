import axios from "axios"
import Post from '../../types/post'

const setAvatar = (TOKEN: string, file: any) => {
    return new Promise((resolve, reject) => {

        const formdata = new FormData()
        formdata.append('avatar', file)

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/setAvatar`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${TOKEN}`
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

export default setAvatar