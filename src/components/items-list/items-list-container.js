import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import ItemsList from "./items-list";
import {withStoreService} from '../hoc'
import {fetchItems, deleteItem} from '../../actions'
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

class ItemsListContainer extends React.Component {
    state = {
        sortedField: null,
        sortDesc: false,
        sortAsInt: false,
        search: '',
        pageCurrent: 1,
        pagePortionSize: 3,
        pageSize: 2,
    }

    componentDidMount() {
        const {fetchItems} = this.props;
        fetchItems();
    }

    changeSearchHandle = (str) => {
        this.setState({search: str});
    }

    setSortedFieldHandle = (nameField, sortAsInt) => {
        this.setState((state) => ({sortedField: nameField, sortDesc: !state.sortDesc, sortAsInt: sortAsInt}));
        console.log(this.state);
    }

    searchItems(items, search) {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    sortingItems(items, sortedField, sortAsInt, sortDesc) {
        const sortedItems = [...items];
        if (sortedField) {
            sortAsInt
                ? sortedItems.sort((a, b) => {
                    return (a[sortedField] - b[sortedField]) * (sortDesc ? -1 : 1)
                })
                : sortedItems.sort((a, b) => {
                    const A = a[sortedField].toLowerCase();
                    const B = b[sortedField].toLowerCase();
                    if (A > B) return (sortDesc ? -1 : 1);
                    if (A < B) return -1 * (sortDesc ? -1 : 1);
                    return 0;
                })
        }
        return sortedItems;
    }

    portioningPageItems(items, pageCurrent, pageSize) {
        return items.slice((pageCurrent - 1) * pageSize, pageCurrent * pageSize)
    }

    setPageHandler = (numPage) => {
        this.setState({pageCurrent: numPage})
    }

    render() {
        const {items, isLoading, error, deleteItem} = this.props;
        const {sortedField, sortAsInt, sortDesc, search, pageCurrent, pagePortionSize, pageSize} = this.state;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        const itemDelete = (id) => {
            deleteItem(id);
        }

        const foundItems = this.searchItems(items, search);
        const sortedItems = this.sortingItems(foundItems, sortedField, sortAsInt, sortDesc);
        const pageItems = this.portioningPageItems(sortedItems, pageCurrent, pageSize);
        return <ItemsList
            items={pageItems /*sortedItems*//*items*/}
            itemDelete={itemDelete}
            setSortedFieldHandle={this.setSortedFieldHandle}
            sorted={{sortedField, sortDesc}}
            changeSearchHandle={this.changeSearchHandle}
            pageCurrent={pageCurrent}
            pagePortionSize={pagePortionSize}
            pageSize={pageSize}
            countRow={sortedItems.length}
            setPageHandler={this.setPageHandler}

        />
    }
}

const mapStateToProps = ({itemsList}) => {
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
        deleteItem: (id) => deleteItem(id)(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ItemsListContainer);

