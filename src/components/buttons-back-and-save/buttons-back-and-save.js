import React from "react";
import './buttons-back-and-save.scss'
import {withRouter} from "react-router-dom";

const ButtonsBackAndSave = ({history:{goBack}, disabledButtonSave}) => {
    return (
        <div className="buttons">
            <button
                className="btn btn-danger btn-sm"
                onClick={goBack}
                type={"button"}>
                Вернуться
            </button>
            <button
                className="buttons_save btn btn-success btn-sm"
                disabled={disabledButtonSave}
            >
                Сохранить
            </button>
        </div>
    )
}

export default withRouter(ButtonsBackAndSave);