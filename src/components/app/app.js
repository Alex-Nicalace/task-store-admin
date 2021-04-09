import React from "react";
import ItemsList from "../items-list";
import ItemsOrPropsPage from "../pages/items-or-props-page";
import ItemAdd from "../item-add";
import PropsList from "../props-list";
import {Route, Switch} from "react-router-dom";
import ItemCard from "../item-card";
import PropAdd from "../prop-add";

const App = () => {
    return (
        <main className='container'>
            <ItemAdd />
            {/*<Switch>*/}
            {/*    <Route*/}
            {/*        path='/items-or-props/'*/}
            {/*        render={() => <ItemsOrPropsPage currentTab='товар'/>}*/}
            {/*        exact/>*/}
            {/*    <Route*/}
            {/*        path='/items-or-props/items/'*/}
            {/*        render={() => <ItemsOrPropsPage currentTab='товар'/>}*/}
            {/*        exact/>*/}
            {/*    <Route*/}
            {/*        path='/items-or-props/props/'*/}
            {/*        render={() => <ItemsOrPropsPage currentTab='свойство'/>}*/}
            {/*        exact/>*/}
            {/*</Switch>*/}
        </main>
    )
}

export default App;