import React from "react";
import PropAdd from "./prop-add";
import {compose} from "redux";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../spinner/error-indicator";
import Spinner from "../spinner";

class PropAddContainer extends React.Component {
    state = {
        //id: null,
        propName: '',
        propType: '',
        isLoading: false,
        error: null,
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {props: {storeService}, state: prop} = this;

        if (!prop.propName || !prop.propType)
            return;

        this.setState({isLoading: true})
        storeService.postProp(prop)
            .then(resolve => {
                this.setState({
                    ...resolve,
                    isLoading: false,
                    error: null
                });
                alert('Добавлено');
                // очистить значения полей
                this.setState({
                    propName: '',
                    propType: '',
                })
            })

    }

    render() {
        const {state: {propName, propType, isLoading, error}, onSubmit, onChange} = this;
        const {goBack} = this.props.history;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        return (
            <PropAdd
                propName={propName}
                propType={propType}
                onSubmit={onSubmit}
                onChange={onChange}
                goBack={goBack}/>
        )
    }
}

export default compose(
    withStoreService(),
)(PropAddContainer);