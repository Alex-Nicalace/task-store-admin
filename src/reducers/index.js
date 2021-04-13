import itemsReducer from "./items-list-reducer";
import propsReducer from './props-list-reducer';
import itemReducer from './item-reducer';

const reducer = (state, action) => {
    return {
        itemsList: itemsReducer(state, action),
        propsList: propsReducer(state, action),
        itemData: itemReducer(state, action),
    }
}

export default reducer;