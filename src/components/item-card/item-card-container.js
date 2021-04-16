import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import ItemCard from "./item-card";
import {fetchItem} from "../../actions";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";
import {withRouter} from "react-router-dom";


class ItemCardContainer extends React.Component {

    componentDidMount() {
        const { fetchItem, id } = this.props;
        fetchItem(+id);
    }

    render(){
        const { item, isLoading, error, history } = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>
        return <ItemCard item={item} goBack={history.goBack} />
    }
}

const mapStateToProps = ( { itemData } ) => {
    return {
        item: itemData.item,
        isLoading: itemData.isLoading,
        error: itemData.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchItem: (id) => fetchItem(id)(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ItemCardContainer);