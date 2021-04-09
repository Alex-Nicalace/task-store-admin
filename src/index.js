import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ErrorBoundary from "./components/error-boundry";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ErrorBoundary>
    ,
    document.getElementById('root')
);
