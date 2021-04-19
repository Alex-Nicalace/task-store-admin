import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';

import Login from "../login";
import ItemsOrPropsPage from "../pages/items-or-props-page";
import Registration from "../registration";
import ItemAdd from "../item-add";
import PropAdd from "../prop-add";
import ItemCardContainer from "../item-card/item-card-container";

const App = () => {
    return (
        <main className='container'>
            <Switch>
                <Route
                    path='/'
                    render={() => <Redirect to='/login'/>}
                    exact/>
                <Route
                    path='/login'
                    component={Login} exact/>
                <Route
                    path='/registration'
                    component={Registration}/>
                <Route
                    path='/item-card/:id'
                    render={({match}) => {
                        const {id} = match.params;
                        return <ItemCardContainer id={id}/>
                    }} />
                <Route
                    path='/items-or-props/items'
                    render={() => <ItemsOrPropsPage currentTab='товар'/>}/>
                <Route
                    path='/items-or-props/props'
                    render={() => <ItemsOrPropsPage currentTab='свойство'/>}/>
                <Route
                    path='/item-add'
                    component={ItemAdd}/>
                <Route
                    path='/item-edit/:id'
                    render={({match}) => {
                        const {id} = match.params;
                        return <ItemAdd id={id} />
                    }}
                />
                <Route
                    path='/props-add'
                    component={PropAdd}/>
            </Switch>
        </main>
    )
}

export default App;
