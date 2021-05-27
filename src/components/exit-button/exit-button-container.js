import React from "react";
import {compose} from "redux";
import {withStoreService} from "../hoc";
import {outUser} from "../../actions/user-actions";
import {connect} from "react-redux";
import ExitButton from "./exit-button";

class ExitButtonContainer extends React.Component {

    outHandler = () => {
        const {outUser} = this.props;
        outUser();
    }

    render() {
        return (
            <ExitButton outHandler={this.outHandler}/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        outUser: outUser(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    connect(null, mapDispatchToProps),
)(ExitButtonContainer);