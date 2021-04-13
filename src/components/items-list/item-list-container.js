import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import ItemsList from "./items-list";
import {withStoreService} from '../hoc'
import {fetchItems} from '../../actions'
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";

class ItemListContainer extends React.Component {

    componentDidMount() {
        const {fetchItems} = this.props;
        fetchItems();
    }

    render() {
        const {items, isLoading, error} = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        return <ItemsList items={items}/>
    }
}

const mapStateToProps = ( { itemsList } ) => {
    return {
        items: itemsList.items,
        isLoading: itemsList.isLoading,
        error: itemsList.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchItems: fetchItems(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ItemListContainer);