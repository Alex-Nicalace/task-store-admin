export const propsLoaded = (newProps) => {
    return{
        type: 'FETCH_PROPS_SUCCESS',
        payload: newProps,
    }
}

export const propsRequested = () => {
    return {
        type: 'FETCH_PROPS_REQUEST',
    }
}

export const propsError = (error) => {
    return {
        type: 'FETCH_PROPS_FAILURE',
        payload: error,
    }
}

export const fetchProps = (storeService, dispatch) => () => {
    dispatch(propsRequested());
    storeService.getProps()
        .then((response) => dispatch(propsLoaded(response)))
        .catch((error) => dispatch(propsError(error)) )
}