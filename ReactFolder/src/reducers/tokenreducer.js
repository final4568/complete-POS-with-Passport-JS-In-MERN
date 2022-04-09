const token = "";

const tokenreducer = (state = token, action) => {
    switch (action.type) {
        case "GET_TOKEN": {
            return action.payload
        }
        default: return state
    }
}

export default tokenreducer