import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import { Actions } from 'react-native-router-flux';

import { authLogin } from '../../src/actions/authAction';

import LoginComponent from '../components/Login';

class LoginScreen extends Component {
    displayName = 'LoginScreen';

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
    }
    // TODO: UPDATE METHOD
    componentDidMount() {
        // const { loginMessage } = this.props;
        // if (loginMessage !== null && loginMessage.token && loginMessage.token.length > 10) {
        //     Actions.reset('drawer');
        // }
    }
    // TODO: UPDATE METHOD
    // async componentWillReceiveProps(nextProps, nextContext) {
    //     await this.handleRedirect(nextProps.loginMessage);
    // }

    handleEmailChange = ( email ) => this.setState({ email });
    handlePasswordChange = ( password ) => this.setState({ password });

    handleLoginSubmit = () => {
        const { email, password } = this.state;
        // this.props.authLogin(email, password);
        Actions.reset('drawer');
    };

    // handleRedirect = (loginMessage) => {
    //     if (loginMessage && loginMessage.token) {
    //         try {
    //             Actions.reset('drawer');
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // };

    render() {
        const { loginLoading, loginMessage } = this.props;
        if (loginMessage && loginLoading.token) {
            return null;
        }

        let { loginError } = this.props;

        const { email, password } = this.state;

        // eslint-disable-next-line react/prop-types
        // this.props.navigation no estaria funcionando
        // loginError = loginError || this.props.navigation.state.params.loginError;

        const disableLogin = (!email || email.length === 0 || !password || password.length === 0);

        return (
            <LoginComponent
                loading={loginLoading}
                loginError={loginError}
                disableLogin={disableLogin}
                onLoginSubmit={this.handleLoginSubmit}
                onEmailChange={this.handleEmailChange}
                onPasswordChange={this.handlePasswordChange}
            />);
    }
}

LoginScreen.defaultProps = {
    loginError: null,
    loginMessage: null,
};

// LoginScreen.propTypes = {
//     loginLoading: PropTypes.bool.isRequired,
//     loginError: PropTypes.object,
//     loginMessage: PropTypes.object,
//     authLogin: PropTypes.func.isRequired,
// };

function mapStateToProps(store) {
    return {
        loginError: store.auth.loginError,
        loginLoading: store.auth.loginLoading,
        loginMessage: store.auth.loginMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        authLogin,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
