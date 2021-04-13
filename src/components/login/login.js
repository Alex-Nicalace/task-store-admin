import React from "react";
import {NavLink, useHistory } from "react-router-dom";
import './login.scss'

const Login = () => {
    const history = useHistory(); // можно с помощью HOC как registration.js
    const enter = () => history.push('/items-or-props/items');
    return(
        <form className="registration">
            <div className="registration__caption">Вход</div>

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
            <div className="registration__item registration__item_center">
                <button onClick={enter} className="btn btn-warning btn-sm">Войти</button>
            </div>
            <div className="registration__item registration__item_center">
                <NavLink to="/registration">Зарегистрироваться</NavLink>
            </div>


        </form>

    )
}

export default Login;