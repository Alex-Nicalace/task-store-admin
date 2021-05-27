import React from "react";

const ExitButton = ({outHandler}) => {
    return (
        <button className="btn btn-dark" onClick={outHandler}>Выйти</button>
    )

}

export default ExitButton;