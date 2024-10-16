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

// Navbar styling
const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
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
    color: #00ffd4;
  }
`;

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
  color: #fdfaa1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Slogan = styled.p`
  font-size: 1.75rem;
  margin: 0;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [movieData, setMovieData] = useState(null); // State to store movie data
  const [load, setLoad] = useState(true);

  // Function to fetch movie data
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
        setMovieData(null); // Reset movieData if no movie is found
      } else {
        setMovieData(finalData); // Set the fetched movie data
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
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('loading');
    };
  }, [load]);

  const handleSearch = () => {
    if (searchTerm) {
      fetchMovie(searchTerm); // Call fetchMovie with the search term
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
            height: '100%', 
            objectFit: 'cover', 
            zIndex: -1,
            scale: 1
          }}
        />
        <TitleContainer>
          <Title>CinemaSeek</Title>
          <Slogan>Movie Info Hub</Slogan>
        </TitleContainer>
        <Routes>
          <Route path='/' element={<Home movieData={movieData} />} /> {/* Pass movieData to Home component */}
          <Route path='/Saved' element={<Saved />} />
        </Routes>
      </Background>
    </Router>
  );
}

export default App;
