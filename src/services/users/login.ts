import axios from "axios"

const login = (email: string, password: string) => {
    return new Promise((resolve: (TOKEN: string) => void, reject) => {
        const params = new URLSearchParams()
        params.append('username', email)
        params.append('password', password)

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, params)
            .then(res => {
                const TOKEN = res.data.access_token
                resolve(TOKEN)
            }).catch(e => {
                reject(e)
            })
    })
}
export default login