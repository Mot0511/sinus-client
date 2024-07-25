import axios from "axios"
import UserRead from "@/types/user"

const getFriends = (id: string) => {
    return new Promise((resolve: (friends: UserRead[]) => void, reject) => {
        axios.get(`http://localhost:8000/auth/getFriends/${id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

export default getFriends