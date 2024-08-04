import axios from "axios"

const forgotPassword = (email: string) => {
    return new Promise((resolve, reject) => {

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/forgot-password`, {
            email: email,
        })
            .then(res => {
                resolve(res.status)
            })

    })
}

export default forgotPassword