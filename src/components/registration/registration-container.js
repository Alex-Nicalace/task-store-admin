import React from "react";
import Registration from "./registration";
import {withStoreService} from "../hoc";
import {compose} from "redux";
import {createUser} from "../../actions/user-actions";
import {connect} from "react-redux";

class RegistrationContainer extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordCheck: '',

        firstNameDirty: false,
        lastNameDirty: false,
        emailDirty: false,
        passwordDirty: false,
        passwordCheckDirty: false,

        firstNameError: 'Имя не может быть пустым',
        lastNameError: 'Фамилия не может быть пустой',
        emailError: 'E-mail не может быть пустым',
        passwordError: 'пароль не может быть пустым',
        passwordCheckError: 'пароль не может быть пустым',
    }

    blurHandler = (e) => {
        const {name} = e.target;
        this.setState({
            [`${name}Dirty`]: true
        })
    }

    createAccountHandler = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const {createUser} = this.props;
        createUser(email, password);
    }

    changeHandler = (e) => {
        const {name, value} = e.target;

        let error = '';
        switch (name) {
            case 'lastName':
            case 'firstName': {
                if (value.length < 2)
                    error = 'поле не может быть короче 2 символов';
                break;
            }
            case 'email': {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                error = !re.test(String(value).toLowerCase()) ? 'E-mail не корректный' : null
                break;
            }
            case 'password': {
                error = value.length < 8
                    ? 'Пароль не может быть менее 8 символов'
                    : value !== this.state.passwordCheck && this.state.passwordCheckDirty
                        ? 'Пароли не соотвествуют'
                        : null;
                if (!error)
                    this.setState({passwordCheckError: null});
                break;
            }
            case 'passwordCheck': {
                error = value.length < 8
                    ? 'Пароль не может быть менее 8 символов'
                    : value !== this.state.password && this.state.passwordDirty
                        ? 'Пароли не соотвествуют'
                        : null;
                if (!error)
                    this.setState({passwordError: null})
                break;
            }
            default:
                error = ''
        }

        this.setState({
            [name]: value,
            [`${name}Error`]: error,
        })
    }

    render() {
        const {history: {goBack}, error} = this.props
        return (
            <Registration
                goBack={goBack}
                blurHandler={this.blurHandler}
                changeHandler={this.changeHandler}
                state={this.state}
                createAccountHandler={this.createAccountHandler}
                error={error}
            />
        )
    }
}

const mapStateToProps = ({userInfo}) => {
    return {
        error: userInfo.error,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        createUser: (email, password) => createUser(email, password)(storeService, dispatch)
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(RegistrationContainer);