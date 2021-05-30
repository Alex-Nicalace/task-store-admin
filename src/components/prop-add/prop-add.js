import React from "react";
import './prop-add.scss';
import ButtonsBackAndSave from "../buttons-back-and-save/buttons-back-and-save";

const PropAdd = ({
                     propName,
                     propType,
                     onSubmit,
                     onChange,
                     propertyDirty: {propNameDirty, propTypeDirty},
                     blurHandler
                 }) => {
    return (
        <form className="prop-add"
              onSubmit={onSubmit}>

            <ButtonsBackAndSave disabledButtonSave={!propName || !propType}/>

            {/*<div className="buttons">*/}
            {/*    <button className="btn btn-danger btn-sm"*/}
            {/*            type="button"*/}
            {/*            onClick={goBack}>Вернуться*/}
            {/*    </button>*/}
            {/*    <button className="buttons_save btn btn-success btn-sm"*/}
            {/*            disabled={!propName || !propType}>Сохранить*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className="property">
                <div className="property__caption">Добавление свойства</div>

                <div className="property__item">
                    <div>Название свойства</div>
                    {propNameDirty && !propName && <div className="warning-message">Укажите название свойства</div>}
                    <input
                        className="form-control"
                        style={propNameDirty && !propName ? {border:"1px solid red"} : null}
                        placeholder="Цвет авто"
                        name="propName"
                        value={propName}
                        onChange={onChange}
                        onBlur={blurHandler}/>
                </div>

                <div className="main-property__item">
                    <div>Укажите тип свойства</div>
                    {propTypeDirty && !propType && <div className="warning-message">Укажите тип свойства</div>}
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType" value="Dropdown"
                                   checked={propType === 'Dropdown'}
                                   onChange={onChange}
                                   onBlur={blurHandler}/> Dropdown
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType"
                                   value="Number"
                                   checked={propType === 'Number'}
                                   onChange={onChange}
                                   onBlur={blurHandler}/> Number
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio"
                                   name="propType"
                                   value="String"
                                   checked={propType === 'String'}
                                   onChange={onChange}
                                   onBlur={blurHandler}/> String

                        </label>
                    </div>
                </div>

            </div>

        </form>
    )
}

export default PropAdd;
