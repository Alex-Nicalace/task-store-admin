import itemsReducer from "./items-list-reducer";
import propsReducer from './props-list-reducer';
import itemReducer from './item-reducer';
import userReducer from "./user-reducer";
import messagesReducer from "./messages-reducer";

const reducer = (state, action) => {
    return {
        itemsList: itemsReducer(state, action),
        propsList: propsReducer(state, action),
        itemData: itemReducer(state, action),
        userInfo: userReducer(state, action),
        messages: messagesReducer(state, action),
    }
}

export default reducer;