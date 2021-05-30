import React from "react";
import PropAdd from "./prop-add";
import {compose} from "redux";
import {withStoreService} from "../hoc";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import {clearMessage, fetchProps, setDisappearingMessage, setMessage} from "../../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class PropAddContainer extends React.Component {
    state = {
        //id: null,
        property: {
            propName: '',
            propType: '',
        },
        propertyDirty: {
            propNameDirty: false,
            propTypeDirty: false,
        },
        isLoading: false,
        error: null,
    }

    componentWillUnmount() {
        const {clearMessage} = this.props;
        clearMessage();
    }

    blurHandler = (e) => {
        const {name} = e.target;
        this.setState({
            ...this.state,
            propertyDirty: {
                ...this.state.propertyDirty,
                [`${name}Dirty`]: true
            }
        })
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            ...this.state,
            property: {...this.state.property, [name]: value}
        })
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {props: {storeService, setDisappearingMessage, history}, state: {property: prop}} = this;

        if (!prop.propName || !prop.propType)
            return;

        this.setState({isLoading: true});
        storeService.postProp(prop)
            .then(resolve => {
                this.setState({
                    property: {
                        propName: '',
                        propType: '',
                    },
                    isLoading: false,
                    error: null
                });
                history.push('/items-or-props/props');
                setDisappearingMessage(`Создано свойство - [${resolve.propName}] ...`, 'success');


            })
            .catch(error => {
                this.setState({isLoading: false, error: error});
                setMessage(`Не удалось создать свойство - [${prop.propName}] ...`, 'danger');
            })

    }

    render() {
        const {
            state: {property: {propName, propType}, isLoading, error, propertyDirty},
            onSubmit,
            onChange,
            blurHandler
        } = this;

        if (error) return <ErrorIndicator/>

        if (isLoading) return <Spinner/>

        return (
            <PropAdd
                propName={propName}
                propType={propType}
                propertyDirty={propertyDirty}
                onSubmit={onSubmit}
                onChange={onChange}
                blurHandler={blurHandler}/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchProps: fetchProps(storeService, dispatch),
        //deleteProp: (id) => deleteProp(id)(storeService, dispatch),
        setMessage: (message, typeMessage) => dispatch(setMessage(message, typeMessage)),
        setDisappearingMessage: (message, typeMessage) => setDisappearingMessage(message, typeMessage)(dispatch),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default compose(
    withRouter,
    withStoreService(),
    connect(null, mapDispatchToProps),
)(PropAddContainer);