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
            }
        case 'TOGGLE_LOADING_PROPS':
            return {
                ...state.propsList,
                isLoading: action.payload,
                error: null,
            }
        case 'DEL_PROPS':
            return {
                ...state.propsList,
                props: state.propsList.props.filter(prop => prop.id !== action.payload),
                isLoading: false,
                error: null,
            }
        default:
            return state.propsList
    }
}

export default propsReducer;