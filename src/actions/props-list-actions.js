import {setDisappearingMessage} from "./messages-actions";

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

export const propsToggleLoading = (boolean) => {
    return {
        type: 'TOGGLE_LOADING_PROPS',
        payload: boolean,
    }
}

export const delProp = (id) => {
    return {
        type: 'DEL_PROPS',
        payload: id,
    }
}

export const fetchProps = (storeService, dispatch) => () => {
    dispatch(propsRequested());
    storeService.getProps()
        .then((response) => dispatch(propsLoaded(response)))
        .catch((error) => dispatch(propsError(error)) )
}

export const deleteProp = (id) => (storeService, dispatch) => {
    dispatch(propsToggleLoading(true));
    storeService.deleteProp(id)
        .then(() => {
            //if (response.data.resultCode === 0) {
            dispatch(delProp(id));
            dispatch(setDisappearingMessage('Свойство удалено!', 'warning'));
            //}
        })
        .catch(error => {
            dispatch(propsError(error));
            dispatch(setDisappearingMessage('Свойство не было удалено!', 'danger'));
        })
}