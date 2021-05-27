import React from "react";

const Messages = ({messages:{message, typeMessage}, clearMessage}) => {
    //type success, danger, warning
    if (!message)
        return null;
    return (
        <div className={`alert alert-${typeMessage || 'warning'} alert-dismissible`}>
            <strong>Внимание!</strong>
            &nbsp;{message}
            <button onClick={clearMessage} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Messages;