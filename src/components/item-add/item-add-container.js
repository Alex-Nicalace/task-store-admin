import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {withStoreService} from "../hoc";
import {postItem} from "../../actions";
import ItemAdd from "./item-add";
import {withRouter} from "react-router-dom";

class ItemAddContainer extends React.Component {
    state = {
        item: {
            name: '',
            cost: '',
            img: '',
            description: '',
        }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [name]: value
            }
        })
        //console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {item} = this.state;
        const {postItem} = this.props;
        postItem(item);
    };

    render() {
        const { name, cost, img, description } = this.state.item;
        const { onChange, onSubmit } = this;
        const { goBack } = this.props.history;
        return (<ItemAdd
                name={name}
                cost={cost}
                img={img}
                description={description}
                onChange={onChange}
                onSubmit={onSubmit}
                goBack={goBack}/>
        )
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
        postItem: (item) => postItem(item)(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ItemAddContainer);
