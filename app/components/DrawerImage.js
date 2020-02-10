import React from 'react';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RippleIcon from '../base_components/RippleIcon';

/**
 * {DrawerImage} componente que segun la screen en donde esté renderiza distintos iconos
 * @comportamiento: maneja el open drawer o el pop de la screen desde la navegacion de router-flux
 * @TODO: fijarse la navegacion que no funciona correctamente
 */

class DrawerImage extends React.Component {
  isIOS = () => Platform.OS === 'ios';

  render() {

    let iconName = 'md-menu';
    let isBack = false;
    let type = 'Ionicons';

    if (Actions.currentScene.includes('homeScreen')) {
      iconName = 'md-menu';
      isBack = false;
    } else {
      iconName = this.isIOS() ? 'ios-arrow-back' : 'md-arrow-back';
      isBack = true;
    }

    return (
      <RippleIcon
        dark
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginRight: 15,
          marginTop: this.isIOS() ? -16 : 5,
        }}
        size={30}
        type={type}
        name={iconName}
        onPress={() => {if (isBack) {
            Actions.drawerClose();
            Actions.pop();
          } else {
            Actions.drawerOpen();
          }
        }}
      />
    );
  }
}

DrawerImage.propTypes = {};

export default DrawerImage;
