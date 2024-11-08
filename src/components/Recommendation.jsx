/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setFilteredMovies } from '../store/movieSlice';
import Papa from 'papaparse';
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
          const movieData = await loadCSV('movies_with_image_links.csv');
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

  const handleRecommend = (newkeyword=keyword) => {
    if (keyword.trim() === '') {
      dispatch(setFilteredMovies([]));
    } else {
      const lowerKeyword = newkeyword.toLowerCase();
      const results = movies.filter((movie) =>
        Object.values(movie).some((value) =>
          String(value).toLowerCase().includes(lowerKeyword)
        )
      );
      dispatch(setFilteredMovies(results));
      navigate(`/recommendation?keyword=${newkeyword}`)
    }
  };
  return (
    <div id="recommendation">
      <div>
        <h2 style={{textAlign:"center", marginTop:"20px"}}>Find Your Perfect Movie</h2>
      </div>
      <div>
        <input
        type="text"
        placeholder="Type a movie keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="recommend-input"
        />
        <button onClick={()=>handleRecommend(keyword)} style={{marginBottom:"30px"}} className="search-button">Recommend</button>
      </div>
    
      <div>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.movieId} className='last-work' >
              <div className="recom-img">
                <img onClick={()=>{navigate(`/recommendation/${encodeURIComponent(movie.movieTitle)}`)}} src={movie.imageLink} alt={movie.movieTitle} />
              </div>
              <div className="recom-details">
              <a style={{textDecoration:"none", cursor:"pointer"}} onClick={()=>{navigate(`/recommendation/${encodeURIComponent(movie.movieTitle)}`)}}><h3 style={{color:"black" }}><strong>{movie.movieTitle}</strong> </h3></a>
                <p style={{color:"black"}}> {movie.genres || 'N/A'}</p>
                <p className="recom-overview" style={{color:"black",marginTop:"20px",fontSize:"1rem"}}> {movie.overview || 'N/A'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-recom" style={{minHeight:"510px"}}>
            <p>No recommendations found</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Recommendation;
