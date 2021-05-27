const userReducer = (state, action) => {
    if (state === undefined) {
        return {
            user: null,
            isLoading: true,
            error: null,
        }
    }

    switch (action.type) {
        case 'FETCH_USER_SUCCESS':
            return {
                user: action.payload,
                isLoading: false,
                error: null
            }
        case 'FETCH_USER_REQUEST':
            return {
                user: null,
                isLoading: true,
                error: null
            }
        case 'FETCH_USER_FAILURE':
            return {
                user: null,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state.userInfo
    }
}

export default userReducer;