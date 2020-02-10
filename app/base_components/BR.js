import styled from 'styled-components';

/**
*   BR es un espacio para la pantalla.
*   @props:
*           {size} para cambiar la altura del espaciado.
*/

const BR = styled.View`
  height: ${props => (props.size ? props.size : 20)}
`;

export default BR;
