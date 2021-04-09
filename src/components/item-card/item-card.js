import React from "react";
import {NavLink} from "react-router-dom";
import './item-card.scss';

const ItemCard = () => {
    return (
        <div className="item-card">
            <div className="nav">
                <NavLink to="#">Вернуться</NavLink>
            </div>

            <div className="props">
                <div className="props-row">
                    <div className="prop">
                        <img width='300px'
                             src="https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/17q1/674167/2017-mercedes-benz-s550-4matic-test-review-car-and-driver-photo-677610-s-original.jpg?fill=2:1&resize=768:*"
                             alt=""/>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Цвет авто</div>
                        <input className="prop-value" type="text" placeholder="Синий"/>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Год выпуска</div>
                        <div className="prop-value">2017</div>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Тип топлива</div>
                        <div className="prop-value">Бензин</div>
                    </div>

                    <div className="prop">
                        <div className="prop-title">Стоимость</div>
                        <div className="prop-value">118 000$</div>
                    </div>

                </div>
                <div className="props-row flex">
                    <div className="prop prop-item-name">Mercedes S550 4matic</div>

                    <div className="prop prop-value">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at error itaque
                        laudantium modi nihil obcaecati officia, quia repellat. Assumenda aut commodi eius
                        exercitationem laboriosam quod reiciendis sequi vel.
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

