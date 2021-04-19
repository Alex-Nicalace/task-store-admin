const itemsReducer = (state, action) => {
    if (state === undefined) {
        return {
            items: [],
            isLoading: true,
            error: null,
        }
    }

    switch (action.type) {
        case 'FETCH_ITEMS_SUCCESS':
            return {
                items: action.payload,
                isLoading: false,
                error: null
            }
        case 'FETCH_ITEMS_REQUEST' :
            //т.к. грузятся новые товары то items можно занулить
            return {
                items: [],
                isLoading: true,
                error: null
            }
        case 'FETCH_ITEMS_FAILURE':
            return {
                items: [],
                isLoading: false,
                error: action.payload,
            };
        case 'ADD_ITEMS':
            return {
                ...state.itemsList,
                items:[...state.itemsList.items, action.payload],
                isLoading: false,
            }
        case 'DEL_ITEMS':
            return {
                ...state.itemsList,
                items: state.itemsList.items.filter(item => item.id !== action.payload),
                isLoading: false,
            }
        case 'TOGGLE_LOADING':
            return {
                ...state.itemsList,
                isLoading: action.payload
            }
        default:
            return state.itemsList
    }
}

export default itemsReducer;
