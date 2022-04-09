import axios from "axios"

export const dispactchlogin = () => {
    return {
        type: "LOGIN"
    }
}


export const fetchUser = async (token) => {
    const res = await axios.get('/user/getuserInfo', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: "GET_USER",
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}
