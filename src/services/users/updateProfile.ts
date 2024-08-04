import UserRead from "@/types/user";
import axios from "axios";

const updateProfile = (data: {name: string | undefined, description: string | undefined}, TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/me`, {
            ...data
        }, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            }
        })
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                reject(e)
            });
    })
}
export default updateProfile
