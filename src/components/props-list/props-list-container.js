import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import PropsList from "./props-list";
import {fetchProps} from "../../actions";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";


class PropsListContainer extends React.Component {

    componentDidMount() {
        const { fetchProps } = this.props
        fetchProps();
    }

    render(){
        const {props: propsArr, isLoading, error} = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        return <PropsList propsArr={propsArr}/>
    }
}

const mapStateToProps = ( {propsList} ) => {
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
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PropsListContainer);