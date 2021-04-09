import React from "react";
import ItemsList from "../items-list";
import './items-or-props-page.scss'
import PropsList from "../props-list";
import {NavLink} from "react-router-dom";

class ItemsOrPropsPage extends React.Component {
    render() {
        const {currentTab} = this.props;

        const content = (currentTab) => {
            switch (currentTab) {
                case 'товар' :
                    return <ItemsList/>
                case 'свойство':
                    return <PropsList/>
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
                    <button className="add-item__btn btn btn-warning">
                        Добавить {currentTab}
                    </button>
                </div>
                {
                    content(currentTab)
                }
            </div>
        )
    }
};

export default ItemsOrPropsPage;