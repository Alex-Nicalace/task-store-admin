import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import App from './components/app';
import ErrorBoundary from "./components/error-boundry";
import {StoreServiceProvide} from "./components/context";
import {StoreService, StoreServiceFirebase} from './services';
import store from "./store";

// const storeService = new StoreService();
const storeService = new StoreServiceFirebase();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <StoreServiceProvide value={storeService}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </StoreServiceProvide>
        </ErrorBoundary>
    </Provider>
    ,
    document.getElementById('root')
);
