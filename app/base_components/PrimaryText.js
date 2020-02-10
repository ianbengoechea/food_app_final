import styled from 'styled-components';
import Color from '../../src/constants/colors';

/**
 * {PrimaryText} Componente estilado, texto por defecto de la app
 * @props:
 *          {color} por defecto color primario de la app
 *          {align} por defecto centrado
 *          {bold} por defecto normal
 *          {size} por defecto 16px
*/

const PrimaryText = styled.Text`
  width: 100%;
  color: ${props => (props.color ? props.color : Color.primaryColor)};
  font-family: 'Roboto Slab';
  text-align: ${props => (props.align ? props.align : 'center')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-size: ${props => (props.size ? props.size : '16px')};
`;

export default PrimaryText;
