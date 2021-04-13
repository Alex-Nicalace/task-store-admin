import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";

import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

window.store = store; // чтобы можно было в консоли узучить что внутри

export default store;