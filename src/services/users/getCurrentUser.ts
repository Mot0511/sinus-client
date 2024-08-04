import UserRead from "@/types/user";
import axios from "axios";

const getCurrentUser = (TOKEN: string) => {
    return new Promise((resolve: (user: UserRead) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}
export default getCurrentUser