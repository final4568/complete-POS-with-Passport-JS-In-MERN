import axios from "axios"
export const fetchallUser = async (token) => {
    const res = await axios.post('user/getallusers', {}, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return res
}


export const dispatchGetallUser = (res) => {
    return {
        type: "GET_ALL_USERS",
        payload: res.data
    }
}

