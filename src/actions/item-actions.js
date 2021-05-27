
export const itemLoaded = (newItem) => {
    return {
        type: 'FETCH_ITEM_SUCCESS',
        payload: newItem,
    }
}

export const itemRequested = () => {
    return {
        type: 'FETCH_ITEM_REQUEST',
    }
}

export const itemError = (error) => {
    return {
        type: 'FETCH_ITEM_FAILURE',
        payload: error,
    }
}

export const fetchItem = (id) => (storeService, dispatch) => {
    dispatch(itemRequested());
    storeService.getItem(id)
        .then((response) => dispatch(itemLoaded(response)))
        .catch((error) => dispatch(itemError(error)) )
}

export const updateItem = (item, id) => (storeService, dispatch) => {
    dispatch(itemRequested());
    storeService.putItem(item, id)
        .then((response) => {
            dispatch(itemLoaded(response));
        })

}