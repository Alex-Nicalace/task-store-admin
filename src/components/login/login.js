import {NavLink} from "react-router-dom";
import React from "react";
import './login.scss'

const Login = (props) => {
    const {
        state: {email, password, emailDirty, emailError, passwordDirty, passwordError},
        error,
        passwordHandle,
        onEnterApp,
        blurHandler,
        emailHandle,
    } = props;
    return (
        <form className="registration" onSubmit={onEnterApp}>
            <div className="registration__caption">Вход</div>

            <div className="registration__item">
                <label className="registration__label">E-mail
                    {emailDirty && emailError && <div style={{color: "red"}}>{emailError}</div>}
                    <input
                        className="form-control"
                        placeholder="Введите свой E-mail"
                        name="email"
                        value={email}
                        onChange={emailHandle}
                        onBlur={blurHandler}/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Пароль
                    {passwordDirty && passwordError && <div style={{color: "red"}}>{passwordError}</div>}
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                        value={password}
                        onChange={passwordHandle}
                        onBlur={blurHandler}/>
                </label>
            </div>
            <div className="registration__error">{error}</div>
            <div className="registration__item registration__item_center">
                <button
                    onClick={onEnterApp}
                    className="btn btn-warning btn-sm"
                    disabled={emailError || passwordError}
                >
                    Войти
                </button>
            </div>
            <div className="registration__item registration__item_center">
                <NavLink to="/registration">Зарегистрироваться</NavLink>
            </div>


        </form>

    )
}

export default Login;