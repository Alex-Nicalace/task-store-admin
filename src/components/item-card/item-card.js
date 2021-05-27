import React from "react";
import {NavLink} from "react-router-dom";
import './item-card.scss';

const ItemCard = (
    {
        goBack,
        item: {
            //id,
            name,
            cost,
            //dateModify,
            img,
            description,
            //yearOfManufacture,
            //color,
            //typeFuel,
            properties = {},
        },
        buyItemHandler
    }) => {

    const renderPropertiesDropdown = (valueDropDownProperty = {}) => Object.keys(valueDropDownProperty).map(key => (
        <option value={valueDropDownProperty[key]} key={key}>{valueDropDownProperty[key]}</option>

    ))

    const renderProperties = Object.keys(properties).map(key => (
        <div className="prop"
             key={key}>
            <div className="prop-title">{properties[key]?.nameProperty}</div>
            {properties[key]?.typeProperty === 'Dropdown'
                ? <select
                    className="form-control"
                >
                    {renderPropertiesDropdown(properties[key]?.valueDropDownProperty)}
                </select>
                : <div className="prop-value">{properties[key]?.valueProperty}</div>}
        </div>
    ))

    return (
        <div className="item-card">
            <div className="nav">
                <span className="as-link"
                      onClick={goBack}>Вернуться</span>
            </div>

            <div className="props">
                <div className="props-row">
                    <div className="prop">
                        <img width='300px'
                             src={img}
                             alt=""/>
                    </div>
                    {renderProperties}

                    {/*<div className="prop">*/}
                    {/*    <div className="prop-title">Цвет</div>*/}
                    {/*    <input className="prop-value" type="text" placeholder="Синий" value={color}/>*/}
                    {/*</div>*/}

                    {/*<div className="prop">*/}
                    {/*    <div className="prop-title">Год выпуска</div>*/}
                    {/*    <div className="prop-value">{yearOfManufacture}</div>*/}
                    {/*</div>*/}

                    {/*<div className="prop">*/}
                    {/*    <div className="prop-title">Тип топлива</div>*/}
                    {/*    <div className="prop-value">{typeFuel}</div>*/}
                    {/*</div>*/}

                    <div className="prop">
                        <div className="prop-title">Стоимость</div>
                        <div className="prop-value">{cost}$</div>
                    </div>

                </div>
                <div className="props-row flex">
                    <div className="prop prop-item-name">{name}</div>

                    <div className="prop prop-value">{description}
                    </div>

                    <div className="prop flex__fill-all">

                    </div>
                    <div>
                        <button className="btn btn-warning btn-sm" onClick={buyItemHandler}>Беру!!!</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ItemCard;

