import React from 'react';
import styled from 'styled-components';

// Styled component for the heading
const Heading = styled.h1`
  color: white;
  text-align: center;
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin: 1rem 0;
  font-weight: bolder;
  z-index: 10;
  padding-top: 6%;
  padding-bottom:0.75%;
`;

// Message for when there are no favorites
const NoneMsg = styled.h1`
  font-size: 2.5rem;
  color: #FFD700;
  text-align: center;
  margin: 2%;
`;

const NoneMsgContainer=styled.div`
background-color: #2A383C;
border-radius: 2rem;
border: 2px solid #4F5B5C;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
width:30%; 
&:hover {
    background-color: #313E3B; /* Match hover color to the original background */
    border-color: #B0B0B0 /* Bright border on hover */
  } 
`;

// Scrollable container for the favorites list
const ScrollableContainer = styled.div`
  max-height: 60vh; /* Set a maximum height for the list container */
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
`;

// Background box styling for the favorites list
const BackgroundBox = styled.div`
    background-color: #2A383C;
  padding: 1.5rem; /* Padding inside the box */
  width: 20%; /* Width of the box relative to its container */
    border-radius: 2rem;
    border: 2px solid #4F5B5C;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);  
    &:hover {
    background-color: #313E3B; /* Match hover color to the original background */
    border-color: #B0B0B0 /* Bright border on hover */
  }
`;

// Favorites list styling
const FavoritesList = styled.ul`
  list-style-type: disc; /* Adds a dot before each item */
  padding-left: 2rem; /* Adjust padding for better alignment of the dots */
  margin: 0;
`;

// Individual favorite item styling
const FavoriteItem = styled.li`
  color: #FFD700;
  font-size: 2.2rem;
  text-align: left; /* Align text to the left for better readability */
  margin: 0.5rem 0; /* Spacing between each list item */
`;

const Saved = ({ favorites }) => (
  <ScrollableContainer>
    <Heading>Favoured</Heading>
    {favorites.length === 0 ? (
      <NoneMsgContainer>
      <NoneMsg>No favorites added yet!</NoneMsg>
      </NoneMsgContainer>
    ) : (
      <BackgroundBox>
        <FavoritesList>
          {favorites.map((title, index) => (
            <FavoriteItem key={index}>{title}</FavoriteItem>
          ))}
        </FavoritesList>
      </BackgroundBox>
    )}
  </ScrollableContainer>
);

export default Saved;
