import React from "react";
import {
    ITEM_ADD_ROUTE,
    ITEM_CARD_ROUTE, ITEM_EDIT_ROUTE,
    ITEMS_ROUTE,
    LOGIN_ROUTE, PROPS_ADD_ROUTE,
    PROPS_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Login from "./components/login";
import Registration from "./components/registration";
import ItemCard from "./components/item-card";
import ItemsOrPropsPage from "./components/pages/items-or-props-page";
import ItemAdd from "./components/item-add";
import {PropAddContainer} from "./components/prop-add";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        render: () => <Login />,
        exact: true,
    },
    {
        path: REGISTRATION_ROUTE,
        render: ({history}) => <Registration history={history}/>,
        exact: false,
    },
    {
        path: ITEM_CARD_ROUTE,
        render: ({match, history}) => {
            const {id} = match.params;
            return <ItemCard id={id} history={history}/>
        },
        exact: false,
    }
]

export const privateRoutes = [
    {
        path: ITEM_CARD_ROUTE,
        render: ({match, history}) => {
            const {id} = match.params;
            return <ItemCard id={id} history={history}/>
        },
        exact: false,
    },
    {
        path: ITEMS_ROUTE,
        render: () => <ItemsOrPropsPage currentTab='товар'/>,
        exact: false,
    },
    {
        path: PROPS_ROUTE,
        render: () => <ItemsOrPropsPage currentTab='свойство'/>,
        exact: false,
    },
    {
        path: ITEM_ADD_ROUTE,
        Component: ItemAdd,
        render: () => <ItemAdd />,
        exact: false,

    },
    {
        path: ITEM_EDIT_ROUTE,
        render: ({match}) => {
            const {id} = match.params;
            return <ItemAdd id={id}/>
        },
        exact: false,
    },
    {
        path: PROPS_ADD_ROUTE,
        render: () => <PropAddContainer />,
        exact: false,
    }

]