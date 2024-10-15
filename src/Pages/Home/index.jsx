import React from 'react';
import './index.css';

const Home = ({ movieData }) => {
  // If no movieData is available, display a message
  if (!movieData) {
    return <h2>No Details Found!</h2>;
  }

  return (
    <div style={{ color: 'white', textAlign: 'center'}} className='moviedetails'>
      <h1>{movieData.Title}</h1>
      {movieData.Poster && <img src={movieData.Poster} alt={movieData.Title} style={{ width: '300px' }} />}
      {!movieData.Poster && <p>No poster available.</p>}
      <p><strong>Year:</strong> {movieData.Year}</p>
      <p><strong>Rated:</strong> {movieData.Rated}</p>
      <p><strong>Released:</strong> {movieData.Released}</p>
      <p><strong>IMDB Rating:</strong> {movieData.imdbRating}</p>
      <p><strong>Runtime:</strong> {movieData.Runtime}</p>
      <p><strong>Language:</strong> {movieData.Language}</p>
      <p><strong>Awards:</strong> {movieData.Awards}</p>
      <p><strong>Box Office:</strong> {movieData.BoxOffice}</p>
      <p><strong>Plot:</strong> {movieData.Plot}</p>
    </div>
  );
};

export default Home;