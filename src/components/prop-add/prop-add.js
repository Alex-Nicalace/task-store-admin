import React from "react";
import './prop-add.scss';

const PropAdd = () => {
    return (
        <div className="prop-add">
            <div className="buttons">
                <button className="btn btn-danger btn-sm">Вернуться</button>
                <button className="buttons_save btn btn-success btn-sm">Сохранить</button>
            </div>

            <div className="property">
                <div className="property__caption">Добавление свойства</div>

                <div className="property__item">
                    <div>Название свойства</div>
                    <input className="form-control" type="text" placeholder="Цвет авто"/>
                </div>

                <div className="main-property__item">
                    <div>Укажите тип свойства</div>
                    <div>
                        <label>
                            <input type="radio" name="typeProp"/> Dropdown
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="typeProp"/> Number
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="typeProp"/> String

                        </label>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PropAdd;
