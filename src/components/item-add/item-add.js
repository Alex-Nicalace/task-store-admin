import React from "react";
import './item-add.scss';

const ItemAdd = () => {
    return (
        <div className="item-add">
            <div className="buttons">
                <button className="btn btn-danger btn-sm">Вернуться</button>
                <button className="buttons_save btn btn-success btn-sm">Сохранить</button>
            </div>
            <div className="main-property ">
                <div className="main-property__caption">Добавление товара</div>

                <div className="main-property__item">
                    <div>Название товара<span>*</span></div>
                    <input className="form-control" type="text" placeholder="Mercedes S550 4matic"/>
                </div>

                <div className="main-property__item">
                    <div>Стоимость товара<span>*</span></div>
                    <input className="form-control" type="text" placeholder="113 000"/>
                </div>

                <div className="main-property__item">
                    <div>Изображение<span>*</span></div>
                    <input className="form-control" type="text" placeholder="Mercedes S550 4matic"/>
                    <button className="btn btn-outline-success btn-sm"><i className="fa fa-exclamation"></i></button>

                </div>

                <div className="main-property__item">
                    <div>Описание</div>
                    <textarea className="form-control" type="text" placeholder="Описание товара"/>
                </div>

            </div>

        </div>
    )
}

export default ItemAdd;