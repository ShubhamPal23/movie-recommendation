// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Papa from "papaparse";
// import "./Recommendation.css";

// const MovieDetail = () => {
//   const { movieTitle } = useParams();
//   const [movie, setMovie] = useState(null);
//   const navigate=useNavigate();
//   const handleSaransh=()=>{
//     navigate("/recommendation")
//   }

//   useEffect(() => {
//     const loadCSV = async (fileName) => {
//       return new Promise((resolve, reject) => {
//         Papa.parse(`/${fileName}`, {
//           download: true,
//           header: true,
//           complete: (result) => resolve(result.data),
//           error: (error) => reject(error),
//         });
//       });
//     };

//     const loadMovieData = async () => {
//       const movieData = await loadCSV("movie_data_rich.csv");
//       const reviewData = await loadCSV("generated_movie_reviews.csv");

//       const combinedMovies = movieData.map((movie) => {
//         const review = reviewData.find((r) => r.movieId === movie.movieId);
//         return { ...movie, ...review };
//       });

//       const selectedMovie = combinedMovies.find((m) => m.movieTitle === movieTitle);
//       setMovie(selectedMovie);
//     };

//     loadMovieData();
//   }, [movieTitle]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div className="movie-detail">
//       <h2 style={{textAlign:"center"}}>{movie.movieTitle}</h2>
//       <p><strong>Movie Year: </strong>{movie.movieYear}</p>
//       <p><strong>Critic Score: </strong>{movie.critic_score}</p>
//       <p><strong>Critic Sentiment: </strong>{movie.critic_sentiment}</p>
//       <p><strong>Audience Score: </strong>{movie.audience_score}</p>
//       <p><strong>Audience Sentiment: </strong>{movie.audience_sentiment}</p>
//       <p><strong>Runtime(in min): </strong>{movie.runtime}</p>
//       <p><strong>Director: </strong>{movie.director}</p>
//       <p><strong>Cast: </strong>{movie.top_5_cast}</p>
//       <p><strong>Genre:</strong> {movie.genres || "Genre not available"}</p>
//       <p><strong>Description:</strong> {movie.overview || "Description not available"}</p>
//       <p><strong>Generated Review:</strong> {movie.generated_review}</p>
//       <button onClick={handleSaransh}>Go Back Saransh</button>
//     </div>
//   );
// };

// export default MovieDetail;

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './Recommendation.css';
import "./MovieDetails.css"

const MovieDetail = () => {
  const { movieTitle } = useParams();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movie);
  const movie = movies.find((m) => m.movieTitle === movieTitle);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h2 style={{ textAlign: "center" }}>{movie.movieTitle}</h2>
      <div className='movie-analysis'>
      <p><strong>Movie Year: </strong>{movie.movieYear}</p>
      <p><strong>Critic Score: </strong>{movie.critic_score}</p>
      <p><strong>Critic Sentiment: </strong>{movie.critic_sentiment}</p>
      <p><strong>Audience Score: </strong>{movie.audience_score}</p>
      <p><strong>Audience Sentiment: </strong>{movie.audience_sentiment}</p>
      <p><strong>Runtime: </strong>{movie.runtime}</p>
      <p><strong>Director: </strong>{movie.director}</p>
      <p><strong>Cast: </strong>{movie.top_5_cast}</p>
      <p><strong>Genre:</strong> {movie.genres || "Genre not available"}</p>
      <p><strong>Description:</strong> {movie.overview || "Description not available"}</p>
      <p><strong>Generated Review:</strong> {movie.generated_review}</p>
      </div>
      <button style={{textAlign:"center"}} className='search-button' onClick={() => navigate("/recommendation")}>Go Back</button>
    </div>
  );
};

export default MovieDetail;

