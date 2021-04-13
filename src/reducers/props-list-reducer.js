const propsReducer = (state, action) => {
    if (state === undefined) {
        return {
            props: [],
            isLoading: true,
            error: null,
        }
    }

    switch (action.type) {
        case 'FETCH_PROPS_SUCCESS':
            return {
                props: action.payload,
                isLoading: false,
                error: null
            }
        case 'FETCH_PROPS_REQUEST' :
            return {
                props: [],
                isLoading: true,
                error: null
            }
        case 'FETCH_PROPS_FAILURE':
            return {
                props: [],
                isLoading: false,
                error: action.payload,
            };
        default:
            return state.propsList
    }
}

export default propsReducer;