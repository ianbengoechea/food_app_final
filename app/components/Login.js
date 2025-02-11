import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Actions } from 'react-native-router-flux';

// Ui Components
import AppBase from '../base_components/AppBase';
import TextButton from '../base_components/TextButton';
import TextInput from '../base_components/TextInput';
import PrimaryText from '../base_components/PrimaryText';
import RoundButton from '../base_components/RoundButton';
import BR from '../base_components/BR';
import Colors from '../../src/constants/colors';

class LoginComponent extends Component {
  render() {
    const {
      loading, onLoginSubmit, onEmailChange, onPasswordChange, loginError, disableLogin,
    } = this.props;

    return (
      <AppBase
        style={{
          justifyContent: 'center',
        }}
      >
        <PrimaryText bold size={26}>Food App</PrimaryText>
        <BR size={45} />
        {loginError && <PrimaryText>{loginError.message}</PrimaryText>}
        <BR size={50} />

        <TextInput
          autoCorrect={false}
          onChangeText={_.debounce(onEmailChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue=""
          underlineColorAndroid="#B9B9B9"
          placeholder="Email"
        />
        <BR />
        <TextInput
          autoCorrect={false}
          onChangeText={_.debounce(onPasswordChange, 500)}
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          defaultValue=""
          underlineColorAndroid="#B9B9B9"
          secureTextEntry
          placeholder="Password"
        />
        <BR />
        <TextButton
          onPress={() => {
          }}
          title="Olvidaste tu contraseña?"
        />
        <BR />
        <RoundButton
          title="Ingresa"
          disabled={disableLogin}
          loading={loading}
          onPress={onLoginSubmit}
        />
        <BR size={10} />
        <RoundButton
          primary
          buttonColor={Colors.blue}
          title="Registrate"
          onPress={() => Actions.signupScreen()}
        />
        <BR size={20} />
      </AppBase>
    );
  }
}

LoginComponent.defaultProps = {
  loginError: null,
};

LoginComponent.propTypes = {
  disableLogin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

export default LoginComponent;
