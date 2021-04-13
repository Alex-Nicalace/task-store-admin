import React from "react";
import {NavLink} from "react-router-dom";
import './item-card.scss';

const ItemCard = (props) => {
    const {
        goBack, item: {
            //id,
            name,
            cost,
            //dateModify,
            img,
            description,
            yearOfManufacture,
            color,
            typeFuel,
        }
    } = props;
    return (
        <div className="item-card">
            <div className="nav">
                <NavLink onClick={goBack} to="#">Вернуться</NavLink>
            </div>

            <div className="props">
                <div className="props-row">
                    <div className="prop">
                        <img width='300px'
                             src={img}
                             alt=""/>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Цвет</div>
                        <input className="prop-value" type="text" placeholder="Синий" value={color}/>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Год выпуска</div>
                        <div className="prop-value">{yearOfManufacture}</div>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Тип топлива</div>
                        <div className="prop-value">{typeFuel}</div>
                    </div>

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
                        <button className="btn btn-warning btn-sm">Беру!!!</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ItemCard;

