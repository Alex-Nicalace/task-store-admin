import React from "react";
import {NavLink} from "react-router-dom";

const Login = () => {
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
                <button className="btn btn-warning btn-sm">Войти</button>
            </div>
            <div className="registration__item registration__item_center">
                <NavLink to="#">Зарегистрироваться</NavLink>
            </div>


        </form>

    )
}

export default Login;