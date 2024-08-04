import axios from "axios"

const logout = (TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/logout`, {
            headers: {
                'Cookie': `fastapiusersauth=${TOKEN}`,
            },
        }).then(res => {
            resolve(res.status)
        }).catch(e => {
            reject(e)
        })
    })

}

export default logout
