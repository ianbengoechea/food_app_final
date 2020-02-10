import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import PrimaryText from './PrimaryText';
import SecondaryText from './SecondaryText';

/**
 * Componente que devuelve el texto de un boton (Utilicé {RoundButton} en vez de este)
 * @param title {String} texto del boton
 * @param primary {Boolean} define el tipo de texto
 * @param onPress {function} callback para el OnPress
 * @returns {TextButton}
 */

const TextButton = ({ title, primary, onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} >

    { primary && <PrimaryText {...props}>{title}</PrimaryText> }

    { !primary && <SecondaryText {...props}>{title}</SecondaryText> }

  </TouchableOpacity>
);

TextButton.defaultProps = {
  primary: false,
};

TextButton.propTypes = {
  primary: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TextButton;
