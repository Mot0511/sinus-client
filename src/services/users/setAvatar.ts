import axios from "axios"
import Post from '../../types/post'

const setAvatar = (userID: string, file: any) => {
    return new Promise((resolve, reject) => {

        const formdata = new FormData()
        formdata.append('id', userID)
        formdata.append('avatar', file)

        axios.post(`${process.env.SERVER}/auth/setAvatar`, formdata, {
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

export default setAvatar