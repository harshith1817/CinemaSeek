import React from 'react';
import styled from 'styled-components';

// Styled component for the heading
const Heading = styled.h1`
  color: white;
  text-align: center; /* Centering the heading */
  font-size: 4rem; /* Larger font size for visibility */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom:6rem;
`;

const Saved = () => (
  <div>
    <Heading>Favoured</Heading>
  </div>
);

export default Saved;
