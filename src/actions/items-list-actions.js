import {setDisappearingMessage} from "./index";

export const itemsLoaded = (newItems) => {
    return {
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

export const addItem = (newItem) => {
    return {
        type: 'ADD_ITEMS',
        payload: newItem,
    }
}

export const delItem = (id) => {
    return {
        type: 'DEL_ITEMS',
        payload: id,
    }
}

export const toggleLoading = (boolean) => {
    return {
        type: 'TOGGLE_LOADING',
        payload: boolean,
    }
}

// export const fetchItems = (storeService, dispatch) => () => {
//     dispatch(itemsRequested());
//     storeService.getItems()
//         .then((response) => dispatch(itemsLoaded(response)))
//         .catch((error) => dispatch(itemsError(error)) )
// }

// export const fetchItems = (storeService, dispatch) => () => {
//     dispatch(itemsRequested());
//     storeService.getItems((element) => {
//         const itemsObj = element.val();
//         const itemsArr = Object.keys(itemsObj).map(key => ({...itemsObj[key], id: key}))
//         dispatch(itemsLoaded(itemsArr))
//     });
// }

export const fetchItems = (storeService, dispatch) => () => {
    dispatch(itemsRequested());
    storeService.getItems()
        .then((response) => dispatch(itemsLoaded(response)));

    // storeService.getItems((element) => {
    //     const itemsObj = element.val();
    //     const itemsArr = Object.keys(itemsObj).map(key => ({...itemsObj[key], id: key}))
    //     dispatch(itemsLoaded(itemsArr))
    // });

}

export const postItem = (item) => (storeService, dispatch) => {
    dispatch(toggleLoading(true));
    storeService.postItem(item)
        .then((response) => {
            //if (response.data.resultCode === 0) {
            dispatch(addItem(response));
            //}
        })
}

export const deleteItem = (id) => (storeService, dispatch) => {
    dispatch(toggleLoading(true));
    storeService.deleteItem(id)
        .then(() => {
            //if (response.data.resultCode === 0) {
            dispatch(delItem(id));
            dispatch(setDisappearingMessage('?????????? ????????????!', 'warning'));
            //}
        })
        .catch(error => {
            dispatch(itemsError(error));
            dispatch(setDisappearingMessage('?????????? ???? ?????? ????????????!', 'danger'));
        })
}
