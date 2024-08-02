import UserRead from "@/types/user";
import axios from "axios";

const getUsers = () => {
    return new Promise((resolve: (users: UserRead[]) => void, reject) => {
        axios.get('http://localhost:8000/auth/getUsers')
            .then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
    })
}
export default getUsers