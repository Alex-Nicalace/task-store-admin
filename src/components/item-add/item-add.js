import React from "react";
import './item-add.scss';

const ItemAdd = (props) => {
    const {name, cost, img, description, onChange, onSubmit, goBack} = props;
    return (
        <form className="item-add" onSubmit={onSubmit}>
            <div className="buttons">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={goBack}>
                    Вернуться
                </button>
                <button className="buttons_save btn btn-success btn-sm">Сохранить</button>
            </div>
            <div className="main-property ">
                <div className="main-property__caption">Добавление товара</div>

                <div className="main-property__item">
                    <div>Название товара<span>*</span></div>
                    <input
                        className="form-control"
                        name='name'
                        placeholder="Mercedes S550 4matic"
                        value={name}
                        onChange={onChange}/>
                </div>

                <div className="main-property__item">
                    <div>Стоимость товара<span>*</span></div>
                    <input
                        className="form-control"
                        name='cost'
                        placeholder="113 000"
                        value={cost}
                        onChange={onChange}/>
                </div>

                <div className="main-property__item">
                    <div>Изображение<span>*</span></div>
                    <input
                        className="form-control"
                        name='img'
                        value={img}
                        onChange={onChange}/>
                    <button className="btn btn-outline-success btn-sm"><i className="fa fa-exclamation"></i>
                    </button>

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

        </form>
    )
}

export default ItemAdd;