import UserRead from "@/types/user";
import axios from "axios";

const getUsers = () => {
    return new Promise((resolve: (users: UserRead[]) => void, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/auth/getUsers`)
            .then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
    })
}
export default getUsers