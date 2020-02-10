import React, { Component } from 'react';
import PropTypes from 'prop-types';


// import { authRegister } from '../../src/actions/index';
import SignupComponent from '../components/Signup';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  handleSignUpSubmit = () => {
    const { email, password } = this.state;
    // this.props.authRegister(email, password);
    console.log('email y password', email, password)
  };

  handleEmailChange = (email) => {
    this.setState({
      email,
    });
  };

  handlePasswordChange = (password) => {
    this.setState({
      password,
    });
  };

  render() {
    const { registerLoading, registerError, registerMessage } = this.props;
    const { email, password } = this.state;
    const disableSignUp = (!email || email.length === 0 || !password || password.length === 0);

    return (
      <SignupComponent
        loading={registerLoading}
        registerMessage={registerMessage}
        registerError={registerError}
        disableSignUp={disableSignUp}
        onSignupSubmit={this.handleSignUpSubmit}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />);
  }
}

SignupScreen.defaultProps = {
  registerError: null,
  registerMessage: null,
  registerLoading: false,
};

export default SignupScreen;
