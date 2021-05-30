import React from "react";
import './item-add.scss';
import ButtonsBackAndSave from "../buttons-back-and-save/buttons-back-and-save";

const ItemAdd = ({
                     item: {name, cost, img, description, properties = {}},
                     itemDirty: {nameDirty, costDirty, imgDirty},
                     onChange,
                     onSubmit,
                     onFileChange,
                     blurHandler,
                     addProperty,
                     isLoadingProperties,
                     propertiesList,
                     onChangeProperty,
                     onDeleteProperty,
                     notUsedProperty,
                     addPropertyDropdown,
                     deletePropertyDropdown
                 }) => {

    const isExistsProperty = (nameProperty) => {
        for (let key in properties) {
            if (nameProperty === properties[key].nameProperty) {
                return true;
            }
        }
        return false;
    }

    const propertyListRender = propertiesList.map(item => (
        <option value={item.propName} key={item.id} disabled={isExistsProperty(item.propName)}>{item.propName}</option>
    ))

    const propertyRender = Object.keys(properties).map((key, index) => (
        <div
            key={key}
            className={"property-row"}>
            <div className="property-row__column">
                <button // удаление свойства
                    type="button"
                    className="btn-prop"
                    onClick={() => onDeleteProperty(key)}
                >-
                </button>
            </div>

            <div className="property-row__column property-row__column_width">
                <label>
                    {`Свойство ${++index}`}
                    <select
                        className="form-control"
                        id={key}
                        name="nameProperty"
                        value={properties[key]?.nameProperty}
                        onChange={onChangeProperty}
                    >
                        {propertyListRender}
                    </select>
                </label>
            </div>

            <div className="property-row__column property-row__column_width">
                <label>
                    Значение
                    {
                        properties[key]?.typeProperty === 'Dropdown'
                            ? <>
                                {Object.keys(properties[key]?.valueDropDownProperty).map((valueKey, index, array) => (
                                    <div
                                        className="property-row"
                                        key={valueKey}
                                    >
                                        <input
                                            className="form-control property-row__column"
                                            id={key}
                                            name={valueKey}
                                            value={properties[key]?.valueDropDownProperty[valueKey]}
                                            onChange={onChangeProperty}
                                        />
                                        <div
                                            className="property-row__column "
                                            style={{visibility: `${index < (array.length - 1) ? 'hidden' : ''}`}}>
                                            <button //удаление dropdown свойства
                                                type="button"
                                                className="btn-prop"
                                                id={key}
                                                value={properties[key]?.valueDropDownProperty[valueKey]}
                                                onClick={() => deletePropertyDropdown(key, valueKey)}>-
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button // кнопка добавления Dropdown свойства
                                    type="button"
                                    className="btn-prop"
                                    key={key}
                                    id={key}
                                    onClick={() => addPropertyDropdown(key)}
                                >+
                                </button>
                            </>
                            : <div
                                className="property-row"
                                key={key}
                            >
                                <input
                                    className="form-control property-row__column"
                                    id={key}
                                    name="valueProperty"
                                    value={properties[key]?.valueProperty}
                                    onChange={onChangeProperty}
                                />
                                <div className="btn-prop property-row__column" style={{visibility: "hidden"}}></div>
                            </div>

                    }
                </label>
            </div>
        </div>
    ))
    return (
        <form className="item-add" onSubmit={onSubmit}>
            <ButtonsBackAndSave disabledButtonSave={!name || !cost || !img}/>

            <div className="main-property ">
                <div className="main-property__caption">Добавление товара</div>

                <div className="main-property__item">
                    <div>Название товара<span>*</span></div>
                    {nameDirty && !name && <div className="warning-message">Укажите название товара</div>}
                    <input
                        className="form-control"
                        style={nameDirty && !name ? {border:"1px solid red"} : null}
                        name='name'
                        placeholder="Mercedes S550 4matic"
                        value={name}
                        onChange={onChange}
                        onBlur={blurHandler}
                    />
                </div>

                <div className="main-property__item">
                    <div>Стоимость товара<span>*</span></div>
                    {costDirty && !cost && <div className="warning-message">Укажите стоимость товара</div>}
                    <input
                        className="form-control"
                        style={costDirty && !cost ? {border:"1px solid red"} : null}
                        name='cost'
                        placeholder="113 000"
                        value={cost}
                        onChange={onChange}
                        onBlur={blurHandler}
                    />
                </div>

                <div className="main-property__item">
                    <div>Изображение<span>*</span></div>
                    {imgDirty && !img && <div className="warning-message">Укажите изображение товара</div>}
                    <div style={{position: "relative"}}>
                        <label
                            className="form-control"
                            //style={imgDirty && !img ? {border:"1px solid red"} : null}
                            htmlFor="inputImg"
                            style={{textAlign: "right", height: "100%", border: `${imgDirty && !img ? {border:"1px solid red"} : null}`}}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{textAlign: "left"}}>{img}</div>
                                <div>
                                    <i className="fa fa-upload" fa-lg style={{color: "blue", fontSize: "24px"}}></i>
                                </div>

                            </div>

                        </label>

                        <input type="file"
                               id="inputImg"
                               name="img"
                            //value={img}
                               onChange={onFileChange}
                               className="form-control"
                               style={{position: "absolute", top: "0px", opacity: "0"}}
                               onBlur={blurHandler}
                        />
                    </div>
                </div>

                <div className="main-property__item">
                    <div>Описание</div>
                    <textarea
                        className="form-control"
                        name='description'
                        value={description}
                        placeholder="Описание товара"
                        onChange={onChange}/>
                </div>

            </div>

            <div className="second-property">
                <div className={"property-row"}>
                    <div className="property-row__column btn-prop" style={{visibility: "hidden"}}/>
                    <div className="property-row__column property-row property-row__column_width"
                         style={{justifyContent: "space-between"}}>
                        <div style={{fontWeight: "bold"}}>Добавление товару свойств</div>
                        <div>
                            <button
                                type="button"
                                className="btn-prop"
                                onClick={() => addProperty(notUsedProperty)}
                                disabled={!notUsedProperty}
                            >+
                            </button>
                        </div>
                    </div>
                    <div className="property-row__column property-row property-row__column_width"/>
                </div>
                {propertyRender}
            </div>

        </form>
    )
}

export default ItemAdd;