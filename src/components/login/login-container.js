import React from "react";
import {withStoreService} from "../hoc";
import {compose} from "redux";
import Login from './login'
import {signUser} from "../../actions/user-actions";
import {connect} from "react-redux";

class LoginContainer extends React.Component {
    state = {
        email: '',
        password: '',
        emailDirty: false,
        passwordDirty: false,
        emailError: 'E-mail не может быть пустым',
        passwordError: 'пароль не может быть пустым',
    }
    onEnterApp = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const {signUser} = this.props;
        signUser(email, password);
    }

    passwordHandle = ({target: {value}}) => {
        this.setState({
            password: value,
            passwordError: value.length < 8 ? 'Пароль не может быть менее 8 символов' : null
        })

    }

    emailHandle = ({target: {value}}) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            email: value,
            emailError:  !re.test(String(value).toLowerCase()) ? 'E-mail не корректный' : null
        })
    }

    blurHandler = (e) => {
        const {name} = e.target;
        this.setState({
            [`${name}Dirty`]: true
        })
    }

    render() {
        const {state, passwordHandle, onEnterApp, blurHandler, emailHandle} = this;
        return <Login
            state={state}
            error ={this.props.error}
            passwordHandle={passwordHandle}
            onEnterApp={onEnterApp}
            blurHandler={blurHandler}
            emailHandle={emailHandle}/>
    }
};

const mapStateToProps = ({userInfo}) => {
    return {
        error: userInfo.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        signUser: (email, password) => signUser(email, password)(storeService, dispatch)
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(LoginContainer);

//export default LoginContainer;