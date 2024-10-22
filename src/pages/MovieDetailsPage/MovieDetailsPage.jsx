import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const cssClasses = ({ isActive }) => clsx(isActive && css.active) || css.link;

const MovieDetailsPage = () => {
  const [options] = useState({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI0NTRmNGZmZjk0ZTVjOTE4NjhhNDZjOGQxMDQ1NyIsIm5iZiI6MTcyOTE5MjI2OC4xODczODksInN1YiI6IjY3MTE1YTA0MjlkOGE1OWUwNDVlYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJg6F-xqM6MpIr-XliFyApDdMMv8qzYHU51A2hdklME',
    },
  });

  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        )
        .catch(err => console.error(err));
      setMovieDetails(data);
    };
    fetchTrendingMovies();
  }, [options, movieId]);

  const navigate = useNavigate();
  const location = useLocation();
  const backUrl = location.state?.from;
  const goBack = () => navigate(backUrl);

  if (movieDetails != null)
    return (
      <>
        <button className={css.Btn} onClick={goBack}>
          Go back
        </button>
        <div className={css.container}>
          {movieDetails.backdrop_path ? (
            <a href={movieDetails.homepage}>
              <img
                className={css.picture}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
              />
            </a>
          ) : (
            <img
              className={css.picture}
              src="https://t4.ftcdn.net/jpg/07/91/22/59/240_F_791225927_caRPPH99D6D1iFonkCRmCGzkJPf36QDw.jpg"
              alt={movieDetails.title}
            />
          )}
          <div className={css.movie_container_inf}>
            <h3>
              {movieDetails.title} ( {movieDetails.release_date.slice(0, 4)} )
            </h3>
            <p>User score: {movieDetails.vote_average}/10</p>
            <h4>Overview</h4>
            {movieDetails.overview ? (
              movieDetails.overview
            ) : (
              <p>No reviews yet </p>
            )}
            <h4>Genres</h4>
            <p>{movieDetails.genres.map(genre => genre.name)}</p>
          </div>
        </div>
        <div className={css.list}>
          <NavLink
            className={cssClasses}
            state={{ from: backUrl }}
            to={`/movies/${movieId}/cast`}
          >
            Cast
          </NavLink>
          <NavLink
            className={cssClasses}
            state={{ from: backUrl }}
            to={`/movies/${movieId}/reviews`}
          >
            Reviews
          </NavLink>
        </div>
        <Outlet />
      </>
    );
};

export default MovieDetailsPage;
