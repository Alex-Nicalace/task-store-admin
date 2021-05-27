const messagesReducer = (state, action) => {
    if (state === undefined) {
        return {
            message: null,
            typeMessage: null,
        }
    }

    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                message: action.payload.message,
                typeMessage: action.payload.typeMessage,
            }
        case 'CLEAR_MESSAGE':
            return {
                message: null,
                typeMessage: null,
            }
        default:
            return state.messages
    }
}

export default messagesReducer;