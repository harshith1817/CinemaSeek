import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/Home';
import Saved from './Pages/Saved';
import { FaSearch } from "react-icons/fa";
import Scaleloader from "./assets/Scaleloader";
import './App.css';

// Background container styling
const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// Navigation bar styling
const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  z-index: 10;
`;

// Styled navigation link
const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding-left: 18rem;
  margin: 0 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s;

  &.active {
    font-weight: bold;
    color: #b968c7;
  }
`;

// Search bar styling
const SearchBar = styled.input`
  width: 40%;
  height: 2.5rem;
  border-radius: 0.75rem;
  text-align: center;
  font-size: 1rem;
  border: none;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: #333;
  outline: none;
`;

// Search button styling
const SearchButton = styled.button`
  width: 10%;
  height: 2.5rem;
  background-color: #1E90FF;
  font-size: 0.95rem;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #104E8B;
  }
`;

const SearchSymbol = styled.span`
  padding-left: 2.1rem;
`;

const SearchText = styled.span`
  padding-right: 2rem;
  font-size: 1.1rem;
`;

// Container for the title and slogan
const TitleContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 15%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Slogan = styled.p`
  font-size: 1.75rem;
  margin: 0;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

// Main container styling for the search area
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
`;

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    const timer = setTimeout(() => {
      setLoad(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
    };
  }, [load]);

  const handleSearch = () => {
    if (searchTerm) {
      console.log(`Searching for: ${searchTerm}`);
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Router>
      <Background>
        <Scaleloader load={load} />
        <Navbar>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/Saved">Favorites</StyledNavLink>
        </Navbar>
        <img 
          src="https://images.pexels.com/photos/7234404/pexels-photo-7234404.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="background" 
          className='bg' 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: -1 
          }}
        />
        <TitleContainer>
          <Title>CinemaSeek</Title>
          <Slogan>Movie Info Hub</Slogan>
        </TitleContainer>
        <MainContainer>
          <SearchBar 
            type="text" 
            placeholder='Looking for a film?' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyPress={handleKeyPress} 
          />
          <SearchButton onClick={handleSearch}>
            <SearchSymbol><FaSearch /></SearchSymbol>
            <SearchText>Search</SearchText>
          </SearchButton>
        </MainContainer>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Saved' element={<Saved />} />
        </Routes>
      </Background>
    </Router>
  );
}

export default App;
