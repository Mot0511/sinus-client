import UserRead from "@/types/user";
import axios from "axios";

const getUser = (superuser_token: string, id: string) => {
    return new Promise((resolve: (user: UserRead) => void, reject) => {
        axios.get(`http://localhost:8000/auth/${id}`, {
            headers: {
                'Authorization': `Bearer ${superuser_token}`,
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export default getUser