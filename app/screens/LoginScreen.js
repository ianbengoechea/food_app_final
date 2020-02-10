import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

// import { authLogin } from '../../src/actions/authAction';
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
    componentDidMount() {}

    handleEmailChange = ( email ) => this.setState({ email });
    handlePasswordChange = ( password ) => this.setState({ password });

    handleLoginSubmit = () => {
        const { email, password } = this.state;
        // TODO: PORQUE NO FUNCIONA ESTO?
        Actions.reset('drawer');
    };

    render() {
        const { loginLoading, loginMessage } = this.props;
        if (loginMessage && loginLoading.token) {
            return null;
        }

        let { loginError } = this.props;
        const { email, password } = this.state;
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

function mapStateToProps(store) {
    return {
        loginError: store.auth.loginError,
        loginLoading: store.auth.loginLoading,
        loginMessage: store.auth.loginMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
