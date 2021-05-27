import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../routes";
import {ITEMS_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {compose} from "redux";
import {withStoreService} from "../hoc";
import {fetchUser} from "../../actions";
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class AppRouter extends React.Component {
/*    state = {
        user: null
    }*/

    componentDidMount() {
        // const {storeService} = this.props;
        // storeService.auth.onAuthStateChanged((response) => {
        //     this.setState({user: response})
        // })
        const {fetchUser} = this.props;
        fetchUser();
    }

    render () {
        const {user, userIsLoading, userError} = this.props

        // if (userIsLoading)
        //     return <Spinner />

        // if (userError)
        //     return <ErrorIndicator />

        return user /*this.state.user*/
            ? (
                <Switch>
                    {privateRoutes.map(({path, render, exact}) =>
                        <Route path={path} render={render} exact={exact}/>)}
                    <Redirect to={ITEMS_ROUTE}/>
                </Switch>
            )
            : (
                <Switch>
                    {publicRoutes.map(({path, render, exact}) =>
                        <Route path={path} render={render} exact={exact}/>)}
                    <Redirect to={LOGIN_ROUTE}/>
                </Switch>
            )
    }
}

const mapStateToProps = ({userInfo}) => {
    return {
        user: userInfo.user,
        userIsLoading: userInfo.isLoading,
        userError: userInfo.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {storeService} = ownProps;
    return {
        fetchUser: fetchUser(storeService, dispatch),
    }
}

export default compose(
    withStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AppRouter);