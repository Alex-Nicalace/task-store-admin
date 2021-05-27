import React from "react";
import {NavLink, withRouter} from "react-router-dom";

import './items-or-props-page.scss'
import {PropsListContainer} from "../props-list";
import {ItemListContainer} from "../items-list";
import ExitButton from "../exit-button";

const ItemsOrPropsPage = ({currentTab, history}) => {
    const content = (currentTab) => {
        switch (currentTab) {
            case 'товар' :
                return <ItemListContainer/>
            case 'свойство':
                return <PropsListContainer/>
        }
    }

    const addItem = (currentTab) => {
        switch (currentTab) {
            case 'товар':
                history.push('/item-add');
                break;
            case 'свойство':
                history.push('/props-add');
                break;
        }
    }

    return (
        <div className="items-or-props-page">
            <div className="choice-items-or-props">
                <ul className="d-flex">
                    <li className={currentTab === 'товар' ? 'active-li' : null}>
                        <NavLink to='items'>
                            Перечень товаров
                        </NavLink>
                    </li>
                    <li className={currentTab === 'свойство' ? 'active-li' : null}>
                        <NavLink to='props'>
                            Перечень свойств
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="add-item">
                <button className="add-item__btn btn btn-warning"
                        onClick={() => addItem(currentTab)}>
                    Добавить {currentTab}
                </button>
                <ExitButton />
            </div>
            {
                content(currentTab)
            }
        </div>
    )
};

export default withRouter(ItemsOrPropsPage);