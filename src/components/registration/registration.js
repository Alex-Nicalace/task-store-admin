import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import './registration.scss';

const Registration = (props) => {
    const { goBack } = props.history;

    return (
        <form className="registration">
            <div className="registration__caption">Регистрация</div>
            <div className="registration__item">
                <label className="registration__label">Имя
                    <input
                        className="form-control" type="text" placeholder="Введите своё имя"/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Фамилия
                    <input className="form-control" type="text" placeholder="Введите свою фамилию"/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">E-mail
                    <input className="form-control" type="text" placeholder="Введите свой E-mail"/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Пароль
                    <input className="form-control" type="password" placeholder="Введите пароль"/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Повторите пароль
                    <input className="form-control" type="password" placeholder="Введите пароль"/>
                </label>
            </div>
            <div className="registration__item registration__item_center">
                <button className="btn btn-warning btn-sm">Зарегистрироваться</button>
            </div>
            <div className="registration__item registration__item_center">
                <NavLink
                    to="#"
                    onClick={goBack}>
                    Вернуться
                </NavLink>
            </div>


        </form>
    )
};

export default withRouter(Registration); // можно с помощью хука как в login-container.js