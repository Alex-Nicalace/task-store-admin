import React from "react";
import './item-add.scss';

const ItemAdd = ({
                     item: {name, cost, img, description, properties = {}},
                     itemDirty: {nameDirty, costDirty, imgDirty},
                     onChange,
                     onSubmit,
                     goBack,
                     onFileChange,
                     blurHandler,
                     addProperty,
                     isLoadingProperties,
                     propertiesList,
                     onChangeProperty,
                     onDeleteProperty,
                     notUsedProperty
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
        <option value={{valueProperty:item.propName, typeProperty: item.propType}} key={item.id} disabled={isExistsProperty(item.propName)} >{item.propName}</option>
    ))

    const propertyRender = Object.keys(properties).map((key, index) => (
        <div style={{border: "1px solid red"}} key={key}>
            <button
                type="button"
                className="btn-prop"
                onClick={() => onDeleteProperty(key)}>-
            </button>
            <label>{`Свойство ${++index}`}
                <select
                    className="form-control"
                    id={key}
                    name="nameProperty"
                    value={{valueProperty:properties[key]?.nameProperty, typeProperty: properties[key]?.typeProperty}}
                    onChange={onChangeProperty}
                    //defaultValue={propertiesListExt[0].propName}
                >
                    {propertyListRender}
                </select>
            </label>

            <label>Значение
                <input
                    className="form-control"
                    id={key}
                    name="valueProperty"
                    value={properties[key]?.valueProperty}
                    onChange={onChangeProperty}
                />
            </label>

            {properties[key]?.typeProperty === 'Dropdown'
                ? <div>
                    <button
                        type="button"
                        className="btn-prop"
                    >+
                    </button>
                </div>
                : null
            }
        </div>
    ))
    return (
        <form className="item-add" onSubmit={onSubmit}>
            <div className="buttons">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={goBack}
                    type={"button"}>
                    Вернуться
                </button>
                <button
                    className="buttons_save btn btn-success btn-sm"
                    disabled={!name || !cost || !img}
                >
                    Сохранить
                </button>
            </div>

            <div className="main-property ">
                <div className="main-property__caption">Добавление товара</div>

                <div className="main-property__item">
                    <div>Название товара<span>*</span></div>
                    {nameDirty && !name && <div style={{color: "red"}}>Укажите название товара</div>}
                    <input
                        className="form-control"
                        name='name'
                        placeholder="Mercedes S550 4matic"
                        value={name}
                        onChange={onChange}
                        onBlur={blurHandler}
                    />
                </div>

                <div className="main-property__item">
                    <div>Стоимость товара<span>*</span></div>
                    {costDirty && !cost && <div style={{color: "red"}}>Укажите стоимость товара</div>}
                    <input
                        className="form-control"
                        name='cost'
                        placeholder="113 000"
                        value={cost}
                        onChange={onChange}
                        onBlur={blurHandler}
                    />
                </div>

                <div className="main-property__item">
                    <div>Изображение<span>*</span></div>
                    {imgDirty && !img && <div style={{color: "red"}}>Укажите изображение товара</div>}
                    <div style={{position: "relative"}}>
                        <label
                            //onClick={uploadImg}
                            className="form-control"
                            htmlFor="inputImg"
                            style={{textAlign: "right", height: "100%"}}
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
                Добавление товару свойств
                <button
                    type="button"
                    className="btn-prop"
                    onClick={() => addProperty(notUsedProperty)}
                    disabled={!notUsedProperty}
                >+</button>
                {propertyRender}

                {/*                <div style={{border: "1px solid red"}}>
                    <button
                        type="button"
                        className="btn-prop"
                    >-
                    </button>

                    <label>Свойство 1
                        <select className="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </label>

                    <label>Значение
                        <input className="form-control"/>
                    </label>

                </div>*/}


            </div>

        </form>
    )
}

export default ItemAdd;