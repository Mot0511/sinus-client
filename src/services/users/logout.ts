import axios from "axios"

const logout = (TOKEN: string) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/auth/logout', {
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
