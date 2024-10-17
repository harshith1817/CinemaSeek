import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FadeLoader } from 'react-spinners';
import './index.css';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Main container styling for the search area with responsiveness
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  position: absolute;
  top: 35%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    top: 30%;
  }

  @media (max-width: 480px) {
    top: 25%;
    margin-top: 20%;
  }
`;

const SearchBar = styled.input`
  width: 40%;
  height: 2.75rem;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 1rem;
  border: none;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: #333;
  outline: none;

  @media (max-width: 768px) {
    width: 70%;
    font-size: 0.9rem;
    margin-top: 30%;
  }

  @media (max-width: 480px) {
    width: 60%;
    font-size: 0.8rem;
  }
`;

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

  @media (max-width: 768px) {
    width: 20%;
  }

  @media (max-width: 480px) {
    width: 20%;
    font-size: 0.85rem;
  }
`;

const SearchSymbol = styled.span`
  padding-left: 2.3rem;

  @media (max-width: 480px) {
    padding-left: 1rem;
  }
`;

const SearchText = styled.span`
  padding-right: 2.3rem;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    padding-right: 1rem;
    font-size: 0.9rem;
  }
`;

const Favorites = styled.button`
  width: 11.5rem;
  height: 3.3rem;
  background-color: ${({ isFavorited }) => (isFavorited ? '#0028FF' : '#FFD700')};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0;
  color: black;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isFavorited }) => (isFavorited ? '#0033CC' : '#FFC107')};
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 3rem;
    font-size: 0.95rem;
  }
`;

const ErrorMsg = styled.h1`
  color: red;
  display: flex;
  justify-content: center;
  font-size: 3rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ErrorMsgBox = styled.div`
  margin-top: 25%; 
  width: 35%;
  background-color: #2A383C;
  border-radius: 2rem;
  border: 2px solid #4F5B5C;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);

  @media (max-width: 480px) {
    width: 85%;
    margin-top: 30%;
  }
`;

const MovieDetailsContainer = styled.div`
  margin-top: 85%;
  margin-bottom: 3%;
  height: 57%;
  width: 48%;
  background-color: #2A383C;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2rem;
  border: 2px solid #4F5B5C;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  color: #E0E0E0;
  @media (max-width: 1300px) {
    width: 83%;
    height: auto;
    margin-top: 135%;
  }
  @media (max-width: 1160px) {
    width: 83%;
    height: auto;
    margin-top: 175%;
  }
  @media (max-width: 950px) {
    width: 83%;
    height: auto;
    margin-top: 195%;
  }
  @media (max-width: 768px) {
    width: 83%;
    height: auto;
    margin-top: 235%;
  }
  @media (max-width: 630px) {
    width: 83%;
    height: auto;
    margin-top: 265%;
  }
  @media (max-width: 550px) {
    width: 83%;
    height: auto;
    margin-top: 295%;
  } 
  @media (max-width: 490px) {
    width: 83%;
    margin-top: 325%;
    padding: 1rem;
  }
  
  @media (max-width: 410px) {
    width: 83%;
    margin-top: 365%;
    padding: 1rem;
  }
  @media (max-width: 350px) {
    width: 83%;
    margin-top: 435%;
    padding: 1rem;
  }
  @media (max-width: 300px) {
    width: 83%;
    margin-top: 485%;
    padding: 1rem;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0b0522;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Home = ({ toggleFavorite, favorites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovie = async (term) => {
    setLoading(true);
    try {
      const URL = `https://omdbapi.com/?t=${term}&apikey=5be72e59`;
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const finaldata = await response.json();
      if (finaldata.Response === "False") {
        console.error(`Error: ${finaldata.Error}`);
        setMovieData(null);
      } else {
        setMovieData(finaldata);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchMovie(searchTerm);
      setHasSearched(true);
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
    <HomeContainer>
      {loading && (
        <LoadingOverlay>
          <FadeLoader color="#36d7b7" loading={loading} />
        </LoadingOverlay>
      )}

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

      {hasSearched && !movieData && (
        <ErrorMsgBox>
          <ErrorMsg>Oops, No Details Found!</ErrorMsg>
        </ErrorMsgBox>
      )}
      
      {hasSearched && movieData && (
        <MovieDetailsContainer className='moviedetails'>
          <h1>{movieData.Title}</h1>
          {movieData.Poster ? (
            <img src={movieData.Poster} alt={movieData.Title} style={{ width: '300px' }} />
          ) : (
            <p>No poster available.</p>
          )}
          <p><strong>Year:</strong> {movieData.Year}</p>
          <p><strong>Rated:</strong> {movieData.Rated}</p>
          <p><strong>Released:</strong> {movieData.Released}</p>
          <p><strong>IMDB Rating:</strong> {movieData.imdbRating}</p>
          <p><strong>Runtime:</strong> {movieData.Runtime}</p>
          <p><strong>Language:</strong> {movieData.Language}</p>
          <p><strong>Genre:</strong> {movieData.Genre}</p>
          <p><strong>Actors:</strong> {movieData.Actors}</p>
          <p><strong>Director:</strong> {movieData.Director}</p>
          <p><strong>Writer:</strong> {movieData.Writer}</p>
          <p><strong>Awards:</strong> {movieData.Awards}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>

          <Favorites 
            onClick={() => toggleFavorite(movieData.Title)} 
            isFavorited={favorites.includes(movieData.Title)}
          >
            {favorites.includes(movieData.Title) ? <MdFavorite /> : <MdFavoriteBorder />}
            {favorites.includes(movieData.Title) ? "Added to Favorites" : "Add to Favorites"}
          </Favorites>
        </MovieDetailsContainer>
      )}
    </HomeContainer>
  );
};

export default Home;