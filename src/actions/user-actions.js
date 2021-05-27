export const userLoaded = (user) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        payload: user,
    }
}

export const userRequested = () => {
    return {
        type: 'FETCH_USER_REQUEST',
    }
}

export const userError = (error) => {
    return {
        type: 'FETCH_USER_FAILURE',
        payload: error,
    }
}

export const fetchUser = (storeService, dispatch) => () => {
    dispatch(userRequested());
    //const user = storeService.getUserInfo();
    storeService.getUserInfo()
        .then((response) => {
            dispatch(userLoaded(response))
        })

    //dispatch(userLoaded(user))
};

export const signUser = (email, password) => (storeService, dispatch) => {
    dispatch(userRequested());
    storeService.signAccount(email, password)
        .then(userCredential => {
            dispatch(userLoaded(userCredential.user));
        })
        .catch(error => {
            dispatch(userError(error.message));
        })
};

export const outUser = (storeService, dispatch) => () =>{
    dispatch(userRequested());
    storeService.unSignAccount()
        .then(() => {
            dispatch(userLoaded(null));
        })
        .catch((error) => {
            dispatch(userError(error.message));
        })
}

export const createUser = (email, password) => (storeService, dispatch) => {
    dispatch(userRequested());
    storeService.createAccount(email, password)
        .then(userCredential => {
            dispatch(userLoaded(userCredential.user));
        })
        .catch(error => {
            dispatch(userError(error.message));
        })
}