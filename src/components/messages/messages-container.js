import React from "react";
import Messages from './messages'
import {compose} from "redux";
import {connect} from "react-redux";
import {clearMessage} from "../../actions";

class MessagesContainer extends React.Component {
    render() {
        const {messages, clearMessage} = this.props;
        return (
            <Messages
                messages={messages}
                clearMessage={clearMessage}
            />
        )
    }
}

const mapStateToProps = ({messages}) => {
    return {
        messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer);