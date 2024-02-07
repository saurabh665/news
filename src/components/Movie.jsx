import React, { useState } from 'react';
import Star from './Star';
import './Movie.css';

const Movie = () => {
  const [movieName, setMovieName] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddMovie = () => {
    if (!movieName) {
      alert('Please enter a movie name.');
      return;
    }

    const updatedMovies = [...movieList];

    if (editingIndex !== null) {
      // Editing an existing movie
      updatedMovies[editingIndex].name = movieName;
      setEditingIndex(null);
    } else {
      // Adding a new movie
      updatedMovies.unshift({ name: movieName, stars: Array(5).fill(false) });
    }

    setMovieList(updatedMovies);
    setMovieName('');
  };

  const handleDeleteMovie = (index) => {
    const updatedMovies = [...movieList];
    updatedMovies.splice(index, 1);
    setMovieList(updatedMovies);
  };

  const handleEditMovie = (index) => {
    setEditingIndex(index);
    setMovieName(movieList[index].name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setMovieName('');
  };

  const handleStarClick = (movieIndex, starIndex) => {
    setMovieList((prevMovies) => {
      const updatedMovies = [...prevMovies];
      updatedMovies[movieIndex].stars = updatedMovies[movieIndex].stars.map(
        (star, index) => index <= starIndex
      );
      return updatedMovies;
    });
  };

  const handleDoubleClick = (index) => {
    handleEditMovie(index);
  };

  return (
    <div>
      <div id="movieSearchBar">
        <input type="text" id="movie" value={movieName} onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
        />
        <button className='bttn' onClick={handleAddMovie}>
          {editingIndex !== null ? 'Update Movie' : 'Add Movie'}
        </button>
        {editingIndex !== null && (
          <button className='bttn' onClick={handleCancelEdit}>Cancel </button>
        )}
      </div>

      <div>
        {movieList.length > 0 ? (
          <ul className="list">
            {movieList.map((movie, movieIndex) => (
              <li key={movieIndex} onDoubleClick={() => handleDoubleClick(movieIndex)}
              >
                <strong>Name:</strong> {movie.name}
                <div>
                  {movie.stars.map((star, starIndex) => (
                    <Star key={starIndex} glow={star} onClick={() => handleStarClick(movieIndex, starIndex)}/>
                  ))}
                </div>
                <button id="btn" onClick={() => handleDeleteMovie(movieIndex)}> DELETE </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
