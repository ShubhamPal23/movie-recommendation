import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

const API_KEY = "e6a8a833176f610ddab69b3aec7b47c7";
const CURRENT_YEAR = new Date().getFullYear();
const LAST_20_YEARS = CURRENT_YEAR - 30;

const MOVIE_API_URL = (page, genreIds) => {
  if (genreIds.length > 0) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreIds.join(
      ","
    )}&include_adult=false&release_date.gte=${LAST_20_YEARS}-01-01`;
  }
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState({});
  const selectedGenres = location.state?.selectedGenres || [];

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        const genreMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      })
      .catch((error) => console.error("Error fetching genre data:", error));

    fetchMovies(currentPage);
  }, [currentPage, selectedGenres]);

  const fetchMovies = (page) => {
    fetch(MOVIE_API_URL(page, selectedGenres))
      .then((response) => response.json())
      .then((data) => {
        const filteredMovies = data.results.filter(
          (movie) => !movie.adult && movie.poster_path
        );

        const sortedMovies = filteredMovies.sort(
          (a, b) => b.vote_average - a.vote_average
        );

        setMovies(sortedMovies);
        setTotalPages(data.total_pages);
        console.log(data.total_pages);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  };

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };
  const handlegenre = () => {
    navigate("/genre");
  };

  return (
    <div className="home">
      <div className="content">
        <button onClick={handlegenre} className="genre-btn">
          Select Your Favourite Genre
        </button>
        <h1>
          Top Rated Movies
        </h1>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => {
          const movieGenres = movie.genre_ids.map(
            (id) => genres[id] || "Unknown"
          );
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
              genres={movieGenres}
            />
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Home;
