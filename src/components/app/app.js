import React from "react";
import './app.scss'
import AppRouter from "../app-router";
import MessagesContainer from "../messages/messages-container";

const App = () => {
    return (
        <main className='container'>
            <MessagesContainer />
            <AppRouter />
        </main>
    )
}

export default App;
