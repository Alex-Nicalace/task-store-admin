export const setMessage = (message, typeMessage = null) => {
    return {
        type: 'SET_MESSAGE',
        payload: {message, typeMessage},
    }
}

export const clearMessage = () => {
    return {
        type: 'CLEAR_MESSAGE',
    }
}

export const setDisappearingMessage = (message, typeMessage) => (dispatch) => {
    dispatch(setMessage(message, typeMessage));
    setTimeout(() => dispatch(clearMessage()), 3000);
}