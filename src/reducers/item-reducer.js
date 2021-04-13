const itemReducer = (state, action) => {
    if (state === undefined) {
        return {
            item: {},
            isLoading: true,
            error: null,
        }
    }

    switch (action.type) {
        case 'FETCH_ITEM_SUCCESS':
            return {
                item: action.payload,
                isLoading: false,
                error: null
            }
        case 'FETCH_ITEM_REQUEST' :
            //т.к. грузятся новые товары то items можно занулить
            return {
                item: {},
                isLoading: true,
                error: null
            }
        case 'FETCH_ITEM_FAILURE':
            return {
                item: {},
                isLoading: false,
                error: action.payload,
            };
        default:
            return state.itemData
    }
}

export default itemReducer;