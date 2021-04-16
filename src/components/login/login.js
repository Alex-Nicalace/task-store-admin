import {NavLink} from "react-router-dom";
import React from "react";
import './login.scss'

const Login = (props) => {
    const {email, password, error, handleChange, onEnterApp} = props;
    return (
        <form className="registration" onSubmit={onEnterApp}>
            <div className="registration__caption">Вход</div>

            <div className="registration__item">
                <label className="registration__label">E-mail
                    <input
                        className="form-control"
                        placeholder="Введите свой E-mail"
                        name="email"
                        value={email}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Пароль
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                        value={password}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className="registration__error">{error}</div>
            <div className="registration__item registration__item_center">
                <button onClick={onEnterApp} className="btn btn-warning btn-sm">Войти</button>
            </div>
            <div className="registration__item registration__item_center">
                <NavLink to="/registration">Зарегистрироваться</NavLink>
            </div>


        </form>

    )
}

export default Login;