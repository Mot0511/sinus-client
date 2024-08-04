import UserRead from "@/types/user";
import axios from "axios";

const getUser = (id: string) => {
    return new Promise((resolve: (user: UserRead) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/getUser/${id}`)
            .then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
    })
}

export default getUser