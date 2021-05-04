import React from "react";
import './item-add.scss';

const ItemAdd = (props) => {
    const {name, cost, img, description, onChange, onSubmit, goBack, onFileChange} = props;
    return (
        <form className="item-add" onSubmit={onSubmit}>
            <div className="buttons">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={goBack}
                    type={"button"}>
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
                    <div style={{position: "relative"}}>
                        <label
                            //onClick={uploadImg}
                            className="form-control"
                            htmlFor="inputImg"
                            style={{textAlign: "right", height:"100%"}}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{textAlign: "left"}}>{img}</div>
                                <div><i className="fa fa-upload" fa-lg style={{color: "blue", fontSize: "24px"}}></i>
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

        </form>
    )
}

export default ItemAdd;