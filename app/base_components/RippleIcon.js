import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ripple from 'react-native-material-ripple';
import {Icon} from 'native-base';

const RippleWrap = styled(Ripple)`
     padding: 8px 8px;
     width: 48px;
     height: 48px;
     align-items: center;
     justify-content: center;
 `;

/**
 * an Icon wrapped with the Ripple effect.
 * @author Nishchay Kaushik
 * @param  name {String} name of the icon from {@link https://oblador.github.io/react-native-vector-icons/ | Ionicons} class
 * @param  color {string} color code for name
 * @param  size {number} size of the name, default=26
 * @param  style {object} styles for the RippleWrap
 * @param  rippleColor {string} color code for the ripple
 * @param  onPress {func} callback to call on Icon Press
 * @param dark {bool} dark name
 * @returns {RippleIcon}
 * @constructor
 */
const RippleIcon = ({
  name, onPress, type, size, color, rippleColor, style, dark, ...props
}) => {
  // console.log(name, "name", onPress, "onpress", type, "type", size, "size", color, "color", rippleColor, "rippleColor", style, "style", dark, "dark");
  return  (
    <RippleWrap
      style={style}
      rippleDuration={400}
      rippleColor={rippleColor || (dark ? '#123da7' : '#fff')}
      onPress={onPress}
      rippleCentered
    >
      {props.children}
      <Icon
        name={name}
        type={type}
        style={{ fontSize: size }}
      />
    </RippleWrap>
  );
}

RippleIcon.defaultProps = {
  size: 26,
  dark: false,
  rippleColor: null,
  color: null,
  style: {},
  children: null,
};

RippleIcon.propTypes = {
  rippleColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  dark: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default RippleIcon;
