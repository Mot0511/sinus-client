import axios from "axios"

const forgotPassword = (email: string) => {
    return new Promise((resolve, reject) => {

        axios.post('http://localhost:8000/auth/forgot-password', {
            email: email,
        })
            .then(res => {
                resolve(res.status)
            })

    })
}

export default forgotPassword