import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/Home';
import Saved from './Pages/Saved';
import Scaleloader from "./assets/Scaleloader";
import MoveToTop from './assets/MoveToTop';
import './App.css';

// Background container styling
const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Navbar styling with responsiveness
const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-left:90%;
  }
`;

// Styled navigation link with responsiveness
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
    color: #00ffd4;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`;

// Title container with responsiveness
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

  @media (max-width: 768px) {
    top: 15%;
  }
`;

// Title with responsiveness
const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: #fdfaa1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Slogan with responsiveness
const Slogan = styled.p`
  font-size: 1.75rem;
  margin: 0;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [load, setLoad] = useState(true);
  const [favorites, setFavorites] = useState([]); // State for favorites

  const fetchMovie = async (term) => {
    try {
      const URL = `https://omdbapi.com/?t=${term}&apikey=5be72e59`;
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const finalData = await response.json();

      if (finalData.Response === "False") {
        console.error(`Error: ${finalData.Error}`);
        setMovieData(null);
      } else {
        setMovieData(finalData);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    if (load) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
    };
  }, [load]);

  const handleSearch = () => {
    if (searchTerm) {
      fetchMovie(searchTerm);
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFavorite = (movieTitle) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieTitle)) {
        // Remove from favorites
        return prevFavorites.filter((title) => title !== movieTitle);
      } else {
        // Add to favorites
        return [...prevFavorites, movieTitle];
      }
    });
  };

  return (
    <Router>
      <Background>
        <Scaleloader load={load} />
        <MoveToTop />
        <Navbar>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/Saved">Favorites</StyledNavLink>
        </Navbar>
        <img 
          src="https://raw.githubusercontent.com/harshith1817/CinemaSeek/refs/heads/main/src/assets/Background.jpg" 
          alt="background" 
          className='bg' 
          style={{ 
            position: 'fixed', 
            width: '100%', 
            height: '140%', 
            objectFit: 'cover', 
            zIndex: -1,
            scale: 1.4
          }}
        />
        <TitleContainer>
          <Title>CinemaSeek</Title>
          <Slogan>Movie Info Hub</Slogan>
        </TitleContainer>
        <Routes>
          <Route 
            path='/' 
            element={<Home movieData={movieData} toggleFavorite={toggleFavorite} favorites={favorites} />} 
          />
          <Route 
            path='/Saved' 
            element={<Saved favorites={favorites} />} 
          />
        </Routes>
      </Background>
    </Router>
  );
}

export default App;