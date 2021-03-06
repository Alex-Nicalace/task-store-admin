import React from "react";

import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"/>
            <span className="boom">ОШИБКА!</span>
            <span>что-то пошло не так ...</span>
            <span>(сообщите об этом.)</span>
        </div>
    );
};

export default ErrorIndicator;