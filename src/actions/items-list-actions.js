export const itemsLoaded = (newItems) => {
    return{
        type: 'FETCH_ITEMS_SUCCESS',
        payload: newItems,
    }
}

export const itemsRequested = () => {
    return {
        type: 'FETCH_ITEMS_REQUEST',
    }
}

export const itemsError = (error) => {
    return {
        type: 'FETCH_ITEMS_FAILURE',
        payload: error,
    }
}

export const fetchItems = (storeService, dispatch) => () => {
    dispatch(itemsRequested());
    storeService.getItems()
        .then((response) => dispatch(itemsLoaded(response)))
        .catch((error) => dispatch(itemsError(error)) )
}