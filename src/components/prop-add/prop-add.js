import React from "react";
import './prop-add.scss';

const PropAdd = ({propName, propType, onSubmit, onChange, goBack}) => {
    return (
        <form className="prop-add"
              onSubmit={onSubmit}>
            <div className="buttons">
                <button className="btn btn-danger btn-sm"
                        type="button"
                        onClick={goBack}>Вернуться
                </button>
                <button className="buttons_save btn btn-success btn-sm">Сохранить</button>
            </div>

            <div className="property">
                <div className="property__caption">Добавление свойства</div>

                <div className="property__item">
                    <div>Название свойства</div>
                    <input
                        className="form-control"
                        placeholder="Цвет авто"
                        name="propName"
                        value={propName}
                        onChange={onChange}/>
                </div>

                <div className="main-property__item">
                    <div>Укажите тип свойства</div>
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType" value="Dropdown"
                                   checked={propType === 'Dropdown'}
                                   onChange={onChange}/> Dropdown
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType"
                                   value="Number"
                                   checked={propType === 'Number'}
                                   onChange={onChange}/> Number
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType"
                                   value="String"
                                   checked={propType === 'String'}
                                   onChange={onChange}/> String

                        </label>
                    </div>
                </div>

            </div>

        </form>
    )
}

export default PropAdd;
