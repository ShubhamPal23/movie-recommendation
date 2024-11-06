import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setFilteredMovies } from '../store/movieSlice';
import Papa from 'papaparse';
import { NavLink } from 'react-router-dom';
import './Recommendation.css';
import { useNavigate } from 'react-router-dom';

const Recommendation = () => {
  const dispatch = useDispatch();
  const { movies, filteredMovies } = useSelector((state) => state.movie);
  const [keyword, setKeyword] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    if (movies.length === 0) {
      const loadCSV = async (fileName) => {
        return new Promise((resolve, reject) => {
          Papa.parse(`/${fileName}`, {
            download: true,
            header: true,
            complete: (result) => resolve(result.data),
            error: (error) => reject(error),
          });
        });
      };

      const loadAllMovies = async () => {
        try {
          const movieData = await loadCSV('movie_data_rich.csv');
          const reviewData = await loadCSV('generated_movie_reviews.csv');
          const movielink = await loadCSV('movies.csv');

          const movieMap = new Map();
          movieData.forEach((movie) => {
            movieMap.set(movie.movieId, { ...movie });
          });

          reviewData.forEach((review) => {
            const movieId = review.movieId;
            if (movieMap.has(movieId)) {
              movieMap.set(movieId, { ...movieMap.get(movieId), ...review });
            }
          });

          movielink.forEach((link) => {
            const movieId = link.movieId;
            if (movieMap.has(movieId)) {
              movieMap.set(movieId, { ...movieMap.get(movieId), ...link });
            }
          });

          dispatch(setMovies([...movieMap.values()]));
        } catch (error) {
          console.error('Error loading CSV files:', error);
        }
      };

      loadAllMovies();
    }
  }, [dispatch, movies.length]);

  const handleSearch = () => {
    if (keyword.trim() === '') {
      dispatch(setFilteredMovies([]));
    } else {
      const lowerKeyword = keyword.toLowerCase();
      const results = movies.filter((movie) =>
        Object.values(movie).some((value) =>
          String(value).toLowerCase().includes(lowerKeyword)
        )
      );
      dispatch(setFilteredMovies(results));
    }
  };
  // const handleviewmore=()=>{
  //   navigate(`/recommendation/${encodeURIComponent(movie.movieTitle)}`)
  // }

  return (
    <div className="movie-recommendation">
      <div>
      <h2 style={{textAlign:"center"}}>Movie Recommendations</h2>
      </div>
      <div>
      <input
        type="text"
        placeholder="Type a movie keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} style={{marginBottom:"30px"}} className="search-button">Recommend</button>
      </div>
      


      <div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.movieId} style={{ margin: "10px",padding: "10px",border: "1px solid #ddd"}} className='last-work' >
                <h3 style={{ textAlign: "center",color:"white" }}>{movie.movieTitle}</h3>
              <p style={{color:"white"}}><strong>Genre:</strong> {movie.genres || 'N/A'}</p>
              <p style={{color:"white"}}><strong>Description:</strong> {movie.overview || 'N/A'}</p>
              <button className='search-button' onClick={()=>{navigate(`/recommendation/${encodeURIComponent(movie.movieTitle)}`)}}>View More</button>
            </div>
          ))
        ) : (
          <p>No recommendations found</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
