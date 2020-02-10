import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PrimaryText from './PrimaryText';

const SectionBase = styled.View`
  background: #fff;
  box-shadow: 2px 2px 2px #eee;
`;
const SectionTitle = styled(PrimaryText)`
  margin: 15px;
`;

/**
 * {Section} componente que muestra un texto con sombra (no lo utilicé al final)
 */



const Section = ({ title, ...props }) => {
  return (
    <SectionBase {...props}>
      <SectionTitle size={20}>
        {title}
      </SectionTitle>
      {props.children}
    </SectionBase>
  );
};

Section.defaultProps = {
  title: null,
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
