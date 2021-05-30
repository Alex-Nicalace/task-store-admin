import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import PropsList from "./props-list";
import {clearMessage, deleteProp, fetchProps} from "../../actions";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";


class PropsListContainer extends React.Component {

    componentDidMount() {
        const {fetchProps} = this.props
        fetchProps();
    }

    componentWillUnmount() {
        const {clearMessage} = this.props;
        clearMessage();
    }

    render() {
        const {props: propsArr, isLoading, error} = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        const delProp = (id) => {
            const {deleteProp} = this.props;
            deleteProp(id);
        }

        return <PropsList propsArr={propsArr}
                          delProp={delProp}/>
    }
}

const mapStateToProps = ({propsList}) => {
    return {
        props: propsList.props,
        isLoading: propsList.isLoading,
        error: propsList.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchProps: fetchProps(storeService, dispatch),
        deleteProp: (id) => deleteProp(id)(storeService, dispatch),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PropsListContainer);