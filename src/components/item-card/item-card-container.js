import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import ItemCard from "./item-card";
import {clearMessage, fetchItem, setDisappearingMessage, setMessage} from "../../actions";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

class ItemCardContainer extends React.Component {

    componentDidMount() {
        const { fetchItem, id } = this.props;
        fetchItem(id);
    }

    componentWillUnmount() {
        const { clearMessage } = this.props;
        clearMessage();
    }

    buyItemHandler = () => {
        const { item, setMessage } = this.props;
        setMessage(`Ждите доставки - [${item.name}] ...`, 'success');

    }

    render(){
        const { item, isLoading, error, history } = this.props;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>
        return <ItemCard item={item} goBack={history.goBack} buyItemHandler={this.buyItemHandler} />
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
        setMessage: (message, typeMessage) => dispatch(setMessage(message, typeMessage)),
        setDisappearingMessage: (message, typeMessage) => setDisappearingMessage(message, typeMessage)(dispatch),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ItemCardContainer);