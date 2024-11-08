/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './Recommendation.css';
import "./MovieDetail.css";
import ProgressCircle from './ProgressCircle';

const MovieDetail = () => {
  const { movieTitle } = useParams();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movie);
  const movie = movies.find((m) => m.movieTitle === movieTitle);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <div className="recommend-head">
        <img src={movie.imageLink} alt="" />
        <h2 style={{ textAlign: "center" }}>{movie.movieTitle}</h2>
      </div>
      
      <div className='movie-analysis'>
        <div className="score-circles">
          <ProgressCircle score={movie.critic_score} label="Critic Score" />
          <ProgressCircle score={movie.audience_score} label="Audience Score" />
        </div>
        
        <p><strong>Movie Year: </strong>{movie.movieYear}</p>
        <p><strong>Runtime: </strong>{movie.runtime}</p>
        <p><strong>Director: </strong>{movie.director}</p>
        <p><strong>Cast: </strong>{movie.top_5_cast}</p>
        <p><strong>Genre:</strong> {movie.genres || "Genre not available"}</p>
        <p><strong>Description:</strong> {movie.overview || "Description not available"}</p>
        <p><strong>Generated Review:</strong> {movie.generated_review}</p>
      </div>
      <button style={{textAlign:"center"}} className='moviedetail-button' onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default MovieDetail;
