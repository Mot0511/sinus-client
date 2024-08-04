import axios from "axios"

const resetPassword = (token: string, password: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/reset-password`, {
            token: token,
            password: password
        })
            .then(res => {
                resolve(res.status)
            })
    })
}

export default resetPassword