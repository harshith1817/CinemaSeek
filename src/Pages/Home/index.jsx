import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import './index.css';


const HomeContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const Favorites=styled.button`
  width:11rem;
  height:3.3rem;
  background-color:red;
  border-radius:0.5rem;
  border:none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top:1rem;
  margin-bottom:1rem;
  padding:0;
`;

const ErrorMsg=styled.h1`
color:red;
`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [movieData, setMovieData] = useState(null); // State to store movie data
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been made

  // Function to fetch movie data
  const fetchMovie = async (term) => {
    try {
      const URL = `https://omdbapi.com/?t=${term}&apikey=5be72e59`;
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const finaldata = await response.json();

      if (finaldata.Response === "False") {
        console.error(`Error: ${finaldata.Error}`);
        setMovieData(null); // Reset movieData if no movie found
      } else {
        setMovieData(finaldata); // Set the fetched movie data
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchMovie(searchTerm); // Call fetchMovie with the search term
      setHasSearched(true); // Mark that a search has been made
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

        

        {/* Render movie details only after a search is made */}

        {hasSearched && (

            <div className='moviedetails'>

                {movieData ? (

                    <>

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

                        <Favorites><MdFavoriteBorder /> Add to Favorites</Favorites>

                    </>

                ) : (

                    <ErrorMsg>Oops, No Details Found!</ErrorMsg>

                )}

            </div>

        )}

    </HomeContainer>

);


};



export default Home;