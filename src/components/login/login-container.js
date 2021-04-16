import React from "react";
import {withStoreService} from "../hoc";
import {compose} from "redux";
import Login from './login'
import {withRouter} from "react-router-dom";

class LoginContainer extends React.Component {
    state = {
        email: '',
        password: '',
        error: null,
    }
    onEnterApp = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const {storeService} = this.props;
        storeService.signAccount(email, password)
            .then(() => this.props.history.push('/items-or-props/items'))
            .catch(error => this.setState({error: error.message}));
    }

    handleChange = ({target: {value, name}}) => {
        this.setState({[name]: value})

    }

    render() {
        const {email, password, error} = this.state;
        const {handleChange, onEnterApp} = this;
        return <Login
            email={email}
            password={password}
            error={error}
            handleChange={handleChange}
            onEnterApp={onEnterApp}/>
    }
};

export default compose(
    withRouter,
    withStoreService(),
)(LoginContainer);