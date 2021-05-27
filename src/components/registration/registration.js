import React from "react";
import './registration.scss';

const Registration = ({
                          goBack,
                          blurHandler,
                          changeHandler,
                          createAccountHandler,
                          error,
                          state: {
                              emailDirty,
                              emailError,
                              email,
                              firstNameDirty,
                              firstNameError,
                              firstName,
                              lastNameDirty,
                              lastNameError,
                              lastName,
                              passwordDirty,
                              passwordError,
                              password,
                              passwordCheckDirty,
                              passwordCheckError,
                              passwordCheck
                          }
                      }) => {
    return (
        <form className="registration" onSubmit={createAccountHandler}>
            <div className="registration__caption">Регистрация</div>
            <div className="registration__item">
                <label className="registration__label">Имя
                    {firstNameDirty && firstNameError && <div style={{color: "red"}}>{firstNameError}</div>}
                    <input
                        className="form-control"
                        placeholder="Введите своё имя"
                        name="firstName"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={firstName}/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Фамилия
                    {lastNameDirty && lastNameError && <div style={{color: "red"}}>{lastNameError}</div>}
                    <input
                        className="form-control"
                        placeholder="Введите свою фамилию"
                        name="lastName"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={lastName}/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">E-mail
                    {emailDirty && emailError && <div style={{color: "red"}}>{emailError}</div>}
                    <input
                        className="form-control"
                        placeholder="Введите свой E-mail"
                        name="email"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={email}
                    />
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
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={password}/>
                </label>
            </div>
            <div className="registration__item">
                <label className="registration__label">Повторите пароль
                    {passwordCheckDirty && passwordCheckError && <div style={{color: "red"}}>{passwordCheckError}</div>}
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Введите пароль"
                        name="passwordCheck"
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={passwordCheck}/>
                </label>
            </div>
            <div className="registration__error">{error}</div>
            <div className="registration__item registration__item_center">
                <button
                    className="btn btn-warning btn-sm"
                    //type="button"
                    disabled={emailError || firstNameError || lastNameError || passwordError || passwordCheckError}
                >
                    Зарегистрироваться
                </button>
            </div>
            <div className="registration__item registration__item_center">
                <span
                    className="as-link"
                    onClick={goBack}>
                    Вернуться
                </span>
            </div>


        </form>
    )
};

export default Registration; // можно с помощью хука как в login-container.js