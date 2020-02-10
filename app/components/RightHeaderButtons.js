import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


import ViewRow from '../base_components/ViewRow';
import RippleIcon from '../base_components/RippleIcon';
import PrimaryText from '../base_components/PrimaryText';

/**
 * {RightHeaderButtons} Componente que segun la screen muestra diferentes botones,
 * no lo pude implementar correctamente con el {Drawer} y estimo que es por la version de
 * la libreria.
 * TODO: reemplazar la navegacion con react-navigation
 */

class RightHeaderButtons extends Component {

  handleSignOut = () => {
      console.log('LOGOUT!!')
    // this.props.authLogout();
    // Actions.reset('loginScreen');
  };

  render() {
    let type = 'Ionicons';

    return (
      <ViewRow
        jc="flex-end"
        ai="center"
      >
        <RippleIcon
          type={type}
          name="md-cart"
          dark
          size={20}
          onPress={() => Actions.cartScreen()}
        >
          <View
            style={{
              position: 'absolute',
              right: 25,
              top: 0,
              width: 25,
              height: 25,
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: '#888',
            }}
          >
            <PrimaryText style={{
              color: '#fff',
              fontSize: 14,
            }}
            >
              {this.props.cartData.length}
            </PrimaryText>
          </View>
        </RippleIcon>

        <RippleIcon
          dark
          size={20
          }
          name="md-log-out"
          onPress={this.handleSignOut}
        />
      </ViewRow>
    );
  }
}

RightHeaderButtons.defaultProps = {
    loginMessage: {},
    cartData: [],
};

function MapStateToProps(store) {
    return {
        cartData: store.cart.cartData,
    };
}


export default connect(MapStateToProps, {})(RightHeaderButtons);
